import { Session } from "@supabase/supabase-js";
import { HiSolidPlay, HiSolidStop } from "solid-icons/hi";
import { createEffect, createSignal, Show } from "solid-js";

import {
  Button,
  Loader,
  NumberInput,
  Select,
  TextInput,
} from "../../../components";
import { useAuth } from "../../../contexts";
import { useTasks } from "../../tasks/services";
import { TaskStatus } from "../../tasks/type";
import {
  TrackerWithTask,
  useEndTracker,
  useStartTracker,
  useUpdateTracker,
} from "../services";
import { Timer } from "./Timer";

interface RunningTrackerProps {
  runningTracker: TrackerWithTask | null;
  loading: boolean;
}

export function RunningTracker(props: RunningTrackerProps) {
  const [note, setNote] = createSignal(props.runningTracker?.note);
  const [taskId, setTaskId] = createSignal<string | null>(
    props.runningTracker?.task_id
  );
  const [value, setValue] = createSignal(props.runningTracker?.value);

  const [session] = useAuth();
  const tasksParams = () => ({ status: "ongoing" as TaskStatus });
  const tasksQuery = useTasks(tasksParams);
  const startMutation = useStartTracker();
  const endMutation = useEndTracker();
  const updateMutation = useUpdateTracker();

  const handleStartTracker = async () => {
    if (!session()) return;

    const employee_id = (session() as Session).user.id;
    startMutation.mutate({ employee_id });
  };

  const handleEndTracker = async (e: Event) => {
    e.preventDefault();

    endMutation.mutate({
      id: props.runningTracker.id,
      props: { note: note(), value: value(), task_id: taskId() },
    });
  };

  const handleChange = (
    column: "note" | "task_id" | "value",
    value: string | number
  ) => {
    updateMutation.mutate({
      id: props.runningTracker.id,
      inputs: { [column]: value },
    });
  };

  return (
    <div class="mt-6 px-4 sm:px-6 lg:px-8">
      <h2 class="text-sm font-medium text-gray-900">Running Tracker</h2>
      <Show
        when={!props.loading}
        fallback={
          <div class="mt-2 h-16 w-full bg-gray-300 animate-pulse rounded-md" />
        }
      >
        <Show
          when={props.runningTracker}
          fallback={
            <div class="mt-2 text-center bg-purple-50 py-4 rounded-md  border-dashed border-2 border-purple-500 flex items-center justify-center gap-4">
              <p class="text-purple-700 text-sm font-medium">
                No tracker is running
              </p>
              <button
                class={`relative text-sm py-1 pl-2 pr-3 bg-purple-500 font-medium rounded hover:bg-purple-600 flex justify-center gap-1 items-center transition ${
                  startMutation.isLoading ? "text-transparent" : "text-white"
                }`}
                onClick={handleStartTracker}
                disabled={startMutation.isLoading}
              >
                <HiSolidPlay size={20} />
                Start Tracker
                <Show when={startMutation.isLoading}>
                  <div class="absolute flex items-center justify-center">
                    <Loader />
                  </div>
                </Show>
              </button>
            </div>
          }
        >
          <form
            onSubmit={handleEndTracker}
            class="mt-2 text-center bg-purple-50 pb-4 pt-3 px-4 rounded-md flex gap-6 items-center border-dashed border-2 border-purple-500"
          >
            <div class="flex-1 whitespace-nowrap text-sm font-medium text-gray-900">
              <TextInput
                placeholder="Note"
                name="note"
                value={note()}
                onChange={setNote}
              />
            </div>
            <div class="hidden whitespace-nowrap text-sm text-gray-900 md:block w-64">
              <Show when={!tasksQuery.isLoading}>
                <Select
                  name="task_id"
                  options={
                    tasksQuery.data?.tasks.map((t) => ({
                      label: t.task,
                      value: t.id,
                    })) || []
                  }
                  placeholder="Select Task"
                  value={taskId()}
                  onChange={(v) => {
                    setTaskId(v);
                    handleChange("task_id", v);
                  }}
                />
              </Show>
            </div>
            <div class="hidden whitespace-nowrap text-lg font-medium  md:block">
              <NumberInput
                width={100}
                min={0}
                max={100}
                value={value()}
                onChange={setValue}
              />
            </div>
            <Timer startAt={props.runningTracker.start_at} />
            <Button
              type="submit"
              variant="danger"
              loading={endMutation.isLoading}
            >
              <HiSolidStop size={20} />
              <span class="ml-2 mr-1">Stop</span>
            </Button>
          </form>
        </Show>
      </Show>
    </div>
  );
}
