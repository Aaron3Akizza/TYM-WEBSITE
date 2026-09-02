import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';

export const WhatWeDo: React.FC = () => {
  const activities = [
    {
      title: 'Youth Fellowship',
      description: 'Weekly gatherings for worship, teaching, and community building.',
    },
    {
      title: 'Discipleship Circles',
      description: 'Small group experiences focused on biblical growth and accountability.',
    },
    {
      title: 'Leadership Development',
      description: 'Intentional training programs to develop emerging leaders.',
    },
    {
      title: 'Worship Events',
      description: 'Corporate worship experiences focused on encountering God.',
    },
    {
      title: 'Community Outreach',
      description: 'Hands-on service and ministry to our local community.',
    },
    {
      title: 'Mentorship',
      description: 'One-on-one relationships connecting young leaders with mentors.',
    },
    {
      title: 'Teaching & Preaching',
      description: 'Expository teaching of God\'s Word for transformation.',
    },
    {
      title: 'Spiritual Formation',
      description: 'Prayer, fasting, and spiritual disciplines for deeper encounter with God.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-tym-bg">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeading
              title="What We Do"
              subtitle="Our activities and programs designed to create transformation."
              centered={true}
            />
          </div>
        </div>

        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.map((activity, index) => (
                <Card key={index} className="flex flex-col">
                  <div className="w-12 h-12 rounded-full bg-tym-crimson bg-opacity-10 flex items-center justify-center mb-4">
                    <span className="text-tym-crimson font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-tym-slate mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-16 p-8 bg-tym-slate text-white rounded-lg">
              <h2 className="text-2xl font-700 mb-4">
                Our Approach
              </h2>
              <p className="text-gray-300 mb-4">
                Everything we do is designed around our four pillars: creating spaces for Encounter, facilitating Transformation, Equipping leaders, and fostering Impact. We believe that young people thrive in authentic community where they experience God's presence, grow spiritually, develop practically, and go out to make a difference.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
