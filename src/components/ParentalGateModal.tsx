import React, { useEffect, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { createParentalGate, ParentalGateChallenge, verifyParentalGate } from '../engine/storage';

interface ParentalGateModalProps {
  open: boolean;
  title?: string;
  description?: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const ParentalGateModal: React.FC<ParentalGateModalProps> = ({
  open,
  title = 'Parent Check',
  description = 'Please solve this quick adult math question to enter the Parents area.',
  onSuccess,
  onClose,
}) => {
  const [challenge, setChallenge] = useState<ParentalGateChallenge>(() => createParentalGate());
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setChallenge(createParentalGate());
      setAnswer('');
      setError('');
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyParentalGate(challenge, answer)) {
      onSuccess();
    } else {
      setError('Not quite—please check the math and try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="parent-gate-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white border-2 border-slate-900/15 shadow-xl p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EBF8FE] flex items-center justify-center text-[#0284C7]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="parent-gate-title" className="font-display text-2xl font-bold text-slate-900">
                {title}
              </h2>
              <p className="text-sm text-slate-600">Child safety protection</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close parent check"
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-4">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-slate-900/10 text-center">
            <p className="font-mono-num text-2xl font-bold text-slate-900">{challenge.prompt}</p>
          </div>

          <div>
            <label htmlFor="parent-gate-input" className="block text-sm font-bold text-slate-700 mb-1.5">
              Your Answer
            </label>
            <input
              id="parent-gate-input"
              type="text"
              inputMode="numeric"
              autoFocus
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError('');
              }}
              placeholder="Enter number"
              className="w-full h-12 px-4 rounded-2xl border-2 border-slate-300 text-lg font-mono-num font-bold text-slate-900 focus:outline-none focus:border-[#57C7F2]"
            />
          </div>

          {error && (
            <p className="text-sm font-bold text-rose-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-6 rounded-2xl bg-[#57C7F2] hover:bg-[#3DB8E8] border-2 border-slate-900/15 font-bold text-slate-900 shadow-[0_3px_0_rgba(30,41,59,0.12)] whitespace-nowrap"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
