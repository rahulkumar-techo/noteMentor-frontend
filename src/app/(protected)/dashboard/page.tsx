"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import NoteMentorOverview from "@/components/admin/overview/NoteMentorOverview";

const DashboardPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  if (user?.role === "admin")
    return <NoteMentorOverview />
  else if (user?.role === "teacher")
    return <h1>Teacher</h1>
  else return <h1>Student</h1>

}

export default DashboardPage