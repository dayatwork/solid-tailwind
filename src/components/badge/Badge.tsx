import { JSX, Match, Switch } from "solid-js";
import { AppColor } from "../color";

interface BadgeProps {
  children: JSX.Element;
  color?: AppColor;
}

export function Badge(props: BadgeProps) {
  return (
    <Switch>
      <Match when={props.color === "gray" || !props.color}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-800">
          {props.children}
        </span>
      </Match>
      <Match when={props.color === "red"}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800">
          {props.children}
        </span>
      </Match>
      <Match when={props.color === "yellow"}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-800">
          {props.children}
        </span>
      </Match>
      <Match when={props.color === "green"}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800">
          {props.children}
        </span>
      </Match>
      <Match when={props.color === "blue"}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
          {props.children}
        </span>
      </Match>
      <Match when={props.color === "indigo"}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800">
          {props.children}
        </span>
      </Match>
      <Match when={props.color === "purple"}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-800">
          {props.children}
        </span>
      </Match>
      <Match when={props.color === "pink"}>
        <span class="uppercase shadow-sm tracking-wide inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-bold text-pink-800">
          {props.children}
        </span>
      </Match>
    </Switch>
  );
}
