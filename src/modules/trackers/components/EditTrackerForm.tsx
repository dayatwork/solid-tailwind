import { HiOutlineSave, HiOutlineX } from "solid-icons/hi";
import { createEffect, createSignal, Show } from "solid-js";

import { Loader, NumberInput, Select, TextInput } from "../../../components";
import { useTasks } from "../../tasks/services";
import { formatTime, getNewEndTime, getNewStartTime } from "../helper";
import { TrackerWithTask, useUpdateTracker } from "../services";

interface EditTrackerFormProps {
  tracker: TrackerWithTask;
  onCancel: () => void;
  onSave: () => void;
}

function EditTrackerForm(props: EditTrackerFormProps) {
  const [note, setNote] = createSignal(props.tracker.note);
  const [taskId, setTaskId] = createSignal(props.tracker.task_id);
  const [value, setValue] = createSignal(props.tracker.value);
  const [startAt] = createSignal(
    props.tracker.start_at ? formatTime(props.tracker.start_at) : undefined
  );
  const [endAt] = createSignal(
    props.tracker.end_at ? formatTime(props.tracker.end_at) : undefined
  );
  const [startTime, setStartTime] = createSignal(props.tracker.start_at);
  const [endTime, setEndTime] = createSignal(props.tracker.end_at);

  const isFormDirty = () =>
    note() !== props.tracker.note ||
    taskId() !== props.tracker.task_id ||
    value() !== props.tracker.value ||
    startTime() !== props.tracker.start_at ||
    endTime() !== props.tracker.end_at;

  const mutation = useUpdateTracker();
  const query = useTasks();

  const handleChangeStartAt = (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    if (props.tracker?.start_at) {
      const newStartTime = getNewStartTime({
        oldStartTime: props.tracker.start_at,
        newTime: e.currentTarget.value,
      });
      setStartTime(newStartTime);
    }
  };

  const handleChangeEndAt = (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    if (props.tracker?.end_at && props.tracker?.start_at) {
      const newEndTime = getNewEndTime({
        oldEndTime: props.tracker.end_at,
        newTime: e.currentTarget.value,
        oldStartTime: props.tracker.start_at,
      });
      setEndTime(newEndTime);
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const inputs = {
      end_at: endTime(),
      note: note(),
      start_at: startTime(),
      task_id: taskId(),
      value: value(),
    };

    mutation.mutate(
      { id: props.tracker.id, inputs },
      { onSuccess: props.onSave }
    );
  };

  return (
    <li class="border-t border-gray-200">
      <form onSubmit={handleSubmit} class="flex gap-2 items-center">
        <div class="flex-1 whitespace-nowrap pl-8 pr-2 py-3 text-sm font-medium text-gray-900">
          <TextInput name="note" value={note()} onChange={setNote} />
        </div>
        <div class="hidden whitespace-nowrap px-2 py-3 text-sm text-gray-900 md:table-cell">
          <Show when={!query.isLoading}>
            <Select
              name="task_id"
              options={
                query.data?.map((t) => ({ label: t.task, value: t.id })) || []
              }
              value={taskId()}
              onChange={setTaskId}
            />
          </Show>
        </div>
        <div class="hidden whitespace-nowrap px-2 py-3 text-lg font-medium text-green-600 md:table-cell">
          <NumberInput
            width={100}
            min={0}
            max={100}
            value={value()}
            onChange={setValue}
          />
        </div>
        <div class="hidden whitespace-nowrap px-2 py-3 text-lg font-medium font-mono text-gray-900 md:table-cell">
          <input
            type="time"
            class={`mt-0.5 rounded-md sm:text-sm focus:outline-none border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
            value={startAt()}
            step="1"
            onBlur={handleChangeStartAt}
          />
        </div>
        <span class="font-bold">-</span>
        <div class="hidden whitespace-nowrap px-2 py-3 text-lg font-medium font-mono text-gray-900 md:table-cell">
          <input
            type="time"
            class={`mt-0.5 rounded-md sm:text-sm focus:outline-none border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
            value={endAt()}
            step="1"
            onBlur={handleChangeEndAt}
          />
        </div>
        <div class="whitespace-nowrap px-6 py-3 text-sm font-medium flex gap-2">
          <button
            type="button"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md w-8 h-8 flex items-center justify-center"
            onClick={props.onCancel}
          >
            <span class="sr-only">Cancel</span>
            <HiOutlineX size={18} />
          </button>
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white rounded-md w-8 h-8 flex items-center justify-center disabled:bg-green-50 disabled:hover:bg-green disabled:text-green-300"
            disabled={!isFormDirty()}
          >
            <span class="sr-only">Save</span>
            <Show when={!mutation.isLoading} fallback={<Loader />}>
              <HiOutlineSave size={18} />
            </Show>
          </button>
        </div>
      </form>
    </li>
  );
}

export default EditTrackerForm;
