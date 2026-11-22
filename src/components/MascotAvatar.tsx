import React from 'react';
import { MascotId } from '../engine/types';

interface MascotAvatarProps {
  mascotId: MascotId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'idle' | 'happy' | 'thinking';
  reducedMotion?: boolean;
  className?: string;
}

const SIZE_MAP: Record<NonNullable<MascotAvatarProps['size']>, number> = {
  sm: 52,
  md: 84,
  lg: 120,
  xl: 156,
};

export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  mascotId,
  size = 'md',
  mood = 'idle',
  reducedMotion = false,
  className = '',
}) => {
  const px = SIZE_MAP[size];
  const floatClass = reducedMotion ? '' : mood === 'happy' ? 'animate-bounce' : 'animate-float';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${floatClass} ${className}`}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      {mascotId === 'wally' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
          {/* Antenna */}
          <line x1="60" y1="10" x2="60" y2="25" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="10" r="6" fill="#FFD95A" stroke="#334155" strokeWidth="2.5" />
          {/* Ears */}
          <rect x="14" y="52" width="12" height="24" rx="6" fill="#FF9566" stroke="#334155" strokeWidth="3" />
          <rect x="94" y="52" width="12" height="24" rx="6" fill="#FF9566" stroke="#334155" strokeWidth="3" />
          {/* Head */}
          <rect x="24" y="25" width="72" height="66" rx="20" fill="#57C7F2" stroke="#334155" strokeWidth="3.5" />
          {/* Visor */}
          <rect x="33" y="38" width="54" height="32" rx="12" fill="#FFF9EC" stroke="#334155" strokeWidth="2.5" />
          {/* Eyes */}
          <circle cx="47" cy="53" r="5.5" fill="#1E293B" />
          <circle cx="73" cy="53" r="5.5" fill="#1E293B" />
          <circle cx="48.5" cy="51" r="2" fill="#FFFFFF" />
          <circle cx="74.5" cy="51" r="2" fill="#FFFFFF" />
          {/* Smile */}
          {mood === 'happy' ? (
            <path d="M47 77 Q60 88 73 77" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <path d="M50 78 Q60 84 70 78" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          )}
          {/* Body badge */}
          <rect x="38" y="92" width="44" height="20" rx="10" fill="#8DE3B2" stroke="#334155" strokeWidth="3" />
          <circle cx="60" cy="102" r="5" fill="#FFD95A" stroke="#334155" strokeWidth="2" />
        </svg>
      )}

      {mascotId === 'bella' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
          {/* Hair back */}
          <circle cx="32" cy="70" r="14" fill="#7C2D12" stroke="#334155" strokeWidth="3" />
          <circle cx="88" cy="70" r="14" fill="#7C2D12" stroke="#334155" strokeWidth="3" />
          {/* Face */}
          <circle cx="60" cy="64" r="32" fill="#FDE6D2" stroke="#334155" strokeWidth="3.5" />
          {/* Explorer Hat */}
          <ellipse cx="60" cy="36" rx="44" ry="11" fill="#FFD95A" stroke="#334155" strokeWidth="3.5" />
          <path d="M35 35 C35 16 85 16 85 35 Z" fill="#FF9566" stroke="#334155" strokeWidth="3.5" />
          <circle cx="60" cy="26" r="5" fill="#FFF9EC" stroke="#334155" strokeWidth="2" />
          {/* Eyes & Cheeks */}
          <circle cx="48" cy="63" r="4.5" fill="#1E293B" />
          <circle cx="72" cy="63" r="4.5" fill="#1E293B" />
          <circle cx="49.5" cy="61.5" r="1.5" fill="#FFFFFF" />
          <circle cx="73.5" cy="61.5" r="1.5" fill="#FFFFFF" />
          <circle cx="40" cy="72" r="4.5" fill="#FDA4AF" opacity="0.7" />
          <circle cx="80" cy="72" r="4.5" fill="#FDA4AF" opacity="0.7" />
          <path d="M51 75 Q60 83 69 75" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Scarf */}
          <rect x="40" y="93" width="40" height="17" rx="8" fill="#57C7F2" stroke="#334155" strokeWidth="3" />
        </svg>
      )}

      {mascotId === 'coco' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
          {/* Ears */}
          <circle cx="23" cy="60" r="13" fill="#B45309" stroke="#334155" strokeWidth="3" />
          <circle cx="23" cy="60" r="7" fill="#FDE68A" />
          <circle cx="97" cy="60" r="13" fill="#B45309" stroke="#334155" strokeWidth="3" />
          <circle cx="97" cy="60" r="7" fill="#FDE68A" />
          {/* Head */}
          <circle cx="60" cy="60" r="34" fill="#B45309" stroke="#334155" strokeWidth="3.5" />
          {/* Curl */}
          <path d="M56 26 Q64 14 70 26" fill="none" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
          {/* Inner Face */}
          <ellipse cx="60" cy="67" rx="25" ry="21" fill="#FEF3C7" />
          <circle cx="48" cy="57" r="4.5" fill="#1E293B" />
          <circle cx="72" cy="57" r="4.5" fill="#1E293B" />
          <circle cx="49.5" cy="55.5" r="1.5" fill="#FFFFFF" />
          <circle cx="73.5" cy="55.5" r="1.5" fill="#FFFFFF" />
          <path d="M49 72 Q60 81 71 72" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Collar */}
          <rect x="41" y="92" width="38" height="18" rx="9" fill="#FFD95A" stroke="#334155" strokeWidth="3" />
        </svg>
      )}

      {mascotId === 'luna' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
          {/* Hair puff */}
          <circle cx="32" cy="34" r="14" fill="#4C1D95" stroke="#334155" strokeWidth="3" />
          <circle cx="88" cy="34" r="14" fill="#4C1D95" stroke="#334155" strokeWidth="3" />
          <circle cx="60" cy="58" r="34" fill="#FDE6D2" stroke="#334155" strokeWidth="3.5" />
          {/* Hair bangs */}
          <path d="M27 52 C32 24 88 24 93 52 C80 42 40 42 27 52 Z" fill="#4C1D95" stroke="#334155" strokeWidth="3" />
          {/* Round Science Glasses */}
          <circle cx="46" cy="60" r="11" fill="#E0F2FE" fillOpacity="0.65" stroke="#334155" strokeWidth="3" />
          <circle cx="74" cy="60" r="11" fill="#E0F2FE" fillOpacity="0.65" stroke="#334155" strokeWidth="3" />
          <line x1="57" y1="60" x2="63" y2="60" stroke="#334155" strokeWidth="3" />
          <circle cx="46" cy="60" r="3.5" fill="#1E293B" />
          <circle cx="74" cy="60" r="3.5" fill="#1E293B" />
          <path d="M51 77 Q60 83 69 77" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Lab coat */}
          <rect x="37" y="90" width="46" height="20" rx="9" fill="#B9A6F6" stroke="#334155" strokeWidth="3" />
          <polygon points="60,94 63,100 69,100 64,104 66,110 60,106 54,110 56,104 51,100 57,100" fill="#FFD95A" />
        </svg>
      )}

      {mascotId === 'max' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
          {/* Fox ears */}
          <polygon points="24,52 30,14 52,38" fill="#FF9566" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="96,52 90,14 68,38" fill="#FF9566" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="30,45 33,23 46,38" fill="#FFF9EC" />
          <polygon points="90,45 87,23 74,38" fill="#FFF9EC" />
          {/* Fox face */}
          <ellipse cx="60" cy="64" rx="35" ry="30" fill="#FF9566" stroke="#334155" strokeWidth="3.5" />
          <path d="M26 64 Q44 64 60 88 Q76 64 94 64 Q86 92 60 94 Q34 92 26 64 Z" fill="#FFF9EC" />
          <circle cx="46" cy="58" r="4.5" fill="#1E293B" />
          <circle cx="74" cy="58" r="4.5" fill="#1E293B" />
          <circle cx="47.5" cy="56.5" r="1.5" fill="#FFFFFF" />
          <circle cx="75.5" cy="56.5" r="1.5" fill="#FFFFFF" />
          {/* Nose */}
          <circle cx="60" cy="70" r="4.5" fill="#1E293B" />
          <path d="M52 77 Q60 83 68 77" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
          {/* Bandana */}
          <rect x="40" y="93" width="40" height="17" rx="8" fill="#8DE3B2" stroke="#334155" strokeWidth="3" />
        </svg>
      )}
    </div>
  );
};
