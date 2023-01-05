import { For } from "solid-js";
import { Skeleton } from "./Skeleton";

interface TableSkeletonProps {
  columns: number;
  rows: number;
}

export function TableSkeleton(props: TableSkeletonProps) {
  return (
    <For each={Array.from({ length: props.rows })}>
      {() => (
        <tr>
          <For each={Array.from({ length: props.columns })}>
            {() => (
              <td class="p-4">
                <Skeleton width="100%" height="10px" />
              </td>
            )}
          </For>
        </tr>
      )}
    </For>
  );
}
