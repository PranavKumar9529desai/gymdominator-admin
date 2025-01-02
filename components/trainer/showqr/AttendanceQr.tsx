import GymQRCode from "@/components/gym-owner/QrCode";

interface AttendanceQrProps {
  qrValue: string;
  gymName: string;
}

export default function AttendanceQr({ qrValue, gymName }: AttendanceQrProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GymQRCode qrdata={qrValue} gymName={gymName} />
    </div>
  );
}
