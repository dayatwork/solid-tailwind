import { Component, Show, createUniqueId } from "solid-js";
import { HiOutlineExclamationCircle } from "solid-icons/hi";

interface TextInputProps {
  label?: string;
  type?: "text" | "email" | "password";
  name: string;
  description?: string;
  placeholder?: string;
  autocomplete?: string;
  value?: string | number | string[];
  onChange?: (v: string) => void;
  onInput?: (v: string) => void;
  required?: boolean;
  withOptionalLabel?: boolean;
  withRequiredLabel?: boolean;
  error?: string;
}

export const TextInput: Component<TextInputProps> = (props) => {
  const id = createUniqueId();
  return (
    <div>
      <div class="flex justify-between">
        <label for={id} class="block text-sm font-medium text-gray-700">
          {props.label}{" "}
          <Show when={props.required && props.withRequiredLabel}>
            <span class="text-red-600">*</span>
          </Show>
        </label>
        <Show when={!props.required && props.withOptionalLabel}>
          <span class="text-sm text-gray-500" id="email-optional">
            Optional
          </span>
        </Show>
      </div>
      <div class="relative mt-1 rounded-md shadow-sm">
        <input
          type={props.type || "text"}
          name={props.name}
          id={id}
          class={`block w-full rounded-md sm:text-sm focus:outline-none ${
            !props.error
              ? "pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              : "border-red-300 focus:border-red-500 focus:ring-red-500"
          }`}
          placeholder={props.placeholder}
          autocomplete={props.autocomplete}
          aria-describedby="description"
          value={props.value || ""}
          onChange={(e) =>
            props.onChange && props.onChange(e.currentTarget.value)
          }
          required={props.required ?? false}
          onInput={(e) => props.onInput && props.onInput(e.currentTarget.value)}
        />
        <Show when={props.error}>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <HiOutlineExclamationCircle size={20} color="red" />
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
};
