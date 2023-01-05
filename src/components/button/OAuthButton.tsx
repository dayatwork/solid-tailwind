import { Match, Switch } from "solid-js";
import { AiOutlineGoogle, AiOutlineGithub } from "solid-icons/ai";

interface OAuthButtonProps {
  provider: "google" | "github";
}

function OAuthButton(props: OAuthButtonProps) {
  return (
    <Switch>
      <Match when={props.provider === "google"}>
        <button class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
          <span class="sr-only">Sign in with Google</span>
          <AiOutlineGoogle size={20} />
        </button>
      </Match>
      <Match when={props.provider === "github"}>
        <button class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
          <span class="sr-only">Sign in with Github</span>
          <AiOutlineGithub size={20} />
        </button>
      </Match>
    </Switch>
  );
}

export default OAuthButton;
