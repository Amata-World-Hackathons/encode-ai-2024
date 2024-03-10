/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type Asset = {
  __typename?: 'Asset';
  creator: Scalars['String']['output'];
  ext: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  processed: Scalars['Boolean']['output'];
  projectId: Scalars['String']['output'];
  sourceFilename: Scalars['String']['output'];
  sourceMimeType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  taskId: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AssetMutation = {
  __typename?: 'AssetMutation';
  create3dFromImage: Asset;
};


export type AssetMutationCreate3dFromImageArgs = {
  input: Create3DAssetFromImageInput;
};

export type Create3DAssetFromImageInput = {
  creator: Scalars['String']['input'];
  image: Scalars['Upload']['input'];
  projectId: Scalars['String']['input'];
};

export type CreateProjectInput = {
  creator: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  asset: AssetMutation;
  project: ProjectMutation;
};

export type Project = {
  __typename?: 'Project';
  backstoryPages: Array<Scalars['String']['output']>;
  creator: Scalars['String']['output'];
  id: Scalars['String']['output'];
  meshId: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProjectMutation = {
  __typename?: 'ProjectMutation';
  create: Project;
  updateMeshAsset: Project;
  updateProjectData: Project;
};


export type ProjectMutationCreateArgs = {
  input: CreateProjectInput;
};


export type ProjectMutationUpdateMeshAssetArgs = {
  input: UpdateMeshAssetInput;
};


export type ProjectMutationUpdateProjectDataArgs = {
  input: UpdateProjectDataInput;
};

export type Query = {
  __typename?: 'Query';
  asset: Asset;
  assets: Array<Asset>;
  project: Project;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeTaskStatus: TaskStatus;
};


export type SubscriptionSubscribeTaskStatusArgs = {
  taskId: Scalars['String']['input'];
};

export enum TaskStatus {
  Failed = 'FAILED',
  Processing = 'PROCESSING',
  Queued = 'QUEUED',
  Success = 'SUCCESS'
}

export type UpdateMeshAssetInput = {
  assetId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type UpdateProjectDataInput = {
  backstoryPages: Array<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type GetAllAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAssetsQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, url: string, thumbnailUrl: string }> };

export type GetAssetForFormQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAssetForFormQueryQuery = { __typename?: 'Query', asset: { __typename?: 'Asset', id: string, url: string, processed: boolean, sourceUrl: string, thumbnailUrl: string } };

export type UploadAssetMutationMutationVariables = Exact<{
  creator: Scalars['String']['input'];
  image: Scalars['Upload']['input'];
  projectId: Scalars['String']['input'];
}>;


export type UploadAssetMutationMutation = { __typename?: 'Mutation', asset: { __typename?: 'AssetMutation', create3dFromImage: { __typename?: 'Asset', id: string, taskId: string } } };

export type UpdateProjectWithMeshMutationMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  assetId: Scalars['String']['input'];
}>;


export type UpdateProjectWithMeshMutationMutation = { __typename?: 'Mutation', project: { __typename?: 'ProjectMutation', updateMeshAsset: { __typename?: 'Project', id: string } } };

export type UpdateProjectDataMutationMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  backstoryPages: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UpdateProjectDataMutationMutation = { __typename?: 'Mutation', project: { __typename?: 'ProjectMutation', updateProjectData: { __typename?: 'Project', id: string } } };

export type GetProjectQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectQueryQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, meshId: string, creator: string, backstoryPages: Array<string> } };

export type GetAssetForProjectQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAssetForProjectQueryQuery = { __typename?: 'Query', asset: { __typename?: 'Asset', id: string, url: string, sourceUrl: string, thumbnailUrl: string } };

export type CreateProjectMutationMutationVariables = Exact<{
  creator: Scalars['String']['input'];
}>;


export type CreateProjectMutationMutation = { __typename?: 'Mutation', project: { __typename?: 'ProjectMutation', create: { __typename?: 'Project', id: string } } };


export const GetAllAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}}]}}]} as unknown as DocumentNode<GetAllAssetsQuery, GetAllAssetsQueryVariables>;
export const GetAssetForFormQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssetForFormQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"processed"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}}]}}]} as unknown as DocumentNode<GetAssetForFormQueryQuery, GetAssetForFormQueryQueryVariables>;
export const UploadAssetMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadAssetMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creator"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create3dFromImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"creator"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creator"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}}]}}]}}]} as unknown as DocumentNode<UploadAssetMutationMutation, UploadAssetMutationMutationVariables>;
export const UpdateProjectWithMeshMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProjectWithMeshMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMeshAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProjectWithMeshMutationMutation, UpdateProjectWithMeshMutationMutationVariables>;
export const UpdateProjectDataMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProjectDataMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"backstoryPages"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProjectData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"backstoryPages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"backstoryPages"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProjectDataMutationMutation, UpdateProjectDataMutationMutationVariables>;
export const GetProjectQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"meshId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"backstoryPages"}}]}}]}}]} as unknown as DocumentNode<GetProjectQueryQuery, GetProjectQueryQueryVariables>;
export const GetAssetForProjectQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssetForProjectQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}}]}}]} as unknown as DocumentNode<GetAssetForProjectQueryQuery, GetAssetForProjectQueryQueryVariables>;
export const CreateProjectMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProjectMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creator"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"creator"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creator"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutationMutation, CreateProjectMutationMutationVariables>;