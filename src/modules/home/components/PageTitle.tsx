interface PageTitleProps {}

export function PageTitle(props: PageTitleProps) {
  return (
    <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div class="min-w-0 flex-1">
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Home
        </h1>
      </div>
    </div>
  );
}
