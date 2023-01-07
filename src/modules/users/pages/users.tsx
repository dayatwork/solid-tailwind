import { createSignal, onMount } from "solid-js";
import toast from "solid-toast";

import { supabase } from "../../../lib";
import { PageTitle, UserList, UserTable, PinnedUser } from "../components";
import { User } from "../type";

interface UsersProps {
  // add props here
}

function Users(props: UsersProps) {
  const [loading, setLoading] = createSignal(false);
  const [users, setUsers] = createSignal<User[]>([]);

  onMount(() => {
    getUsers();
  });

  const getUsers = async () => {
    console.count("getUser");
    try {
      setLoading(true);

      let { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        throw error;
      }

      if (data) {
        setUsers(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle />
      <PinnedUser />
      <UserList users={users()} loading={loading()} />
      <UserTable users={users()} loading={loading()} />
    </>
  );
}

export default Users;
