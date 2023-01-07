import { createSignal } from "solid-js";

import { Button, Select, Textarea, TextInput } from "../../../components";
import { ProjectStatus, projectStatusOptions } from "../constant";
import { useUpdateProject } from "../services";
import { ProjectWithMembers } from "../type";

interface UpdateProjectFormProps {
  close(): void;
  defaultProject: ProjectWithMembers;
}

export function UpdateProjectForm(props: UpdateProjectFormProps) {
  const [name, setName] = createSignal(props.defaultProject.name);
  const [description, setDescription] = createSignal(
    props.defaultProject.description
  );
  const [status, setStatus] = createSignal<ProjectStatus>(
    props.defaultProject.status
  );

  const mutation = useUpdateProject({ onSuccess: () => props.close() });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    mutation.mutate({
      id: props.defaultProject.id,
      inputs: {
        name: name(),
        status: status(),
        description: description(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="space-y-4">
        <TextInput
          label="Name"
          name="name"
          required
          value={name()}
          onChange={setName}
        />
        <Textarea
          label="Description"
          name="description"
          withOptionalLabel
          value={description()}
          onChange={setDescription}
        />
        <Select
          label="Status"
          name="status"
          options={projectStatusOptions}
          value={status()}
          onChange={setStatus}
        />
      </div>
      <div class="mt-6 flex justify-end">
        <Button type="submit" loading={mutation.isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
}
