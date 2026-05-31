'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import NumberInput from '@/components/ui/NumberInput';
import ResultCard from '@/components/ui/ResultCard';
import {
  calculateFence,
  validateFenceInput,
  formatCurrency,
  FenceResult,
} from '@/lib/calculations/fence';

export default function FenceCalculator() {
  const t = useTranslations('fenceCalculator');
  const [fenceLength, setFenceLength] = useState<number | ''>(50);
  const [postSpacing, setPostSpacing] = useState<number | ''>(8);
  const [fenceHeight, setFenceHeight] = useState<number | ''>(6);
  const [picketWidth, setPicketWidth] = useState<number | ''>(5.5);
  const [picketSpacing, setPicketSpacing] = useState<number | ''>(1);
  const [numberOfGates, setNumberOfGates] = useState<number | ''>(0);
  const [pricePerFoot, setPricePerFoot] = useState<number | ''>(25);
  const [showCost, setShowCost] = useState<boolean>(false);

  const [result, setResult] = useState<FenceResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const toNum = (v: number | ''): number => (v === '' ? 0 : v);

  const handleCalculate = () => {
    const input = {
      fenceLength: toNum(fenceLength),
      postSpacing: toNum(postSpacing),
      fenceHeight: toNum(fenceHeight),
      picketWidth: toNum(picketWidth),
      picketSpacing: toNum(picketSpacing),
      numberOfGates: toNum(numberOfGates),
      pricePerFoot: showCost ? toNum(pricePerFoot) : undefined,
    };

    const validationErrors = validateFenceInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    setResult(calculateFence(input));
    setErrors([]);
  };

  const handleReset = () => {
    setFenceLength(50);
    setPostSpacing(8);
    setFenceHeight(6);
    setPicketWidth(5.5);
    setPicketSpacing(1);
    setNumberOfGates(0);
    setPricePerFoot(25);
    setShowCost(false);
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
          label={t('fenceLength')}
          value={fenceLength}
          onChange={setFenceLength}
          unit={t('feet')}
          min={1}
          max={1000}
          step={1}
          required
        />

        <NumberInput
          label={t('postSpacing')}
          value={postSpacing}
          onChange={setPostSpacing}
          unit={t('feet')}
          min={4}
          max={12}
          step={0.5}
          required
        />

        <NumberInput
          label={t('fenceHeight')}
          value={fenceHeight}
          onChange={setFenceHeight}
          unit={t('feet')}
          min={3}
          max={10}
          step={0.5}
          required
        />

        <NumberInput
          label={t('picketWidth')}
          value={picketWidth}
          onChange={setPicketWidth}
          unit={t('inches')}
          min={2}
          max={12}
          step={0.25}
          required
        />

        <NumberInput
          label={t('picketSpacing')}
          value={picketSpacing}
          onChange={setPicketSpacing}
          unit={t('inches')}
          min={0}
          max={6}
          step={0.25}
          required
        />

        <NumberInput
          label={t('numberOfGates')}
          value={numberOfGates}
          onChange={setNumberOfGates}
          min={0}
          max={10}
          step={1}
        />

        {/* Cost Estimation Toggle */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCost}
              onChange={(e) => setShowCost(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">{t('includeCost')}</span>
          </label>

          {showCost && (
            <NumberInput
              label={t('pricePerFoot')}
              value={pricePerFoot}
              onChange={setPricePerFoot}
              unit={t('usd')}
              min={5}
              max={500}
              step={1}
            />
          )}
        </div>

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
                title={t('numberOfPosts')}
                value={result.numberOfPosts}
                highlight
                icon="🔩"
              />
              <ResultCard
                title={t('numberOfRails')}
                value={result.numberOfRails}
                icon="🪵"
              />
              <ResultCard
                title={t('numberOfPickets')}
                value={result.numberOfPickets}
                icon="🪚"
              />
              <ResultCard
                title={t('postConcreteBags')}
                value={result.postConcreteBags}
                unit={t('bags')}
                icon="🪣"
              />
              {result.totalCost !== null && (
                <ResultCard
                  title={t('estimatedCost')}
                  value={formatCurrency(result.totalCost)}
                  highlight
                  icon="💰"
                />
              )}
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
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    {t(`tip${i}`)}
                  </li>
                ))}
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
    </div>
  );
}
