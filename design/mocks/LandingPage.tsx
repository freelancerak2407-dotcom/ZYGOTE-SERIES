import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';

// Mockup for the Landing Page
export const LandingPageMock = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-[#003049]">ZYGOTE<span className="text-[#27E6D4]">SERIES</span></div>
        <div className="space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="primary">Student Login</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-8 py-24 text-center bg-[#003049] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Master MBBS with <span className="text-[#27E6D4]">Precision</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The ultimate learning platform for medical students. High-yield notes, interactive mind maps, and clinical MCQs tailored for your exams.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary">Start Learning Free <ArrowRight className="ml-2 w-5 h-5"/></Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">View Syllabus</Button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Clinical Notes', desc: 'Concise, exam-oriented notes updated with latest guidelines.' },
            { title: 'Visual Mindmaps', desc: 'Retain complex pathways with our signature SVG mindmaps.' },
            { title: 'QBank & Analytics', desc: 'Test your knowledge with 10,000+ MCQs and track progress.' }
          ].map((f, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#003049]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="text-[#003049]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#003049]">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
