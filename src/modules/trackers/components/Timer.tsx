import { createSignal, onCleanup } from "solid-js";

interface TimerProps {
  startAt: string;
  active?: boolean;
}

export function Timer(props: TimerProps) {
  const [time, setTime] = createSignal(
    new Date().getTime() - new Date(props.startAt).getTime()
  );

  const timer = setInterval(() => setTime(time() + 1000), 1000);

  onCleanup(() => clearInterval(timer));

  return (
    <p class="mt-1 flex items-center font-mono text-xl font-bold">
      <span>{("0" + Math.floor((time() / 3600000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time() / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time() / 1000) % 60)).slice(-2)}</span>
    </p>
  );
}
