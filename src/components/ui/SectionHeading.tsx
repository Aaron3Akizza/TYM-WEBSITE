import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  subtitle,
  centered = true,
}) => {
  return (
    <div className={centered ? 'text-center' : 'text-left'}>
      {label && (
        <p className="text-tym-crimson font-semibold text-sm uppercase tracking-wider mb-2">
          {label}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-tym-slate mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
