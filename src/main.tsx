import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen.tsx";
import PickCategory from "./pages/PickCategory.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // Data is considered fresh for 1 minute
      retry: 2, // Default retry attempts for failed queries
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <WelcomeScreen />,
      },
      {
        path: "/pick-category",
        element: <PickCategory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
