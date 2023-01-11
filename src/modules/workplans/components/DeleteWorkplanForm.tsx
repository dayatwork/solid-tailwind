import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

import { Button } from "../../../components";
import { useDeleteWorkplan, Workplan } from "../services";

interface DeleteWorkplanFormProps {
  workplan: Workplan;
}

export function DeleteWorkplanForm(props: DeleteWorkplanFormProps) {
  const navigate = useNavigate();
  const [confirmationText, setConfirmationText] = createSignal("");
  const confirm = () => confirmationText() == props.workplan.plan;

  const mutation = useDeleteWorkplan({
    onSuccess: () => navigate("/workplans"),
  });

  const handleDelete = async (e: Event) => {
    e.preventDefault();

    mutation.mutate(props.workplan.id);
  };

  return (
    <div>
      <h3 class="text-sm font-medium">Delete Workplan</h3>
      <p class="mt-1 text-sm">
        Type <span class="text-red-500 font-medium">{props.workplan.plan}</span>{" "}
        to confirm.
      </p>
      <form onSubmit={handleDelete}>
        <input
          aria-label="Confirmation Text"
          type="text"
          class="mt-0.5 mb-2.5 block rounded-md sm:text-sm focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 w-full max-w-[300px]"
          value={confirmationText()}
          onInput={(e) => setConfirmationText(e.currentTarget.value)}
        />
        <Button
          variant="danger"
          type="submit"
          disabled={!confirm()}
          loading={mutation.isLoading}
        >
          Delete
        </Button>
      </form>
    </div>
  );
}
