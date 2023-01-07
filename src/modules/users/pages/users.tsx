import { PageTitle, UserList, UserTable, PinnedUser } from "../components";
import { useUsers } from "../services";

interface UsersProps {}

function Users(props: UsersProps) {
  const query = useUsers();

  return (
    <>
      <PageTitle />
      <PinnedUser />
      <UserList users={query.data} loading={query.isLoading} />
      <UserTable users={query.data} loading={query.isLoading} />
    </>
  );
}

export default Users;
