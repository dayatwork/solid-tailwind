import {
  HiOutlineExclamationCircle,
  HiOutlineLockClosed,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "solid-icons/hi";
import { Show } from "solid-js";

import { Dot, Loader, Tooltip } from "../../../components";
import { formatTime } from "../../../utils/date";
import { TrackerWithTask } from "../services";

interface TrackerItemProps {
  tracker: TrackerWithTask;
  onEdit: (tracker: TrackerWithTask) => void;
  onDelete: (id: string) => void;
  onSelectItem: (id: string) => void;
  selectedItem: string;
  deleting?: boolean;
}

function TrackerItem(props: TrackerItemProps) {
  return (
    <li class="border-t border-gray-200 flex gap-2 items-center">
      <div class="flex-1 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
        <div class="flex items-center space-x-3 lg:pl-2">
          <Dot color={props.tracker.is_lock ? "green" : "purple"} />
          <p class="truncate hover:text-gray-600">
            <span>{props.tracker.note}</span>
          </p>
        </div>
      </div>
      <div class="w-60 hidden whitespace-nowrap px-2 py-3 text-sm text-gray-900 md:table-cell">
        <p class="font-medium truncate">{props.tracker.task.task}</p>
        <p class="text-gray-500">(Target: {props.tracker.task.target}%)</p>
      </div>
      <div class="w-20 hidden whitespace-nowrap px-4 py-3 mr-4 text-lg font-medium text-green-600 md:table-cell">
        +{props.tracker.value}%
      </div>
      <div class="hidden whitespace-nowrap px-2 py-3 text-lg font-medium font-mono text-gray-900 md:table-cell">
        {formatTime(props.tracker.start_at)}
      </div>
      <span class="font-bold">-</span>
      <div class="hidden whitespace-nowrap px-2 py-3 text-lg font-medium font-mono text-gray-900 md:table-cell">
        {formatTime(props.tracker.end_at)}
      </div>
      <div class="whitespace-nowrap px-6 py-3 text-sm font-medium w-28 flex justify-end">
        <Show
          when={!props.tracker.is_lock}
          fallback={
            <span class="w-8 h-8 flex items-center justify-center  text-green-700 rounded-md">
              <HiOutlineLockClosed size={20} />
            </span>
          }
        >
          <div class="flex gap-2 justify-end">
            <Tooltip label="Edit">
              <button
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md w-8 h-8 flex items-center justify-center"
                onClick={() => props.onEdit(props.tracker)}
              >
                <span class="sr-only">Edit</span>
                <HiOutlinePencilAlt size={18} />
              </button>
            </Tooltip>
            <Show
              when={props.selectedItem !== props.tracker.id}
              fallback={
                <Tooltip label="Click again to confirm delete.">
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white rounded-md w-8 h-8 flex items-center justify-center"
                    onClick={() => props.onDelete(props.tracker.id)}
                    disabled={props.deleting}
                  >
                    <span class="sr-only">Confirm Delete</span>
                    <Show
                      when={
                        props.deleting &&
                        props.selectedItem === props.tracker.id
                      }
                      fallback={<HiOutlineExclamationCircle size={18} />}
                    >
                      <Loader />
                    </Show>
                  </button>
                </Tooltip>
              }
            >
              <Tooltip label="Delete">
                <button
                  class="bg-red-50 hover:bg-red-100 text-red-600 rounded-md w-8 h-8 flex items-center justify-center disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-400"
                  onClick={() => props.onSelectItem(props.tracker.id)}
                  disabled={props.deleting}
                >
                  <span class="sr-only">Delete</span>
                  <Show
                    when={
                      props.deleting && props.selectedItem === props.tracker.id
                    }
                    fallback={<HiOutlineTrash size={18} />}
                  >
                    <Loader />
                  </Show>
                </button>
              </Tooltip>
            </Show>
          </div>
        </Show>
      </div>
    </li>
  );
}

export default TrackerItem;
