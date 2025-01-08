import GymQRCode from "./QrCode";
import { GetAttendanceQrData } from "./GetAttendanceQrData";

export default async function AttendanceComponent() {
  const gymData = await GetAttendanceQrData();
  
  if (!gymData) {
    return <div>Unable to load gym data</div>;
  }

  const qrValue = JSON.stringify({
    AttendanceAction: {
      gymname: gymData.gymname,
      gymid: gymData.gymid,
      timestamp: new Date().setMinutes(0, 0, 0),
    },
  });

  return (
    <div className="container mx-auto py-6">
      <GymQRCode 
        qrdata={qrValue}
        title={gymData.gymname}
        subtitle="Scan this QR code to mark your attendance"
      />
    </div>
  );
}
