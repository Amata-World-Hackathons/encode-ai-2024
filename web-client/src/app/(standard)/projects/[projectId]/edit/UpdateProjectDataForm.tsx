import { useMutation } from "@apollo/client";
import { gql } from "@generated/gql";
import classNames from "classnames";
import { useForm } from "react-hook-form";

const UPDATE_PROJECT_MUTATION = gql(`
mutation UpdateProjectDataMutation($projectId: String!, $title: String!, $backstoryPages: [String!]!) {
    project {
        updateProjectData(input: { projectId: $projectId, title: $title, backstoryPages: $backstoryPages }) {
            id
        }
    }
}
`);

export const UpdateProjectDataForm = ({
  project,
  className,
}: {
  project: { id: string; title: string; backstoryPages: string[] };
  className?: string;
}) => {
  const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: project.title,
      backstoryPages: project.backstoryPages[0] || "",
    },
  });

  return (
    <form
      className={classNames(className)}
      onSubmit={(ev) => {
        handleSubmit(async (data) => {
          await updateProject({
            variables: { projectId: project.id, ...data },
          });
        })(ev).catch((err) => console.error(err));
      }}
    >
      <label className="form-control">
        <div className="label">
          <span className="label-text">Character name</span>
        </div>

        <input
          type="text"
          required
          {...register("title")}
          className="input input-bordered"
        />
      </label>

      <label className="form-control mt-4">
        <div className="label">
          <span className="label-text">Backstory</span>
        </div>

        <textarea
          rows={10}
          className="textarea textarea-bordered w-full"
          {...register("backstoryPages")}
        />
      </label>

      <div className="flex flex-row justify-end mt-8">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  );
};
