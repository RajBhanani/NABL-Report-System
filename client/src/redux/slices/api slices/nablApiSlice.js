import { apiSlice } from "./apiSlice";

const NABL_URL = "/nabl";

export const nablApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSample: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createSample`,
        method: "POST",
        body: data,
      }),
    }),
    getSamples: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getSamples`,
        method: "GET",
      }),
    }),
    createReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createReport`,
        method: "POST",
        body: data,
      }),
    }),
    getReports: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getReports`,
        method: "GET",
      }),
    }),
    updateReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateReport`,
        method: "PUT",
        body: data,
      }),
    }),
    authoriseReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/authoriseReport`,
        method: "PUT",
        body: data,
      }),
    }),
    getParams: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getParams`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSampleMutation,
  useGetSamplesMutation,
  useCreateReportMutation,
  useGetReportsMutation,
  useUpdateReportMutation,
  useAuthoriseReportMutation,
  useGetParamsMutation,
} = nablApiSlice;
