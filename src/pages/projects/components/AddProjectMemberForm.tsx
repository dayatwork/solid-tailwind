import { createSignal, onMount } from "solid-js";
import toast from "solid-toast";

import { Button, Select, TextInput } from "../../../components";
import { supabase } from "../../../lib";
import { MemberWithUser, ProjectWithMembers } from "../type";

export const SELECT__MEMBER_QUERY =
  "*, member:member_id(id, full_name, avatar_url)";

interface AddProjectMemberFormProps {
  close(): void;
  handleSetMembers: (newProject: MemberWithUser) => void;
  projectId: string;
  members: MemberWithUser[];
}

type EmployeeOption = {
  label: string;
  value: string;
};

export function AddProjectMemberForm(props: AddProjectMemberFormProps) {
  const [memberId, setMemberId] = createSignal("");
  const [position, setPosition] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [employeeOptions, setEmployeeOptions] = createSignal<
    EmployeeOption[] | null
  >(null);

  const filteredEmployeeOptions = () =>
    employeeOptions()?.filter(
      (emp) => !props.members.map((m) => m.member_id).includes(emp.value)
    ) || [];

  onMount(() => {
    getUsers();
  });

  const getUsers = async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("profiles")
        .select("id, full_name");

      if (error) {
        throw error;
      }

      if (data) {
        setEmployeeOptions(
          data.map((item) => ({
            label: item.full_name,
            value: item.id,
          }))
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("project_members")
        .insert({
          project_id: props.projectId,
          member_id: memberId(),
          position: position(),
        })
        .select(SELECT__MEMBER_QUERY);

      if (error) {
        throw error;
      }
      toast.success("New member added");
      props.handleSetMembers(data[0] as MemberWithUser);
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
        <Select
          label="Employee"
          name="member_id"
          options={filteredEmployeeOptions()}
          value={memberId()}
          onChange={setMemberId}
        />
        <TextInput
          name="position"
          label="Position"
          value={position()}
          onChange={setPosition}
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
