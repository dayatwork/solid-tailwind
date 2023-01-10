import { For, Show } from "solid-js";
import { Avatar, TableSkeleton } from "../../../components";

import { User } from "../type";

interface UserTableProps {
  users: User[];
  loading?: boolean;
}

export function UserTable(props: UserTableProps) {
  return (
    <div class="mt-8 hidden sm:block">
      <div class="inline-block min-w-full border-b border-gray-200 align-middle">
        <table class="min-w-full">
          <thead>
            <tr class="border-t border-gray-200">
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                <span class="lg:pl-2">User</span>
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
                scope="col"
              >
                Employee Number
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
                scope="col"
              >
                Registered At
              </th>
              <th
                class="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:table-cell"
                scope="col"
              >
                Last Sign In
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              ></th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            <Show
              when={!props.loading}
              fallback={<TableSkeleton rows={3} columns={5} />}
            >
              <For each={props.users}>
                {(user) => (
                  <tr>
                    <td class="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                      <div class="flex items-center space-x-3 lg:pl-2">
                        <div
                          class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"
                          aria-hidden="true"
                        ></div>
                        <Avatar
                          avatarPath={user.avatar_url}
                          alt={user.full_name}
                        />
                        <a href="#" class="truncate hover:text-gray-600">
                          <span>
                            {user.full_name}
                            <span class="ml-1 font-normal text-gray-500">
                              ({user.email})
                            </span>
                          </span>
                        </a>
                      </div>
                    </td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.employee_number}
                    </td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.registered_at).toLocaleDateString("id-ID")}
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-sm text-gray-500 md:table-cell">
                      {user.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleString("id-ID")
                        : ""}
                    </td>
                    <td class="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                      <a href="#" class="text-purple-600 hover:text-purple-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                )}
              </For>
            </Show>
          </tbody>
        </table>
      </div>
    </div>
  );
}
