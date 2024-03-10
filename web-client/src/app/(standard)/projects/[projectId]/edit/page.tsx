"use client";

import { useParams } from "next/navigation";
import { Update3DAssetForm } from "./Update3DAssetForm";
import { gql } from "@generated/gql";
import { useQuery } from "@apollo/client";
import { Loader } from "@components/Loader";
import { UpdateProjectDataForm } from "./UpdateProjectDataForm";
import LLMChat from "@components/LLMChat";

const PROJECT_QUERY = gql(`
query GetProjectQuery($id: String!) {
    project(id: $id) {
        id
        title
        meshId
        creator
        backstoryPages
    }
}`);

export default function EditProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const result = useQuery(PROJECT_QUERY, {
    variables: {
      id: projectId,
    },
  });

  if (result.loading) return <Loader />;

  const project = result.data!.project;

  return (
    <div>
      <section className="py-8">
        <h1 className="text-center text-3xl">Character Builder</h1>
      </section>

      <section className="py-8">
        <h2 className="text-center text-xl">Generate a 3D model</h2>

        <Update3DAssetForm
          project={project}
          className="w-full mx-auto max-w-3xl mt-4"
          onProjectUpdate={() => result.refetch()}
        />
      </section>

      <div className="h-[1px] bg-base-300 mx-auto w-full max-w-7xl"></div>

      <section className="py-8">
        <h2 className="text-center text-xl">Backstory</h2>

        <UpdateProjectDataForm
          project={project}
          className="w-full max-w-3xl mx-auto"
        />
      </section>

      {/* <section>
        <LLMChat />
      </section> */}
    </div>
  );
}
