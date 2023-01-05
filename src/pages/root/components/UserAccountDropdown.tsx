import { useNavigate } from "@solidjs/router";
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  HiOutlineBell,
  HiOutlineChat,
  HiOutlineCog,
  HiOutlineDesktopComputer,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "solid-icons/hi";
import { createMemo, createUniqueId, For } from "solid-js";
import toast from "solid-toast";

import { supabase } from "../../../lib";

interface UserAccountDropdownProps {
  avatarUrl?: string;
  name?: string;
  email?: string;
}

const menuOptions = [
  {
    label: "View profile",
    id: "view-profile",
    icon: HiOutlineUserCircle,
  },
  {
    label: "Settings",
    id: "settings",
    icon: HiOutlineCog,
  },
  {
    label: "Notifications",
    id: "notifications",
    icon: HiOutlineBell,
  },
  {
    label: "Get desktop app",
    id: "get-desktop-app",
    icon: HiOutlineDesktopComputer,
  },
  {
    label: "Support",
    id: "support",
    icon: HiOutlineChat,
  },
  {
    label: "Logout",
    id: "logout",
    icon: HiOutlineLogout,
  },
];

export function UserAccountDropdown(props: UserAccountDropdownProps) {
  const navigate = useNavigate();

  const [state, send] = useMachine(
    menu.machine({
      id: createUniqueId(),
      "aria-label": "User Dropdown",
      loop: true,
      onSelect(details) {
        if (details.value === "logout") {
          handleSignout();
        } else {
          navigate(`/${details.value}`);
        }
      },
      closeOnSelect: false,
    })
  );

  const api = createMemo(() => menu.connect(state, send, normalizeProps));

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("You are logged out!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div class="relative inline-block px-3 text-left mt-1">
      <div>
        <button
          class="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          {...api().triggerProps}
        >
          <span class="flex w-full items-center justify-between">
            <span class="flex min-w-0 items-center justify-between space-x-3">
              <img
                class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={
                  props.avatarUrl ||
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                }
                alt={props.name}
              />
              <span class="flex min-w-0 flex-1 flex-col">
                <span class="truncate text-sm font-medium text-gray-900">
                  {props.name || "Jessy Schwarz"}
                </span>
                <span class="truncate text-sm text-gray-500">
                  {props.email || "@jessyschwarz"}
                </span>
              </span>
            </span>
            {/* <!-- Heroicon name: mini/chevron-up-down --> */}
            <svg
              class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>

      <div
        class="z-10 mt-1 right-5 rounded-md bg-white shadow-lg ring-opacity-5 border-none"
        {...api().positionerProps}
      >
        <ul
          class="list-none border focus:outline-none divide-y divide-gray-100 border-gray-200  rounded-md overflow-hidden"
          {...api().contentProps}
        >
          <For each={menuOptions}>
            {(option) => (
              <li
                class={`flex space-x-3 items-center px-4 py-2.5 text-sm ${
                  api().highlightedId === option.id
                    ? "bg-purple-500 text-white"
                    : "text-gray-700"
                }`}
                {...api().getItemProps({ id: option.id })}
              >
                <option.icon size={20} /> <span>{option.label}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
}
