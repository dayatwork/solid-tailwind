import { useSearchParams } from "@solidjs/router";
import { Dialog, Select, SimplePagination } from "../../../components";
import SearchInput from "../../../components/inputs/SearchInput";
import {
  CreateTaskForm,
  OngoingTasks,
  TaskList,
  TaskTable,
} from "../components";
import { taskStatusOptions, TASK_STATUS } from "../constant";
import { useTasks } from "../services";
import { TaskStatus } from "../type";

interface TasksProps {}

function Tasks(props: TasksProps) {
  const [searchParams, setSearchParams] = useSearchParams<{
    page: string;
    limit: string;
    status: string;
    search: string;
  }>();

  const params = () => ({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 5,
    task: searchParams.search || undefined,
    status: Object.keys(TASK_STATUS).includes(searchParams.status)
      ? (searchParams.status as TaskStatus)
      : undefined,
  });

  const query = useTasks(params);

  const ongoingTasks = () =>
    query.data.tasks.filter((t) => t.status === "ongoing");

  return (
    <>
      <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Tasks
          </h1>
        </div>
        <div class="mt-4 flex sm:mt-0 sm:ml-4">
          <Dialog
            trigger="Create"
            triggerClass="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
            title="Create Workplan"
          >
            {(api) => <CreateTaskForm close={api.close} />}
          </Dialog>
        </div>
      </div>
      <OngoingTasks tasks={ongoingTasks()} loading={query.isLoading} />
      <div class="mt-8 bg-white pl-4 sm:pl-8 pr-4 py-2 border-t border-gray-200 flex items-center justify-between gap-2 w-full">
        <SearchInput
          onChange={(e) => setSearchParams({ search: e.currentTarget.value })}
        />
        <div>
          <Select
            name="status"
            placeholder="Select Status"
            options={[{ label: "All", value: "" }, ...taskStatusOptions]}
            value={params().status || ""}
            onChange={(v) => setSearchParams({ status: v })}
            width={150}
          />
        </div>
      </div>
      <TaskList tasks={query.data.tasks} loading={query.isLoading} />
      <TaskTable tasks={query.data.tasks} loading={query.isLoading} />
      <div class="bg-white px-4 sm:pl-8 sm:pr-6 py-2 border-b border-gray-200">
        <SimplePagination
          loading={query.isLoading}
          limit={searchParams.limit || "10"}
          page={searchParams.page || "1"}
          count={query.data.count}
          onChangeLimit={(v) => setSearchParams({ limit: v, page: "1" })}
          onNext={() =>
            setSearchParams({ page: (Number(searchParams.page) || 1) + 1 })
          }
          onPrev={() =>
            setSearchParams({ page: (Number(searchParams.page) || 1) - 1 })
          }
        />
      </div>
    </>
  );
}

export default Tasks;
