import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

interface TokenResponse {
  token: string;
  response_code: number;
  response_message?: string;
}

// Function to request a new session token
const requestNewToken = async (): Promise<string> => {
  const response: AxiosResponse<TokenResponse> = await axios.get(
    "https://opentdb.com/api_token.php?command=request"
  );
  // Check API response code to handle errors
  if (response.data.response_code !== 0) {
    throw new Error(
      response.data.response_message ?? "Failed to get new token"
    );
  }
  return response.data.token;
};

// Custom hook to manage the request for a new token
export const useRequestToken = () => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, void>({
    mutationFn: requestNewToken,
    // Set the new token in the React Query's cache upon successful mutation
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);
    },
  });
};

// Function to reset a session token
const resetToken = async (token: string): Promise<string> => {
  const response: AxiosResponse<TokenResponse> = await axios.get(
    "https://opentdb.com/api_token.php",
    {
      params: { command: "reset", token },
    }
  );
  if (response.data.response_code !== 0) {
    throw new Error(response.data.response_message ?? "Failed to reset token");
  }
  return response.data.token;
};

// Custom hook to manage the token reset operation
export const useResetToken = () => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: resetToken,
    // Update the token in the React Query's cache upon successful reset
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);
    },
  });
};
