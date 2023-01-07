import { useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import { Toaster } from "solid-toast";

import { AuthProvider } from "./contexts";
import { routes } from "./routes/routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <AuthProvider>
      <Routes />
      <Toaster />
    </AuthProvider>
  );
};

export default App;
