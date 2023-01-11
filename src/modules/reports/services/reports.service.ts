import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import toast from "solid-toast";
import { supabase } from "../../../lib";
import { Database } from "../../../lib/supabase/schema";

// ========================
// ======== Types =========
// ========================
type Task = Database["public"]["Tables"]["tasks"]["Row"];
type Employee = Database["public"]["Tables"]["profiles"]["Row"];

export type Report = Database["public"]["Tables"]["reports"]["Row"];
export type ReportWithTaskAndEmployee = Report & {
  task: Task;
  employee: Employee;
};

// ===================================
// ======== Supabase Queries =========
// ===================================
export const SELECT_REPORT_WITH_TASK_AND_EMPLOYEE =
  "*, task:task_id(*), employee:employee_id(*)";

// =============================
// ======== Query Keys =========
// =============================
export const REPORTS_KEY = "reports";
export const REPORTS_WITH_TASK_AND_EMPLOYEE_KEY =
  "reports-with-task-and-employee";

// ===========================
// ======== Fetchers =========
// ===========================
// ******* Get Reports *******
interface GetReportsParams {
  employee_id?: string;
  task_id?: string;
  checked_by?: string;
  limit?: number;
  page?: number;
}

export const getReports = async (params: GetReportsParams) => {
  const { checked_by, employee_id, task_id, limit = 10, page = 1 } = params;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("reports")
    .select("*")
    .order("created_at")
    .range(from, to);

  if (employee_id) {
    query = query.eq("employee_id", employee_id);
  }

  if (task_id) {
    query = query.eq("task_id", task_id);
  }

  if (checked_by) {
    query = query.eq("checked_by", checked_by);
  }

  let { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
};

// ******* Get Report *******
export const getReport = async (id: string) => {
  let { data, error } = await supabase
    .from("reports")
    .select(SELECT_REPORT_WITH_TASK_AND_EMPLOYEE)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as ReportWithTaskAndEmployee;
};

// ******* Create Report *******
interface CreateReportInputs {
  task_id: string;
  employee_id: string;
  report: string;
}

export const createReport = async (inputs: CreateReportInputs) => {
  let { data, error } = await supabase.from("reports").insert(inputs);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Update Report *******
interface UpdateReportInputs {
  report: string;
}

export const updateReport = async (id: string, inputs: UpdateReportInputs) => {
  let { data, error } = await supabase
    .from("reports")
    .update(inputs)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Delete Report *******
export const deleteReport = async (id: string) => {
  let { data, error } = await supabase.from("reports").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ==================================
// ======== Query Functions =========
// ==================================
// ******* Get Reports Query  *******
export const useReports = (params: GetReportsParams) => {
  return createQuery(
    () => [REPORTS_KEY, params],
    () => getReports(params),
    {
      staleTime: Infinity,
    }
  );
};

// ******* Get Report Query  *******
export const useReport = (id: string) => {
  return createQuery(
    () => [REPORTS_KEY, id],
    () => getReport(id),
    {
      staleTime: Infinity,
      enabled: Boolean(id),
    }
  );
};

// ==================================
// ======= Mutation Functions =======
// ==================================
// ******* Create Report Mutation *******
interface UseCreateReportProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useCreateReport = (props?: UseCreateReportProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (props: CreateReportInputs) => createReport(props),
    onSuccess: () => {
      queryClient.invalidateQueries([REPORTS_KEY]);
      toast.success("Report created");
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

// ******* Update Report Mutation *******
interface UseUpdateReportProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useUpdateReport = (props?: UseUpdateReportProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (variables: { id: string; inputs: UpdateReportInputs }) =>
      updateReport(variables.id, variables.inputs),
    onSuccess: () => {
      queryClient.invalidateQueries([REPORTS_KEY]);
      toast.success("Report updated");
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

// ******* Delete Report Mutation *******
interface UseDeleteReportProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useDeleteReport = (props?: UseDeleteReportProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (id: string) => deleteReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries([REPORTS_KEY]);
      toast.success("Report deleted");
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
