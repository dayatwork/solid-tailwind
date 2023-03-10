import { A } from "@solidjs/router";

interface PageTitleProps {}

export function PageTitle(props: PageTitleProps) {
  return (
    <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div class="min-w-0 flex-1">
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Users
        </h1>
      </div>
      <div class="mt-4 flex sm:mt-0 sm:ml-4">
        <A
          href="add"
          class="order-0 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
        >
          Create
        </A>
      </div>
    </div>
  );
}
