import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { supabase } from '../lib/supabase';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !subject || !message) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const { error: err } = await supabase.from('contact_messages').insert([
        {
          name,
          email,
          phone,
          subject,
          message,
          status: 'unread',
        },
      ]);

      if (err) {
        setError(err.message);
      } else {
        setSuccess(
          'Thank you for your message! We\'ll get back to you soon.'
        );
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-tym-bg">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeading
              title="Get In Touch"
              subtitle="We'd love to hear from you. Send us a message!"
              centered={true}
            />
          </div>
        </div>

        <div className="py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone (Optional)"
                    type="tel"
                    placeholder="Your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                  />
                  <Input
                    label="Subject"
                    placeholder="Message subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-tym-slate mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-dm-sans text-tym-slate placeholder-gray-500 focus:outline-none focus:border-tym-crimson transition-colors duration-200 resize-none"
                    rows={6}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  disabled={loading}
                  className="w-full"
                >
                  SEND MESSAGE
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
