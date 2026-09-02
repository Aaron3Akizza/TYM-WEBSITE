import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-24 bg-tym-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-tym-crimson font-semibold text-sm uppercase tracking-wider mb-4">
              ABOUT TYM
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-tym-slate mb-6">
              We Are Transform Youth Ministry
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              TYM is a community of young people passionate about Jesus and
              committed to becoming transformed leaders who influence every
              sphere of life. We believe that the next generation has a critical
              role to play in God's redemptive purpose for the world.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to create spaces where young people encounter God
              deeply, experience genuine transformation, develop their gifts and
              calling, and go out to make a kingdom impact in their families,
              schools, workplaces, and communities.
            </p>
            <Link to="/about">
              <Button variant="primary" size="lg">
                MORE ABOUT US →
              </Button>
            </Link>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-24 h-24 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">
                  About Us Image Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
