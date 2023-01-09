import { createSignal } from "solid-js";

import { Button, Select, Textarea, TextInput } from "../../../components";
import { projectStatusOptions } from "../constant";
import { useCreateProject } from "../services";
import { ProjectStatus } from "../type";

interface CreateProjectFormProps {
  close(): void;
}

export function CreateProjectForm(props: CreateProjectFormProps) {
  const [name, setName] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [status, setStatus] = createSignal<ProjectStatus>("draft");

  const mutation = useCreateProject({ onSuccess: () => props.close() });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    mutation.mutate({
      name: name(),
      description: description(),
      status: status(),
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
          Submit
        </Button>
      </div>
    </form>
  );
}
