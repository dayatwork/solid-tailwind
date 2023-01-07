import { A } from "@solidjs/router";
import { HiSolidPencil, HiSolidTrash, HiSolidX } from "solid-icons/hi";
import { createSignal, For, Match, Show, Switch } from "solid-js";
import toast from "solid-toast";

import { Avatar, Dialog } from "../../../components";
import { supabase } from "../../../lib";
import { MemberWithUser, ProjectWithMembers } from "../type";
import { AddProjectMemberForm } from "./AddProjectMemberForm";

interface ProjectMembersProps {
  project: ProjectWithMembers;
}

export function ProjectMembers(props: ProjectMembersProps) {
  const [isEditMode, setIsEditMode] = createSignal(false);
  const [members, setMembers] = createSignal<MemberWithUser[]>(
    props.project.members
  );
  const [deletingItem, setDeletingItem] = createSignal("");

  const handleSetMember = (member: MemberWithUser) => {
    setMembers([...members(), member]);
  };

  const openEditMode = () => {
    setIsEditMode(true);
  };
  const closeEditMode = () => {
    setIsEditMode(false);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingItem(id);
      const { error } = await supabase
        .from("project_members")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setMembers([...members().filter((m) => m.id !== id)]);
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setDeletingItem("");
    }
  };

  return (
    <div>
      <div class="flex items-center space-x-4">
        <h2 class="text-sm font-medium text-gray-500">Members</h2>
        <Switch>
          <Match when={!isEditMode()}>
            <button
              onClick={openEditMode}
              class="flex items-center space-x-1 text-purple-500 font-medium hover:text-purple-700"
            >
              <HiSolidPencil />
              <span class="text-sm">Open Edit Mode</span>
            </button>
          </Match>
          <Match when={isEditMode()}>
            <button
              onClick={closeEditMode}
              class="flex items-center space-x-1 text-purple-500 font-medium hover:text-purple-700"
            >
              <HiSolidX />
              <span class="text-sm">Close Edit Mode</span>
            </button>
          </Match>
        </Switch>
      </div>
      <ul role="list" class="mt-3 space-y-3 mb-3">
        <For each={members()}>
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
        trigger="+ Add Member"
        triggerClass="text-sm font-medium text-purple-500 hover:text-purple-700"
        title="Add Member"
      >
        {(api) => (
          <AddProjectMemberForm
            close={api.close}
            handleSetMembers={handleSetMember}
            projectId={props.project.id}
            members={members()}
          />
        )}
      </Dialog>
    </div>
  );
}
