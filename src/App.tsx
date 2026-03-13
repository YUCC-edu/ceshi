/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Globe, Clock, RefreshCw, AlertCircle } from 'lucide-react';

interface CapitalTime {
  country: string;
  capital: string;
  offset: number;
  time: string;
  error?: string;
}

export default function App() {
  const [times, setTimes] = useState<CapitalTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/times');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch times');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setTimes(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Globe className="w-8 h-8 text-indigo-600" />
            世界首都时间 (Python 驱动)
          </h1>
          <button
            onClick={fetchTimes}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            刷新时间
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">获取失败</h3>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-sm mt-2 opacity-80">注意：此功能依赖于后端环境是否安装了 Python 3。</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {times.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow">
              <div className="text-sm font-medium text-indigo-600 mb-1">{item.country}</div>
              <div className="text-xl font-semibold mb-4">{item.capital}</div>
              <div className="mt-auto flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="font-mono text-lg">{item.time}</span>
                </div>
                <div className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                  UTC{item.offset >= 0 ? '+' : ''}{item.offset}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {times.length === 0 && !loading && !error && (
          <div className="text-center py-12 text-slate-500">
            点击右上角刷新按钮获取时间
          </div>
        )}
      </div>
    </div>
  );
}
