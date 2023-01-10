import { createSignal, For, Show } from "solid-js";
import { calculateTotalDuration, displayDuration } from "../helper";

import { TrackerWithTask, useDeleteTracker } from "../services";
import EditTrackerForm from "./EditTrackerForm";
import TrackerItem from "./TrackerItem";

interface GroupedTrackerProps {
  date: string;
  trackers: TrackerWithTask[];
}

function GroupedTracker(props: GroupedTrackerProps) {
  const [selectedTracker, setSelectedTracker] =
    createSignal<TrackerWithTask | null>(null);
  const [selectedId, setSelectedId] = createSignal<string | null>(null);

  const mutation = useDeleteTracker();

  const handleSelectItem = (id: string) => {
    setSelectedId(id);
  };

  const handleDelete = async (id: string) => {
    if (id !== selectedId()) return;

    mutation.mutate(id, {
      onSuccess: () => {
        setSelectedId(null);
      },
    });
  };

  const handleClickEdit = (tracker: TrackerWithTask) => {
    setSelectedId(null);
    setSelectedTracker(tracker);
  };
  const handleCancelEdit = () => {
    setSelectedTracker(null);
  };
  const handleSaveEdit = () => {
    setSelectedTracker(null);
  };

  return (
    <div class="shadow">
      <div class="bg-gray-100 py-2 px-8 flex justify-between items-center">
        <h3 class=" font-bold">{props.date}</h3>
        <div class="font-mono text-lg font-bold">
          {displayDuration(calculateTotalDuration(props.trackers))}
        </div>
      </div>
      <ul class="border-b border-gray-200">
        <For each={props.trackers}>
          {(tracker) => (
            <Show
              when={selectedTracker()?.id !== tracker.id}
              fallback={
                <EditTrackerForm
                  tracker={tracker}
                  onCancel={handleCancelEdit}
                  onSave={handleSaveEdit}
                />
              }
            >
              <TrackerItem
                tracker={tracker}
                onEdit={handleClickEdit}
                onDelete={handleDelete}
                onSelectItem={handleSelectItem}
                selectedItem={selectedId()}
                deleting={mutation.isLoading}
              />
            </Show>
          )}
        </For>
      </ul>
    </div>
  );
}

export default GroupedTracker;
