'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin/stats');
    } else {
      setError('密码错误');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card max-w-sm w-full p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">管理员登录</h1>
        <p className="text-sm text-gray-500 text-center mb-6">请输入密码查看统计</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
            className="input-field w-full"
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full">登录</button>
        </form>
      </div>
    </div>
  );
}
