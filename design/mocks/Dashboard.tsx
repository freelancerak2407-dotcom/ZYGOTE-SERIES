import React from 'react';
import { Book, Clock, Award, TrendingUp } from 'lucide-react';

// Mockup for Student Dashboard
export const DashboardMock = () => {
  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#003049] text-white flex flex-col">
        <div className="p-6 text-xl font-bold">ZYGOTE</div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {['Dashboard', 'Subjects', 'Bookmarks', 'Tests', 'Profile'].map((item, i) => (
            <div key={item} className={`p-3 rounded-lg cursor-pointer flex items-center ${i === 0 ? 'bg-[#27E6D4] text-[#003049] font-semibold' : 'hover:bg-white/10'}`}>
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Student</h1>
            <p className="text-gray-500">You have 3 chapters pending in Anatomy.</p>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Study Hours', val: '12.5h', icon: Clock, color: 'bg-blue-100 text-blue-600' },
            { label: 'Topics Completed', val: '45', icon: Book, color: 'bg-green-100 text-green-600' },
            { label: 'Avg. Score', val: '82%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
            { label: 'Streak', val: '5 Days', icon: Award, color: 'bg-yellow-100 text-yellow-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Continue Learning</h2>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-[#003049]">Upper Limb: Brachial Plexus</h3>
              <p className="text-gray-500">Anatomy • Chapter 3</p>
            </div>
            <button className="px-6 py-3 bg-[#003049] text-white rounded-lg hover:bg-[#00466A]">
              Resume
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
