import { useSearchParams } from "@solidjs/router";
import {
  Dialog,
  NumberInput,
  Select,
  SimplePagination,
} from "../../../components";
import SearchInput from "../../../components/inputs/SearchInput";
import { CURRENT_YEAR } from "../../../utils/date";
import {
  WorkplanList,
  WorkplanTable,
  ApprovedWorkplans,
  CreateWorkplanForm,
} from "../components";
import { workplanStatusOptions, WORKPLAN_STATUS } from "../constant";
import { useWorkplans } from "../services";
import { WorkplanStatus } from "../type";

interface WorkplansProps {}

function Workplans(props: WorkplansProps) {
  const [searchParams, setSearchParams] = useSearchParams<{
    page: string;
    limit: string;
    status: string;
    search: string;
    week: string;
    year: string;
  }>();

  const params = () => ({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 5,
    week: Number(searchParams.week) || undefined,
    year: Number(searchParams.year) || CURRENT_YEAR,
    plan: searchParams.search || undefined,
    status: Object.keys(WORKPLAN_STATUS).includes(searchParams.status)
      ? (searchParams.status as WorkplanStatus)
      : undefined,
  });

  const query = useWorkplans(params);

  const approvedWorkplans = () =>
    query.data.workplans.filter((wp) => wp.status === "approved");

  return (
    <>
      <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Work Plans
          </h1>
        </div>
        <div class="mt-4 flex sm:mt-0 sm:ml-4">
          <Dialog
            trigger="Create"
            triggerClass="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
            title="Create Workplan"
          >
            {(api) => <CreateWorkplanForm close={api.close} />}
          </Dialog>
        </div>
      </div>

      <ApprovedWorkplans
        workplans={approvedWorkplans()}
        loading={query.isLoading}
      />

      <div class="mt-8 bg-white pl-4 sm:pl-8 pr-4 py-2 border-t border-gray-200 flex items-center justify-between gap-2 w-full">
        <SearchInput
          onChange={(e) => setSearchParams({ search: e.currentTarget.value })}
        />
        <div class="flex justify-end gap-2">
          <NumberInput
            min={1}
            max={52}
            placeholder="Week"
            width={100}
            onChange={(v) => setSearchParams({ week: v ? String(v) : "" })}
          />
          <Select
            name="year"
            placeholder="Select Year"
            options={[
              CURRENT_YEAR + 1,
              CURRENT_YEAR,
              CURRENT_YEAR - 1,
              CURRENT_YEAR - 2,
            ].map((v) => ({ label: String(v), value: String(v) }))}
            value={String(params().year) || ""}
            onChange={(v) => setSearchParams({ year: v })}
            width={100}
          />
          <Select
            name="status"
            placeholder="Select Status"
            options={[
              { label: "All Status", value: "" },
              ...workplanStatusOptions,
            ]}
            value={params().status || ""}
            onChange={(v) => setSearchParams({ status: v })}
            width={150}
          />
        </div>
      </div>

      <WorkplanList
        workplans={query.data.workplans}
        loading={query.isLoading}
      />
      <WorkplanTable
        workplans={query.data.workplans}
        loading={query.isLoading}
      />

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

export default Workplans;
