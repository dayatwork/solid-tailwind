import { Database } from "../../lib/supabase/schema";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
