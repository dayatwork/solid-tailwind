import { Navigate, Outlet } from "@solidjs/router";
import { Match, Switch } from "solid-js";

import { useAuth } from "../contexts";

export function Unprotected() {
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
}
