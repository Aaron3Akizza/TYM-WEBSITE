import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Event } from '../types';

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: err } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

      if (err) {
        setError(err.message);
        return;
      }

      setEvents((data as Event[]) || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  };
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return (data as Event) || null;
}

export async function registerForEvent(
  eventId: string,
  userId: string
): Promise<{ error: any }> {
  const { error } = await supabase.from('event_registrations').insert([
    {
      event_id: eventId,
      user_id: userId,
    },
  ]);

  return { error };
}

export async function isUserRegisteredForEvent(
  eventId: string,
  userId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', userId)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}
