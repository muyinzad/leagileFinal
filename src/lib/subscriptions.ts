import { supabase } from "./supabase";

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_months: number;
  features: string[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  subscription_id: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  payment_id?: string;
  created_at?: string;
  updated_at?: string;
  subscription?: Subscription;
}

// Fetch all active subscription plans
export const getSubscriptionPlans = async () => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("is_active", true)
      .order("price", { ascending: true });

    if (error) {
      console.error("Error fetching subscription plans:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Exception fetching subscription plans:", error);
    return { data: null, error };
  }
};

// Fetch a single subscription plan by ID
export const getSubscriptionPlanById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching subscription plan with ID ${id}:`, error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(`Exception fetching subscription plan with ID ${id}:`, error);
    return { data: null, error };
  }
};

// Create a new subscription plan (admin only)
export const createSubscriptionPlan = async (
  subscription: Omit<Subscription, "id">,
) => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert([subscription])
      .select();

    if (error) {
      console.error("Error creating subscription plan:", error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Exception creating subscription plan:", error);
    return { data: null, error };
  }
};

// Update an existing subscription plan (admin only)
export const updateSubscriptionPlan = async (
  id: string,
  updates: Partial<Subscription>,
) => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Error updating subscription plan with ID ${id}:`, error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(`Exception updating subscription plan with ID ${id}:`, error);
    return { data: null, error };
  }
};

// Get user's active subscriptions
export const getUserSubscriptions = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_subscriptions")
      .select(
        `
        *,
        subscription:subscription_id(*)
      `,
      )
      .eq("user_id", userId)
      .eq("is_active", true);

    if (error) {
      console.error(`Error fetching subscriptions for user ${userId}:`, error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(
      `Exception fetching subscriptions for user ${userId}:`,
      error,
    );
    return { data: null, error };
  }
};

// Subscribe user to a plan
export const subscribeUserToPlan = async (
  userId: string,
  subscriptionId: string,
  paymentId?: string,
) => {
  try {
    // First, get the subscription details to calculate end date
    const { data: subscription, error: subscriptionError } =
      await getSubscriptionPlanById(subscriptionId);

    if (subscriptionError || !subscription) {
      return {
        data: null,
        error: subscriptionError || new Error("Subscription not found"),
      };
    }

    // Calculate end date based on duration_months
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + subscription.duration_months);

    const userSubscription: Omit<UserSubscription, "id" | "subscription"> = {
      user_id: userId,
      subscription_id: subscriptionId,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      is_active: true,
      payment_id: paymentId,
    };

    const { data, error } = await supabase
      .from("user_subscriptions")
      .insert([userSubscription])
      .select();

    if (error) {
      console.error("Error subscribing user to plan:", error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Exception subscribing user to plan:", error);
    return { data: null, error };
  }
};

// Cancel user subscription
export const cancelUserSubscription = async (subscriptionId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_subscriptions")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", subscriptionId)
      .select();

    if (error) {
      console.error(`Error cancelling subscription ${subscriptionId}:`, error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(
      `Exception cancelling subscription ${subscriptionId}:`,
      error,
    );
    return { data: null, error };
  }
};
