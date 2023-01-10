import { A, useParams } from "@solidjs/router";
import { HiSolidArrowLeft, HiSolidPencil } from "solid-icons/hi";
import { TbTarget } from "solid-icons/tb";
import { Match, Show, Switch } from "solid-js";

import { Badge, Dialog, Loader } from "../../../components";
import // DeleteProjectForm,
// ProjectInfo,
// ProjectMembers,
// UpdateProjectForm,
"../components";
import { DeleteTaskForm, UpdateTaskForm } from "../components";
// import { DeleteWorkplanForm, UpdateWorkplanForm } from "../components";
import { TASK_STATUS } from "../constant";
import { useTask } from "../services";

interface TaskDetailProps {}

function TaskDetail(props: TaskDetailProps) {
  const params = useParams();
  const query = useTask(params.id);

  return (
    <Switch>
      <Match when={query.isLoading}>
        <div class="flex-1 flex items-center justify-center h-screen">
          <Loader />
        </div>
      </Match>
      <Match when={query.data}>
        <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div class="min-w-0 flex-1 flex items-center gap-4">
            <A
              href="/tasks"
              class="p-1.5 hover:bg-purple-100 rounded-md transition"
            >
              <HiSolidArrowLeft />
            </A>
            <p class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Task Detail
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
                        <div class="flex space-x-3 items-center">
                          <h1 class="text-2xl font-bold text-gray-900">
                            {query.data.task}
                          </h1>
                        </div>
                        <div class="my-2 flex items-center space-x-1 text-gray-600">
                          <TbTarget size={24} />
                          <p class="mb-0.5 text-gray-700 font-medium">
                            Target {query.data.target}%
                          </p>
                        </div>
                        <Badge color={TASK_STATUS[query.data.status].color}>
                          {query.data.status}
                        </Badge>
                      </div>
                      <div class="mt-4 flex space-x-3 md:mt-0">
                        {/* Can only edit selt assign unplanned task */}
                        <Show
                          when={
                            !query.data.workplan_id && !query.data.assignor_id
                          }
                        >
                          <Dialog
                            trigger={
                              <div class="flex items-center space-x-2">
                                <HiSolidPencil size={20} />
                                <span>Edit</span>
                              </div>
                            }
                            triggerClass="inline-flex justify-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                            title="Edit Task"
                          >
                            {(api) => (
                              <UpdateTaskForm
                                close={api.close}
                                defaultTask={query.data}
                              />
                            )}
                          </Dialog>
                        </Show>
                      </div>
                    </div>
                    <aside class="mt-8 xl:hidden">
                      <h2 class="sr-only">Details</h2>
                      {/* <div class="space-y-5">
                        <ProjectInfo project={query.data} />
                      </div>
                      <div class="mt-6 space-y-8 border-t border-b border-gray-200 py-6">
                        <ProjectMembers project={query.data} />
                      </div> */}
                    </aside>
                    <div class="py-3 xl:pt-6 xl:pb-0">
                      <h2 class="text-sm font-medium text-gray-900 mb-2">
                        Description
                      </h2>
                      <div class="max-w-5xl">
                        <p class="text-gray-900">{query.data.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <aside class="hidden xl:block xl:pl-8">
                {/* Can only delete unplanned task and self assign task when status 'assigned' or 'ongoing'*/}
                <Show
                  when={
                    !query.data.workplan_id &&
                    !query.data.assignor_id &&
                    ["assigned", "ongoing"].includes(query.data.status)
                  }
                >
                  <h2 class="mt-6 text-sm font-medium text-red-500">
                    Danger Zone
                  </h2>
                  <div class="mt-3 space-y-8 ">
                    <DeleteTaskForm task={query.data} />
                  </div>
                </Show>
              </aside>
            </div>
          </div>
        </main>
      </Match>
    </Switch>
  );
}

export default TaskDetail;
