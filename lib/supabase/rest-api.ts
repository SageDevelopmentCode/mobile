import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL for the Supabase REST API
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// Headers that should be included in every request
const getDefaultHeaders = async (): Promise<Record<string, string>> => {
  const session = await AsyncStorage.getItem("supabase-session");
  const parsedSession = session ? JSON.parse(session) : null;
  const authToken = parsedSession?.access_token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Prefer: "return=representation",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

// Helper function to format Supabase REST API filters
const formatQueryParams = (
  params: Record<string, any>
): Record<string, string> => {
  const formattedParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;

    if (key.includes(".")) {
      const [column, operator] = key.split(".");

      // Handle special operators
      if (operator === "eq") {
        formattedParams[column] = `eq.${value}`;
      } else if (operator === "ilike") {
        formattedParams[column] = `ilike.${value}`;
      } else if (operator === "desc" || operator === "asc") {
        formattedParams["order"] = `${column}.${operator}`;
      } else {
        formattedParams[column] = `${operator}.${value}`;
      }
    } else {
      formattedParams[key] = String(value);
    }
  }

  return formattedParams;
};

// Generic function for making requests to the Supabase REST API
export async function makeSupabaseRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  queryParams: Record<string, any> = {},
  body: any = null
) {
  try {
    // Format the query parameters for Supabase REST API
    const formattedParams = formatQueryParams(queryParams);

    // Build the URL with query parameters
    const queryString = Object.entries(formattedParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    // Ensure the URL ends with a slash if needed
    const baseUrl = SUPABASE_URL.endsWith("/")
      ? SUPABASE_URL
      : `${SUPABASE_URL}/`;
    const url = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;
    console.log("Final URL:", url); // Add this line
    const headers = await getDefaultHeaders();

    const requestOptions: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, requestOptions);

    if (response.status === 204) {
      return { data: null, error: null };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return { data, error: null };
  } catch (error) {
    console.error("Supabase REST API error:", error);
    return { data: null, error };
  }
}
