import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import toast from "solid-toast";
import { supabase } from "../../../lib";
import { Database } from "../../../lib/supabase/schema";
import { TaskStatus } from "../type";

// ========================
// ======== Types =========
// ========================
type Assignor = {
  id: string;
  full_name: string;
  avatar_url: string;
  employee_number: string;
};
export type Task = Database["public"]["Tables"]["tasks"]["Row"];
export type TaskWithAssignor = Task & {
  assignor?: Assignor;
};

// ===================================
// ======== Supabase Queries =========
// ===================================
export const SELECT_TASK_WITH_ASSIGNOR =
  "*, assignor:assignor_id(id, full_name, employee_number, avatar_url)";

// =============================
// ======== Query Keys =========
// =============================
export const TASKS_KEY = "tasks";

// ===========================
// ======== Fetchers =========
// ===========================
// ******* Get Tasks *******
interface GetTasksParams {
  status?: TaskStatus;
  assignee_id?: string;
  assignor_id?: string;
  workplan_id?: string;
  task?: string;
  limit?: number;
  page?: number;
}

export const getTasks = async (params: GetTasksParams) => {
  const {
    status,
    assignee_id,
    assignor_id,
    workplan_id,
    task,
    limit = 10,
    page = 1,
  } = params;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("tasks")
    .select(SELECT_TASK_WITH_ASSIGNOR, { count: "exact" })
    .order("created_at")
    .range(from, to);

  if (status) {
    query = query.eq("status", status);
  }

  if (assignee_id) {
    query = query.eq("assignee_id", assignee_id);
  }

  if (assignor_id) {
    query = query.eq("assignor_id", assignor_id);
  }

  if (workplan_id) {
    query = query.eq("workplan_id", workplan_id);
  }

  if (task) {
    query = query.ilike("task", `%${task}%`);
  }

  let { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { count, tasks: data } as { count: number; tasks: TaskWithAssignor[] };
};

// ******* Get Task *******
export const getTask = async (id: string) => {
  let { data, error } = await supabase
    .from("tasks")
    .select(SELECT_TASK_WITH_ASSIGNOR)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as TaskWithAssignor;
};

// ******* Create Task *******
interface CreateTaskInputs {
  assignee_id: string;
  task: string;
  description?: string;
  target?: number;
  status?: TaskStatus;
  assignor_id?: string;
}

export const createTask = async (inputs: CreateTaskInputs) => {
  let { data, error } = await supabase.from("tasks").insert(inputs);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Update Task *******
interface UpdateTaskInputs {
  assignee_id?: string;
  task?: string;
  description?: string;
  target?: number;
  status?: TaskStatus;
  assignor_id?: string;
}

export const updateTask = async (id: string, inputs: UpdateTaskInputs) => {
  let { data, error } = await supabase
    .from("tasks")
    .update(inputs)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Delete Task *******
export const deleteTask = async (id: string) => {
  let { data, error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ==================================
// ======== Query Functions =========
// ==================================
// ******* Get Tasks Query  *******
export const useTasks = (params: () => GetTasksParams) => {
  return createQuery(
    () => [TASKS_KEY, params()],
    () => getTasks(params()),
    {
      staleTime: Infinity,
    }
  );
};

// ******* Get Task Query  *******
export const useTask = (id: string) => {
  return createQuery(
    () => [TASKS_KEY, id],
    () => getTask(id),
    {
      staleTime: Infinity,
      enabled: Boolean(id),
    }
  );
};

// ==================================
// ======= Mutation Functions =======
// ==================================
// ******* Create Task Mutation *******
interface UseCreateTaskProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useCreateTask = (props?: UseCreateTaskProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (props: CreateTaskInputs) => createTask(props),
    onSuccess: () => {
      queryClient.invalidateQueries([TASKS_KEY]);
      toast.success("New task created");
      props?.onSuccess?.();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      props?.onError?.();
    },
  });
};

// ******* Update Task Mutation *******
interface UseUpdateTaskProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useUpdateTask = (props?: UseUpdateTaskProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (variables: { id: string; inputs: UpdateTaskInputs }) =>
      updateTask(variables.id, variables.inputs),
    onSuccess: () => {
      queryClient.invalidateQueries([TASKS_KEY]);
      toast.success("Task updated");
      props?.onSuccess?.();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      props?.onError?.();
    },
  });
};

// ******* Delete Task Mutation *******
interface UseDeleteTaskProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useDeleteTask = (props?: UseDeleteTaskProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries([TASKS_KEY]);
      toast.success("Task deleted");
      props?.onSuccess?.();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      props?.onError?.();
    },
  });
};
