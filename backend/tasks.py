from celery import Celery
import subprocess
from nanoid import generate
import os
import logging
from arkbe.db import db
from arkbe.gql.models import Task, Asset, TaskStatus

app = Celery("tasks", broker="redis://localhost")


def gen_id():
    return generate(
        alphabet="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    )


@app.task
def add(x, y):
    return x + y


@app.task
def run_create_3d_asset_from_image(asset_id: str, task_id: str):
    try:
        logging.info(f"start processing asset_id={asset_id}, task_id={task_id}")
        task = Task.find_in_db(db, task_id)
        if task == None:
            logging.warning(f"failed to find task id={task_id}")
            return

        asset = Asset.find_in_db(db, asset_id)
        if asset == None:
            logging.warning(f"failed to find asset id={asset_id}")
            task.status = TaskStatus.FAILED
            Task.write_to_db(db, task)
            return

        foreground_ratio = 0.85
        chunk_size = 8192
        device = "cpu"
        marching_cubes_resolution = 256
        output_path = os.path.join("data/img2mesh", asset_id)

        task.status = TaskStatus.PROCESSING
        Task.write_to_db(db, task)

        ret_code = subprocess.call(
            [
                "python",
                "TripoSR/run.py",
                asset.source_original_filepath(),
                "--model-save-format=glb",
                "--output-dir",
                output_path,
            ]
        )

        task.status = TaskStatus.SUCCESS
        Task.write_to_db(db, task)
        asset.processed = True
        Asset.write_to_db(db, asset)

        logging.info(f"return code ={ret_code}")
    except Exception as err:
        logging.error(err)
        task.status = TaskStatus.FAILED
        Task.write_to_db(db, task)
        logging.error("failed to process task")
