import { createSignal, onMount } from "solid-js";
import toast from "solid-toast";

import { Dialog } from "../../components";
import { supabase } from "../../lib";
import { CreateProjectForm, ProjectList, ProjectTable } from "./components";
import { PinnedProject } from "./components/PinnedProject";
import { ProjectWithMembers } from "./type";

export const SELECT_PROJECT_WITH_MEMBER_QUERY =
  "*, members:project_members(*, member:member_id(id, full_name, avatar_url))";
interface ProjectsProps {
  // add props here
}

function Projects(props: ProjectsProps) {
  const [loading, setLoading] = createSignal(false);
  const [projects, setProjects] = createSignal<ProjectWithMembers[]>([]);

  onMount(() => {
    getProjects();
  });

  const getProjects = async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("projects")
        .select(SELECT_PROJECT_WITH_MEMBER_QUERY);

      if (error) {
        throw error;
      }

      if (data) {
        setProjects(data as ProjectWithMembers[]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetProject = (newProject: ProjectWithMembers) => {
    setProjects([...projects(), newProject]);
  };

  return (
    <>
      <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Project
          </h1>
        </div>
        <div class="mt-4 flex sm:mt-0 sm:ml-4">
          <Dialog
            trigger="Create"
            triggerClass="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
            title="Create Project"
          >
            {(api) => (
              <CreateProjectForm
                close={api.close}
                handleSetProjects={handleSetProject}
              />
            )}
          </Dialog>
        </div>
      </div>

      <PinnedProject />
      <ProjectList projects={projects()} loading={loading()} />
      <ProjectTable projects={projects()} loading={loading()} />
    </>
  );
}

export default Projects;
