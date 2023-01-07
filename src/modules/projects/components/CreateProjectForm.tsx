import { createSignal } from "solid-js";
import toast from "solid-toast";

import { Button, Select, Textarea, TextInput } from "../../../components";
import { supabase } from "../../../lib";
import { ProjectStatus, projectStatusOptions } from "../constant";
import { SELECT_PROJECT_WITH_MEMBER_QUERY } from "../pages/projects";
import { ProjectWithMembers } from "../type";

interface CreateProjectFormProps {
  close(): void;
  handleSetProjects: (newProject: ProjectWithMembers) => void;
}

export function CreateProjectForm(props: CreateProjectFormProps) {
  const [name, setName] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [status, setStatus] = createSignal<ProjectStatus>("draft");
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("projects")
        .insert({ name: name(), description: description(), status: status() })
        .select(SELECT_PROJECT_WITH_MEMBER_QUERY);

      if (error) {
        throw error;
      }
      toast.success("New project created");
      props.handleSetProjects(data[0] as ProjectWithMembers);
      props.close();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
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
        <Button type="submit" loading={loading()}>
          Submit
        </Button>
      </div>
    </form>
  );
}
