import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { SectionHeading } from '../ui/SectionHeading';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { formatDate, formatTime } from '../../lib/utils';

export const EventsPreview: React.FC = () => {
  const { events, loading, error } = useEvents();

  // Show only first 3 events
  const displayedEvents = events.slice(0, 3);

  if (error) {
    return (
      <div className="py-24 bg-tym-slate text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-red-300">Error loading events: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-tym-slate text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="UPCOMING EVENTS"
          centered={true}
        />

        {loading ? (
          <LoadingSpinner />
        ) : displayedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300 mb-6">
              No upcoming events at the moment. Check back soon!
            </p>
            <Link to="/events">
              <Button variant="outline" size="lg">
                VIEW ALL EVENTS
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {displayedEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/events/${event.slug}`}
                  className="group"
                >
                  <div className="bg-white bg-opacity-5 rounded-lg p-6 hover:bg-opacity-10 transition-all duration-300 border border-white border-opacity-10 h-full flex flex-col">
                    {/* Date Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-tym-crimson" />
                      <span className="text-sm font-semibold">
                        {formatDate(event.event_date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-tym-crimson transition-colors">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 flex-grow">
                      {event.short_description}
                    </p>

                    {/* Time and Location */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">
                          {formatTime(event.start_time)} -{' '}
                          {formatTime(event.end_time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {events.length > 3 && (
              <div className="text-center mt-12">
                <Link to="/events">
                  <Button variant="primary" size="lg">
                    VIEW ALL EVENTS →
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
