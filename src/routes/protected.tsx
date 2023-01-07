import { Navigate } from "@solidjs/router";
import { Match, Switch } from "solid-js";

import { useAuth } from "../contexts";
import Root from "../modules/root/pages/root";

export function Protected() {
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
}
