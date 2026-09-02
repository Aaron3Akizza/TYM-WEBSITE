import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface NavLink {
  label: string;
  path: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  user: any;
  signOut: () => Promise<void>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navLinks,
  isOpen,
  onClose,
  user,
  signOut,
}) => {
  return (
    <div
      className={`fixed top-20 left-0 right-0 bg-tym-bg border-b border-gray-200 md:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="p-4 space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="block text-tym-slate font-semibold py-2 hover:text-tym-crimson transition-colors"
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}

        <div className="border-t border-gray-200 pt-4 space-y-3">
          {user ? (
            <>
              <Link to="/profile" onClick={onClose}>
                <Button variant="outline" size="md" className="w-full">
                  Profile
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign-in" onClick={onClose}>
                <Button variant="outline" size="md" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/get-involved" onClick={onClose}>
                <Button variant="primary" size="md" className="w-full">
                  JOIN THE MOVEMENT
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
