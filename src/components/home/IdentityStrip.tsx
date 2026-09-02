import React from 'react';
import { Church, Heart, Map, Users } from 'lucide-react';

export const IdentityStrip: React.FC = () => {
  const identities = [
    {
      icon: Church,
      title: 'A SANCTUARY',
      subtitle: 'of God\'s Presence',
    },
    {
      icon: Heart,
      title: 'REDEEMED',
      subtitle: 'by the Blood of Jesus',
    },
    {
      icon: Map,
      title: 'DESTINED',
      subtitle: 'for the Glory of God',
    },
    {
      icon: Users,
      title: 'A COMMUNITY',
      subtitle: 'that grows, serves and transforms',
    },
  ];

  return (
    <div className="bg-tym-bg py-12 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {identities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <Icon className="w-8 h-8 text-tym-slate flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-bold text-tym-slate uppercase">
                    {item.title}
                  </p>
                  <p className="text-gray-600">{item.subtitle}</p>
                </div>
                {index < identities.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gray-300 h-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
