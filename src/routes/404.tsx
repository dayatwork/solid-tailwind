import { Anchor } from "../components";

export default function NotFound() {
  return (
    <div class="h-screen w-screen flex items-center justify-center flex-col space-y-4">
      <h1 class="text-4xl">Page Not Found</h1>
      <Anchor href="/" size="lg">
        &larr; Back to home
      </Anchor>
    </div>
  );
}
