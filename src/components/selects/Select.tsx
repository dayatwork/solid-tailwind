import * as select from "@zag-js/select";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, For, Show } from "solid-js";
import { Portal } from "solid-js/web";

interface SelectProps {
  label?: string;
  name: string;
  options: select.OptionProps[];
  onChange?: (v: select.OptionProps) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  description?: string;
  error?: string;
}

export function Select(props: SelectProps) {
  const [state, send] = useMachine(
    select.machine({
      id: createUniqueId(),
      name: props.name,
      onChange: props.onChange,
      selectedOption: props.options?.find((o) => o.value === props.value),
      loop: true,
      selectOnTab: true,
      disabled: props.disabled,
    })
  );

  const api = createMemo(() => select.connect(state, send, normalizeProps));

  return (
    <div>
      <div class="select w-full">
        {/* Hidden select */}
        <select {...api().hiddenSelectProps}>
          <For each={props.options}>
            {(option) => <option value={option.value}>{option.label}</option>}
          </For>
        </select>

        {/* Custom Select */}
        <div class="control">
          <label
            class="block text-sm font-medium text-gray-700"
            {...api().labelProps}
          >
            {props.label}
          </label>
          <button
            type="button"
            class={`relative mt-1 w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm  focus:outline-none focus:ring-1 sm:text-sm ${
              !props.error
                ? "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                : "border-red-300 focus:border-red-500 focus:ring-red-500"
            }`}
            {...api().triggerProps}
          >
            <span class="block truncate">
              {api().selectedOption?.label ?? (props.placeholder || "Select")}
            </span>
            {/* <CaretIcon /> */}
            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              {/* <!-- Heroicon name: mini/chevron-up-down --> */}
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
          <Show when={props.error}>
            <p class="mt-1 text-sm text-red-600" id="description">
              {props.error}
            </p>
          </Show>
          <Show when={props.description && !props.error}>
            <p class="mt-1 text-sm text-gray-500" id="error">
              {props.description}
            </p>
          </Show>
        </div>

        {/* <Portal> */}
        <div {...api().positionerProps}>
          <ul
            class="max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            {...api().contentProps}
          >
            <For each={props.options}>
              {(option) => (
                <li
                  class={`relative  select-none py-2 pl-3 pr-12 hover:text-white hover:bg-purple-600 ${
                    api().highlightedOption?.value === option.value
                      ? "text-white bg-purple-600"
                      : "text-gray-900"
                  } ${
                    option.disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "cursor-default"
                  }`}
                  {...api().getOptionProps({
                    label: option.label,
                    value: option.value,
                    disabled: option.disabled,
                  })}
                >
                  <span
                    class={`block truncate ${
                      api().selectedOption?.value === option.value
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {option.label}
                  </span>
                  <Show when={api().selectedOption?.value === option.value}>
                    <span
                      class={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        api().highlightedOption?.value === option.value
                          ? "text-white"
                          : "text-purple-600"
                      }`}
                    >
                      {/* <!-- Heroicon name: mini/check --> */}
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </div>
        {/* </Portal> */}
      </div>
    </div>
  );
}
