interface SkeletonProps {
  width: string;
  height: string;
}

export function Skeleton(props: SkeletonProps) {
  return (
    <div
      class="animate-pulse bg-gray-300 rounded-md"
      style={{ width: props.width, height: props.height }}
    />
  );
}
