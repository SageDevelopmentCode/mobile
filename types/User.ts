import { UserCurrency } from "@/lib/supabase/db/user_currency";

// Define the User interface based on the database schema
export interface User {
  id: string;
  created_at: string;
  username: string;
  last_login: string;
  energy_points: number;
  energy_last_reset: string;
  level: number;
  experience_points: number;
  currency?: UserCurrency | null;
}
