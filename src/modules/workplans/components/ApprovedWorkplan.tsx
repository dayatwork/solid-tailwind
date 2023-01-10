import { A } from "@solidjs/router";
import { HiSolidChevronRight } from "solid-icons/hi";
import { JSX, Match, Show, Switch } from "solid-js";
import { For } from "solid-js";

import { AppColor, CardStatus } from "../../../components";
import { WORKPLAN_STATUS } from "../constant";
import { Workplan } from "../services";

interface ApprovedWorkplansProps {
  workplans: Workplan[];
  loading?: boolean;
}

export function ApprovedWorkplans(props: ApprovedWorkplansProps) {
  return (
    <div class="mt-6 px-4 sm:px-6 lg:px-8">
      <h2 class="text-sm font-medium text-gray-900">Approved Work Plans</h2>
      <ul
        role="list"
        class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
      >
        <Show
          when={!props.loading}
          fallback={
            <For each={[1, 2, 3]}>
              {() => (
                <div class="w-full h-16 bg-gray-300 animate-pulse rounded-md shadow-sm" />
              )}
            </For>
          }
        >
          <For each={props.workplans}>
            {(workplan) => (
              <li class="relative col-span-1 flex rounded-md shadow-sm">
                <CardStatus color={WORKPLAN_STATUS[workplan.status].color}>
                  {workplan.status}
                </CardStatus>
                <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                  <div class="flex-1 truncate px-4 py-2 text-sm">
                    <a
                      href="#"
                      class="font-medium text-gray-900 hover:text-gray-600"
                    >
                      {workplan.plan}
                    </a>
                    <p class="text-gray-500">
                      Week {workplan.week} ({workplan.year})
                    </p>
                  </div>
                  <A
                    href={workplan.id}
                    class="text-gray-500 p-2 bg-gray-100 mr-3 rounded-full hover:shadow hover:bg-gray-200 transition hover:translate-x-0.5"
                  >
                    <HiSolidChevronRight size={18} />
                  </A>
                </div>
              </li>
            )}
          </For>
        </Show>
      </ul>
    </div>
  );
}
