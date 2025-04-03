export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      consultations: {
        Row: {
          id: string;
          user_id: string;
          expert_id: string;
          status: string;
          consultation_type: string;
          scheduled_at: string | null;
          duration_minutes: number | null;
          topic: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          expert_id: string;
          status?: string;
          consultation_type: string;
          scheduled_at?: string | null;
          duration_minutes?: number | null;
          topic: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          expert_id?: string;
          status?: string;
          consultation_type?: string;
          scheduled_at?: string | null;
          duration_minutes?: number | null;
          topic?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      expert_profiles: {
        Row: {
          id: string;
          user_id: string;
          first_name: string;
          last_name: string;
          bio: string;
          specialization: string;
          years_experience: number;
          hourly_rate: number;
          avatar_url: string | null;
          is_verified: boolean;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          first_name: string;
          last_name: string;
          bio: string;
          specialization: string;
          years_experience: number;
          hourly_rate: number;
          avatar_url?: string | null;
          is_verified?: boolean;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          first_name?: string;
          last_name?: string;
          bio?: string;
          specialization?: string;
          years_experience?: number;
          hourly_rate?: number;
          avatar_url?: string | null;
          is_verified?: boolean;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      purchases: {
        Row: {
          id: string;
          user_id: string;
          report_id: string | null;
          subscription_id: string | null;
          amount: number;
          payment_id: string | null;
          payment_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          report_id?: string | null;
          subscription_id?: string | null;
          amount: number;
          payment_id?: string | null;
          payment_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          report_id?: string | null;
          subscription_id?: string | null;
          amount?: number;
          payment_id?: string | null;
          payment_status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      report_reviews: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          user_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          user_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          title: string;
          author: string;
          description: string;
          price: number;
          rating: number;
          thumbnail: string | null;
          category: string;
          status: string;
          content: string | null;
          download_url: string | null;
          page_count: number;
          publication_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author: string;
          description: string;
          price: number;
          rating?: number;
          thumbnail?: string | null;
          category: string;
          status?: string;
          content?: string | null;
          download_url?: string | null;
          page_count?: number;
          publication_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author?: string;
          description?: string;
          price?: number;
          rating?: number;
          thumbnail?: string | null;
          category?: string;
          status?: string;
          content?: string | null;
          download_url?: string | null;
          page_count?: number;
          publication_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          duration_months: number;
          features: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          duration_months: number;
          features: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          duration_months?: number;
          features?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          subscription_id: string;
          start_date: string;
          end_date: string;
          is_active: boolean;
          payment_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subscription_id: string;
          start_date: string;
          end_date: string;
          is_active?: boolean;
          payment_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subscription_id?: string;
          start_date?: string;
          end_date?: string;
          is_active?: boolean;
          payment_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
