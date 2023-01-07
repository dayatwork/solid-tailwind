import { createEffect, createSignal } from "solid-js";
import { supabase } from "../../lib";

interface AvatarProps {
  avatarPath: string | null;
  alt?: string;
  size?: string;
}

export function Avatar(props: AvatarProps) {
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);

  createEffect(() => {
    if (props.avatarPath) downloadImage(props.avatarPath);
  });

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  };

  return (
    <img
      style={{
        width: props.size || "30px",
        height: props.size || "30px",
      }}
      class="max-w-none ring-2 ring-white object-cover rounded-full"
      src={avatarUrl() || `https://ui-avatars.com/api/?name=${props.alt}`}
      alt={props.alt ? props.alt : "No Image"}
    />
  );
}
