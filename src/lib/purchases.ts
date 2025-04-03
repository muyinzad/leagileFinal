import { supabase } from "./supabase";

export interface Purchase {
  id: string;
  user_id: string;
  report_id?: string;
  subscription_id?: string;
  amount: number;
  payment_id?: string;
  payment_status: "pending" | "completed" | "failed" | "refunded";
  created_at?: string;
  updated_at?: string;
}

// Create a new purchase
export const createPurchase = async (purchase: Omit<Purchase, "id">) => {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .insert([purchase])
      .select();

    if (error) {
      console.error("Error creating purchase:", error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Exception creating purchase:", error);
    return { data: null, error };
  }
};

// Get user's purchases
export const getUserPurchases = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .select(
        `
        *,
        report:report_id(*),
        subscription:subscription_id(*)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching purchases for user ${userId}:`, error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(`Exception fetching purchases for user ${userId}:`, error);
    return { data: null, error };
  }
};

// Check if user has purchased a specific report
export const hasUserPurchasedReport = async (
  userId: string,
  reportId: string,
) => {
  try {
    // Check direct purchase
    const { data: directPurchase, error: directError } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("report_id", reportId)
      .eq("payment_status", "completed")
      .maybeSingle();

    if (directError) {
      console.error(
        `Error checking direct purchase for user ${userId} and report ${reportId}:`,
        directError,
      );
      return { hasPurchased: false, error: directError };
    }

    // If direct purchase exists, return true
    if (directPurchase) {
      return { hasPurchased: true, error: null };
    }

    // Check subscription access
    const { data: activeSubscriptions, error: subscriptionError } =
      await supabase
        .from("user_subscriptions")
        .select("id")
        .eq("user_id", userId)
        .eq("is_active", true)
        .gte("end_date", new Date().toISOString());

    if (subscriptionError) {
      console.error(
        `Error checking subscription access for user ${userId}:`,
        subscriptionError,
      );
      return { hasPurchased: false, error: subscriptionError };
    }

    // If user has active subscription, they have access
    return { hasPurchased: activeSubscriptions.length > 0, error: null };
  } catch (error) {
    console.error(
      `Exception checking purchase access for user ${userId} and report ${reportId}:`,
      error,
    );
    return { hasPurchased: false, error };
  }
};

// Update purchase status
export const updatePurchaseStatus = async (
  id: string,
  status: Purchase["payment_status"],
) => {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .update({ payment_status: status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Error updating purchase status for ID ${id}:`, error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(`Exception updating purchase status for ID ${id}:`, error);
    return { data: null, error };
  }
};

// Get all purchases (admin only)
export const getAllPurchases = async () => {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .select(
        `
        *,
        report:report_id(*),
        subscription:subscription_id(*)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all purchases:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Exception fetching all purchases:", error);
    return { data: null, error };
  }
};
