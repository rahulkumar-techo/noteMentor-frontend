import api from "../mainApi";
import axiosInstance from "../axiosInstance";

export const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({

    uploadNoteWithProgress: builder.mutation({
      async queryFn({ formData, onProgress }) {
        try {
            console.log([formData])
          const response = await axiosInstance.post(
            "/note/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (event) => {
                if (event.total && onProgress) {
                  const percent = Math.round((event.loaded * 100) / event.total);
                  onProgress(percent);
                }
              },
            }
          );

          return { data: response.data };
        } catch (error: any) {
          return {
            error: {
              status: error?.response?.status || 500,
              message: error?.response?.data?.message || error.message,
              data: error?.response?.data || null,
            },
          };
        }
      },
    }),

  }),
});

export const {
  useUploadNoteWithProgressMutation,
} = noteApi;
