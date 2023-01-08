import { useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import { Toaster } from "solid-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import { AuthProvider } from "./contexts";
import { routes } from "./routes/routes";

const queryClient = new QueryClient();

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
