import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/sign-in');
    }
  }, [user, loading, navigate]);

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

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 bg-tym-bg py-12">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow p-8">
            <h1 className="text-3xl font-bold text-tym-slate mb-8">
              My Profile
            </h1>

            {profile && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Name
                  </label>
                  <p className="text-lg text-tym-slate">{profile.full_name}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Email
                  </label>
                  <p className="text-lg text-tym-slate">{profile.email}</p>
                </div>

                {profile.phone && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Phone
                    </label>
                    <p className="text-lg text-tym-slate">{profile.phone}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Role
                  </label>
                  <p className="text-lg text-tym-slate capitalize">
                    {profile.role}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Member Since
                  </label>
                  <p className="text-lg text-tym-slate">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-200 flex gap-4">
                  <Button variant="outline" size="lg" disabled>
                    Edit Profile
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={async () => {
                      await signOut();
                      navigate('/');
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
