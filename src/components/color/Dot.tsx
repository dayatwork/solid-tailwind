import { Match, Switch } from "solid-js";
import { AppColor } from "./type";

interface DotProps {
  color: AppColor;
}

export function Dot(props: DotProps) {
  return (
    <Switch>
      <Match when={props.color === "gray" || !props.color}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-gray-600"
          aria-hidden="true"
        ></span>
      </Match>
      <Match when={props.color === "red"}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-red-600"
          aria-hidden="true"
        ></span>
      </Match>
      <Match when={props.color === "yellow"}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-yellow-600"
          aria-hidden="true"
        ></span>
      </Match>
      <Match when={props.color === "green"}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-green-600"
          aria-hidden="true"
        ></span>
      </Match>
      <Match when={props.color === "blue"}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-blue-600"
          aria-hidden="true"
        ></span>
      </Match>
      <Match when={props.color === "indigo"}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-indigo-600"
          aria-hidden="true"
        ></span>
      </Match>
      <Match when={props.color === "purple"}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-purple-600"
          aria-hidden="true"
        ></span>
      </Match>
      <Match when={props.color === "pink"}>
        <span
          class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-pink-600"
          aria-hidden="true"
        ></span>
      </Match>
    </Switch>
  );
}
