import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { isValidEmail } from '../../lib/utils';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { error: err } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, status: 'active' }]);

      if (err) {
        if (err.message.includes('duplicate')) {
          setError('This email is already subscribed');
        } else {
          setError(err.message);
        }
      } else {
        setMessage(
          'Successfully subscribed! Check your email for updates.'
        );
        setEmail('');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-tym-slate mb-4">
          STAY CONNECTED
        </h2>
        <p className="text-gray-600 mb-8">
          Subscribe to get updates, inspiration and event alerts.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              disabled={loading}
              className="sm:w-auto"
            >
              SUBSCRIBE
            </Button>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {message && (
            <p className="text-green-600 text-sm">{message}</p>
          )}
        </form>

        <p className="text-xs text-gray-500 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};
