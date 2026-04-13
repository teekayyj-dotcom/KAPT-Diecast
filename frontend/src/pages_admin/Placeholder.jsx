export function Placeholder({ title }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <div className="bg-white p-12 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">{title} module is currently under development.</p>
      </div>
    </div>
  );
}
