'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import NumberInput from '@/components/ui/NumberInput';
import ResultCard from '@/components/ui/ResultCard';
import {
  calculateLumber,
  validateLumberInput,
  formatCurrency,
  LumberInput,
  LumberResult,
} from '@/lib/calculations/lumber';

export default function LumberCalculator() {
  const t = useTranslations('lumberCalculator');
  const [length, setLength] = useState<number | ''>(8);
  const [width, setWidth] = useState<number | ''>(6);
  const [thickness, setThickness] = useState<number | ''>(2);
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [pricePerBoardFoot, setPricePerBoardFoot] = useState<number | ''>(5);
  const [showCost, setShowCost] = useState<boolean>(false);

  const [result, setResult] = useState<LumberResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const toNum = (v: number | ''): number => (v === '' ? 0 : v);

  const handleCalculate = () => {
    const input: LumberInput = {
      length: toNum(length),
      width: toNum(width),
      thickness: toNum(thickness),
      quantity: toNum(quantity),
      pricePerBoardFoot: showCost ? toNum(pricePerBoardFoot) : undefined,
    };

    const validationErrors = validateLumberInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    setResult(calculateLumber(input));
    setErrors([]);
  };

  const handleReset = () => {
    setLength(8);
    setWidth(6);
    setThickness(2);
    setQuantity(1);
    setPricePerBoardFoot(5);
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
          label={t('length')}
          value={length}
          onChange={setLength}
          unit={t('feet')}
          min={0.5}
          max={100}
          step={1}
          required
        />
        <p className="text-xs text-gray-400 -mt-3 mb-4">{t('lengthDesc')}</p>

        <NumberInput
          label={t('width')}
          value={width}
          onChange={setWidth}
          unit={t('inches')}
          min={1}
          max={24}
          step={1}
          required
        />
        <p className="text-xs text-gray-400 -mt-3 mb-4">{t('widthDesc')}</p>

        <NumberInput
          label={t('thickness')}
          value={thickness}
          onChange={setThickness}
          unit={t('inches')}
          min={0.25}
          max={12}
          step={0.5}
          required
        />
        <p className="text-xs text-gray-400 -mt-3 mb-4">{t('thicknessDesc')}</p>

        <NumberInput
          label={t('quantity')}
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={1000}
          step={1}
          required
        />
        <p className="text-xs text-gray-400 -mt-3 mb-4">{t('quantityDesc')}</p>

        {/* Cost Toggle */}
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
              label={t('pricePerBoardFoot')}
              value={pricePerBoardFoot}
              onChange={setPricePerBoardFoot}
              unit={t('usd')}
              min={0.5}
              max={50}
              step={0.5}
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
                title={t('boardFeetPerPiece')}
                value={result.boardFeetPerPiece}
                unit="BF"
                highlight
                icon="📐"
              />
              <ResultCard
                title={t('totalBoardFeet')}
                value={result.totalBoardFeet}
                unit="BF"
                highlight
                icon="📊"
              />
              <ResultCard
                title={t('linearFeet')}
                value={result.linearFeet}
                unit={t('feet')}
                icon="📏"
              />
              {result.estimatedCost !== null && (
                <ResultCard
                  title={t('estimatedCost')}
                  value={formatCurrency(result.estimatedCost)}
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
