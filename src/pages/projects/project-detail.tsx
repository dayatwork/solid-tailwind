import { A, useParams } from "@solidjs/router";
import { HiSolidArrowLeft, HiSolidPencil } from "solid-icons/hi";
import { createSignal, onMount, Show } from "solid-js";
import toast from "solid-toast";

import { Dialog, Loader } from "../../components";
import { supabase } from "../../lib";
import {
  CreateProjectForm,
  DeleteProjectForm,
  ProjectInfo,
  ProjectMembers,
  UpdateProjectForm,
} from "./components";
import { ProjectWithMembers } from "./type";

export const SELECT_PROJECT_WITH_MEMBER_QUERY =
  "*, members:project_members(*, member:member_id(id, full_name, avatar_url))";

interface ProjectDetailProps {
  // add props here
}

function ProjectDetail(props: ProjectDetailProps) {
  const params = useParams();
  const [loading, setLoading] = createSignal(false);
  const [project, setProject] = createSignal<ProjectWithMembers>();

  onMount(() => {
    getProject();
  });

  const getProject = async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("projects")
        .select(SELECT_PROJECT_WITH_MEMBER_QUERY)
        .eq("id", params.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProject(data as ProjectWithMembers);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Show
      when={!loading() && project()}
      fallback={
        <div class="flex-1 flex items-center justify-center h-screen">
          <Loader />
        </div>
      }
    >
      <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div class="min-w-0 flex-1 flex items-center gap-4">
          <A
            href="/projects"
            class="p-1.5 hover:bg-purple-100 rounded-md transition"
          >
            <HiSolidArrowLeft />
          </A>
          <p class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Project Detail
          </p>
        </div>
      </div>

      <main class="flex-1">
        <div class="py-8 xl:py-10">
          <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-full xl:px-10 xl:grid-cols-3">
            <div class="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
              <div>
                <div>
                  <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div>
                      <h1 class="text-2xl font-bold text-gray-900">
                        {project().name}
                      </h1>
                    </div>
                    <div class="mt-4 flex space-x-3 md:mt-0">
                      <Dialog
                        trigger={
                          <div class="flex items-center space-x-2">
                            <HiSolidPencil size={20} />
                            <span>Edit</span>
                          </div>
                        }
                        triggerClass="inline-flex justify-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        title="Edit Project"
                      >
                        {(api) => (
                          <UpdateProjectForm
                            close={api.close}
                            handleSetProject={(project) => setProject(project)}
                            defaultProject={project()}
                          />
                        )}
                      </Dialog>
                    </div>
                  </div>
                  <aside class="mt-8 xl:hidden">
                    <h2 class="sr-only">Details</h2>
                    <div class="space-y-5">
                      <ProjectInfo project={project()} />
                    </div>
                    <div class="mt-6 space-y-8 border-t border-b border-gray-200 py-6">
                      <ProjectMembers project={project()} />
                    </div>
                  </aside>
                  <div class="py-3 xl:pt-6 xl:pb-0">
                    <h2 class="text-sm font-medium text-gray-900 mb-2">
                      Description
                    </h2>
                    <div class="max-w-5xl">
                      <p class="text-gray-900">{project().description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <aside class="hidden xl:block xl:pl-8">
              <h2 class="sr-only">Details</h2>
              <div class="space-y-5">
                <ProjectInfo project={project()} />
              </div>
              <div class="mt-6 space-y-8 border-t border-gray-200 py-6">
                <ProjectMembers project={project()} />
              </div>
              <div class="mt-6 border-t border-gray-200 py-6">
                <h2 class="text-sm font-medium text-red-500">Danger Zone</h2>
                <div class="mt-3 space-y-8 ">
                  <DeleteProjectForm project={project()} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </Show>
  );
}

export default ProjectDetail;
