import { HiSolidChevronLeft, HiSolidChevronRight } from "solid-icons/hi";
import { Show } from "solid-js";

import { Select } from "../selects";

interface SimplePaginationProps {
  limit: string;
  page: string;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  onChangeLimit: (limit: string) => void;
  loading: boolean;
}

export function SimplePagination(props: SimplePaginationProps) {
  return (
    <Show when={!props.loading}>
      <div class="flex items-center justify-between">
        <div class="flex gap-4">
          <p class="hidden sm:block text-sm text-gray-600">
            Page <span class="font-bold">{props.page}</span> of{" "}
            <span class="font-bold">
              {Math.ceil(props.count / Number(props.limit))}
            </span>
          </p>
          <p class="sm:ml-4 text-sm font-medium text-gray-500">
            <span class="text-purple-600">{props.count}</span> records
          </p>
        </div>
        <div class="flex items-end gap-2">
          <Select
            name="show"
            value={props.limit}
            onChange={props.onChangeLimit}
            options={["5", "10", "25", "50"].map((v) => ({
              label: `Show ${v}`,
              value: v,
            }))}
            width={120}
          />
          <button
            onClick={props.onPrev}
            class="pr-4 pl-2 sm:py-2 py-2.5 bg-white hover:bg-gray-50 rounded-md border border-gray-300 text-gray-700 font-medium text-sm flex items-center gap-0.5 outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100"
            disabled={props.page === "1"}
          >
            <HiSolidChevronLeft size={18} />
            <span>Prev</span>
          </button>
          <p class="sm:py-2 py-2.5 sm:px-3.5 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium">
            {props.page}
          </p>
          <button
            onClick={props.onNext}
            class="pl-4 pr-2 sm:py-2 py-2.5  bg-white hover:bg-gray-50 rounded-md border border-gray-300 text-gray-700 font-medium text-sm flex items-center gap-0.5 outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100"
            disabled={
              props.page ===
              String(Math.ceil(props.count / Number(props.limit)))
            }
          >
            <span>Next</span>
            <HiSolidChevronRight size={18} />
          </button>
        </div>
      </div>
    </Show>
  );
}
