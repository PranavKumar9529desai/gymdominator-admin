import GymQRCodeOnboarding from "@/components/gym-owner/QrCode";
import { GetAttendanceQrData } from "./GetAttendanceQrData";

export default async function AttendanceQr() {
  // Generate QR value with date and token
  const { gymName , gymId } = await GetAttendanceQrData();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GymQRCodeOnboarding qrdata={qrValue} title="Today's Attendance" />
    </div>
  );
}
