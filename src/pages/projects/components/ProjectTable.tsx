import { For, Show } from "solid-js";

import { Avatar, Badge, Tooltip } from "../../../components";
import { TableSkeleton } from "../../../components";
import { PROJECT_STATUS_COLOR } from "../constant";
import { ProjectWithMembers } from "../type";

interface ProjectTableProps {
  projects: ProjectWithMembers[];
  loading?: boolean;
}

export function ProjectTable(props: ProjectTableProps) {
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
                <span class="lg:pl-2">Project</span>
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Members
              </th>
              <th
                class="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                scope="col"
              >
                Status
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
              <For each={props.projects}>
                {(project) => (
                  <tr>
                    <td class="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                      <div class="flex items-center space-x-3 lg:pl-2">
                        <div
                          class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"
                          aria-hidden="true"
                        ></div>
                        <a href="#" class="truncate hover:text-gray-600">
                          <span>
                            {project.name}
                            <span class="ml-2 font-normal text-gray-500">
                              ({project.description})
                            </span>
                          </span>
                        </a>
                      </div>
                    </td>
                    <td class="px-6 py-3 text-sm font-medium text-gray-500">
                      <div class="flex items-center space-x-2">
                        <div class="flex flex-shrink-0 -space-x-1">
                          <For each={project.members}>
                            {(member) => (
                              <Tooltip label={member.member.full_name}>
                                <Avatar
                                  avatarPath={member.member.avatar_url}
                                  alt={member.member.full_name}
                                />
                              </Tooltip>
                            )}
                          </For>
                        </div>

                        {/* <span class="flex-shrink-0 text-xs font-medium leading-5">
                          +8
                        </span> */}
                      </div>
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                      <Badge color={PROJECT_STATUS_COLOR[project.status]}>
                        {project.status}
                      </Badge>
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
