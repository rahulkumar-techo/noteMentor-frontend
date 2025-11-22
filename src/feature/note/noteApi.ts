import api from "../mainApi";

export const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({

    uploadNote: builder.mutation<any, Record<string, any>>({
      query: (data) => ({
        url: "/note/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),

    updateNote: builder.mutation<any, { noteId: string; formData: any }>({
      query: ({ noteId, formData }) => ({
        url: `/note/update/${noteId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (res, err, { noteId }) => [
        { type: "Note", id: noteId },
        { type: "Note", id: "LIST" },
      ],
    }),

    deleteNoteFiles: builder.mutation<any, { noteId: string; noteImageIds?: string[]; notePdfIds?: string[]; thumbId?: string }>({
      query: (data) => ({
        url: "/note/delete-files",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (res, err, { noteId }) => [
        { type: "Note", id: noteId },
        { type: "Note", id: "LIST" },
      ],
    }),

    deleteNote: builder.mutation<any, { noteId: string }>({
      query: ({ noteId }) => ({
        url: `/note/delete/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, { noteId }) => [
        { type: "Note", id: noteId },
        { type: "Note", id: "LIST" },
      ],
    }),

    getNotes: builder.query<any, void>({
      query: () => "/note/list",
      providesTags: [{ type: "Note", id: "LIST" }],
    }),

    getNoteById: builder.query<any, string>({
      query: (id) => `/note/${id}`,
      providesTags: (r, e, id) => [{ type: "Note", id }],
    }),

    updateNoteSettings: builder.mutation<any, { id: string; settings: any }>({
      query: ({ id, settings }) => ({
        url: `/note/settings/${id}`,
        method: "PATCH",
        body: settings,
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: "Note", id },
        { type: "Note", id: "LIST" },
      ],
    }),

    updateViews: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/note/${id}/view`,
        method: "PATCH",
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: "Note", id },
        { type: "Note", id: "LIST" },
      ],
    }),

    toggleLikes: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/note/${id}/like`,
        method: "PATCH",
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: "Note", id },
        { type: "Note", id: "LIST" },
      ],
    }),

  }),

  overrideExisting: true,
});

export const {
  useUploadNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteFilesMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useUpdateNoteSettingsMutation,
  useToggleLikesMutation,
  useUpdateViewsMutation,
} = noteApi;

export default noteApi;
