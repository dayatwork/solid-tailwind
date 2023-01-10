import { useSearchParams } from "@solidjs/router";

import { SimplePagination } from "../../../components";
import SearchInput from "../../../components/inputs/SearchInput";
import { PageTitle, UserList, UserTable, PinnedUser } from "../components";
import { useUsers } from "../services";

interface UsersProps {}

function Users(props: UsersProps) {
  const [searchParams, setSearchParams] = useSearchParams<{
    page: string;
    limit: string;
    search: string;
  }>();

  const params = () => ({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 5,
    search: searchParams.search || undefined,
  });

  const query = useUsers(params);

  return (
    <>
      <PageTitle />
      <PinnedUser />

      <div class="mt-8 bg-white pl-4 sm:pl-8 pr-4 py-2 border-t border-gray-200 flex items-center justify-between gap-2 w-full">
        <SearchInput
          onChange={(e) => setSearchParams({ search: e.currentTarget.value })}
        />
      </div>

      <UserList users={query.data.users} loading={query.isLoading} />
      <UserTable users={query.data.users} loading={query.isLoading} />
      <div class="bg-white px-4 sm:pl-8 sm:pr-6 py-2 border-b border-gray-200">
        <SimplePagination
          loading={query.isLoading}
          limit={searchParams.limit || "10"}
          page={searchParams.page || "1"}
          count={query.data.count}
          onChangeLimit={(v) => setSearchParams({ limit: v, page: "1" })}
          onNext={() =>
            setSearchParams({ page: (Number(searchParams.page) || 1) + 1 })
          }
          onPrev={() =>
            setSearchParams({ page: (Number(searchParams.page) || 1) - 1 })
          }
        />
      </div>
    </>
  );
}

export default Users;
