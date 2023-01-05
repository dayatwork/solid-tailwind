import { RouteDefinition, useRoutes, Outlet, Navigate } from "@solidjs/router";
import { Component, Match, Switch } from "solid-js";
import { Toaster } from "solid-toast";

import { AuthProvider, useAuth } from "./contexts";
import { Anchor } from "./components";

// import Home from "./pages/home";
import Test from "./pages/test";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Root from "./pages/root/root";
import Home from "./pages/home/home";
import Projects from "./pages/projects/projects";
import Tasks from "./pages/tasks/tasks";
import Workplans from "./pages/workplans/workplans";
import Trackers from "./pages/trackers/trackers";
import Users from "./pages/users/users";

const Protected = () => {
  const [session, isInitialized] = useAuth();

  return (
    <Switch fallback={<p>Loading protected...</p>}>
      <Match when={isInitialized() && session()}>
        <Root />
      </Match>
      <Match when={isInitialized() && !session()}>
        <Navigate href="/signin" />
      </Match>
    </Switch>
  );
};

const Unprotected = () => {
  const [session, isInitialized] = useAuth();

  return (
    <Switch fallback={<p>Loading unprotected...</p>}>
      <Match when={isInitialized() && session()}>
        <Navigate href="/" />
      </Match>
      <Match when={isInitialized() && !session()}>
        <Outlet />
      </Match>
    </Switch>
  );
};

const NotFound = () => {
  return (
    <div class="h-screen w-screen flex items-center justify-center flex-col space-y-4">
      <h1 class="text-4xl">Page Not Found</h1>
      <Anchor href="/" size="lg">
        &larr; Back to home
      </Anchor>
    </div>
  );
};

const routes: RouteDefinition[] = [
  {
    path: "",
    component: Protected,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/projects",
        component: Projects,
      },
      {
        path: "/workplans",
        component: Workplans,
      },
      {
        path: "/tasks",
        component: Tasks,
      },
      {
        path: "/trackers",
        component: Trackers,
      },
      {
        path: "/users",
        component: Users,
      },
    ],
  },
  {
    path: "",
    component: Unprotected,
    children: [
      {
        path: "/signin",
        component: Signin,
      },
      {
        path: "/signup",
        component: Signup,
      },
    ],
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "*",
    component: NotFound,
  },
];

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
