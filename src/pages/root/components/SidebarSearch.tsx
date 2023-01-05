interface SidebarSearchProps {
  // add props here
}

export function SidebarSearch(props: SidebarSearchProps) {
  return (
    <div class="mt-5 px-3">
      <label for="search" class="sr-only">
        Search
      </label>
      <div class="relative mt-1 rounded-md shadow-sm">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          {/* <!-- Heroicon name: mini/magnifying-glass --> */}
          <svg
            class="mr-3 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          class="block w-full rounded-md border-gray-300 pl-9 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
