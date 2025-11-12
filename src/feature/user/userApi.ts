import api from "../mainApi";


export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/me",
      providesTags: ["User"],

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
  }),
});

export const { useGetUserQuery,
  useUpdateAcademicMutation,
  useUpdateDeviceMutation,
  useUpdatePersonalizationMutation,
  useLogoutMutation } = userApi