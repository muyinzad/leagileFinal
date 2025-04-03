import { supabase } from "./supabase";

export interface Report {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
  status?: "published" | "draft" | "archived";
  content?: string;
  download_url?: string;
  page_count?: number;
  publication_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReportFilter {
  category?: string;
  status?: string;
  searchQuery?: string;
}

// Fetch all reports (with optional filtering)
export const getReports = async (filters?: ReportFilter) => {
  try {
    let query = supabase.from("reports").select("*");

    // Apply filters if provided
    if (filters?.category && filters.category !== "all") {
      query = query.eq("category", filters.category);
    }

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.searchQuery) {
      const searchTerm = `%${filters.searchQuery}%`;
      query = query.or(
        `title.ilike.${searchTerm},description.ilike.${searchTerm},author.ilike.${searchTerm}`,
      );
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error fetching reports:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Exception fetching reports:", error);
    return { data: null, error };
  }
};

// Fetch a single report by ID
export const getReportById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching report with ID ${id}:`, error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(`Exception fetching report with ID ${id}:`, error);
    return { data: null, error };
  }
};

// Create a new report
export const createReport = async (report: Omit<Report, "id">) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .insert([report])
      .select();

    if (error) {
      console.error("Error creating report:", error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Exception creating report:", error);
    return { data: null, error };
  }
};

// Update an existing report
export const updateReport = async (id: string, updates: Partial<Report>) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Error updating report with ID ${id}:`, error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(`Exception updating report with ID ${id}:`, error);
    return { data: null, error };
  }
};

// Delete a report
export const deleteReport = async (id: string) => {
  try {
    const { error } = await supabase.from("reports").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting report with ID ${id}:`, error);
      return { error };
    }

    return { error: null };
  } catch (error) {
    console.error(`Exception deleting report with ID ${id}:`, error);
    return { error };
  }
};

// Get trending reports (highest rated)
export const getTrendingReports = async (limit = 6) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("status", "published")
      .order("rating", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching trending reports:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Exception fetching trending reports:", error);
    return { data: null, error };
  }
};

// Get newest reports
export const getNewestReports = async (limit = 6) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching newest reports:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Exception fetching newest reports:", error);
    return { data: null, error };
  }
};

// Get report categories
export const getReportCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("category")
      .eq("status", "published");

    if (error) {
      console.error("Error fetching report categories:", error);
      return { data: null, error };
    }

    // Extract unique categories
    const categories = [...new Set(data.map((item) => item.category))];
    return { data: categories, error: null };
  } catch (error) {
    console.error("Exception fetching report categories:", error);
    return { data: null, error };
  }
};
