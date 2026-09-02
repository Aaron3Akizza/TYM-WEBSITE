import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';

export const Media: React.FC = () => {
  const mediaItems = [
    {
      title: 'The Power of Transformation',
      type: 'Sermon',
      description: 'A powerful message about God\'s transformative power.',
    },
    {
      title: 'Worship Service Highlights',
      type: 'Worship',
      description: 'Beautiful moments of worship from our community.',
    },
    {
      title: 'Leadership Development',
      type: 'Teaching',
      description: 'Practical teaching on biblical leadership.',
    },
    {
      title: 'Youth Ministry Stories',
      type: 'Video',
      description: 'Stories of transformation and growth.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-tym-bg">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeading
              title="Media & Resources"
              subtitle="Sermons, worship, teaching and stories from our community."
              centered={true}
            />
          </div>
        </div>

        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaItems.map((item, index) => (
                <Card key={index} className="flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 rounded mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-tym-crimson uppercase mb-2">
                    {item.type}
                  </p>
                  <h3 className="text-lg font-bold text-tym-slate mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
