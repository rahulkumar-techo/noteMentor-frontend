import api from "../mainApi";

export const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // create note
    uploadNote: builder.mutation<any, Record<string, any>>({
      query: (data) => ({
        url: "/note/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),

    // update note
    updateNote: builder.mutation<
      any,
      { noteId: string; formData: Record<string, any> }
    >({
      query: ({ noteId, formData }) => ({
        url: `/note/update/${noteId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { noteId }) => [
        { type: "Note", id: noteId },
      ],
    }),


    // delete selected files
    deleteNoteFiles: builder.mutation<
      any,
      { noteId: string; noteImageIds?: string[]; notePdfIds?: string[]; thumbId?: string }
    >({
      query: (data) => ({
        url: "/note/delete-files",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),

    // delete note
    deleteNote: builder.mutation<any, { noteId: string }>({
      query: ({ noteId }) => ({
        url: `/note/delete/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),

    // list notes
    getNotes: builder.query<any, void>({
      query: () => "/note/list",
      providesTags: ["Note"],
    }),

    // get note by id
    getNoteById: builder.query<any, string>({
      query: (id) => `/note/${id}`,
      providesTags: (r, e, id) => [{ type: "Note", id }],
    }),

    // update settings
    updateNoteSettings: builder.mutation<any, { id: string; settings: any }>({
      query: ({ id, settings }) => ({
        url: `/note/settings/${id}`,
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: (r, e, { id }) => [{ type: "Note", id }],
    }),
    updateViews: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/note/${id}/view`,
        method: "PATCH",
      }),
      invalidatesTags: (r, e, { id }) => [{ type: "Note", id }],
    }),
    toggleLikes: builder.mutation<any, { id: string}>({
      query: ({ id }) => ({
        url: `/note/${id}/like`,
        method: "PATCH",
      }),
      invalidatesTags: (r, e, { id }) => [{ type: "Note", id }],
    }),

  }),

  overrideExisting: true,
});

// hooks
export const {
  useUploadNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteFilesMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useUpdateNoteSettingsMutation,
  // reactions
  useToggleLikesMutation,
  useUpdateViewsMutation
} = noteApi;

export default noteApi;
