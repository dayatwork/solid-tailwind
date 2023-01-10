import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import toast from "solid-toast";
import { supabase } from "../../../lib";
import { Database } from "../../../lib/supabase/schema";
import { TaskStatus } from "../../tasks/type";

// ========================
// ======== Types =========
// ========================
type Task = { id: string; task: string; status: TaskStatus; target: number };
export type Tracker = Database["public"]["Tables"]["task_trackers"]["Row"];
export type TrackerWithTask = Tracker & { task: Task };

// ===================================
// ======== Supabase Queries =========
// ===================================
export const SELECT_TRACKER_WITH_TASK_QUERY =
  "*, task:task_id(id, task, status, target)";

// =============================
// ======== Query Keys =========
// =============================
export const TRACKERS_KEY = "task_trackers";

// ===========================
// ======== Fetchers =========
// ===========================
// ******* Get Trackers *******
interface GetTrackersParams {
  task_id?: string;
  employee_id?: string;
  start_at_from?: string;
  start_at_to?: string;
  limit?: number;
  page?: number;
}

export const getTrackers = async (params: GetTrackersParams) => {
  const {
    task_id,
    employee_id,
    start_at_from,
    start_at_to,
    limit = 10,
    page = 1,
  } = params;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("task_trackers")
    .select(SELECT_TRACKER_WITH_TASK_QUERY)
    .order("start_at", { ascending: false })
    .range(from, to);

  if (task_id) {
    query = query.eq("task_id", task_id);
  }

  if (employee_id) {
    query = query.eq("employee_id", employee_id);
  }

  if (start_at_from) {
    query = query.gte("start_at", start_at_from);
  }

  if (start_at_to) {
    query = query.lte("start_at", start_at_to);
  }

  let { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as TrackerWithTask[];
};

// ******* Get Tracker *******
export const getTracker = async (id: string) => {
  let { data, error } = await supabase
    .from("task_trackers")
    .select(SELECT_TRACKER_WITH_TASK_QUERY)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as TrackerWithTask;
};

// ******* Get Trackers *******
export const getRunningTrackers = async () => {
  let { data, error } = await supabase
    .from("task_trackers")
    .select(SELECT_TRACKER_WITH_TASK_QUERY)
    .is("end_at", null);

  if (error) {
    throw error;
  }

  return data as TrackerWithTask[];
};

// ******* Start Tracker *******
interface StartTrackerInputs {
  task_id?: string;
  employee_id: string;
}

export const startTracker = async (inputs: StartTrackerInputs) => {
  const { data: runningTracker } = await supabase
    .from("task_trackers")
    .select("id")
    .eq("employee_id", inputs.employee_id)
    .is("end_at", null)
    .limit(1)
    .single();

  if (runningTracker) {
    throw new Error("Tracker already running");
  }

  let { data, error } = await supabase.from("task_trackers").insert(inputs);

  if (error) {
    throw error;
  }

  return data;
};

// ******* End Tracker *******
interface EndTrackerInputs {
  value?: number;
  note?: string;
  task_id?: string;
}

export const endTracker = async (id: string, inputs: EndTrackerInputs) => {
  let { data, error } = await supabase
    .from("task_trackers")
    .update({ ...inputs, end_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Update Tracker *******
interface UpdateTrackerInputs {
  value?: number;
  start_at?: string;
  end_at?: string;
  note?: string;
  task_id?: string;
}

export const updateTracker = async (
  id: string,
  inputs: UpdateTrackerInputs
) => {
  let { data, error } = await supabase
    .from("task_trackers")
    .update(inputs)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Delete Tracker *******
export const deleteTracker = async (id: string) => {
  let { data, error } = await supabase
    .from("task_trackers")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ==================================
// ======== Query Functions =========
// ==================================
// ******* Get Trackers Query  *******
export const useTrackers = (params: GetTrackersParams) => {
  return createQuery(
    () => [TRACKERS_KEY, params],
    () => getTrackers(params),
    {
      staleTime: Infinity,
    }
  );
};

// ******* Get Tracker Query  *******
export const useTracker = (id: string) => {
  return createQuery(
    () => [TRACKERS_KEY, id],
    () => getTracker(id),
    {
      staleTime: Infinity,
      enabled: Boolean(id),
    }
  );
};

export const useRunningTrackers = () => {
  return createQuery(() => ["Running", TRACKERS_KEY], getRunningTrackers, {
    staleTime: 1000 * 60,
  });
};

// ==================================
// ======= Mutation Functions =======
// ==================================
// ******* Start Tracker Mutation *******
interface UseStartTrackerProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useStartTracker = (props?: UseStartTrackerProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (props: StartTrackerInputs) => startTracker(props),
    onSuccess: () => {
      queryClient.invalidateQueries([TRACKERS_KEY]);
      toast.success("New tracker started");
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

// ******* End Tracker Mutation *******
interface UseEndTrackerProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useEndTracker = (props?: UseEndTrackerProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (variable: { id: string; props: EndTrackerInputs }) =>
      endTracker(variable.id, variable.props),
    onSuccess: () => {
      queryClient.invalidateQueries([TRACKERS_KEY]);
      toast.success("New tracker ended");
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

// ******* Update Tracker Mutation *******
interface UseUpdateTrackerProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useUpdateTracker = (props?: UseUpdateTrackerProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (variables: { id: string; inputs: UpdateTrackerInputs }) =>
      updateTracker(variables.id, variables.inputs),
    onSuccess: () => {
      queryClient.invalidateQueries([TRACKERS_KEY]);
      toast.success("Tracker updated");
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

// ******* Delete Tracker Mutation *******
interface UseDeleteTrackerProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useDeleteTracker = (props?: UseDeleteTrackerProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (id: string) => deleteTracker(id),
    onSuccess: () => {
      queryClient.invalidateQueries([TRACKERS_KEY]);
      toast.success("Tracker deleted");
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
