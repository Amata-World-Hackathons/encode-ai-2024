import { useMutation, useQuery } from "@apollo/client";
import { Loader } from "@components/Loader";
import { ModelViewer } from "@components/ModelViewer";
import { gql } from "@generated/gql";
import { useCreator } from "@hooks/useCreator";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

const ASSET_QUERY = gql(`
query GetAssetForFormQuery($id: String!) {
    asset(id: $id) {
        id
        url
        processed
        sourceUrl
        thumbnailUrl
    }
}`);

const UPLOAD_ASSET_MUTATION = gql(`
mutation UploadAssetMutation($creator: String!, $image: Upload!, $projectId: String!) {
    asset {
        create3dFromImage(input: { creator: $creator, image: $image, projectId: $projectId }) {
            id
            taskId
        }
    }
}`);

const UPDATE_PROJECT_MUTATION = gql(`
mutation UpdateProjectWithMeshMutation($projectId: String!, $assetId: String!) {
    project {
        updateMeshAsset(input: { projectId: $projectId, assetId: $assetId }) {
            id
        }
    }
}
`);

export const Update3DAssetForm = ({
  project,
  className,
  onProjectUpdate,
}: {
  project: {
    id: string;
    meshId: string;
  };
  className?: string;
  onProjectUpdate?: () => void;
}) => {
  const creator = useCreator();

  const [uploadAssetMutation] = useMutation(UPLOAD_ASSET_MUTATION);
  const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION);

  const [assetIdOverride, setAssetIdOverride] = useState("");

  const result = useQuery(ASSET_QUERY, {
    variables: {
      id: assetIdOverride || project.meshId,
    },
    pollInterval: assetIdOverride ? 5000 : 0,
  });

  const [image, setImage] = useState<File | undefined>();

  const previewImageUrl = useMemo(() => {
    return image
      ? URL.createObjectURL(image)
      : result.data
      ? result.data.asset.sourceUrl
      : "";
  }, [image, result]);

  const asset = result.data?.asset;

  useEffect(() => {
    if (asset?.processed) {
      setAssetIdOverride("");
    } else if (asset) {
      setAssetIdOverride(asset?.id);
    }
  }, [asset]);

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();

        if (!image) return;

        const res = await uploadAssetMutation({
          variables: {
            image: [image],
            creator,
            projectId: project.id,
          },
        });

        const newAssetId = res.data!.asset.create3dFromImage.id;
        setAssetIdOverride(newAssetId);

        await updateProject({
          variables: {
            projectId: project.id,
            assetId: newAssetId,
          },
        });

        onProjectUpdate?.();

        setImage(undefined);
      }}
      className={classNames("flex flex-col lg:flex-row gap-2", className)}
    >
      <div>
        <img
          src={previewImageUrl}
          alt=""
          className="h-80 w-80 object-contain"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files?.[0]);
          }}
          className="file-input"
        />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <button
          type="submit"
          className="btn btn-secondary"
          disabled={!image || !!assetIdOverride}
        >
          Generate
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className=" w-52 h-52">
          {asset ? (
            asset.processed ? (
              <ModelViewer
                ar
                src={asset.url}
                poster={asset.thumbnailUrl}
                camera-controls
                className="w-full h-full"
              />
            ) : (
              <Loader />
            )
          ) : (
            <div>Upload an image to generate</div>
          )}
        </div>
      </div>
    </form>
  );
};
