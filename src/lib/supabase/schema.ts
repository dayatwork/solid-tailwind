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
          id: string
          updated_at: string | null
          email: string | null
          full_name: string | null
          avatar_url: string | null
          last_sign_in_at: string | null
          employee_number: string | null
          registered_at: string
        }
        Insert: {
          id: string
          updated_at?: string | null
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          last_sign_in_at?: string | null
          employee_number?: string | null
          registered_at?: string
        }
        Update: {
          id?: string
          updated_at?: string | null
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          last_sign_in_at?: string | null
          employee_number?: string | null
          registered_at?: string
        }
      }
      project_members: {
        Row: {
          id: string
          join_at: string
          project_id: string
          member_id: string
          position: string
        }
        Insert: {
          id?: string
          join_at?: string
          project_id: string
          member_id: string
          position: string
        }
        Update: {
          id?: string
          join_at?: string
          project_id?: string
          member_id?: string
          position?: string
        }
      }
      project_timelines: {
        Row: {
          id: string
          created_at: string
          created_by: string
          project_id: string
          status: Database["public"]["Enums"]["project_status"]
        }
        Insert: {
          id: string
          created_at?: string
          created_by: string
          project_id: string
          status: Database["public"]["Enums"]["project_status"]
        }
        Update: {
          id?: string
          created_at?: string
          created_by?: string
          project_id?: string
          status?: Database["public"]["Enums"]["project_status"]
        }
      }
      projects: {
        Row: {
          created_at: string
          updated_at: string
          name: string
          description: string | null
          status: Database["public"]["Enums"]["project_status"]
          id: string
        }
        Insert: {
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          id?: string
        }
        Update: {
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          id?: string
        }
      }
      report_attachment: {
        Row: {
          id: string
          created_at: string
          report_id: string
          employee_id: string
          name: string
          attachment: string
          type: Database["public"]["Enums"]["report_attachment_type"]
        }
        Insert: {
          id: string
          created_at?: string
          report_id: string
          employee_id: string
          name: string
          attachment: string
          type: Database["public"]["Enums"]["report_attachment_type"]
        }
        Update: {
          id?: string
          created_at?: string
          report_id?: string
          employee_id?: string
          name?: string
          attachment?: string
          type?: Database["public"]["Enums"]["report_attachment_type"]
        }
      }
      reports: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          task_id: string
          employee_id: string
          report: string
          checked_by: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          task_id: string
          employee_id: string
          report: string
          checked_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          task_id?: string
          employee_id?: string
          report?: string
          checked_by?: string | null
        }
      }
      task_timelines: {
        Row: {
          id: string
          created_at: string
          created_by: string
          task_id: string
          status: Database["public"]["Enums"]["task_status"]
        }
        Insert: {
          id: string
          created_at?: string
          created_by: string
          task_id: string
          status: Database["public"]["Enums"]["task_status"]
        }
        Update: {
          id?: string
          created_at?: string
          created_by?: string
          task_id?: string
          status?: Database["public"]["Enums"]["task_status"]
        }
      }
      task_trackers: {
        Row: {
          id: string
          task_id: string
          employee_id: string
          start_at: string
          end_at: string | null
          value: number
          note: string
        }
        Insert: {
          id: string
          task_id: string
          employee_id: string
          start_at?: string
          end_at?: string | null
          value: number
          note?: string
        }
        Update: {
          id?: string
          task_id?: string
          employee_id?: string
          start_at?: string
          end_at?: string | null
          value?: number
          note?: string
        }
      }
      tasks: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          assignee_id: string
          assignor_id: string | null
          task: string
          description: string | null
          target: number
          status: Database["public"]["Enums"]["task_status"]
          workplan_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          assignee_id: string
          assignor_id?: string | null
          task: string
          description?: string | null
          target?: number
          status?: Database["public"]["Enums"]["task_status"]
          workplan_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          assignee_id?: string
          assignor_id?: string | null
          task?: string
          description?: string | null
          target?: number
          status?: Database["public"]["Enums"]["task_status"]
          workplan_id?: string | null
        }
      }
      workplans: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          employee_id: string
          plan: string
          description: string | null
          week: number
          year: number
          status: Database["public"]["Enums"]["workplan_status"]
          target: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          employee_id: string
          plan: string
          description?: string | null
          week: number
          year: number
          status?: Database["public"]["Enums"]["workplan_status"]
          target?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          employee_id?: string
          plan?: string
          description?: string | null
          week?: number
          year?: number
          status?: Database["public"]["Enums"]["workplan_status"]
          target?: number
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
