import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import toast from "solid-toast";
import { supabase } from "../../../lib";
import { Database } from "../../../lib/supabase/schema";
import { WorkplanStatus } from "../type";

// ========================
// ======== Types =========
// ========================
export type Workplan = Database["public"]["Tables"]["workplans"]["Row"];

// =============================
// ======== Query Keys =========
// =============================
export const WORKPLANS_KEY = "workplans";

// ===========================
// ======== Fetchers =========
// ===========================
// ******* Get Workplans *******
export const getWorkplans = async () => {
  let { data, error } = await supabase
    .from("workplans")
    .select("*")
    .order("created_at");

  if (error) {
    throw error;
  }

  return data;
};

// ******* Get Workplan *******
export const getWorkplan = async (id: string) => {
  let { data, error } = await supabase
    .from("workplans")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// ******* Create Workplan *******
interface CreateWorkplanInputs {
  employee_id: string;
  plan: string;
  description?: string;
  week: number;
  year: number;
  status: WorkplanStatus;
}

export const createWorkplan = async (inputs: CreateWorkplanInputs) => {
  let { data, error } = await supabase.from("workplans").insert(inputs);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Update Workplan *******
interface UpdateWorkplanInputs {
  employee_id: string;
  plan: string;
  description?: string;
  week: number;
  year: number;
  status: WorkplanStatus;
}

export const updateWorkplan = async (
  id: string,
  inputs: UpdateWorkplanInputs
) => {
  let { data, error } = await supabase
    .from("workplans")
    .update(inputs)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Delete Workplan *******
export const deleteWorkplan = async (id: string) => {
  let { data, error } = await supabase.from("workplans").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ==================================
// ======== Query Functions =========
// ==================================
// ******* Get Workplans Query  *******
export const useWorkplans = () => {
  return createQuery(() => [WORKPLANS_KEY], getWorkplans, {
    staleTime: Infinity,
  });
};

// ******* Get Workplan Query  *******
export const useWorkplan = (id: string) => {
  return createQuery(
    () => [WORKPLANS_KEY, id],
    () => getWorkplan(id),
    {
      staleTime: Infinity,
      enabled: Boolean(id),
    }
  );
};

// ==================================
// ======= Mutation Functions =======
// ==================================
// ******* Create Workplan Mutation *******
interface UseCreateWorkplanProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useCreateWorkplan = (props?: UseCreateWorkplanProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (props: CreateWorkplanInputs) => createWorkplan(props),
    onSuccess: () => {
      queryClient.invalidateQueries([WORKPLANS_KEY]);
      toast.success("New work plan created");
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

// ******* Update Workplan Mutation *******
interface UseUpdateWorkplanProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useUpdateWorkplan = (props?: UseUpdateWorkplanProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (variables: { id: string; inputs: UpdateWorkplanInputs }) =>
      updateWorkplan(variables.id, variables.inputs),
    onSuccess: () => {
      queryClient.invalidateQueries([WORKPLANS_KEY]);
      toast.success("Work plan updated");
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

// ******* Delete Workplan Mutation *******
interface UseDeleteWorkplanProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useDeleteWorkplan = (props?: UseDeleteWorkplanProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (id: string) => deleteWorkplan(id),
    onSuccess: () => {
      queryClient.invalidateQueries([WORKPLANS_KEY]);
      toast.success("Work plan deleted");
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
