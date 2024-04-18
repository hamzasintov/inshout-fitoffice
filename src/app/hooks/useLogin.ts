import { usePostUsersLoginMutation } from "../store/fitOf";

export const useLogin = () => {
  const [
    postUsersLogin,
    {
      isLoading: loginLoading,
      data: loginData,
      error: loginError,
      status: loginStatus,
    },
  ] = usePostUsersLoginMutation();

  return { postUsersLogin, loginLoading, loginData, loginError, loginStatus };
};
