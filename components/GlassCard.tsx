
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-white/20 bg-white/20">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
