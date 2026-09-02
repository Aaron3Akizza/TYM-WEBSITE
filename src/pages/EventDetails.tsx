import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { getEventBySlug, registerForEvent, isUserRegisteredForEvent } from '../hooks/useEvents';
import { formatDate, formatTime } from '../lib/utils';
import { Calendar, MapPin, Clock } from 'lucide-react';
import type { Event } from '../types';

export const EventDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!slug) return;
      try {
        const fetchedEvent = await getEventBySlug(slug);
        setEvent(fetchedEvent);

        if (fetchedEvent && user) {
          const registered = await isUserRegisteredForEvent(
            fetchedEvent.id,
            user.id
          );
          setIsRegistered(registered);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug, user]);

  const handleRegister = async () => {
    if (!user || !event) return;

    setRegistering(true);
    try {
      const { error } = await registerForEvent(event.id, user.id);
      if (error) {
        alert('Error registering for event: ' + error.message);
      } else {
        setIsRegistered(true);
        alert('Successfully registered for this event!');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred while registering');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20 bg-tym-bg">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-center">
            <h1 className="text-3xl font-bold text-tym-slate mb-4">
              Event not found
            </h1>
            <p className="text-gray-600">
              The event you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-tym-bg">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-tym-slate mb-6">
                  {event.title}
                </h1>

                {/* Event Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-tym-crimson" />
                    <span className="text-lg text-gray-700">
                      {formatDate(event.event_date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-tym-crimson" />
                    <span className="text-lg text-gray-700">
                      {formatTime(event.start_time)} -{' '}
                      {formatTime(event.end_time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-tym-crimson" />
                    <span className="text-lg text-gray-700">
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
                {isRegistered ? (
                  <div className="text-center">
                    <p className="text-green-600 font-semibold text-lg mb-4">
                      ✓ You're registered
                    </p>
                    <p className="text-gray-600">
                      You're all set for this event. See you there!
                    </p>
                  </div>
                ) : user ? (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleRegister}
                    isLoading={registering}
                    className="w-full"
                  >
                    REGISTER NOW
                  </Button>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Sign in to register for this event.
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() =>
                        (window.location.href = '/sign-in')
                      }
                    >
                      SIGN IN
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
