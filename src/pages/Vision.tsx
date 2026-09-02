import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SectionHeading } from '../components/ui/SectionHeading';
import { VisionSection } from '../components/home/VisionSection';

export const Vision: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-tym-bg">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeading
              title="Our Vision"
              centered={true}
            />
          </div>
        </div>

        <VisionSection />

        <div className="py-24 bg-tym-bg">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-tym-slate mb-6">
              How We Get There
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Our four pillars—Encounter, Transform, Equip, and Impact—form the foundation of everything we do. Each pillar represents a critical dimension of spiritual development and leadership formation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that young people who encounter God deeply, experience genuine transformation, develop their gifts, and go out to make an impact will become the leaders their generation desperately needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                This is not just about individual transformation—it's about raising up a generation that will transform their families, schools, workplaces, and communities for the glory of God.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
