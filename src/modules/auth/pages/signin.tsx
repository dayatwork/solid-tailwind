import { createSignal } from "solid-js";
import toast from "solid-toast";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  TextInput,
} from "../../../components";
import OAuthButton from "../../../components/button/OAuthButton";
import { supabase } from "../../../lib";

interface SigninProps {
  // add props here
}

function Signin(props: SigninProps) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleSignin = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      });
      if (error) throw error;
      toast.success("You are logged in!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or <Anchor href="/signup">create new account</Anchor>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" onSubmit={handleSignin}>
            <TextInput
              label="Email address"
              name="email"
              autocomplete="email"
              required
              type="email"
              value={email()}
              onChange={(v) => setEmail(v)}
            />
            <TextInput
              label="Password"
              name="password"
              autocomplete="current-password"
              required
              type="password"
              value={password()}
              onChange={(v) => setPassword(v)}
            />

            <div class="flex items-center justify-between">
              <Checkbox label="Remember me" name="remember-me" />
              <Anchor href="/forgot-password">Forgot your password?</Anchor>
            </div>

            <div>
              <Button type="submit" fullWidth loading={loading()}>
                Sign in
              </Button>
            </div>
          </form>

          <div class="mt-6">
            <Divider label="Or continue with" />

            <div class="mt-6 grid grid-cols-2 gap-3">
              <OAuthButton provider="google" />
              <OAuthButton provider="github" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
