import GymQRCode from "@/components/gym-owner/QrCode";

interface AttendanceQrProps {
  qrValue: string;
  gymName: string;
}

export default function AttendanceQr({ qrValue }: AttendanceQrProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GymQRCode qrdata={qrValue} title="" subtitle="Please scan the QR code to mark your attendance" />
    </div>
  );
}
