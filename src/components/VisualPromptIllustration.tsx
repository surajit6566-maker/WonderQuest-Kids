import React from 'react';
import { VisualCue } from '../engine/types';

function renderShapeSvg(shape: string, fill: string, size = 76) {
  const s = shape.toLowerCase();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {s === 'circle' && (
        <circle cx="50" cy="50" r="38" fill={fill} stroke="#1E293B" strokeWidth="4" />
      )}
      {s === 'square' && (
        <rect x="16" y="16" width="68" height="68" rx="8" fill={fill} stroke="#1E293B" strokeWidth="4" />
      )}
      {s === 'rectangle' && (
        <rect x="10" y="26" width="80" height="48" rx="8" fill={fill} stroke="#1E293B" strokeWidth="4" />
      )}
      {s === 'triangle' && (
        <polygon points="50,12 88,84 12,84" fill={fill} stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
      )}
      {s === 'star' && (
        <polygon
          points="50,10 61,36 90,38 67,56 75,85 50,69 25,85 33,56 10,38 39,36"
          fill={fill}
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}
      {s === 'heart' && (
        <path
          d="M50 84 C50 84 14 60 14 35 C14 21 25 13 37 13 C44 13 48 17 50 22 C52 17 56 13 63 13 C75 13 86 21 86 35 C86 60 50 84 50 84 Z"
          fill={fill}
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}
      {s === 'oval' && (
        <ellipse cx="50" cy="50" rx="40" ry="26" fill={fill} stroke="#1E293B" strokeWidth="4" />
      )}
      {s === 'diamond' && (
        <polygon points="50,10 86,50 50,90 14,50" fill={fill} stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
      )}
      {s === 'pentagon' && (
        <polygon points="50,10 88,38 74,84 26,84 12,38" fill={fill} stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
      )}
      {s === 'hexagon' && (
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill={fill} stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
      )}
      {s === 'octagon' && (
        <polygon points="34,12 66,12 88,34 88,66 66,88 34,88 12,66 12,34" fill={fill} stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export const VisualPromptIllustration: React.FC<{ visual?: VisualCue }> = ({ visual }) => {
  if (!visual) return null;

  if (visual.kind === 'color') {
    const isMixing = visual.secondaryValue?.startsWith('#');
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-2">
        {isMixing ? (
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl border-3 border-slate-800 shadow-sm"
              style={{ backgroundColor: visual.colorHex }}
              aria-hidden="true"
            />
            <span className="font-display text-3xl font-bold text-slate-700">+</span>
            <div
              className="w-16 h-16 rounded-2xl border-3 border-slate-800 shadow-sm"
              style={{ backgroundColor: visual.secondaryValue }}
              aria-hidden="true"
            />
            <span className="font-display text-3xl font-bold text-slate-700">= ?</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-24 h-24 rounded-3xl border-4 border-slate-800 shadow-sm"
              style={{ backgroundColor: visual.colorHex }}
              aria-hidden="true"
            />
            {visual.secondaryValue && (
              <p className="text-sm font-bold text-slate-600">{visual.secondaryValue}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  if (visual.kind === 'shape') {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        {renderShapeSvg(visual.primaryValue, '#FFD95A', 92)}
        {visual.secondaryValue && (
          <p className="text-sm font-semibold text-slate-600">{visual.secondaryValue}</p>
        )}
      </div>
    );
  }

  if (visual.kind === 'count') {
    const count = visual.count ?? 1;
    return (
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-md px-4 py-3 rounded-2xl bg-[#FFF9EC] border-2 border-slate-900/10">
          {Array.from({ length: count }, (_, idx) => (
            <span key={idx} className="text-4xl leading-none select-none" aria-hidden="true">
              {visual.primaryValue}
            </span>
          ))}
        </div>
        {visual.secondaryValue && (
          <p className="text-sm font-bold text-slate-600">{visual.secondaryValue}</p>
        )}
      </div>
    );
  }

  if (visual.kind === 'math') {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="px-6 py-4 rounded-2xl bg-[#EBF8FE] border-2 border-[#57C7F2]">
          <span className="font-mono-num text-3xl sm:text-4xl font-bold text-slate-900">
            {visual.primaryValue}
          </span>
        </div>
        {visual.secondaryValue && (
          <p className="text-xs font-bold tracking-wide text-slate-500">{visual.secondaryValue}</p>
        )}
      </div>
    );
  }

  if (visual.kind === 'pattern' && visual.patternSequence) {
    return (
      <div className="flex items-center justify-center flex-wrap gap-3 py-2">
        {visual.patternSequence.map((item, idx) => (
          <div
            key={idx}
            className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-900/10 flex items-center justify-center"
          >
            {renderShapeSvg(item.shape, item.color, 48)}
          </div>
        ))}
        <div className="w-16 h-16 rounded-2xl bg-[#FFF9EC] border-2 border-dashed border-slate-400 flex items-center justify-center font-display text-2xl font-bold text-slate-600">
          ?
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="w-24 h-24 rounded-3xl bg-[#FFF9EC] border-2 border-slate-900/10 flex items-center justify-center text-6xl select-none">
        {visual.primaryValue}
      </div>
      {visual.secondaryValue && (
        <p className="text-sm font-bold text-slate-600">{visual.secondaryValue}</p>
      )}
    </div>
  );
};
