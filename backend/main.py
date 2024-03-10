import os
import logging
from fastapi import FastAPI, HTTPException
from strawberry.asgi import GraphQL
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from strawberry.subscriptions import GRAPHQL_TRANSPORT_WS_PROTOCOL, GRAPHQL_WS_PROTOCOL
from arkbe.gql.schema import schema
from arkbe.gql.models import Asset
from arkbe.db import db

graphql_app = GraphQL(
    schema, subscription_protocols=[GRAPHQL_TRANSPORT_WS_PROTOCOL, GRAPHQL_WS_PROTOCOL]
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/files/{filename}")
def get_file(filename: str):
    asset_id, ext = os.path.splitext(os.path.basename(filename))
    asset = Asset.find_in_db(db, asset_id)
    if asset == None:
        raise HTTPException(status_code=404, detail="asset not found")

    saved_path = asset.saved_path()

    if not os.path.isfile(saved_path):
        raise HTTPException(status_code=404, detail="file not found")

    upload_name, _ = os.path.splitext(asset.source_filename)

    return FileResponse(
        saved_path,
        media_type="application/octet-stream",
        filename=f"{upload_name}{asset.ext()}",
    )


@app.get("/files/thumbnails/{filename}")
def get_file(filename: str):
    asset_id, _ = os.path.splitext(os.path.basename(filename))
    asset = Asset.find_in_db(db, asset_id)
    if asset == None:
        raise HTTPException(status_code=404, detail="asset not found")

    thumbnail_path = asset.thumbnail_path()

    if not os.path.isfile(thumbnail_path):
        raise HTTPException(status_code=404, detail="file not found")

    upload_name, _ = os.path.splitext(asset.source_filename)

    return FileResponse(
        thumbnail_path,
        media_type="image/png",
        filename=f"{upload_name}.png",
    )


@app.get("/files/originals/{asset_id}")
def get_file(asset_id: str):
    asset = Asset.find_in_db(db, asset_id)
    if asset == None:
        raise HTTPException(status_code=404, detail="asset not found")

    source_path = asset.source_original_filepath()

    if not os.path.isfile(source_path):
        raise HTTPException(status_code=404, detail="file not found")

    upload_name, _ = os.path.splitext(asset.source_filename)

    return FileResponse(
        source_path,
        media_type=asset.source_mime_type,
        filename=asset.source_filename,
    )
