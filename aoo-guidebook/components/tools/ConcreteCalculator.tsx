'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import NumberInput from '@/components/ui/NumberInput';
import SelectInput from '@/components/ui/SelectInput';
import ResultCard from '@/components/ui/ResultCard';
import {
  calculateConcrete,
  validateInput,
  formatNumber,
  formatCurrency,
  ConcreteInput,
  ConcreteResult,
} from '@/lib/calculations/concrete';

const AVERAGE_PRICE_PER_CUBIC_YARD = 125;

export default function ConcreteCalculator() {
  const t = useTranslations('calculator');
  const [calculationType, setCalculationType] = useState<'slab' | 'footing' | 'column' | 'wall'>('slab');
  const [length, setLength] = useState<number | ''>(10);
  const [width, setWidth] = useState<number | ''>(10);
  const [thickness, setThickness] = useState<number | ''>(4);
  const [height, setHeight] = useState<number | ''>(1);
  const [diameter, setDiameter] = useState<number | ''>(1);
  const [pricePerCubicYard, setPricePerCubicYard] = useState<number | ''>(AVERAGE_PRICE_PER_CUBIC_YARD);
  const [showCost, setShowCost] = useState<boolean>(false);

  const [result, setResult] = useState<ConcreteResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const toNum = (v: number | ''): number => (v === '' ? 0 : v);

  const handleCalculate = () => {
    const input: ConcreteInput = {
      calculationType,
      length: toNum(length),
      width: toNum(width),
      thickness: toNum(thickness),
      height: toNum(height),
      diameter: toNum(diameter),
      pricePerCubicYard: showCost ? toNum(pricePerCubicYard) : undefined,
    };

    const validationErrors = validateInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    const calculatedResult = calculateConcrete(input);
    setResult(calculatedResult);
    setErrors([]);
  };

  const handleReset = () => {
    setLength(10);
    setWidth(10);
    setThickness(4);
    setHeight(1);
    setDiameter(1);
    setPricePerCubicYard(AVERAGE_PRICE_PER_CUBIC_YARD);
    setResult(null);
    setErrors([]);
  };

  const CALCULATION_TYPES = [
    { value: 'slab', label: t('slab') },
    { value: 'footing', label: t('footing') },
    { value: 'column', label: t('column') },
    { value: 'wall', label: t('wall') },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {t('enterDimensions')}
        </h2>

        <SelectInput
          label={t('calculationType')}
          value={calculationType}
          onChange={(value) => {
            setCalculationType(value as typeof calculationType);
            setResult(null);
            setErrors([]);
          }}
          options={CALCULATION_TYPES}
          required
        />

        {calculationType === 'slab' && (
          <>
            <NumberInput label={t('length')} value={length} onChange={setLength} unit={t('feet')} min={0.1} step={0.5} required />
            <NumberInput label={t('width')} value={width} onChange={setWidth} unit={t('feet')} min={0.1} step={0.5} required />
            <NumberInput label={t('thickness')} value={thickness} onChange={setThickness} unit={t('inches')} min={1} max={24} step={1} required />
          </>
        )}

        {calculationType === 'footing' && (
          <>
            <NumberInput label={t('length')} value={length} onChange={setLength} unit={t('feet')} min={0.1} step={0.5} required />
            <NumberInput label={t('width')} value={width} onChange={setWidth} unit={t('feet')} min={0.1} step={0.5} required />
            <NumberInput label={t('depth')} value={height} onChange={setHeight} unit={t('feet')} min={0.1} step={0.5} required />
          </>
        )}

        {calculationType === 'column' && (
          <>
            <NumberInput label={t('diameter')} value={diameter} onChange={setDiameter} unit={t('feet')} min={0.1} step={0.5} required />
            <NumberInput label={t('height')} value={height} onChange={setHeight} unit={t('feet')} min={0.1} step={0.5} required />
          </>
        )}

        {calculationType === 'wall' && (
          <>
            <NumberInput label={t('length')} value={length} onChange={setLength} unit={t('feet')} min={0.1} step={0.5} required />
            <NumberInput label={t('height')} value={height} onChange={setHeight} unit={t('feet')} min={0.1} step={0.5} required />
            <NumberInput label={t('thickness')} value={thickness} onChange={setThickness} unit={t('feet')} min={0.1} max={2} step={0.25} required />
          </>
        )}

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
              label={t('pricePerCubicYard')}
              value={pricePerCubicYard}
              onChange={setPricePerCubicYard}
              unit={t('usd')}
              min={50}
              max={300}
              step={5}
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
            <ResultCard
              title={t('concreteVolume')}
              value={formatNumber(result.volumeCubicYards)}
              unit={t('cubicYards')}
              description={t('totalConcreteNeeded')}
              highlight
              icon="📐"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ResultCard title={t('concreteVolume')} value={formatNumber(result.volumeCubicFeet)} unit={t('cubicFeet')} />
              <ResultCard title={t('bags60lb')} value={result.bags60lb} unit={t('bags')} />
              <ResultCard title={t('bags80lb')} value={result.bags80lb} unit={t('bags')} />
              {result.estimatedCost !== null && (
                <ResultCard title={t('estimatedCost')} value={formatCurrency(result.estimatedCost)} highlight icon="💰" />
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
              <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {t('proTips')}
              </h4>
              <ul className="text-sm text-blue-800 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {t('tipSpillage')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {t('tipBags')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {t('tipPrices')}
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
    </div>
  );
}
