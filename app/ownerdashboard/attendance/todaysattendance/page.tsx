import React from "react";
import UserAttendance from "./UserAttendance";
import { TodayAttendance } from "./getTodayAttendance";
export const dynamic = "force-dynamic";
export default async function Page() {
  const attendanceData = await TodayAttendance();

  if (!attendanceData.users) {
    return <div>Failed to load attendance data</div>;
  }

  const formattedUsers = attendanceData.users.map(user => ({
    id: user.id,
    name: user.name,
    shift: user.shift,
    todaysAttendance: user.isPresent,
    attendanceTime: user.attendanceTime,
  }));

  return <UserAttendance initialUsers={formattedUsers} />;
}
