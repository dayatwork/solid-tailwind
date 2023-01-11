import { createEffect } from "solid-js";
import { RunningTracker, TrackerTable } from "../components";
import { useTrackers } from "../services";

interface TrackersProps {}

function Trackers(props: TrackersProps) {
  const query = useTrackers({});

  const runningTrackers = () => query.data?.filter((t) => !t.end_at) || [];
  const endedTrackers = () => query.data?.filter((t) => t.end_at) || [];

  return (
    <>
      <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Trackers
          </h1>
        </div>
      </div>
      <RunningTracker
        runningTracker={runningTrackers().length ? runningTrackers()[0] : null}
        loading={query.isLoading}
      />

      {/* <TaskList tasks={query.data} loading={query.isLoading} /> */}
      <TrackerTable trackers={endedTrackers()} loading={query.isLoading} />
    </>
  );
}

export default Trackers;
