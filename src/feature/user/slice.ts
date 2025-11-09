import api from "../mainApi";


export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/me",
      providesTags: ["User"],

    }),
  }),
});

export const {useGetUserQuery} = userApi