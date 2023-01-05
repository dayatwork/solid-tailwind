import * as tooltip from "@zag-js/tooltip";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, JSX, Show } from "solid-js";

interface TooltipProps {
  children: JSX.Element;
  label: string;
  openDelay?: number; // in ms
  closeDelay?: number; // in ms
  placement?: "top" | "bottom" | "right" | "left";
}

export function Tooltip(props: TooltipProps) {
  const [state, send] = useMachine(
    tooltip.machine({
      id: createUniqueId(),
      openDelay: props.openDelay || 0,
      closeDelay: props.closeDelay || 0,
      positioning: { placement: props.placement || "top" },
    })
  );

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps));

  return (
    <div>
      <button {...api().triggerProps}>{props.children}</button>
      <Show when={api().isOpen}>
        <div {...api().positionerProps}>
          <div {...api().contentProps}>
            <span class="text-xs bg-gray-900 text-white px-2 py-1 rounded-md">
              {props.label}
            </span>
          </div>
        </div>
      </Show>
    </div>
  );
}
