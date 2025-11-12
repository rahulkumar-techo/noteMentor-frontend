import api from "../mainApi";

export const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 🧾 Upload Note
    uploadNote: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/note/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Note"],
    }),

    // ✏️ Update Note
    updateNote: builder.mutation<
      any,
      { noteId: string; formData: FormData }
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

    // 🗑️ Delete Files (images, pdfs, thumb)
    deleteNoteFiles: builder.mutation<
      any,
      { noteId: string; noteImageIds?: string[]; notePdfIds?: string[]; thumbId?: string }
    >({
      query: ({ noteId, noteImageIds = [], notePdfIds = [], thumbId = "" }) => ({
        url: "/note/files",
        method: "DELETE",
        body: { noteId, noteImageIds, notePdfIds, thumbId },
      }),
      invalidatesTags: (result, error, { noteId }) => [
        { type: "Note", id: noteId },
      ],
    }),
    // 🗑️ Delete Entire Note
    deleteNote: builder.mutation<any, { noteId: string }>({
      query: ({ noteId }) => ({
        url: `/note/delete/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"], // refresh all note lists
    }),

    // 📚 Get All Notes
    getNotes: builder.query<any, void>({
      query: () => ({
        url: "/note/all",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Note"],
    }),

    // 📄 Get Note by ID
    getNoteById: builder.query<any, string>({
      query: (id) => `/note/${id}`,
      providesTags: (result, error, id) => [{ type: "Note", id }],
    }),

    // ⚙️ Update Note Settings
    updateNoteSettings: builder.mutation<
      any,
      { id: string; settings: Record<string, any> }
    >({
      query: ({ id, settings }) => ({
        url: `/note/settings/${id}`,
        method: "PATCH",
        body: settings,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Note", id }],
    }),
  }),

  overrideExisting: true, // 🔁 safer for hot reload in dev
});

// ✅ Export Hooks
export const {
  useUploadNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteFilesMutation,
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useUpdateNoteSettingsMutation,
  useDeleteNoteMutation
} = noteApi;

export default noteApi;
