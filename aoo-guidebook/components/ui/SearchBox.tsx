'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from '@/i18n/navigation';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBox({ placeholder = 'Search guides...', className = '' }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/guides?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/guides');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="flex items-center bg-white rounded-xl shadow-md border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
        <span className="pl-4 text-gray-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-3 text-gray-700 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="m-1.5 px-4 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
