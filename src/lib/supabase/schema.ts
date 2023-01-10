export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          employee_number: string | null
          full_name: string | null
          id: string
          last_sign_in_at: string | null
          registered_at: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          employee_number?: string | null
          full_name?: string | null
          id: string
          last_sign_in_at?: string | null
          registered_at?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          employee_number?: string | null
          full_name?: string | null
          id?: string
          last_sign_in_at?: string | null
          registered_at?: string
          updated_at?: string | null
        }
      }
      project_members: {
        Row: {
          id: string
          join_at: string
          member_id: string
          position: string
          project_id: string
        }
        Insert: {
          id?: string
          join_at?: string
          member_id: string
          position: string
          project_id: string
        }
        Update: {
          id?: string
          join_at?: string
          member_id?: string
          position?: string
          project_id?: string
        }
      }
      project_timelines: {
        Row: {
          created_at: string
          created_by: string
          id: string
          project_id: string
          status: Database["public"]["Enums"]["project_status"]
        }
        Insert: {
          created_at?: string
          created_by: string
          id: string
          project_id: string
          status: Database["public"]["Enums"]["project_status"]
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          project_id?: string
          status?: Database["public"]["Enums"]["project_status"]
        }
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
        }
      }
      report_attachment: {
        Row: {
          attachment: string
          created_at: string
          employee_id: string
          id: string
          name: string
          report_id: string
          type: Database["public"]["Enums"]["report_attachment_type"]
        }
        Insert: {
          attachment: string
          created_at?: string
          employee_id: string
          id: string
          name: string
          report_id: string
          type: Database["public"]["Enums"]["report_attachment_type"]
        }
        Update: {
          attachment?: string
          created_at?: string
          employee_id?: string
          id?: string
          name?: string
          report_id?: string
          type?: Database["public"]["Enums"]["report_attachment_type"]
        }
      }
      reports: {
        Row: {
          checked_by: string | null
          created_at: string
          employee_id: string
          id: string
          report: string
          task_id: string
          updated_at: string
        }
        Insert: {
          checked_by?: string | null
          created_at?: string
          employee_id: string
          id?: string
          report: string
          task_id: string
          updated_at?: string
        }
        Update: {
          checked_by?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          report?: string
          task_id?: string
          updated_at?: string
        }
      }
      task_timelines: {
        Row: {
          created_at: string
          created_by: string
          id: string
          status: Database["public"]["Enums"]["task_status"]
          task_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id: string
          status: Database["public"]["Enums"]["task_status"]
          task_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          status?: Database["public"]["Enums"]["task_status"]
          task_id?: string
        }
      }
      task_trackers: {
        Row: {
          employee_id: string
          end_at: string | null
          id: string
          is_lock: boolean
          note: string | null
          start_at: string
          task_id: string | null
          value: number | null
        }
        Insert: {
          employee_id: string
          end_at?: string | null
          id?: string
          is_lock?: boolean
          note?: string | null
          start_at?: string
          task_id?: string | null
          value?: number | null
        }
        Update: {
          employee_id?: string
          end_at?: string | null
          id?: string
          is_lock?: boolean
          note?: string | null
          start_at?: string
          task_id?: string | null
          value?: number | null
        }
      }
      tasks: {
        Row: {
          assignee_id: string
          assignor_id: string | null
          created_at: string
          description: string | null
          id: string
          status: Database["public"]["Enums"]["task_status"]
          target: number
          task: string
          updated_at: string
          workplan_id: string | null
        }
        Insert: {
          assignee_id: string
          assignor_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["task_status"]
          target?: number
          task: string
          updated_at?: string
          workplan_id?: string | null
        }
        Update: {
          assignee_id?: string
          assignor_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["task_status"]
          target?: number
          task?: string
          updated_at?: string
          workplan_id?: string | null
        }
      }
      workplans: {
        Row: {
          created_at: string
          description: string | null
          employee_id: string
          id: string
          plan: string
          status: Database["public"]["Enums"]["workplan_status"]
          target: number
          updated_at: string
          week: number
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          employee_id: string
          id?: string
          plan: string
          status?: Database["public"]["Enums"]["workplan_status"]
          target?: number
          updated_at?: string
          week: number
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          employee_id?: string
          id?: string
          plan?: string
          status?: Database["public"]["Enums"]["workplan_status"]
          target?: number
          updated_at?: string
          week?: number
          year?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_status:
        | "draft"
        | "planning"
        | "ongoing"
        | "done"
        | "canceled"
        | "pending"
      report_attachment_type: "storage" | "url"
      task_status: "assigned" | "ongoing" | "completed" | "checked"
      workplan_status:
        | "planned"
        | "approved"
        | "rejected"
        | "picked"
        | "postponed"
    }
  }
}
