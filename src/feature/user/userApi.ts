import api from "../mainApi";
import { setUser } from "./user.slice";


export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: "include",   // 👈 REQUIRED
      }),
      providesTags: ["User"],


      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // save user in redux slice
          dispatch(setUser({ user: data?.data }));
        } catch (err) {
          console.log("User fetch error", err);
        }
      },
    }),
    updateAcademic: builder.mutation({
      query: (data) => ({
        url: "/api/user/academic",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updatePersonalization: builder.mutation({
      query: (data) => ({
        url: "/api/user/personalization",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updateDevice: builder.mutation({
      query: (data) => ({
        url: "/user/settings",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",

        credentials: "include",
      }),
      // invalidatesTags: ["User"],
    }),
    complete_profile: builder.mutation({
      query: (data) => ({
        url: "/api/user/complete-profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const { useGetUserQuery,
  useUpdateAcademicMutation,
  useUpdateDeviceMutation,
  useUpdatePersonalizationMutation,
  useLogoutMutation,
  useComplete_profileMutation
} = userApi