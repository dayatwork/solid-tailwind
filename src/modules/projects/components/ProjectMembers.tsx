import { A } from "@solidjs/router";
import { HiSolidPencil, HiSolidTrash, HiSolidX } from "solid-icons/hi";
import { createSignal, For, Match, Show, Switch } from "solid-js";

import { Avatar, Dialog } from "../../../components";
import { useDeleteProjectMember } from "../services";
import { ProjectWithMembers } from "../type";
import { AddProjectMemberForm } from "./AddProjectMemberForm";

interface ProjectMembersProps {
  project: ProjectWithMembers;
}

export function ProjectMembers(props: ProjectMembersProps) {
  const [isEditMode, setIsEditMode] = createSignal(false);
  const [deletingItem, setDeletingItem] = createSignal("");

  const mutation = useDeleteProjectMember();

  const openEditMode = () => {
    setIsEditMode(true);
  };
  const closeEditMode = () => {
    setIsEditMode(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingItem(id);
    mutation.mutate(id, {
      onSuccess: () => {
        setIsEditMode(false);
        setDeletingItem("");
      },
      onError: () => {
        setDeletingItem("");
      },
    });
  };

  return (
    <div>
      <div class="flex items-center space-x-4 justify-between">
        <h2 class="text-sm font-medium text-gray-500">Members</h2>
        <Switch>
          <Match when={!isEditMode()}>
            <button
              onClick={openEditMode}
              class="flex items-center space-x-1 text-purple-500 font-medium hover:text-purple-700"
            >
              <HiSolidPencil size={14} />
              <span class="text-sm">Open Edit Mode</span>
            </button>
          </Match>
          <Match when={isEditMode()}>
            <button
              onClick={closeEditMode}
              class="flex items-center space-x-1 text-purple-500 font-medium hover:text-purple-700"
            >
              <HiSolidX size={14} />
              <span class="text-sm">Close Edit Mode</span>
            </button>
          </Match>
        </Switch>
      </div>
      <ul role="list" class="mt-3 space-y-3 mb-3">
        <For each={props.project.members}>
          {(member) => (
            <li class="flex justify-between">
              <A
                href={`/users/${member.member_id}`}
                class="flex items-center space-x-3"
              >
                <div class="flex-shrink-0">
                  <Avatar avatarPath={member.member.avatar_url} />
                </div>
                <div class="text-sm font-medium text-gray-900">
                  {member.member.full_name}{" "}
                  <span class="ml-1 text-gray-500 font-normal">
                    ({member.position})
                  </span>
                </div>
              </A>
              <Show when={isEditMode()}>
                <button
                  onClick={() => handleDelete(member.id)}
                  class="text-red-500  bg-red-50 hover:bg-red-200 rounded-md w-7 h-7 flex items-center justify-center disabled:bg-gray-50 disabled:text-gray-400 cursor-not-allowed"
                  disabled={Boolean(deletingItem())}
                >
                  <Show
                    when={deletingItem() !== member.id}
                    fallback={
                      <div class="w-5 h-5 border-4 border-t-red-600 border-b-red-200 rounded-full animate-spin" />
                    }
                  >
                    <HiSolidTrash />
                  </Show>
                </button>
              </Show>
            </li>
          )}
        </For>
      </ul>
      <Dialog
        trigger={
          <div class="flex items-center space-x-2.5">
            <div class="w-[30px] h-[30px] rounded-full bg-gray-300"></div>
            <span>+ Add Member</span>
          </div>
        }
        triggerClass="text-sm font-medium text-purple-500 hover:text-purple-700"
        title="Add Member"
      >
        {(api) => (
          <AddProjectMemberForm
            close={api.close}
            projectId={props.project.id}
            members={props.project.members}
          />
        )}
      </Dialog>
    </div>
  );
}
