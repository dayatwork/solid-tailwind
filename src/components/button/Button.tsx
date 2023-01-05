import { JSX, Match, Switch } from "solid-js";
import { Loader } from "../loader";

interface ButtonProps {
  children: JSX.Element;
  type?: "button" | "reset" | "submit";
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.loading}
      type={props.type || "button"}
      class={`flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        props.fullWidth ? "w-full" : ""
      }`}
      onClick={props.onClick}
    >
      <Switch>
        <Match when={props.loading}>
          <Loader />
        </Match>
        <Match when={!props.loading}>{props.children}</Match>
      </Switch>
    </button>
  );
}
