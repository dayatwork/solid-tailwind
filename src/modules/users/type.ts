import { Database } from "../../lib/supabase/schema";

export type User = Database["public"]["Tables"]["profiles"]["Row"];
