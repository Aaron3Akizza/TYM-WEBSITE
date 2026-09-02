import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { signIn } from '../lib/auth';
import { Card } from '../components/ui/Card';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { user, error: err } = await signIn(email, password);

      if (err) {
        setError(err.message);
      } else if (user) {
        navigate('/profile');
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
      <main className="flex-grow pt-20 bg-tym-bg flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-tym-slate mb-6 text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
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
              SIGN IN
            </Button>
          </form>

          <div className="mt-6 space-y-3 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-tym-crimson font-semibold hover:underline">
                Sign up
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="text-tym-crimson font-semibold hover:underline">
                Forgot your password?
              </Link>
            </p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
