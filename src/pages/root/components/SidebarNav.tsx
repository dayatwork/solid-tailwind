import { A, useLocation } from "@solidjs/router";
import { IconTypes } from "solid-icons";
import {
  HiOutlineClock,
  HiOutlineHome,
  HiOutlineViewList,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineUserGroup,
} from "solid-icons/hi";
import { createEffect, createSignal, For } from "solid-js";

const navs = [
  {
    label: "Home",
    href: "/",
    icon: HiOutlineHome,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: HiOutlineBriefcase,
  },
  {
    label: "Work Plans",
    href: "/workplans",
    icon: HiOutlineCalendar,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: HiOutlineViewList,
  },
  {
    label: "Trackers",
    href: "/trackers",
    icon: HiOutlineClock,
  },
  {
    label: "Users",
    href: "/users",
    icon: HiOutlineUserGroup,
  },
];

interface NavItemProps {
  label: string;
  href: string;
  icon: IconTypes;
}

function NavItem(props: NavItemProps) {
  const location = useLocation();
  const [active, setActive] = createSignal(
    props.href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(props.href)
  );

  createEffect(() => {
    setActive(
      props.href === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(props.href)
    );
  });

  return (
    <A
      href={props.href}
      class={` group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active()
          ? "bg-purple-200 text-purple-700"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span
        class={`${
          active()
            ? "text-purple-700"
            : "text-gray-400 group-hover:text-gray-500"
        }`}
      >
        <props.icon
          size={24}
          stroke="currentColor"
          class="mr-3 flex-shrink-0 h-6 w-6 text-gray-500"
          color="inherit"
        />
      </span>
      {props.label}
    </A>
  );
}

interface SidebarNavProps {
  // add props here
}

export function SidebarNav(props: SidebarNavProps) {
  return (
    <nav class="mt-6 px-3">
      <div class="space-y-1">
        <For each={navs}>
          {(nav) => (
            <NavItem href={nav.href} label={nav.label} icon={nav.icon} />
          )}
        </For>
      </div>
      <div class="mt-8">
        {/* <!-- Secondary navigation --> */}
        <h3
          class="px-3 text-sm font-medium text-gray-500"
          id="desktop-teams-headline"
        >
          Teams
        </h3>
        <div
          class="mt-1 space-y-1"
          role="group"
          aria-labelledby="desktop-teams-headline"
        >
          <a
            href="#"
            class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span
              class="w-2.5 h-2.5 mr-4 bg-purple-500 rounded-full"
              aria-hidden="true"
            ></span>
            <span class="truncate">Engineering</span>
          </a>

          <a
            href="#"
            class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span
              class="w-2.5 h-2.5 mr-4 bg-green-500 rounded-full"
              aria-hidden="true"
            ></span>
            <span class="truncate">Human Resources</span>
          </a>

          <a
            href="#"
            class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span
              class="w-2.5 h-2.5 mr-4 bg-yellow-500 rounded-full"
              aria-hidden="true"
            ></span>
            <span class="truncate">Customer Success</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
