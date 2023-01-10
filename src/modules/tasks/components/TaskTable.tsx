import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import { format } from "timeago.js";

import { Avatar, Badge, Dot } from "../../../components";
import { TASK_STATUS } from "../constant";
import { TaskWithAssignor } from "../services";

interface TaskTableProps {
  tasks: TaskWithAssignor[];
  loading?: boolean;
}

export function TaskTable(props: TaskTableProps) {
  return (
    <div class="hidden sm:block">
      <div class="inline-block min-w-full border-b border-gray-200 align-middle">
        <table class="min-w-full">
          <thead>
            <tr class="border-t border-gray-200">
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                <span class="lg:pl-2">Task</span>
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Target
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Assignor
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Status
              </th>
              <th
                class="whitespace-nowrap border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Last updated
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              ></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <Show when={!props.loading}>
              <For each={props.tasks}>
                {(task) => (
                  <tr>
                    <td class="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                      <div class="flex items-center space-x-3 lg:pl-2">
                        <Dot color={TASK_STATUS[task.status].color} />
                        <A href={task.id} class="truncate hover:text-gray-600">
                          <span>
                            {task.task}
                            <span class="ml-1 font-normal text-gray-500">
                              ({task.description})
                            </span>
                          </span>
                        </A>
                        <Show
                          when={task.workplan_id}
                          fallback={<Badge color="gray">Unplanned</Badge>}
                        >
                          <A href={`/workplans/${task.workplan_id}`}>
                            <Badge color="green">Planned</Badge>
                          </A>
                        </Show>
                      </div>
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-sm text-gray-500 md:table-cell">
                      {task.target}%
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-sm text-gray-500 md:table-cell">
                      {task.assignor ? (
                        <div class="flex items-center space-x-2">
                          <Avatar avatarPath={task.assignor.avatar_url} />
                          <div>
                            <A
                              href={task.assignor.id}
                              class="text-xs font-medium text-gray-900 hover:text-purple-600"
                            >
                              {task.assignor.full_name}
                            </A>
                            <p class="text-xs">
                              {task.assignor.employee_number}
                            </p>
                          </div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                      <Badge color={TASK_STATUS[task.status].color}>
                        {task.status}
                      </Badge>
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                      {format(task.updated_at)}
                    </td>
                    <td class="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                      <A
                        href={task.id}
                        class="text-purple-600 hover:text-purple-900"
                      >
                        Details
                      </A>
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
