import * as dialog from "@zag-js/dialog";
import { Portal } from "solid-js/web";
import { useMachine, normalizeProps } from "@zag-js/solid";
import { createMemo, createUniqueId, JSX, Show } from "solid-js";
import { HiOutlineX } from "solid-icons/hi";

interface DialogProps {
  title?: string;
  description?: string;
  children: (api: { close(): void }) => JSX.Element;
  triggerClass: string;
  trigger: JSX.Element;
}

export function Dialog(props: DialogProps) {
  const [state, send] = useMachine(dialog.machine({ id: createUniqueId() }));

  const api = createMemo(() => dialog.connect(state, send, normalizeProps));

  return (
    <>
      <button class={props.triggerClass} {...api().triggerProps}>
        {props.trigger}
      </button>
      <Show when={api().isOpen}>
        <Portal>
          <div class="relative z-10">
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              {...api().backdropProps}
            />
            <div
              class="fixed inset-0 flex items-center  justify-center p-4 sm:items-center sm:p-0"
              {...api().containerProps}
            >
              <div
                class="relative rounded-lg bg-white shadow-xl sm:w-full sm:max-w-lg"
                {...api().contentProps}
              >
                <div class="overflow-hidden py-5 px-5">
                  <div class="flex justify-between items-start ">
                    <div>
                      <h2 class="font-semibold" {...api().titleProps}>
                        {props.title}
                      </h2>
                      <p
                        class="text-gray-500 text-sm"
                        {...api().descriptionProps}
                      >
                        {props.description}
                      </p>
                    </div>
                    <button
                      class="p-1 -mr-1 -mt-1 hover:bg-gray-100 transition rounded-md outline-none focus:ring-2 focus:ring-purple-500"
                      {...api().closeTriggerProps}
                    >
                      <HiOutlineX />
                    </button>
                  </div>
                  <div class="mt-6 z-20 ">{props.children(api())}</div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
}
