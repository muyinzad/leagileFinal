import { supabase } from "./supabase";

export interface Review {
  id: string;
  report_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at?: string;
  updated_at?: string;
}

// Create a new review
export const createReview = async (review: Omit<Review, "id">) => {
  try {
    const { data, error } = await supabase
      .from("report_reviews")
      .insert([review])
      .select();

    if (error) {
      console.error("Error creating review:", error);
      return { data: null, error };
    }

    // Update the report's average rating
    await updateReportAverageRating(review.report_id);

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Exception creating review:", error);
    return { data: null, error };
  }
};

// Update an existing review
export const updateReview = async (
  id: string,
  updates: Pick<Review, "rating" | "comment">,
) => {
  try {
    const { data, error } = await supabase
      .from("report_reviews")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Error updating review with ID ${id}:`, error);
      return { data: null, error };
    }

    // Update the report's average rating
    if (data[0]) {
      await updateReportAverageRating(data[0].report_id);
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(`Exception updating review with ID ${id}:`, error);
    return { data: null, error };
  }
};

// Delete a review
export const deleteReview = async (id: string) => {
  try {
    // First get the review to know which report to update
    const { data: review, error: getError } = await supabase
      .from("report_reviews")
      .select("report_id")
      .eq("id", id)
      .single();

    if (getError) {
      console.error(`Error getting review with ID ${id}:`, getError);
      return { error: getError };
    }

    const reportId = review.report_id;

    // Delete the review
    const { error } = await supabase
      .from("report_reviews")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting review with ID ${id}:`, error);
      return { error };
    }

    // Update the report's average rating
    await updateReportAverageRating(reportId);

    return { error: null };
  } catch (error) {
    console.error(`Exception deleting review with ID ${id}:`, error);
    return { error };
  }
};

// Get reviews for a report
export const getReportReviews = async (reportId: string) => {
  try {
    const { data, error } = await supabase
      .from("report_reviews")
      .select("*")
      .eq("report_id", reportId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching reviews for report ${reportId}:`, error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(`Exception fetching reviews for report ${reportId}:`, error);
    return { data: null, error };
  }
};

// Get a user's review for a specific report
export const getUserReviewForReport = async (
  userId: string,
  reportId: string,
) => {
  try {
    const { data, error } = await supabase
      .from("report_reviews")
      .select("*")
      .eq("user_id", userId)
      .eq("report_id", reportId)
      .maybeSingle();

    if (error) {
      console.error(
        `Error fetching user review for report ${reportId}:`,
        error,
      );
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(
      `Exception fetching user review for report ${reportId}:`,
      error,
    );
    return { data: null, error };
  }
};

// Helper function to update a report's average rating
const updateReportAverageRating = async (reportId: string) => {
  try {
    // Calculate the average rating
    const { data, error } = await supabase
      .from("report_reviews")
      .select("rating")
      .eq("report_id", reportId);

    if (error) {
      console.error(
        `Error calculating average rating for report ${reportId}:`,
        error,
      );
      return;
    }

    let avgRating = 0;
    if (data.length > 0) {
      const sum = data.reduce((acc, review) => acc + review.rating, 0);
      avgRating = parseFloat((sum / data.length).toFixed(2));
    }

    // Update the report with the new average rating
    const { error: updateError } = await supabase
      .from("reports")
      .update({ rating: avgRating, updated_at: new Date().toISOString() })
      .eq("id", reportId);

    if (updateError) {
      console.error(
        `Error updating average rating for report ${reportId}:`,
        updateError,
      );
    }
  } catch (error) {
    console.error(
      `Exception updating average rating for report ${reportId}:`,
      error,
    );
  }
};
