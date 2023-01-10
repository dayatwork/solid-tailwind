import { Database } from "../../lib/supabase/schema";

export type TaskStatus = Database["public"]["Enums"]["task_status"];
