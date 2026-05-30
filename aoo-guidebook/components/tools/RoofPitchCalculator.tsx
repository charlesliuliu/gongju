'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import NumberInput from '@/components/ui/NumberInput';
import ResultCard from '@/components/ui/ResultCard';
import {
  calculateRoofPitch,
  validateRoofInput,
  formatFeetAndInches,
  formatAngle,
  formatPercent,
  COMMON_PITCHES,
  RoofResult,
} from '@/lib/calculations/roof';

export default function RoofPitchCalculator() {
  const t = useTranslations('roofCalculator');
  const [rise, setRise] = useState<number | ''>(6);
  const [runFeet, setRunFeet] = useState<number | ''>(12);
  const [result, setResult] = useState<RoofResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const toNum = (v: number | ''): number => (v === '' ? 0 : v);

  const handleCalculate = () => {
    const input = { rise: toNum(rise), runFeet: toNum(runFeet) };
    const validationErrors = validateRoofInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }
    setResult(calculateRoofPitch(input));
    setErrors([]);
  };

  const handleReset = () => {
    setRise(6);
    setRunFeet(12);
    setResult(null);
    setErrors([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {t('enterDimensions')}
        </h2>

        <NumberInput
          label={t('rise')}
          value={rise}
          onChange={setRise}
          unit={t('inches')}
          min={0.5}
          max={36}
          step={0.5}
          required
        />
        <p className="text-xs text-gray-400 -mt-3 mb-4">{t('riseDesc')}</p>

        <NumberInput
          label={t('run')}
          value={runFeet}
          onChange={setRunFeet}
          unit={t('feet')}
          min={0.5}
          max={100}
          step={0.5}
          required
        />

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {t('pleaseFix')}
            </h4>
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start gap-1.5">
                  <span className="text-red-400 mt-0.5">•</span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button onClick={handleCalculate} className="btn-primary flex-1">
            {t('calculate')}
          </button>
          <button onClick={handleReset} className="btn-secondary">
            {t('reset')}
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('results')}</h2>

        {result ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <ResultCard
                title={t('pitch')}
                value={result.pitch}
                highlight
                icon="📐"
              />
              <ResultCard
                title={t('angle')}
                value={formatAngle(result.angleDeg)}
                highlight
                icon="📏"
              />
              <ResultCard
                title={t('slope')}
                value={formatPercent(result.slopePercent)}
              />
              <ResultCard
                title={t('rafterLength')}
                value={formatFeetAndInches(result.rafterLengthFeet, result.rafterLengthInches)}
              />
            </div>

            {/* Pro Tips */}
            <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
              <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {t('proTipTitle')}
              </h4>
              <ul className="text-sm text-blue-800 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {t('tip1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {t('tip2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {t('tip3')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {t('tip4')}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm">{t('emptyState')}</p>
          </div>
        )}
      </div>

      {/* Common Pitches Reference */}
      <div className="lg:col-span-2">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('commonPitches')}</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-900">{t('pitchTable')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('angleTable')}</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{t('description')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {COMMON_PITCHES.map((pitch) => (
                  <tr key={pitch.pitch} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-semibold text-gray-900">{pitch.pitch}</td>
                    <td className="p-3 text-gray-600">{formatAngle(pitch.angle)}</td>
                    <td className="p-3 text-gray-600">{pitch.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
