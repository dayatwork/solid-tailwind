import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

import { useDeleteTask, Task } from "../services";

interface DeleteTaskFormProps {
  task: Task;
}

export function DeleteTaskForm(props: DeleteTaskFormProps) {
  const navigate = useNavigate();
  const [confirmationText, setConfirmationText] = createSignal("");
  const confirm = () => confirmationText() == props.task.task;

  const mutation = useDeleteTask({
    onSuccess: () => navigate("/tasks"),
  });

  const handleDelete = async (e: Event) => {
    e.preventDefault();

    mutation.mutate(props.task.id);
  };

  return (
    <div>
      <h3 class="text-sm font-medium">Delete Task</h3>
      <p class="mt-1 text-sm">
        Type <span class="text-red-500 font-medium">{props.task.task}</span> to
        confirm.
      </p>
      <form onSubmit={handleDelete}>
        <input
          aria-label="Confirmation Text"
          type="text"
          class="mt-0.5 block rounded-md sm:text-sm focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 w-full max-w-[300px]"
          value={confirmationText()}
          onInput={(e) => setConfirmationText(e.currentTarget.value)}
        />
        <button
          type="submit"
          disabled={!confirm() || mutation.isLoading}
          class="mt-2 bg-red-500 text-sm font-medium text-white py-2 px-4 rounded-md disabled:bg-red-200 disabled:cursor-not-allowed"
        >
          {mutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
