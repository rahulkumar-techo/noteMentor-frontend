
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/",
  credentials: "include", // send cookies automatically
  prepareHeaders: (headers, { getState }:any) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Note", "Quiz", "Result","Comments","matrix","metrics"],
  endpoints: () => ({}), // endpoints injected in feature files
});

export default api;
