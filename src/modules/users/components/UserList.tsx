import { A } from "@solidjs/router";
import { HiSolidChevronRight } from "solid-icons/hi";
import { For, Show } from "solid-js";

import { User } from "../type";

interface UserListProps {
  users: User[];
  loading?: boolean;
}

export function UserList(props: UserListProps) {
  return (
    <div class="mt-10 sm:hidden">
      <div class="px-4 sm:px-6">
        <h2 class="text-sm font-medium text-gray-900">Users</h2>
      </div>
      <ul
        role="list"
        class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
      >
        <Show when={!props.loading}>
          <For each={props.users}>
            {(user) => (
              <li>
                <A
                  href={user.id}
                  class="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                >
                  <span class="flex items-center space-x-3 truncate">
                    <span
                      class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-pink-600"
                      aria-hidden="true"
                    ></span>
                    <span class="truncate text-sm font-medium leading-6">
                      {user.full_name}
                      <span class="ml-1 truncate font-normal text-gray-500">
                        ({user.email})
                      </span>
                    </span>
                  </span>

                  <span class="ml-2 text-gray-400 group-hover:text-gray-500">
                    <HiSolidChevronRight size={20} />
                  </span>
                </A>
              </li>
            )}
          </For>
        </Show>
      </ul>
    </div>
  );
}
