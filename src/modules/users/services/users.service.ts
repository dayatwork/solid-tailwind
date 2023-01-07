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
export const getUsersForDropdowns = async () => {
  let { data, error } = await supabase.from("profiles").select("id, full_name");

  if (error) {
    throw error;
  }

  return data.map((u) => ({ label: u.full_name, value: u.id }));
};

export const getUsers = async () => {
  let { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw error;
  }

  return data;
};

// ==================================
// ======== Query Functions =========
// ==================================
// ******* Get Users Query  *******
export const useUsers = () => {
  return createQuery(() => [USERS_KEY], getUsers, {
    staleTime: Infinity,
  });
};

export const useUsersDropdown = () => {
  return createQuery(() => [USERS_KEY, "dropdown"], getUsersForDropdowns, {
    staleTime: Infinity,
  });
};
