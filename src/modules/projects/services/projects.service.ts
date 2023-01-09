import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import toast from "solid-toast";

import { supabase } from "../../../lib";
import { Database } from "../../../lib/supabase/schema";
import { ProjectStatus } from "../type";

// ========================
// ======== Types =========
// ========================
type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectMember = Database["public"]["Tables"]["project_members"]["Row"];
type MemberWithUser = ProjectMember & {
  member: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
};

export type ProjectWithMembers = Project & { members: MemberWithUser[] };

// ===================================
// ======== Supabase Queries =========
// ===================================
export const SELECT_PROJECT_WITH_MEMBER_QUERY =
  "*, members:project_members(*, member:member_id(id, full_name, avatar_url))";

// =============================
// ======== Query Keys =========
// =============================
export const PROJECTS_KEY = "projects";

// ===========================
// ======== Fetchers =========
// ===========================
// ******* Get Projects *******
export const getProjects = async () => {
  let { data, error } = await supabase
    .from("projects")
    .select(SELECT_PROJECT_WITH_MEMBER_QUERY)
    .order("created_at");

  if (error) {
    throw error;
  }

  return data as ProjectWithMembers[];
};

// ******* Get Project *******
export const getProject = async (id: string) => {
  let { data, error } = await supabase
    .from("projects")
    .select(SELECT_PROJECT_WITH_MEMBER_QUERY)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as ProjectWithMembers;
};

// ******* Create Project *******
interface CreateProjectInputs {
  name: string;
  description?: string;
  status: ProjectStatus;
}

export const createProject = async (inputs: CreateProjectInputs) => {
  let { data, error } = await supabase.from("projects").insert(inputs);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Update Project *******
interface UpdateProjectInputs {
  name: string;
  description?: string;
  status: ProjectStatus;
}

export const updateProject = async (
  id: string,
  inputs: UpdateProjectInputs
) => {
  let { data, error } = await supabase
    .from("projects")
    .update(inputs)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Delete Project *******
export const deleteProject = async (id: string) => {
  let { data, error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Add Project Member *******
interface AddProjectMemberInputs {
  project_id: string;
  member_id: string;
  position: string;
}
export const addProjectMember = async (props: AddProjectMemberInputs) => {
  let { data, error } = await supabase.from("project_members").insert(props);

  if (error) {
    throw error;
  }

  return data;
};

// ******* Delete Project Member *******
export const deleteProjectMember = async (id: string) => {
  const { data, error } = await supabase
    .from("project_members")
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
// ******* Get Projects Query  *******
export const useProjects = () => {
  return createQuery(() => [PROJECTS_KEY], getProjects, {
    staleTime: Infinity,
  });
};

// ******* Get Project Query  *******
export const useProject = (id: string) => {
  return createQuery(
    () => [PROJECTS_KEY, id],
    () => getProject(id),
    {
      staleTime: Infinity,
      enabled: Boolean(id),
    }
  );
};

// ==================================
// ======= Mutation Functions =======
// ==================================
// ******* Create Project Mutation *******
interface UseCreateProjectProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useCreateProject = (props?: UseCreateProjectProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (props: CreateProjectInputs) => createProject(props),
    onSuccess: () => {
      queryClient.invalidateQueries([PROJECTS_KEY]);
      toast.success("New project created");
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

// ******* Update Project Mutation *******
interface UseUpdateProjectProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useUpdateProject = (props?: UseUpdateProjectProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (variables: { id: string; inputs: UpdateProjectInputs }) =>
      updateProject(variables.id, variables.inputs),
    onSuccess: () => {
      queryClient.invalidateQueries([PROJECTS_KEY]);
      toast.success("Project updated");
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

// ******* Delete Project Mutation *******
interface UseDeleteProjectProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useDeleteProject = (props?: UseDeleteProjectProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries([PROJECTS_KEY]);
      toast.success("Project deleted");
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

// ******* Add Project Member Mutation *******
interface UseAddProjectMemberProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useAddProjectMember = (props?: UseAddProjectMemberProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (inputs: AddProjectMemberInputs) => addProjectMember(inputs),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([PROJECTS_KEY, variables.project_id]);
      queryClient.invalidateQueries([PROJECTS_KEY]);
      toast.success("New member added");
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

// ******* Delete Project Member Mutation *******
interface UseDeleteProjectMemberProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useDeleteProjectMember = (props?: UseDeleteProjectMemberProps) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: (id: string) => deleteProjectMember(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries([PROJECTS_KEY, id]);
      queryClient.invalidateQueries([PROJECTS_KEY]);
      toast.success("Member removed");
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
