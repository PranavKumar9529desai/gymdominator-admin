import AttendanceFailed from "@/components/AttendanceFailed";
import AttendanceConfirmation from "@/components/AttendanceSucess";
import React, { useState } from "react";

export default function page() {
  // TODO   make this backend call inorder to check that whreather the attendance is maked or not.
  const [attendanceStatus, setattendaceStatus] = useState<boolean>(false);
  if (attendanceStatus) {
    return (
      <>
        <AttendanceFailed />
      </>
    );
  } else {
    return (
      <>
        <AttendanceConfirmation />
      </>
    );
  }
}
