import { AuthSession, Session } from "@supabase/supabase-js";
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSX,
  useContext,
} from "solid-js";
import { supabase } from "../lib";

const AuthContext =
  createContext<(Accessor<AuthSession> | Accessor<boolean>)[]>();

interface AuthProviderProps {
  children: JSX.Element;
}

export function AuthProvider(props: AuthProviderProps) {
  const [session, setSession] = createSignal<AuthSession | null>(null);
  const [isInitialized, setIsInitialized] = createSignal(false);
  const auth = [session, isInitialized];

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitialized(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
