import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 flex items-center justify-center bg-tym-bg">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-tym-crimson mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-tym-slate mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. Let's get you back
            on track.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              GO HOME →
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
