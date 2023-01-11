import { HiSolidCheck } from "solid-icons/hi";
import { createSignal, For, onCleanup, Show } from "solid-js";
import { formatDate, formatTime } from "../../../utils/date";
import { Timer } from "../../trackers/components/Timer";
import { calculateTotalDuration, displayDuration } from "../../trackers/helper";
import { Tracker } from "../../trackers/services";

function Line() {
  return (
    <span
      class="absolute top-2 left-3 -ml-px h-full w-0.5 bg-gray-200"
      aria-hidden="true"
    ></span>
  );
}

interface ItemProps {
  tracker: Tracker;
}

function Item(props: ItemProps) {
  return (
    <div class="relative flex space-x-3">
      <div>
        <Show
          when={props.tracker.end_at}
          fallback={
            <span class="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white text-white">
              <span class="w-4 h-4 rounded-full bg-red-500 animate-pulse"></span>
            </span>
          }
        >
          <span class="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white text-white">
            <HiSolidCheck size={18} />
          </span>
        </Show>
      </div>
      <div class="flex min-w-0 flex-1 items-center justify-between space-x-4">
        <div class="flex items-center">
          <p
            class={`text-sm text-gray-500 ${props.tracker.note ? "mr-4" : ""}`}
          >
            {props.tracker.note}
          </p>{" "}
          <p class="text-green-600">+{props.tracker.value || 0}%</p>
        </div>
        <Show
          when={props.tracker.end_at}
          fallback={<Timer startAt={props.tracker.start_at} size="small" />}
        >
          <div class="whitespace-nowrap text-right text-sm text-gray-500 space-x-2">
            <span>{formatDate(props.tracker.start_at)}</span>
            <span class="space-x-1">
              <time datetime={props.tracker.start_at}>
                {formatTime(props.tracker.start_at)}
              </time>
              <span>-</span>
              <time datetime={props.tracker.end_at}>
                {formatTime(props.tracker.end_at)}
              </time>
            </span>
            <span>|</span>
            <Show
              when={props.tracker.end_at}
              fallback={<p class="text-sm text-red-600">Running...</p>}
            >
              <span class="text-sm font-mono text-green-600 font-medium">
                {displayDuration(
                  new Date(props.tracker.end_at).getTime() -
                    new Date(props.tracker.start_at).getTime()
                )}
              </span>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}

interface TaskTrackersProps {
  trackers: Tracker[];
}

export function TaskTrackers(props: TaskTrackersProps) {
  const totalDurationEndedTrackers = () =>
    calculateTotalDuration(props.trackers.filter((t) => !!t.end_at));
  const runningTrackers = () => props.trackers.filter((t) => !t.end_at);

  return (
    <div class="flow-root">
      <ul role="list" class="-mb-8">
        <For each={props.trackers}>
          {(tracker, index) => (
            <Show
              when={props.trackers.length - 1 !== index()}
              fallback={
                <li>
                  <div class="relative pb-8">
                    <Item tracker={tracker} />
                  </div>
                </li>
              }
            >
              <li>
                <div class="relative pb-8">
                  <Line />
                  <Item tracker={tracker} />
                </div>
              </li>
            </Show>
          )}
        </For>
      </ul>
      <Show when={!runningTrackers().length}>
        <p class="mt-8 text-right font-mono text-green-600 font-semibold">
          Total: {props.trackers.reduce((acc, curr) => curr.value + acc, 0)}% (
          {displayDuration(totalDurationEndedTrackers())})
        </p>
      </Show>
    </div>
  );
}
