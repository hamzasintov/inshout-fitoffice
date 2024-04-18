import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postUsersRegister: build.mutation<
      PostUsersRegisterApiResponse,
      PostUsersRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/users/register`,
        method: "POST",
        body: queryArg.registerUserRequest,
      }),
    }),
    postUsersLogin: build.mutation<
      PostUsersLoginApiResponse,
      PostUsersLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/users/login`,
        method: "POST",
        body: queryArg.loginUserRequest,
      }),
    }),
    getUsersProfile: build.query<
      GetUsersProfileApiResponse,
      GetUsersProfileApiArg
    >({
      query: () => ({ url: `/users/profile` }),
    }),
    postUsersForgotPassword: build.mutation<
      PostUsersForgotPasswordApiResponse,
      PostUsersForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/users/forgotPassword`,
        method: "POST",
        body: queryArg.forgotPasswordRequest,
      }),
    }),
    postUsersResetPassword: build.mutation<
      PostUsersResetPasswordApiResponse,
      PostUsersResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/users/resetPassword`,
        method: "POST",
        body: queryArg.resetPasswordRequest,
      }),
    }),
    postPackagesAdd: build.mutation<
      PostPackagesAddApiResponse,
      PostPackagesAddApiArg
    >({
      query: (queryArg) => ({
        url: `/packages/add`,
        method: "POST",
        body: queryArg.requestAddPackage,
      }),
    }),
    deletePackagesDelete: build.mutation<
      DeletePackagesDeleteApiResponse,
      DeletePackagesDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/packages/delete`,
        method: "DELETE",
        body: queryArg.requestDeletePackage,
      }),
    }),
    getPackagesViewPaginated: build.query<
      GetPackagesViewPaginatedApiResponse,
      GetPackagesViewPaginatedApiArg
    >({
      query: (queryArg) => ({
        url: `/packages/viewPaginated`,
        params: { page: queryArg.page, limit: queryArg.limit },
      }),
    }),
    patchPackagesUpdate: build.mutation<
      PatchPackagesUpdateApiResponse,
      PatchPackagesUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/packages/update`,
        method: "PATCH",
        body: queryArg.requestUpdatePackage,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as fitOf };
export type PostUsersRegisterApiResponse =
  /** status 200 Returns newly created user */ RegisterUserResponse;
export type PostUsersRegisterApiArg = {
  /** Create a new user with role */
  registerUserRequest: RegisterUserRequest;
};
export type PostUsersLoginApiResponse =
  /** status 200 Returns user information */ LoginUserResponse;
export type PostUsersLoginApiArg = {
  /** Login with email and password */
  loginUserRequest: LoginUserRequest;
};
export type GetUsersProfileApiResponse =
  /** status 200 Returns user information */ UserProfileResponse;
export type GetUsersProfileApiArg = void;
export type PostUsersForgotPasswordApiResponse =
  /** status 200 Password reset instructions sent successfully */ ForgotPasswordResponse;
export type PostUsersForgotPasswordApiArg = {
  /** Email to send password reset instructions */
  forgotPasswordRequest: ForgotPasswordRequest;
};
export type PostUsersResetPasswordApiResponse =
  /** status 200 Password reset instructions sent successfully */ ResetPasswordResponse;
export type PostUsersResetPasswordApiArg = {
  /** Updated password and valid reset token to reset password in system */
  resetPasswordRequest: ResetPasswordRequest;
};
export type PostPackagesAddApiResponse =
  /** status 200 Returns newly created package */ ResponseAddPackage;
export type PostPackagesAddApiArg = {
  /** Insert new row in packages tables */
  requestAddPackage: RequestAddPackage;
};
export type DeletePackagesDeleteApiResponse =
  /** status 200 Soft deletes the package */ ResponseDeletePackage;
export type DeletePackagesDeleteApiArg = {
  /** Delete the package by using the Id */
  requestDeletePackage: RequestDeletePackage;
};
export type GetPackagesViewPaginatedApiResponse =
  /** status 200 Returns all packages */ {
    /** Current page number */
    page?: number;
    /** Number of packages per page */
    limit?: number;
    /** Total number of packages */
    total?: number;
    /** Total number of pages */
    totalPages?: number;
    packages?: Packages[];
  };
export type GetPackagesViewPaginatedApiArg = {
  /** Page number */
  page?: number;
  /** Number of packages per page */
  limit?: number;
};
export type PatchPackagesUpdateApiResponse =
  /** status 200 Successfully updated packages */ ResponseUpdatePackage;
export type PatchPackagesUpdateApiArg = {
  requestUpdatePackage: RequestUpdatePackage;
};
export type RegisterUserResponse = {
  name?: string;
  email?: string;
  role?: number;
  accessToken?: string;
};
export type RegisterUserRequest = {
  email: string;
  password: string;
  role?: number;
  name?: string;
};
export type LoginUserResponse = {
  name?: string;
  email?: string;
  role?: number;
  accessToken?: string;
};
export type LoginUserRequest = {
  email: string;
  password: string;
};
export type UserProfileResponse = {
  name?: string;
  email?: string;
  role?: number;
  accessToken?: string;
};
export type ForgotPasswordResponse = {
  message: string;
};
export type ForgotPasswordRequest = {
  email: string;
};
export type ResetPasswordResponse = {
  message: string;
};
export type ResetPasswordRequest = {
  newPassword?: string;
  resetToken: string;
};
export type ResponseAddPackage = {
  package?: {
    id: number;
    trackingNumber: string;
    carrier: string;
    status: string;
    condition: string;
    sender: string;
    recipientName: string;
    comment: string;
    urgent: number;
    created_at: string;
    updated_at: string;
  };
};
export type RequestAddPackage = {
  newPackage: {
    trackingNumber: string;
    carrier: string;
    status: string;
    condition: string;
    sender: string;
    recipientName: string;
    comment: string;
    urgent: number;
  };
};
export type ResponseDeletePackage = any;
export type RequestDeletePackage = {
  id: number;
};
export type Packages = {
  id: number;
  trackingNumber: string;
  carrier: string;
  status: string;
  condition: string;
  sender: string;
  recipientName: string;
  comment: string;
  urgent: number;
  created_at: string;
  updated_at: string;
  isDeleted: boolean;
  deletedAt: string;
};
export type ResponseUpdatePackage = {
  id?: number;
  affected?: number;
}[];
export type RequestUpdatePackage = {
  packages?: {
    /** Package ID */
    id?: number;
    /** Tracking number */
    trackingNumber?: string;
    /** Carrier */
    carrier?: string;
    /** Status */
    status?: string;
    /** Condition */
    condition?: string;
    /** Sender */
    sender?: string;
    /** Recipient name */
    recipientName?: string;
    /** Comment */
    comment?: string;
    /** Urgent flag */
    urgent?: boolean;
  }[];
};
export const {
  usePostUsersRegisterMutation,
  usePostUsersLoginMutation,
  useGetUsersProfileQuery,
  usePostUsersForgotPasswordMutation,
  usePostUsersResetPasswordMutation,
  usePostPackagesAddMutation,
  useDeletePackagesDeleteMutation,
  useGetPackagesViewPaginatedQuery,
  usePatchPackagesUpdateMutation,
} = injectedRtkApi;
