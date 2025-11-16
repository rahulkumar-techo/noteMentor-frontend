// src/services/commentApi.ts
import api from "../mainApi";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
        
    // FETCH COMMENTS (paginated + nested)
    getComments: builder.query({
      query: ({ noteId, page = 1, limit = 10 }) => ({
        url: `/comments/${noteId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    // ADD / REPLY
    addComment: builder.mutation({
      query: ({ noteId, message, parentCommentId = null }) => ({
        url: `/comments/${noteId}`,
        method: "POST",
        body: { message, parentCommentId },
      }),
      invalidatesTags: ["Comments"],
    }),

    // EDIT COMMENT
    editComment: builder.mutation({
      query: ({ noteId, commentId, message }) => ({
        url: `/comments/${noteId}/${commentId}`,
        method: "PUT",
        body: { message },
      }),
      invalidatesTags: ["Comments"],
    }),

    // DELETE COMMENT
    deleteComment: builder.mutation({
      query: ({ noteId, commentId }) => ({
        url: `/comments/${noteId}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  })
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

export default commentApi;
