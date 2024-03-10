"use client";

import { QueryResult, useQuery } from "@apollo/client";
import { Loader } from "@components/Loader";
import { ModelViewer } from "@components/ModelViewer";
import { gql } from "@generated/gql";
import { Exact, GetAllAssetsQuery } from "@generated/graphql";
import classNames from "classnames";

const GET_ALL_ASSETS_QUERY = gql(`
  query GetAllAssets {
    assets {
      id
      url
      thumbnailUrl
    }
  }
`);

export default function ExploreAssetsPage() {
  const results = useQuery(GET_ALL_ASSETS_QUERY);

  return (
    <div>
      <div className="mx-auto w-full max-w-3xl mt-12">
        <h1 className="text-xl text-center">
          Check out what others in the community have created
        </h1>
      </div>

      <AssetList result={results} className="w-full max-w-7xl mx-auto mt-12" />
    </div>
  );
}

function AssetList({
  result,
  className,
}: {
  result: QueryResult<GetAllAssetsQuery, Exact<{ [key: string]: never }>>;
  className?: string;
}) {
  if (result.loading) return <Loader />;

  const assets = result.data!.assets;

  return (
    <ul className={classNames("flex flex-row gap-4 justify-center", className)}>
      {assets.map((asset) => (
        <li key={asset.id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={asset.thumbnailUrl} alt="" />
          </figure>
          <div className="card-body">
            <h3 className="card-title">Shoes</h3>
            <ModelViewer
              src={asset.url}
              poster={asset.thumbnailUrl}
              ar
              camera-controls
              ar-modes="scene-viewer quick-look webxr"
              className="w-40 h-40"
            />

            <p>
              <pre>
                <code>{JSON.stringify(asset, null, 2)}</code>
              </pre>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
