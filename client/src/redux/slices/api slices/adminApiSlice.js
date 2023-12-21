import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    verifyAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/verify`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyAdminMutation } = adminApiSlice;
