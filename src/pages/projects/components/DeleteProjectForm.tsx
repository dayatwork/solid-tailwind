import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import toast from "solid-toast";

import { supabase } from "../../../lib";
import { ProjectWithMembers } from "../type";

interface DeleteProjectFormProps {
  project: ProjectWithMembers;
}

export function DeleteProjectForm(props: DeleteProjectFormProps) {
  const navigate = useNavigate();
  const [confirmationText, setConfirmationText] = createSignal("");
  const [deleting, setDeleting] = createSignal(false);
  const confirm = () => confirmationText() == props.project.name;

  const handleDelete = async (e: Event) => {
    e.preventDefault();

    try {
      setDeleting(true);

      let { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", props.project.id);

      if (error) {
        throw error;
      }
      toast.success("Project deleted");
      navigate("/projects");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h3 class="text-sm font-medium">Delete Project</h3>
      <p class="mt-1 text-sm">
        Type <span class="text-red-500 font-medium">{props.project.name}</span>{" "}
        to confirm.
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
          disabled={!confirm() || deleting()}
          class="mt-2 bg-red-500 text-sm font-medium text-white py-2 px-4 rounded-md disabled:bg-red-200 disabled:cursor-not-allowed"
        >
          {deleting() ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
