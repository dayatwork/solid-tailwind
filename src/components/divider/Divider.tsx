interface DividerProps {
  label: string;
}

export function Divider(props: DividerProps) {
  return (
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-white px-2 text-gray-500">{props.label}</span>
      </div>
    </div>
  );
}
