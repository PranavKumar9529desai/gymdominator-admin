import AttendanceQr from "@/components/trainer/showqr/AttendanceQr";
import { GetAttendanceQrData } from "./GetAttendanceQrData";

export default async function AttendanceComponent() {
  const gymData = await GetAttendanceQrData();

  const qrValue = JSON.stringify({
    AttendanceAction: {
      gymname: gymData.gymname,
      gymid: gymData.gymid,
      timestamp: new Date().setMinutes(0, 0, 0),
    },
  });

  return (
    <div>
      <AttendanceQr qrValue={qrValue} gymName={gymData.gymname} />
    </div>
  );
}
