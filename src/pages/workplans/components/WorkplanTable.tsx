interface WorkplanTableProps {
  // add props here
}

export function WorkplanTable(props: WorkplanTableProps) {
  return (
    <div class="mt-8 hidden sm:block">
      <div class="inline-block min-w-full border-b border-gray-200 align-middle">
        <table class="min-w-full">
          <thead>
            <tr class="border-t border-gray-200">
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                <span class="lg:pl-2">Work Plan</span>
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Members
              </th>
              <th
                class="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                scope="col"
              >
                Last updated
              </th>
              <th
                class="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              ></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr>
              <td class="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                <div class="flex items-center space-x-3 lg:pl-2">
                  <div
                    class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"
                    aria-hidden="true"
                  ></div>
                  <a href="#" class="truncate hover:text-gray-600">
                    <span>
                      GraphQL API
                      <span class="font-normal text-gray-500">
                        in Engineering
                      </span>
                    </span>
                  </a>
                </div>
              </td>
              <td class="px-6 py-3 text-sm font-medium text-gray-500">
                <div class="flex items-center space-x-2">
                  <div class="flex flex-shrink-0 -space-x-1">
                    <img
                      class="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Dries Vincent"
                    />

                    <img
                      class="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Lindsay Walton"
                    />

                    <img
                      class="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Courtney Henry"
                    />

                    <img
                      class="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Tom Cook"
                    />
                  </div>

                  <span class="flex-shrink-0 text-xs font-medium leading-5">
                    +8
                  </span>
                </div>
              </td>
              <td class="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                March 17, 2020
              </td>
              <td class="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                <a href="#" class="text-purple-600 hover:text-purple-900">
                  Edit
                </a>
              </td>
            </tr>

            {/* <!-- More projects... --> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
