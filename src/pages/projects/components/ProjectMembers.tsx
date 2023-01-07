import { A } from "@solidjs/router";
import { For } from "solid-js";

import { Avatar } from "../../../components";
import { ProjectWithMembers } from "../type";

interface ProjectMembersProps {
  project: ProjectWithMembers;
}

export function ProjectMembers(props: ProjectMembersProps) {
  return (
    <div>
      <h2 class="text-sm font-medium text-gray-500">Members</h2>
      <ul role="list" class="mt-3 space-y-3">
        <For each={props.project.members}>
          {(member) => (
            <li class="flex justify-start">
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
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
