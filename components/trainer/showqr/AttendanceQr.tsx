import GymQRCodeOnboarding from "@/components/gym-owner/QrCode";

export default function AttendanceQr() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate QR value with date and token
  const qrValue = `gymdominator-attendance-${currentDate} and the unique token is pranav desai`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GymQRCodeOnboarding qrdata={qrValue} gymName="Today's Attendance" />
    </div>
  );
}
