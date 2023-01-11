import * as numberInput from "@zag-js/number-input";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "solid-icons/hi";
import { createMemo, createUniqueId, Show } from "solid-js";

interface NumberInputProps {
  label?: string;
  error?: string;
  description?: string;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  step?: number;
  allowMouseWheel?: boolean;
  onChange?: (v: number) => void;
  onBlur?: (v: number) => void;
  value?: number;
  readonly?: boolean;
  ref?: HTMLInputElement;
  width?: number;
}

export function NumberInput(props: NumberInputProps) {
  const [state, send] = useMachine(
    numberInput.machine({
      id: createUniqueId(),
      allowMouseWheel: props.allowMouseWheel,
      disabled: props.disabled,
      max: props.max,
      min: props.min,
      maxFractionDigits: props.maxFractionDigits,
      minFractionDigits: props.minFractionDigits,
      onChange: (v) => props.onChange(v.valueAsNumber),
      onBlur: (v) => props.onBlur(v.valueAsNumber),
      value: props.value && String(props.value),
    })
  );

  const api = createMemo(() =>
    numberInput.connect(state, send, normalizeProps)
  );

  return (
    <div {...api().rootProps}>
      <label
        class={`block text-sm font-medium text-gray-700 ${
          props.label ? "mb-1" : ""
        }`}
        {...api().labelProps}
      >
        {props.label}
      </label>
      <div
        class="relative rounded-md shadow-sm"
        style={{ width: props.width ? `${props.width}px` : undefined }}
      >
        <input
          ref={props.ref}
          class={`block w-full rounded-md sm:text-sm focus:outline-none disabled:bg-gray-200 disabled:text-gray-600 ${
            !props.error
              ? "pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              : "border-red-300 focus:border-red-500 focus:ring-red-500"
          }`}
          {...api().inputProps}
          readOnly={props.readonly}
          placeholder={props.placeholder}
        />
        <Show when={!props.readonly && !props.disabled}>
          <div class="absolute inset-y-0 right-0 flex flex-col rounded-md p-[1px]">
            <button
              class="w-7 bg-gray-100 hover:bg-gray-200 h-[50%] inline-flex justify-center items-center rounded-tr-md border-b border-b-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-100"
              {...api().incrementTriggerProps}
            >
              <HiOutlineChevronUp />
            </button>
            <button
              class="w-7 bg-gray-100 hover:bg-gray-200 h-[50%] inline-flex justify-center items-center rounded-br-md disabled:text-gray-500 disabled:hover:bg-gray-100"
              {...api().decrementTriggerProps}
            >
              <HiOutlineChevronDown />
            </button>
          </div>
        </Show>
      </div>
      <Show when={props.error}>
        <p class="mt-1 text-sm text-red-600" id="description">
          {props.error}
        </p>
      </Show>
      <Show when={props.description && !props.error}>
        <p class="mt-1 text-sm text-gray-500" id="description">
          {props.description}
        </p>
      </Show>
    </div>
  );
}
