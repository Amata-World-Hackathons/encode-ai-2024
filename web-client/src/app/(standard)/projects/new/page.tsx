"use client";

import { useMutation } from "@apollo/client";
import { FullPageLoader } from "@components/Loader";
import { gql } from "@generated/gql";
import { useCreator } from "@hooks/useCreator";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const CREATE_PROJECT_MUTATION = gql(`
mutation CreateProjectMutation($creator: String!) {
    project {
        create(input: { creator: $creator}) {
            id
        }
    }
}`);

export default function NewProjectPage() {
  const router = useRouter();
  const creatorId = useCreator();

  const [mutate] = useMutation(CREATE_PROJECT_MUTATION);

  const mutateRef = useRef(mutate);
  mutateRef.current = mutate;

  const routerRef = useRef(router);
  routerRef.current = router;

  const didCallRef = useRef(false);

  useEffect(() => {
    if (didCallRef.current) return;

    didCallRef.current = true;
    mutateRef
      .current({
        variables: {
          creator: creatorId,
        },
      })
      .then((data) => {
        const projectId = data.data?.project.create.id;

        if (projectId) {
          routerRef.current.replace(`/projects/${projectId}/edit`);
        }
      });
  }, []);

  return <FullPageLoader />;
}
