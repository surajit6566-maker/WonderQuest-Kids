import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Eraser, Palette, RotateCcw, Save, Shapes, Sparkles, Trash2 } from 'lucide-react';
import { SavedDrawing } from '../engine/types';

interface CreativeStudioScreenProps {
  savedDrawings: SavedDrawing[];
  onSaveDrawing: (drawing: SavedDrawing) => void;
  onDeleteDrawing: (id: string) => void;
  onSound: (type: 'click' | 'correct' | 'star') => void;
  onSpeak: (text: string) => void;
}

type TemplateId = 'free' | 'rocket' | 'lion' | 'butterfly' | 'house';
type StampKind = 'none' | 'star' | 'heart' | 'circle';

const PALETTE_COLORS = [
  { name: 'Coral', hex: '#FF9566' },
  { name: 'Sunshine', hex: '#FFD95A' },
  { name: 'Sky', hex: '#57C7F2' },
  { name: 'Mint', hex: '#8DE3B2' },
  { name: 'Lavender', hex: '#B9A6F6' },
  { name: 'Berry', hex: '#EC4899' },
  { name: 'Ruby', hex: '#EF4444' },
  { name: 'Leaf', hex: '#22C55E' },
  { name: 'Cobalt', hex: '#2563EB' },
  { name: 'Ink', hex: '#1E293B' },
];

function mixHexColors(hexA: string, hexB: string): string {
  const parse = (h: string) => [
    Number.parseInt(h.slice(1, 3), 16),
    Number.parseInt(h.slice(3, 5), 16),
    Number.parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(hexA);
  const [r2, g2, b2] = parse(hexB);
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex((r1 + r2) / 2)}${toHex((g1 + g2) / 2)}${toHex((b1 + b2) / 2)}`;
}

export const CreativeStudioScreen: React.FC<CreativeStudioScreenProps> = ({
  savedDrawings,
  onSaveDrawing,
  onDeleteDrawing,
  onSound,
  onSpeak,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [template, setTemplate] = useState<TemplateId>('rocket');
  const [color, setColor] = useState('#FF9566');
  const [mixColorA, setMixColorA] = useState('#EF4444');
  const [mixColorB, setMixColorB] = useState('#FFD95A');
  const [brushSize, setBrushSize] = useState(10);
  const [isEraser, setIsEraser] = useState(false);
  const [stamp, setStamp] = useState<StampKind>('none');
  const [isDrawing, setIsDrawing] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState('');

  const drawTemplateOutline = useCallback((ctx: CanvasRenderingContext2D, tpl: TemplateId) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tpl === 'rocket') {
      // Rocket body
      ctx.beginPath();
      ctx.ellipse(w / 2, h / 2 - 10, 56, 110, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Window
      ctx.beginPath();
      ctx.arc(w / 2, h / 2 - 36, 26, 0, Math.PI * 2);
      ctx.stroke();
      // Left & Right fins
      ctx.beginPath();
      ctx.moveTo(w / 2 - 52, h / 2 + 40);
      ctx.lineTo(w / 2 - 96, h / 2 + 100);
      ctx.lineTo(w / 2 - 36, h / 2 + 86);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w / 2 + 52, h / 2 + 40);
      ctx.lineTo(w / 2 + 96, h / 2 + 100);
      ctx.lineTo(w / 2 + 36, h / 2 + 86);
      ctx.closePath();
      ctx.stroke();

      // Stars
      ctx.beginPath();
      ctx.arc(110, 90, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w - 110, 100, 18, 0, Math.PI * 2);
      ctx.stroke();
    } else if (tpl === 'lion') {
      // Mane
      for (let i = 0; i < 12; i += 1) {
        const angle = (i / 12) * Math.PI * 2;
        const x = w / 2 + Math.cos(angle) * 86;
        const y = h / 2 + Math.sin(angle) * 86;
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 72, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Eyes & Smile
      ctx.beginPath();
      ctx.arc(w / 2 - 24, h / 2 - 14, 7, 0, Math.PI * 2);
      ctx.arc(w / 2 + 24, h / 2 - 14, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w / 2, h / 2 + 12, 22, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
    } else if (tpl === 'butterfly') {
      // Wings
      ctx.beginPath();
      ctx.ellipse(w / 2 - 75, h / 2 - 35, 62, 48, -0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(w / 2 + 75, h / 2 - 35, 62, 48, 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(w / 2 - 60, h / 2 + 48, 45, 36, 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(w / 2 + 60, h / 2 + 48, 45, 36, -0.3, 0, Math.PI * 2);
      ctx.stroke();
      // Body
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(w / 2, h / 2 + 8, 16, 76, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (tpl === 'house') {
      ctx.strokeRect(w / 2 - 90, h / 2 - 10, 180, 120);
      ctx.beginPath();
      ctx.moveTo(w / 2 - 110, h / 2 - 10);
      ctx.lineTo(w / 2, h / 2 - 105);
      ctx.lineTo(w / 2 + 110, h / 2 - 10);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeRect(w / 2 - 22, h / 2 + 40, 44, 70);
      ctx.strokeRect(w / 2 - 72, h / 2 + 16, 36, 36);
      ctx.strokeRect(w / 2 + 36, h / 2 + 16, 36, 36);
    }
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawTemplateOutline(ctx, template);
  }, [template, drawTemplateOutline]);

  useEffect(() => {
    onSpeak('Welcome to Creative City! Pick a color or template and paint your masterpiece!');
  }, [onSpeak]);

  const getCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const drawStamp = (ctx: CanvasRenderingContext2D, x: number, y: number, kind: StampKind) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 2.5;
    if (kind === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (kind === 'star') {
      ctx.beginPath();
      for (let i = 0; i < 10; i += 1) {
        const r = i % 2 === 0 ? 24 : 10;
        const a = (i * Math.PI) / 5 - Math.PI / 2;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (kind === 'heart') {
      ctx.beginPath();
      ctx.moveTo(x, y + 18);
      ctx.bezierCurveTo(x - 26, y - 2, x - 20, y - 24, x, y - 10);
      ctx.bezierCurveTo(x + 20, y - 24, x + 26, y - 2, x, y + 18);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);
    if (stamp !== 'none') {
      onSound('click');
      drawStamp(ctx, x, y, stamp);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || stamp !== 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = isEraser ? brushSize * 2 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    onSound('click');
    drawTemplateOutline(ctx, template);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const drawing: SavedDrawing = {
      id: `draw-${Date.now()}`,
      title: `${template === 'free' ? 'Free Art' : template.charAt(0).toUpperCase() + template.slice(1)} Painting`,
      template,
      dataUrl,
      createdAt: new Date().toLocaleDateString(),
    };
    onSound('star');
    onSaveDrawing(drawing);
    setSaveFeedback('Saved to your Creative Gallery +3 Stars!');
    window.setTimeout(() => setSaveFeedback(''), 3000);
  };

  const mixedHex = mixHexColors(mixColorA, mixColorB);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  ['rocket', 'Rocket'],
                  ['lion', 'Lion'],
                  ['butterfly', 'Butterfly'],
                  ['house', 'Treehouse'],
                  ['free', 'Blank Canvas'],
                ] as Array<[TemplateId, string]>
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onSound('click');
                    setTemplate(id);
                  }}
                  className={`h-10 px-3.5 rounded-xl text-sm font-bold border-2 transition-colors whitespace-nowrap ${
                    template === id
                      ? 'bg-[#FF9566] border-slate-900 text-slate-900'
                      : 'bg-white border-slate-900/10 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="h-10 px-3.5 rounded-xl bg-white border-2 border-slate-900/15 font-bold text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="h-10 px-4 rounded-xl bg-[#8DE3B2] hover:bg-[#73D99E] border-2 border-slate-900/15 font-bold text-sm text-slate-900 shadow-[0_3px_0_rgba(30,41,59,0.1)] flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                Save Art
              </button>
            </div>
          </div>

          {saveFeedback && (
            <div
              className="p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-bold text-sm flex items-center gap-2"
              role="status"
            >
              <Sparkles className="w-4 h-4" />
              {saveFeedback}
            </div>
          )}

          <div className="rounded-3xl bg-white border-3 border-slate-900/15 shadow-sm overflow-hidden">
            <canvas
              ref={canvasRef}
              width={640}
              height={400}
              data-testid="creative-canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-auto block touch-none cursor-crosshair bg-white"
            />
          </div>
        </div>

        {/* Right Tool Deck */}
        <div className="lg:col-span-4 space-y-5 bg-white rounded-3xl border-2 border-slate-900/10 p-5 shadow-[0_4px_0_rgba(30,41,59,0.06)]">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-[#FF9566]" />
              Color Palette
            </h3>
            <div className="grid grid-cols-5 gap-2.5">
              {PALETTE_COLORS.map((c) => {
                const active = !isEraser && color === c.hex;
                return (
                  <button
                    key={c.hex}
                    type="button"
                    aria-label={`Pick ${c.name} paint`}
                    onClick={() => {
                      onSound('click');
                      setColor(c.hex);
                      setIsEraser(false);
                      setStamp('none');
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`h-11 rounded-2xl border-2 transition-transform ${
                      active ? 'border-slate-900 scale-105 ring-2 ring-slate-900/30' : 'border-slate-900/15'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Color Mixer Lab */}
          <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-slate-900/10 space-y-2.5">
            <p className="text-sm font-bold text-slate-800">Color Mixing Lab</p>
            <div className="flex items-center gap-2">
              <select
                aria-label="First mix color"
                value={mixColorA}
                onChange={(e) => setMixColorA(e.target.value)}
                className="flex-1 min-w-0 h-9 rounded-xl border border-slate-300 bg-white px-2 text-xs font-bold"
              >
                {PALETTE_COLORS.slice(0, 9).map((c) => (
                  <option key={c.hex} value={c.hex}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="font-bold text-slate-600 shrink-0">+</span>
              <select
                aria-label="Second mix color"
                value={mixColorB}
                onChange={(e) => setMixColorB(e.target.value)}
                className="flex-1 min-w-0 h-9 rounded-xl border border-slate-300 bg-white px-2 text-xs font-bold"
              >
                {PALETTE_COLORS.slice(0, 9).map((c) => (
                  <option key={c.hex} value={c.hex}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                onSound('click');
                setColor(mixedHex);
                setIsEraser(false);
                setStamp('none');
              }}
              className="w-full h-10 rounded-xl border-2 border-slate-900/15 font-bold text-xs text-slate-900 flex items-center justify-center gap-2"
              style={{ backgroundColor: mixedHex }}
            >
              <span className="px-2 py-0.5 rounded bg-white/90 text-slate-900">
                Use Mixed Color
              </span>
            </button>
          </div>

          {/* Brush & Eraser */}
          <div className="space-y-2.5">
            <p className="text-sm font-bold text-slate-800">Brush Size & Tools</p>
            <div className="flex items-center gap-2">
              {[6, 12, 22].map((sz, i) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    onSound('click');
                    setBrushSize(sz);
                    setIsEraser(false);
                    setStamp('none');
                  }}
                  className={`flex-1 h-10 rounded-xl border-2 text-xs font-bold ${
                    !isEraser && stamp === 'none' && brushSize === sz
                      ? 'bg-[#57C7F2] border-slate-900 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {['Small', 'Medium', 'Large'][i]}
                </button>
              ))}
              <button
                type="button"
                aria-label="Eraser tool"
                onClick={() => {
                  onSound('click');
                  setIsEraser(true);
                  setStamp('none');
                }}
                className={`h-10 px-3 rounded-xl border-2 flex items-center gap-1 text-xs font-bold ${
                  isEraser ? 'bg-slate-800 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <Eraser className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Shape Stamps */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Shapes className="w-4 h-4 text-[#B9A6F6]" />
              Shape Stamps
            </p>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  ['none', 'Brush'],
                  ['star', 'Star'],
                  ['heart', 'Heart'],
                  ['circle', 'Circle'],
                ] as Array<[StampKind, string]>
              ).map(([s, label]) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    onSound('click');
                    setStamp(s);
                    setIsEraser(false);
                  }}
                  className={`h-9 rounded-xl border-2 text-xs font-bold ${
                    stamp === s
                      ? 'bg-[#B9A6F6] border-slate-900 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Local Saved Drawings Gallery */}
      {savedDrawings.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-slate-900/10 p-5">
          <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
            Your Saved Artwork ({savedDrawings.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {savedDrawings.map((d) => (
              <div key={d.id} className="rounded-2xl border-2 border-slate-900/10 overflow-hidden bg-[#FFF9EC]">
                <img
                  src={d.dataUrl}
                  alt={d.title}
                  className="w-full aspect-16/10 object-cover bg-white"
                  referrerPolicy="no-referrer"
                />
                <div className="p-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{d.title}</p>
                    <p className="text-[11px] text-slate-500">{d.createdAt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteDrawing(d.id)}
                    aria-label={`Delete ${d.title}`}
                    className="w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
