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
import { useCreateTask } from "../services";
import { TaskStatus } from "../type";

interface CreateTaskFormProps {
  close(): void;
}

export function CreateTaskForm(props: CreateTaskFormProps) {
  const [task, setTask] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [status, setStatus] = createSignal<TaskStatus>("assigned");
  const [target, setTarget] = createSignal(100);

  const [session] = useAuth();
  const mutation = useCreateTask({ onSuccess: () => props.close() });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!session()) return;

    mutation.mutate({
      task: task(),
      description: description(),
      status: status(),
      target: target(),
      assignee_id: (session() as Session).user.id,
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
          Submit
        </Button>
      </div>
    </form>
  );
}
