import { apiSlice } from "./apiSlice";

const USER_URL = "/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    verifyUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/verify`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useVerifyUserMutation } =
  usersApiSlice;
