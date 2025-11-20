

import api from "../mainApi";

const adminProtectedApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //  MATRIX STATS
        matrix: builder.query({
            query: () => "/api/admin/matrix",
        
        }),

        allUsers: builder.query({
            query: ({ page = 1, limit = 10, search = "" }) =>
                `/api/admin/users?page=${page}&limit=${limit}&search=${search}`,
        }),
        allNotes: builder.query({
            query: ({ page = 1, limit = 10, search = "" }) =>
                `/api/admin/notes?page=${page}&limit=${limit}&search=${search}`,
        }),
    }),
});

export const {
    useMatrixQuery,
    useAllUsersQuery,
    useAllNotesQuery
} = adminProtectedApi;

export default adminProtectedApi;
