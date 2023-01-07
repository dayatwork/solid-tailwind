import { createSignal } from "solid-js";
import toast from "solid-toast";

import { Button, Select, Textarea, TextInput } from "../../../components";
import { supabase } from "../../../lib";
import { ProjectStatus, projectStatusOptions } from "../constant";
import { SELECT_PROJECT_WITH_MEMBER_QUERY } from "../projects";
import { ProjectWithMembers } from "../type";

interface UpdateProjectFormProps {
  close(): void;
  defaultProject: ProjectWithMembers;
  handleSetProject: (newProject: ProjectWithMembers) => void;
}

export function UpdateProjectForm(props: UpdateProjectFormProps) {
  const [name, setName] = createSignal(props.defaultProject.name);
  const [description, setDescription] = createSignal(
    props.defaultProject.description
  );
  const [status, setStatus] = createSignal<ProjectStatus>(
    props.defaultProject.status
  );
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("projects")
        .update({ name: name(), description: description(), status: status() })
        .eq("id", props.defaultProject.id)
        .select(SELECT_PROJECT_WITH_MEMBER_QUERY)
        .single();

      if (error) {
        throw error;
      }

      toast.success("Project updated");
      props.handleSetProject(data as ProjectWithMembers);
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
          Save
        </Button>
      </div>
    </form>
  );
}
