import { createSignal } from "solid-js";
import toast from "solid-toast";

import { Anchor, Button, Divider, TextInput } from "../../../components";
import OAuthButton from "../../../components/button/OAuthButton";
import { supabase } from "../../../lib";

interface SignupProps {
  // add props here
}

function Signup(props: SignupProps) {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleSignup = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email(),
        password: password(),
        options: {
          data: {
            full_name: name(),
          },
        },
      });
      if (error) throw error;
      toast.success("Check your email to continue!");
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
          Create new account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or <Anchor href="/signin">sign in to your account</Anchor>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" onSubmit={handleSignup}>
            <TextInput
              label="Full Name"
              name="full_name"
              required
              type="text"
              value={name()}
              onChange={(v) => setName(v)}
            />
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

            <div>
              <Button type="submit" fullWidth loading={loading()}>
                Sign up
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

export default Signup;
