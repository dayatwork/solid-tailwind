import { JSX, Show } from "solid-js";

import { Loader } from "../loader";

interface ButtonProps {
  children: JSX.Element;
  type?: "button" | "reset" | "submit";
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
  variant?: "primary" | "danger";
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.loading || props.disabled}
      type={props.type || "button"}
      class={`flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 relative ${
        props.fullWidth ? "w-full" : ""
      } ${props.loading ? "text-transparent" : "text-white"} ${
        props.variant === "danger"
          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-200 disabled:cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 disabled:bg-purple-200 disabled:cursor-not-allowed"
      }`}
      onClick={props.onClick}
    >
      {props.children}
      <Show when={props.loading}>
        <div class="absolute flex items-center justify-center">
          <Loader />
        </div>
      </Show>
    </button>
  );
}
