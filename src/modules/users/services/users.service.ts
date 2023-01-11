import { createQuery } from "@tanstack/solid-query";
import { supabase } from "../../../lib";
import { Database } from "../../../lib/supabase/schema";

// ========================
// ======== Types =========
// ========================
export type User = Database["public"]["Tables"]["profiles"]["Row"];

// ===================================
// ======== Supabase Queries =========
// ===================================
export const SELECT_PROJECT_WITH_MEMBER_QUERY =
  "*, members:project_members(*, member:member_id(id, full_name, avatar_url))";

// =============================
// ======== Query Keys =========
// =============================
export const USERS_KEY = "users";

// ===========================
// ======== Fetchers =========
// ===========================
// ******* Get Users *******
interface GetUsersParams {
  limit?: number;
  page?: number;
  search?: string;
}

export const getUsers = async (params: GetUsersParams) => {
  const { search, limit = 10, page = 1 } = params;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("registered_at")
    .range(from, to);

  if (search) {
    query = query.or(
      `email.ilike.%${search}%,full_name.ilike.%${search}%,employee_number.ilike.%${search.toLowerCase()}%`
    );
  }

  let { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { count, users: data };
};

export const getUsersForDropdowns = async () => {
  let { data, error } = await supabase.from("profiles").select("id, full_name");

  if (error) {
    throw error;
  }

  return data.map((u) => ({ label: u.full_name, value: u.id }));
};

// ==================================
// ======== Query Functions =========
// ==================================
// ******* Get Users Query  *******
export const useUsers = (params: () => GetUsersParams) => {
  return createQuery(
    () => [USERS_KEY, params()],
    () => getUsers(params()),
    {
      staleTime: Infinity,
    }
  );
};

export const useUsersDropdown = () => {
  return createQuery(() => [USERS_KEY, "dropdown"], getUsersForDropdowns, {
    staleTime: Infinity,
  });
};
