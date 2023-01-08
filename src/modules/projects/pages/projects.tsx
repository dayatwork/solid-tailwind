import { AuthSession } from "@supabase/supabase-js";

import { Dialog } from "../../../components";
import { useAuth } from "../../../contexts";
import { CreateProjectForm, ProjectList, ProjectTable } from "../components";
import { MyProjects } from "../components";
import { useProjects } from "../services";

export const SELECT_PROJECT_WITH_MEMBER_QUERY =
  "*, members:project_members(*, member:member_id(id, full_name, avatar_url))";

interface ProjectsProps {}

function Projects(props: ProjectsProps) {
  const [session] = useAuth();
  const query = useProjects();

  const myOngoingProjects = () => {
    const userId = (session() as AuthSession).user.id;

    if (!userId) return [];

    return query.data.filter((p) =>
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

      <MyProjects
        // loading={loading()}
        projects={myOngoingProjects()}
        loading={query.isLoading}
      />
      <ProjectList
        // projects={projects()}
        // loading={loading()}
        projects={query.data}
        loading={query.isLoading}
      />
      <ProjectTable
        // projects={projects()}
        // loading={loading()}
        projects={query.data}
        loading={query.isLoading}
      />
    </>
  );
}

export default Projects;
