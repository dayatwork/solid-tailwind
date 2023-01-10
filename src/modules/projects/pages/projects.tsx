import { useSearchParams } from "@solidjs/router";
import { AuthSession } from "@supabase/supabase-js";
import { HiSolidSearch } from "solid-icons/hi";
import { createEffect } from "solid-js";

import { Dialog, Select, SimplePagination } from "../../../components";
import SearchInput from "../../../components/inputs/SearchInput";
import { useAuth } from "../../../contexts";
import { CreateProjectForm, ProjectList, ProjectTable } from "../components";
import { MyProjects } from "../components";
import { projectStatusOptions, PROJECT_STATUS } from "../constant";
import { useProjects } from "../services";
import { ProjectStatus } from "../type";

interface ProjectsProps {}

function Projects(props: ProjectsProps) {
  const [session] = useAuth();
  const [searchParams, setSearchParams] = useSearchParams<{
    page: string;
    limit: string;
    status: string;
    search: string;
  }>();

  const params = () => ({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 5,
    name: searchParams.search || undefined,
    status: Object.keys(PROJECT_STATUS).includes(searchParams.status)
      ? (searchParams.status as ProjectStatus)
      : undefined,
  });

  const query = useProjects(params);

  const myOngoingProjects = () => {
    const userId = (session() as AuthSession).user.id;

    if (!userId) return [];

    return query.data.projects.filter((p) =>
      p.members.map((m) => m.member_id).includes(userId)
    );
  };

  return (
    <>
      <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Projects
          </h1>
        </div>
        <div class="mt-4 flex sm:mt-0 sm:ml-4">
          <Dialog
            trigger="Create"
            triggerClass="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
            title="Create Project"
          >
            {(api) => <CreateProjectForm close={api.close} />}
          </Dialog>
        </div>
      </div>

      <MyProjects projects={myOngoingProjects()} loading={query.isLoading} />

      <div class="mt-8 bg-white pl-4 sm:pl-8 pr-4 py-2 border-t border-gray-200 flex items-center justify-between gap-2 w-full">
        <SearchInput
          onChange={(e) => setSearchParams({ search: e.currentTarget.value })}
        />
        <div>
          <Select
            name="status"
            placeholder="Select Status"
            options={[{ label: "All", value: "" }, ...projectStatusOptions]}
            value={params().status || ""}
            onChange={(v) => setSearchParams({ status: v })}
            width={150}
          />
        </div>
      </div>

      <ProjectList projects={query.data.projects} loading={query.isLoading} />

      <ProjectTable projects={query.data.projects} loading={query.isLoading} />

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

export default Projects;
