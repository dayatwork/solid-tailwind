import { For, Show } from "solid-js";

import { groupTrackersByDate } from "../helper";
import { TrackerWithTask } from "../services";
import GroupedTracker from "./GroupedTracker";

interface TrackerTableProps {
  trackers: TrackerWithTask[];
  loading?: boolean;
}

export function TrackerTable(props: TrackerTableProps) {
  const groupedTrackers = () => groupTrackersByDate(props.trackers);
  const dates = () => groupedTrackers() && Object.keys(groupedTrackers());

  return (
    <div class="mt-8 hidden sm:block">
      <div class="inline-block min-w-full border-b border-gray-200 align-middle">
        <Show when={!props.loading}>
          <div class="space-y-10">
            <For each={dates()}>
              {(date) => (
                <GroupedTracker
                  date={date}
                  trackers={groupedTrackers()[date]}
                />
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}
