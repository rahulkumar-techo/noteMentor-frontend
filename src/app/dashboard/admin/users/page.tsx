"use client";

import { columns } from "@/components/admin/users/columns";
import { DataTable } from "@/components/admin/users/data-table";
import { useAllUsersQuery } from "@/feature/user/adminProtectedApi";
import { useSelector } from "react-redux";
import NoteSkeleton from "@/components/common/skeletonLoader";

export default function Page() {
  const search = useSelector((state: any) => state.analytics.search);
  const page = useSelector((state: any) => state.analytics.usersPage);
  const limit = useSelector((state: any) => state.analytics.usersLimit);

  const { data, isLoading, error } = useAllUsersQuery({
    page,
    limit,
    search,
  });

  const users = data?.data?.data || [];

  if (isLoading) return <NoteSkeleton type="table" />;
  if (error) return <div className="text-red-500">Failed to load users</div>;

  return (
    <div className="p-4">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
