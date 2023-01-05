import { A } from "@solidjs/router";
import { JSX } from "solid-js";

interface AnchorProps {
  // add props here
  href: string;
  children: JSX.Element;
  size?: "sm" | "lg" | "md";
}

export function Anchor(props: AnchorProps) {
  return (
    <A
      href={props.href}
      class={`font-medium text-purple-600 hover:text-purple-500 ${
        props.size === "md"
          ? "text-base"
          : props.size === "lg"
          ? "text-lg"
          : "text-sm"
      }`}
    >
      {props.children}
    </A>
  );
}

export default Anchor;
