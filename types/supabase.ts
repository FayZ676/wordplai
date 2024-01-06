export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      active_tasks: {
        Row: {
          started_at: string
          task_id: number | null
          user_id: string
        }
        Insert: {
          started_at?: string
          task_id?: number | null
          user_id?: string
        }
        Update: {
          started_at?: string
          task_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      completed_tasks: {
        Row: {
          completed_at: string
          feedback: string | null
          task_id: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          feedback?: string | null
          task_id?: number | null
          user_id?: string
        }
        Update: {
          completed_at?: string
          feedback?: string | null
          task_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "completed_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      focuses: {
        Row: {
          focus: string
        }
        Insert: {
          focus: string
        }
        Update: {
          focus?: string
        }
        Relationships: []
      }
      genres: {
        Row: {
          genre: string
        }
        Insert: {
          genre: string
        }
        Update: {
          genre?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          focus: Database["public"]["Enums"]["focus_settings"] | null
          genre: Database["public"]["Enums"]["genre_settings"] | null
          id: number
          scene: string | null
          task: string | null
        }
        Insert: {
          created_at?: string
          focus?: Database["public"]["Enums"]["focus_settings"] | null
          genre?: Database["public"]["Enums"]["genre_settings"] | null
          id?: number
          scene?: string | null
          task?: string | null
        }
        Update: {
          created_at?: string
          focus?: Database["public"]["Enums"]["focus_settings"] | null
          genre?: Database["public"]["Enums"]["genre_settings"] | null
          id?: number
          scene?: string | null
          task?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          focus: Database["public"]["Enums"]["focus_settings"] | null
          genre: Database["public"]["Enums"]["genre_settings"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          focus?: Database["public"]["Enums"]["focus_settings"] | null
          genre?: Database["public"]["Enums"]["genre_settings"] | null
          user_id?: string
        }
        Update: {
          created_at?: string
          focus?: Database["public"]["Enums"]["focus_settings"] | null
          genre?: Database["public"]["Enums"]["genre_settings"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      focus_settings: "imagery" | "dialogue"
      genre_settings: "fantasy" | "mystery"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
