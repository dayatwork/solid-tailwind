import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import { Badge, Dot } from "../../../components";
import { formatDate } from "../../../utils/date";
import { WORKPLAN_STATUS } from "../constant";
import { Workplan } from "../services";

interface WorkplanTableProps {
  workplans: Workplan[];
  loading?: boolean;
}

export function WorkplanTable(props: WorkplanTableProps) {
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
                <span class="lg:pl-2">Work Plan</span>
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Week
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Year
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Status
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
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
              <For each={props.workplans}>
                {(workplan) => (
                  <tr>
                    <td class="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                      <div class="flex items-center space-x-3 lg:pl-2">
                        <Dot color={WORKPLAN_STATUS[workplan.status].color} />
                        <A
                          href={workplan.id}
                          class="truncate hover:text-gray-600"
                        >
                          <span>
                            {workplan.plan}
                            <span class="ml-1 font-normal text-gray-500">
                              ({workplan.description})
                            </span>
                          </span>
                        </A>
                      </div>
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                      Week {workplan.week}
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                      {workplan.year}
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                      <Badge color={WORKPLAN_STATUS[workplan.status].color}>
                        {workplan.status}
                      </Badge>
                    </td>
                    <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                      {formatDate(workplan.updated_at)}
                    </td>
                    <td class="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                      <A
                        href={workplan.id}
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
