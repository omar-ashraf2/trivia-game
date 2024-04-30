import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface TokenResponse {
  token: string;
  response_code: number;
  response_message?: string;
}

// Function to request a new session token
const requestNewToken = (): Promise<TokenResponse> => {
  return axios
    .get("https://opentdb.com/api_token.php?command=request")
    .then((response) => response.data);
};

export const useRequestToken = () => {
  const queryClient = useQueryClient();
  return useMutation<TokenResponse, Error>({
    mutationFn: requestNewToken,
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data.token);
    },
  });
};

// Function to reset a session token
const resetToken = (token: string) => {
  return axios
    .get("https://opentdb.com/api_token.php", {
      params: { command: "reset", token },
    })
    .then((response) => response.data);
};

export const useResetToken = () => {
  const queryClient = useQueryClient();
  return useMutation<TokenResponse, Error, string>({
    mutationFn: (token) => resetToken(token),
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data.token);
    },
  });
};
