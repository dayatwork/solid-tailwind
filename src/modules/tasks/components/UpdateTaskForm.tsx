import { Session } from "@supabase/supabase-js";
import { createSignal } from "solid-js";

import {
  Button,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "../../../components";
import { useAuth } from "../../../contexts";
import { taskStatusOptions } from "../constant";
import { TaskDetail, useUpdateTask } from "../services";
import { TaskStatus } from "../type";

interface UpdateTaskFormProps {
  close(): void;
  defaultTask: TaskDetail;
}

export function UpdateTaskForm(props: UpdateTaskFormProps) {
  const [task, setTask] = createSignal(props.defaultTask.task);
  const [description, setDescription] = createSignal(
    props.defaultTask.description
  );
  const [status, setStatus] = createSignal<TaskStatus>(
    props.defaultTask.status
  );
  const [target, setTarget] = createSignal(props.defaultTask.target);

  const [session] = useAuth();
  const mutation = useUpdateTask({ onSuccess: () => props.close() });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!session()) return;

    mutation.mutate({
      id: props.defaultTask.id,
      inputs: {
        task: task(),
        description: description(),
        status: status(),
        target: target(),
        assignee_id: (session() as Session).user.id,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="space-y-4">
        <TextInput
          label="Task"
          name="task"
          required
          value={task()}
          onChange={setTask}
        />
        <Textarea
          label="Description"
          name="description"
          withOptionalLabel
          value={description()}
          onChange={setDescription}
        />
        <div class="flex items-center space-x-2">
          <NumberInput
            label="Target"
            value={target()}
            onChange={setTarget}
            min={0}
            max={100}
            width={100}
          />
          <span class="mt-5 text-lg font-semibold">%</span>
        </div>
        <Select
          label="Status"
          name="status"
          options={taskStatusOptions}
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
