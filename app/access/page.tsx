'use client';

import { useState } from 'react';
import { verifyAccessCode } from './actions';

export default function AccessPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await verifyAccessCode(code);
      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Access Required</h1>
          <p className="text-sm opacity-60">Enter your access code to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2">
              Access Code
            </label>
            <input
              id="code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter access code"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-[#0A0A0A] rounded focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] disabled:opacity-50"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || !code}
            className="w-full px-4 py-2 bg-[#0A0A0A] text-white font-medium rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
