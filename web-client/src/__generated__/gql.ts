/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetAllAssets {\n    assets {\n      id\n      url\n      thumbnailUrl\n    }\n  }\n": types.GetAllAssetsDocument,
    "\nquery GetAssetForFormQuery($id: String!) {\n    asset(id: $id) {\n        id\n        url\n        processed\n        sourceUrl\n        thumbnailUrl\n    }\n}": types.GetAssetForFormQueryDocument,
    "\nmutation UploadAssetMutation($creator: String!, $image: Upload!, $projectId: String!) {\n    asset {\n        create3dFromImage(input: { creator: $creator, image: $image, projectId: $projectId }) {\n            id\n            taskId\n        }\n    }\n}": types.UploadAssetMutationDocument,
    "\nmutation UpdateProjectWithMeshMutation($projectId: String!, $assetId: String!) {\n    project {\n        updateMeshAsset(input: { projectId: $projectId, assetId: $assetId }) {\n            id\n        }\n    }\n}\n": types.UpdateProjectWithMeshMutationDocument,
    "\nmutation UpdateProjectDataMutation($projectId: String!, $title: String!, $backstoryPages: [String!]!) {\n    project {\n        updateProjectData(input: { projectId: $projectId, title: $title, backstoryPages: $backstoryPages }) {\n            id\n        }\n    }\n}\n": types.UpdateProjectDataMutationDocument,
    "\nquery GetProjectQuery($id: String!) {\n    project(id: $id) {\n        id\n        title\n        meshId\n        creator\n        backstoryPages\n    }\n}": types.GetProjectQueryDocument,
    "\nquery GetAssetForProjectQuery($id: String!) {\n    asset(id: $id) {\n      id\n      url\n      sourceUrl\n      thumbnailUrl\n    }\n}": types.GetAssetForProjectQueryDocument,
    "\nmutation CreateProjectMutation($creator: String!) {\n    project {\n        create(input: { creator: $creator}) {\n            id\n        }\n    }\n}": types.CreateProjectMutationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllAssets {\n    assets {\n      id\n      url\n      thumbnailUrl\n    }\n  }\n"): (typeof documents)["\n  query GetAllAssets {\n    assets {\n      id\n      url\n      thumbnailUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAssetForFormQuery($id: String!) {\n    asset(id: $id) {\n        id\n        url\n        processed\n        sourceUrl\n        thumbnailUrl\n    }\n}"): (typeof documents)["\nquery GetAssetForFormQuery($id: String!) {\n    asset(id: $id) {\n        id\n        url\n        processed\n        sourceUrl\n        thumbnailUrl\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UploadAssetMutation($creator: String!, $image: Upload!, $projectId: String!) {\n    asset {\n        create3dFromImage(input: { creator: $creator, image: $image, projectId: $projectId }) {\n            id\n            taskId\n        }\n    }\n}"): (typeof documents)["\nmutation UploadAssetMutation($creator: String!, $image: Upload!, $projectId: String!) {\n    asset {\n        create3dFromImage(input: { creator: $creator, image: $image, projectId: $projectId }) {\n            id\n            taskId\n        }\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateProjectWithMeshMutation($projectId: String!, $assetId: String!) {\n    project {\n        updateMeshAsset(input: { projectId: $projectId, assetId: $assetId }) {\n            id\n        }\n    }\n}\n"): (typeof documents)["\nmutation UpdateProjectWithMeshMutation($projectId: String!, $assetId: String!) {\n    project {\n        updateMeshAsset(input: { projectId: $projectId, assetId: $assetId }) {\n            id\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateProjectDataMutation($projectId: String!, $title: String!, $backstoryPages: [String!]!) {\n    project {\n        updateProjectData(input: { projectId: $projectId, title: $title, backstoryPages: $backstoryPages }) {\n            id\n        }\n    }\n}\n"): (typeof documents)["\nmutation UpdateProjectDataMutation($projectId: String!, $title: String!, $backstoryPages: [String!]!) {\n    project {\n        updateProjectData(input: { projectId: $projectId, title: $title, backstoryPages: $backstoryPages }) {\n            id\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetProjectQuery($id: String!) {\n    project(id: $id) {\n        id\n        title\n        meshId\n        creator\n        backstoryPages\n    }\n}"): (typeof documents)["\nquery GetProjectQuery($id: String!) {\n    project(id: $id) {\n        id\n        title\n        meshId\n        creator\n        backstoryPages\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAssetForProjectQuery($id: String!) {\n    asset(id: $id) {\n      id\n      url\n      sourceUrl\n      thumbnailUrl\n    }\n}"): (typeof documents)["\nquery GetAssetForProjectQuery($id: String!) {\n    asset(id: $id) {\n      id\n      url\n      sourceUrl\n      thumbnailUrl\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateProjectMutation($creator: String!) {\n    project {\n        create(input: { creator: $creator}) {\n            id\n        }\n    }\n}"): (typeof documents)["\nmutation CreateProjectMutation($creator: String!) {\n    project {\n        create(input: { creator: $creator}) {\n            id\n        }\n    }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;