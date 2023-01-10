import { JSX, Match, Switch } from "solid-js";
import { AppColor } from "./type";

interface CardStatusProps {
  children: JSX.Element;
  color?: AppColor;
}

export function CardStatus(props: CardStatusProps) {
  return (
    <Switch>
      <Match when={props.color === "gray" || !props.color}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-gray-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
      <Match when={props.color === "red"}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-red-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
      <Match when={props.color === "yellow"}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-yellow-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
      <Match when={props.color === "green"}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-green-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
      <Match when={props.color === "blue"}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-blue-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
      <Match when={props.color === "indigo"}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-indigo-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
      <Match when={props.color === "purple"}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-purple-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
      <Match when={props.color === "pink"}>
        <div
          class={`flex-shrink-0 flex items-center justify-center w-24 bg-pink-600 text-white text-sm font-medium rounded-l-md`}
        >
          <p class="capitalize">{props.children}</p>
        </div>
      </Match>
    </Switch>
  );
}
