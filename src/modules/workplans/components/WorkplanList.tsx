import { A } from "@solidjs/router";
import { HiSolidChevronRight } from "solid-icons/hi";
import { For, Show } from "solid-js";

import { Dot } from "../../../components";
import { WORKPLAN_STATUS } from "../constant";
import { Workplan } from "../services";

interface WorkplanListProps {
  workplans: Workplan[];
  loading?: boolean;
}

export function WorkplanList(props: WorkplanListProps) {
  return (
    <div class="mt-10 sm:hidden">
      <div class="px-4 sm:px-6">
        <h2 class="text-sm font-medium text-gray-900">Work Plans</h2>
      </div>
      <ul
        role="list"
        class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
      >
        <Show when={!props.loading}>
          <For each={props.workplans}>
            {(workplan) => (
              <li>
                <A
                  href={workplan.id}
                  class="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                >
                  <span class="flex items-center space-x-3 truncate">
                    <Dot color={WORKPLAN_STATUS[workplan.status].color} />
                    <span class="truncate text-sm font-medium leading-6">
                      {workplan.plan}
                      <span class="ml-1 truncate font-normal text-gray-500">
                        {workplan.description}
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
