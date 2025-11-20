import api from "../mainApi";

export const metricsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => ({
        url: "/admin/sys-metrics",
        method: "GET",
      }),
      providesTags: ["metrics"],
    }),
  }),
});

export const { useGetMetricsQuery } = metricsApi;
