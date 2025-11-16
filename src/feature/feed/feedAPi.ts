import api from "../mainApi";


const feedApi=api.injectEndpoints({
    endpoints: (builder) => ({
        getFeed: builder.query({
            query: ({ limit = 20 }) => ({ url: `/feed?limit=${limit}` }),
            transformResponse: (response: any) => response.feed || [],
        }),
    })
})


export const { useGetFeedQuery } = feedApi;