import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Function to request a new session token
const requestNewToken = () => {
  const data = axios.get("https://opentdb.com/api_token.php?command=request");
  console.log(data);
  return data;
};

// Custom hook to manage the request for a new token
export const useRequestToken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestNewToken,
    // Set the new token in the React Query's cache upon successful mutation
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);
    },
  });
};

// Function to reset a session token
const resetToken = (token: string) => {
  const data = axios.get("https://opentdb.com/api_token.php", {
    params: { command: "reset", token },
  });
  return data;
};

// Custom hook to manage the token reset operation
export const useResetToken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetToken,
    // Update the token in the React Query's cache upon successful reset
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);
    },
  });
};
