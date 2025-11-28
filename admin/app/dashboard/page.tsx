"use client";

export default function Dashboard() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to Zygote Admin.</p>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">Quick Stats</h2>
        <div className="space-y-3">
          <div><p className="text-sm text-gray-600">Total Students: <span className="font-bold">1,240</span></p></div>
          <div><p className="text-sm text-gray-600">Active Subscriptions: <span className="font-bold">850</span></p></div>
          <div><p className="text-sm text-gray-600">Content Units: <span className="font-bold">342</span></p></div>
        </div>
      </div>
    </div>
  );
}
