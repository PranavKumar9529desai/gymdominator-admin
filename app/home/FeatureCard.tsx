export default function FeatureCard({
  Icon,
  title,
  description,
}: {
  Icon: React.ComponentType<{ className: "string" }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-50 rounded-lg backdrop-filter backdrop-blur-lg transition-all duration-200 ease-in-out hover:bg-opacity-75">
      {/* @ts-ignore   */}
      <Icon className="h-12 w-12 text-blue-400 mb-4" />
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
}