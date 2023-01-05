import { createUniqueId, JSX } from "solid-js";

interface CheckboxProps {
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  checked?: boolean;
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>;
}

export function Checkbox(props: CheckboxProps) {
  const id = createUniqueId();

  return (
    <div class="flex items-center">
      <input
        id={id}
        name={props.name}
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
      />
      <label id={id} class="ml-2 block text-sm text-gray-900">
        {props.label}
      </label>
    </div>
  );
}

export default Checkbox;
