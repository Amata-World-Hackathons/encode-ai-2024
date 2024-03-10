import os
import enum
import typing
import strawberry
from mimetypes import guess_extension
from nanoid import generate
from pymongo.database import Database

_ASSET_BASE_PATH = "http://localhost:8000"
# _ASSET_BASE_PATH = "https://8698-213-86-221-106.ngrok-free.app/"


def gen_id():
    return generate(
        alphabet="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    )


@strawberry.type
class Project:
    id: str
    title: str
    mesh_id: str
    creator: str
    backstory_pages: typing.List[str]

    def db_serialized(self):
        return {
            "_id": self.id,
            "title": self.title,
            "mesh_id": self.mesh_id,
            "creator": self.creator,
            "backstory_pages": self.backstory_pages,
        }

    @staticmethod
    def all_in_db(db: Database):
        docs = db["projects"].find()
        return [Project.from_serialized(doc) for doc in docs]

    @staticmethod
    def from_serialized(data: typing.Dict):
        return Project(
            id=data["_id"],
            title=data["title"],
            mesh_id=data["mesh_id"],
            creator=data["creator"],
            backstory_pages=data["backstory_pages"],
        )

    @staticmethod
    def find_in_db(db: Database, project_id: str):
        raw = db["projects"].find_one({"_id": project_id})
        return Project.from_serialized(raw) if raw != None else None

    @staticmethod
    def write_to_db(db: Database, project: typing.Self):
        return db["projects"].update_one(
            filter={"_id": project.id},
            update={"$set": project.db_serialized()},
            upsert=True,
        )


@strawberry.enum
class TaskStatus(enum.Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    SUCCESS = "success"
    FAILED = "failed"


@strawberry.type
class Asset:
    id: str
    creator: str
    task_id: str
    processed: bool
    mime_type: str
    project_id: str
    source_filename: str
    source_mime_type: str

    def db_serialized(self):
        return {
            "_id": self.id,
            "task_id": str(self.task_id),
            "creator": self.creator,
            "processed": self.processed,
            "mime_type": self.mime_type,
            "project_id": self.project_id,
            "source_filename": self.source_filename,
            "source_mime_type": self.source_mime_type,
        }

    @strawberry.field
    def thumbnail_url(self) -> str:
        return f"{_ASSET_BASE_PATH}/files/thumbnails/{self.id}.png"

    @strawberry.field
    def url(self) -> str:
        ext = (
            ".glb"
            if self.mime_type == "model/gltf-binary"
            else guess_extension(self.mime_type)
        )
        return f"{_ASSET_BASE_PATH}/files/{self.id}{ext}"

    @strawberry.field
    def source_url(self) -> str:
        return f"{_ASSET_BASE_PATH}/files/originals/{self.id}"

    @strawberry.field
    def ext(self) -> str:
        _, ext = os.path.splitext(os.path.basename(self.url()))
        return ext

    def saved_dir(self):
        match self.mime_type:
            case "model/gltf-binary":
                return os.path.join("data/img2mesh", self.id, "0")

            case _:
                return None

    def saved_path(self):
        dirpart = self.saved_dir()
        match self.mime_type:
            case "model/gltf-binary":
                return os.path.join(dirpart, "mesh.glb")

            case _:
                return None

    def thumbnail_path(self):
        dirpart = self.saved_dir()
        match self.mime_type:
            case "model/gltf-binary":
                return os.path.join(dirpart, "input.png")

            case _:
                return None

    def source_original_filepath(self):
        save_dir = os.path.join("data/uploads", self.id)
        return os.path.join(
            save_dir, f"original{guess_extension(self.source_mime_type)}"
        )

    @staticmethod
    def all_in_db(db: Database):
        docs = db["assets"].find()
        return [Asset.from_serialized(doc) for doc in docs]

    @staticmethod
    def from_serialized(data: typing.Dict):
        return Asset(
            id=data["_id"],
            creator=data["creator"],
            task_id=data["task_id"],
            processed=data["processed"],
            mime_type=data["mime_type"],
            project_id=data["project_id"],
            source_filename=data["source_filename"],
            source_mime_type=data["source_mime_type"],
        )

    @staticmethod
    def find_in_db(db: Database, asset_id: str):
        raw = db["assets"].find_one({"_id": asset_id})
        return Asset.from_serialized(raw) if raw != None else None

    @staticmethod
    def write_to_db(db: Database, asset: typing.Self):
        return db["assets"].update_one(
            filter={"_id": asset.id},
            update={"$set": asset.db_serialized()},
            upsert=True,
        )


@strawberry.type
class Task:
    id: str
    status: TaskStatus

    def db_serialized(self):
        return {"_id": self.id, "status": str(self.status.value)}

    @staticmethod
    def from_serialized(data: typing.Dict):
        return Task(id=data["_id"], status=TaskStatus(value=data["status"]))

    @staticmethod
    def find_in_db(db: Database, task_id: str):
        raw = db["tasks"].find_one({"_id": task_id})
        return Task.from_serialized(raw) if raw != None else None

    @staticmethod
    def write_to_db(db: Database, task: typing.Self):
        return db["tasks"].update_one(
            filter={"_id": task.id}, update={"$set": task.db_serialized()}, upsert=True
        )
