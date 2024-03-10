import typing
import strawberry
import os
from starlette.datastructures import UploadFile
from strawberry.file_uploads import Upload
from ..db import db
import tasks
from .models import gen_id, Project, TaskStatus, Task, Asset


@strawberry.type
class Query:
    @strawberry.field
    def project(self, id: str) -> Project:
        project = Project.find_in_db(db, id)
        if project == None:
            raise Exception("project not found")

        return project

    @strawberry.field
    def asset(self, id: str) -> Asset:
        asset = Asset.find_in_db(db, id)
        if asset == None:
            raise Exception("asset not found")

        return asset

    @strawberry.field
    def assets(self) -> typing.List[Asset]:
        return Asset.all_in_db(db)


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def subscribe_task_status(
        self, task_id: str
    ) -> typing.AsyncGenerator[TaskStatus, None]:
        pass


@strawberry.input
class CreateProjectInput:
    creator: str


@strawberry.input
class UpdateMeshAssetInput:
    asset_id: str
    project_id: str


@strawberry.input
class UpdateProjectDataInput:
    title: str
    project_id: str
    backstory_pages: typing.List[str]


@strawberry.type
class ProjectMutation:
    @strawberry.mutation
    async def create(self, input: CreateProjectInput) -> Project:
        project = Project(
            id=gen_id(),
            title="Untitled",
            creator=input.creator,
            backstory_pages=[],
            mesh_id="",
        )
        Project.write_to_db(db, project)

        return project

    @strawberry.mutation
    def update_mesh_asset(self, input: UpdateMeshAssetInput) -> Project:
        project = Project.find_in_db(db, input.project_id)
        if project == None:
            raise Exception("project not found")

        project.mesh_id = input.asset_id
        Project.write_to_db(db, project)

        return project

    @strawberry.mutation
    def update_project_data(self, input: UpdateProjectDataInput) -> Project:
        project = Project.find_in_db(db, input.project_id)
        project.title = input.title
        project.backstory_pages = input.backstory_pages

        Project.write_to_db(db, project)

        return project


@strawberry.input
class Create3DAssetFromImageInput:
    image: Upload
    creator: str
    project_id: str


@strawberry.type
class AssetMutation:
    @strawberry.mutation
    async def create_3d_from_image(self, input: Create3DAssetFromImageInput) -> Asset:
        img: UploadFile = input.image[0]

        task = Task(id=gen_id(), status=TaskStatus.QUEUED)
        asset = Asset(
            id=gen_id(),
            creator=input.creator,
            task_id=task.id,
            project_id=input.project_id,
            processed=False,
            mime_type="model/gltf-binary",
            source_filename=img.filename,
            source_mime_type=img.content_type,
        )

        save_dir = os.path.join("data/uploads", asset.id)
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
        with open(asset.source_original_filepath(), "wb") as f:
            f.write(img.file.read())

        Task.write_to_db(db, task)
        Asset.write_to_db(db, asset)

        tasks.run_create_3d_asset_from_image.delay(asset_id=asset.id, task_id=task.id)

        return asset


@strawberry.type
class Mutation:
    @strawberry.field
    def asset(self) -> AssetMutation:
        return AssetMutation()

    @strawberry.field
    def project(self) -> ProjectMutation:
        return ProjectMutation()


schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)
