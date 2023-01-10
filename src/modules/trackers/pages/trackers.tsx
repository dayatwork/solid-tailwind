import { createEffect } from "solid-js";
import { Dialog } from "../../../components";
import {
  RunningTracker,
  // CreateTaskForm,
  // OngoingTasks,
  // TaskList,
  TrackerTable,
  // ApprovedWorkplans,
  // CreateWorkplanForm,
} from "../components";
import { useTrackers } from "../services";

interface TrackersProps {}

function Trackers(props: TrackersProps) {
  const query = useTrackers();

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
        <div class="mt-4 flex sm:mt-0 sm:ml-4">
          {/* <Dialog
            trigger="Create"
            triggerClass="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
            title="Create Workplan"
          >
            {(api) => <CreateTaskForm close={api.close} />}
          </Dialog> */}
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
