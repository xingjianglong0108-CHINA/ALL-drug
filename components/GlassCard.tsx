
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title, noPadding = false }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-[30px] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[20px] overflow-hidden ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-black/5">
          <h2 className="text-[17px] font-semibold text-slate-900 tracking-tight">{title}</h2>
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
