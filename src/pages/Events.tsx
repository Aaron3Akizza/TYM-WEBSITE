import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useEvents } from '../hooks/useEvents';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { formatDate, formatTime } from '../lib/utils';

export const Events: React.FC = () => {
  const { events, loading, error } = useEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-tym-bg">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeading
              title="Upcoming Events"
              subtitle="Join us for worship, fellowship, discipleship and community impact."
              centered={true}
            />
          </div>
        </div>

        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center">
                <p className="text-red-500">Error loading events: {error}</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-600 text-lg">
                  No upcoming events at this time. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {events.map((event) => (
                  <Link key={event.id} to={`/events/${event.slug}`}>
                    <Card className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-tym-crimson">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                        <div className="md:col-span-2">
                          <h3 className="text-2xl font-bold text-tym-slate mb-2 hover:text-tym-crimson transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {event.short_description}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-tym-crimson" />
                            <span className="text-gray-700">
                              {formatDate(event.event_date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-tym-crimson" />
                            <span className="text-gray-700">
                              {formatTime(event.start_time)} -{' '}
                              {formatTime(event.end_time)}
                            </span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-tym-crimson" />
                            <span className="text-gray-700">
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
