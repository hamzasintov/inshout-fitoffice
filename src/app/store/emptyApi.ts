// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://44.235.84.229:3000/",
    // baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers, { getState }) => {
      // Customize headers here
      const token = localStorage.getItem("accessToken"); //getState().auth.token;
      console.log(typeof token, token, "access token value");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
