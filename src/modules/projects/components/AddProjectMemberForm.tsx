import { createSignal } from "solid-js";

import { Button, Select, TextInput } from "../../../components";
import { useUsersDropdown } from "../../users/services";
import { useAddProjectMember } from "../services";
import { MemberWithUser } from "../type";

interface AddProjectMemberFormProps {
  close(): void;
  projectId: string;
  members: MemberWithUser[];
}

export function AddProjectMemberForm(props: AddProjectMemberFormProps) {
  const [memberId, setMemberId] = createSignal("");
  const [position, setPosition] = createSignal("");

  const query = useUsersDropdown();
  const mutation = useAddProjectMember({ onSuccess: () => props.close() });

  const filteredEmployeeOptions = () =>
    query.data?.filter(
      (emp) => !props.members.map((m) => m.member_id).includes(emp.value)
    ) || [];

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    mutation.mutate({
      project_id: props.projectId,
      member_id: memberId(),
      position: position(),
    });
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
        <Button type="submit" loading={mutation.isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}
