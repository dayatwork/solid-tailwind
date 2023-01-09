import { Database } from "../../lib/supabase/schema";

export type ProjectStatus = Database["public"]["Enums"]["project_status"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export type ProjectMember =
  Database["public"]["Tables"]["project_members"]["Row"];

export type MemberWithUser = ProjectMember & {
  member: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
};

export type ProjectWithMembers = Project & { members: MemberWithUser[] };
