"use client";

import { useSelector } from "react-redux";
import NoteMentorOverview from "@/components/admin/overview/NoteMentorOverview";
import NoteSkeleton from "@/components/common/skeletonLoader";
import {
  useAllNotesQuery,
  useAllUsersQuery,
  useMatrixQuery,
} from "@/feature/user/adminProtectedApi";

export default function Page() {
  // Unified search + pagination from analytics slice
  const search = useSelector((state: any) => state.analytics.search);
  const usersPage = useSelector((state: any) => state.analytics.usersPage);
  const usersLimit = useSelector((state: any) => state.analytics.usersLimit);

  const notesPage = useSelector((state: any) => state.analytics.notesPage);
  const notesLimit = useSelector((state: any) => state.analytics.notesLimit);

  // USERS
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useAllUsersQuery({
    page: usersPage,
    limit: usersLimit,
    search,
  });

  // NOTES
  const {
    data: notesData,
    isLoading: notesLoading,
    error: notesError,
  } = useAllNotesQuery({
    page: notesPage,
    limit: notesLimit,
    search,
  });

  // MATRIX
  const {
    data: matrixData,
    isLoading: matrixLoading,
    error: matrixError,
  } = useMatrixQuery({});

  if (usersLoading || notesLoading || matrixLoading)
    return <NoteSkeleton type="page" />;

  if (usersError || notesError || matrixError)
    return <div className="text-red-500">Something went wrong.</div>;

  const cleanUsers = usersData?.data?.data || [];
  const cleanNotes = notesData?.data || {};
  const cleanMatrix = matrixData || {};

  return (
    <NoteMentorOverview
      users={cleanUsers}
      notes={cleanNotes}
      matrix={cleanMatrix}
    />
  );
}
