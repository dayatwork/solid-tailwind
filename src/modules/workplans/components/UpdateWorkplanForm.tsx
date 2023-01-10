import { Session } from "@supabase/supabase-js";
import { HiSolidLockClosed, HiSolidLockOpen } from "solid-icons/hi";
import { createSignal, Show } from "solid-js";

import {
  Button,
  NumberInput,
  Select,
  Textarea,
  TextInput,
  Tooltip,
} from "../../../components";
import { useAuth } from "../../../contexts";
import { CURRENT_WEEK, CURRENT_YEAR } from "../../../utils/date";
import { workplanStatusOptions } from "../constant";
import { useCreateWorkplan, useUpdateWorkplan, Workplan } from "../services";
import { WorkplanStatus } from "../type";

interface UpdateWorkplanFormProps {
  close(): void;
  defaultWorkplan: Workplan;
}

export function UpdateWorkplanForm(props: UpdateWorkplanFormProps) {
  let weekRef: HTMLInputElement;
  let yearRef: HTMLInputElement;
  const [plan, setPlan] = createSignal(props.defaultWorkplan.plan);
  const [description, setDescription] = createSignal(
    props.defaultWorkplan.description
  );
  const [status, setStatus] = createSignal<WorkplanStatus>(
    props.defaultWorkplan.status
  );
  const [week, setWeek] = createSignal(props.defaultWorkplan.week);
  const [year, setYear] = createSignal(props.defaultWorkplan.year);
  const [allowChangeWeek, setAllowChangeWeek] = createSignal(false);
  const [allowChangeYear, setAllowChangeYear] = createSignal(false);

  const [session] = useAuth();
  const mutation = useUpdateWorkplan({ onSuccess: () => props.close() });

  const handleAllowChangeWeek = () => {
    if (allowChangeWeek()) {
      setAllowChangeWeek(false);
    } else {
      setAllowChangeWeek(true);
      weekRef.focus();
    }
  };

  const handleAllowChangeYear = () => {
    if (allowChangeYear()) {
      setAllowChangeYear(false);
    } else {
      setAllowChangeYear(true);
      yearRef.focus();
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!session()) return;

    mutation.mutate({
      id: props.defaultWorkplan.id,
      inputs: {
        plan: plan(),
        description: description(),
        status: status(),
        week: week(),
        year: year(),
        employee_id: (session() as Session).user.id,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-6">
          <div class="flex space-x-1 items-end">
            <NumberInput
              ref={weekRef}
              readonly={!allowChangeWeek()}
              label="Week"
              value={week()}
              onChange={setWeek}
              min={1}
              max={53}
            />

            <button
              type="button"
              class="bg-gray-100 p-2.5 border border-gray-300 rounded-md outline-none focus:ring-1 focus:border-purple-500 focus:ring-purple-500"
              onClick={handleAllowChangeWeek}
            >
              <Show when={allowChangeWeek()} fallback={<HiSolidLockOpen />}>
                <HiSolidLockClosed />
              </Show>
            </button>
          </div>
          <div class="flex space-x-1 items-end">
            <NumberInput
              readonly={!allowChangeYear()}
              label="Year"
              value={year()}
              onChange={setYear}
              min={CURRENT_YEAR - 4}
              max={CURRENT_YEAR + 1}
            />
            <button
              type="button"
              class="bg-gray-100 p-2.5 border border-gray-300 rounded-md outline-none focus:ring-1 focus:border-purple-500 focus:ring-purple-500"
              onClick={handleAllowChangeYear}
            >
              <Show when={allowChangeYear()} fallback={<HiSolidLockOpen />}>
                <HiSolidLockClosed />
              </Show>
            </button>
          </div>
        </div>
        <TextInput
          label="Plan"
          name="plan"
          required
          value={plan()}
          onChange={setPlan}
        />
        <Textarea
          label="Description"
          name="description"
          withOptionalLabel
          value={description()}
          onChange={setDescription}
        />
        <Select
          label="Status"
          name="status"
          options={workplanStatusOptions}
          value={status()}
          onChange={setStatus}
        />
      </div>
      <div class="mt-6 flex justify-end">
        <Button type="submit" loading={mutation.isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
}
