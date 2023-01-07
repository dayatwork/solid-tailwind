interface TrackerListProps {
  // add props here
}

export function TrackerList(props: TrackerListProps) {
  return (
    <div class="mt-10 sm:hidden">
      <div class="px-4 sm:px-6">
        <h2 class="text-sm font-medium text-gray-900">Trackers</h2>
      </div>
      <ul
        role="list"
        class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
      >
        <li>
          <a
            href="#"
            class="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
          >
            <span class="flex items-center space-x-3 truncate">
              <span
                class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-pink-600"
                aria-hidden="true"
              ></span>
              <span class="truncate text-sm font-medium leading-6">
                GraphQL API
                <span class="truncate font-normal text-gray-500">
                  in Engineering
                </span>
              </span>
            </span>
            {/* <!-- Heroicon name: mini/chevron-right --> */}
            <svg
              class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>

        {/* <!-- More projects... --> */}
      </ul>
    </div>
  );
}
