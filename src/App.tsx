/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { detectKeywords, DetectionResult } from './skills/keywordDetector';
import { Search, AlertCircle, CheckCircle2, Send, Loader2 } from 'lucide-react';

export default function App() {
  const [text, setText] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [results, setResults] = useState<DetectionResult[] | null>(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDetect = () => {
    const keywords = keywordsInput.split(',').map((k) => k.trim()).filter(Boolean);
    const detectionResults = detectKeywords(text, keywords);
    setResults(detectionResults);
    setPushStatus('idle'); // Reset push status when new detection runs
  };

  const handlePush = async () => {
    if (!repoUrl || !results) return;
    
    setIsPushing(true);
    setPushStatus('idle');
    
    // Simulate a network request to push data to a repository
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, this would be an API call to a backend service
      // that handles the actual git operations or webhook delivery.
      console.log(`Pushing to ${repoUrl}/tree/preview`, { results });
      
      setPushStatus('success');
    } catch (error) {
      setPushStatus('error');
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-500" />
            关键词检测技能
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            通过提供上下文文本和关键词列表来测试关键词检测模块，并将结果推送到指定项目。
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              上下文文本
            </label>
            <textarea
              className="w-full h-32 p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
              placeholder="在此处粘贴您要分析的文本..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              关键词（用逗号分隔）
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="例如：紧急, 错误, 重要"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
            />
          </div>

          <button
            onClick={handleDetect}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex justify-center items-center gap-2"
          >
            <Search className="w-4 h-4" />
            运行检测
          </button>
        </div>

        {results !== null && (
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              {results.length > 0 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500" />
              )}
              检测结果
            </h2>
            
            {results.length === 0 ? (
              <p className="text-sm text-slate-500">在提供的文本中未检测到关键词。</p>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  {results.map((result, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                      <div>
                        <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md mb-2">
                          {result.keyword}
                        </span>
                        <p className="text-sm text-slate-600">
                          发现于索引位置： <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{result.indices.join(', ')}</span>
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-light text-slate-900">{result.count}</span>
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">次匹配</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">推送结果到项目</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      placeholder="输入项目地址 (例如: https://github.com/user/repo)"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />
                    <button
                      onClick={handlePush}
                      disabled={!repoUrl || isPushing}
                      className="py-3 px-6 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex justify-center items-center gap-2 whitespace-nowrap"
                    >
                      {isPushing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      推送到 Preview 分支
                    </button>
                  </div>
                  
                  {pushStatus === 'success' && (
                    <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> 成功模拟推送结果到 {repoUrl} 的 preview 分支
                    </p>
                  )}
                  {pushStatus === 'error' && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> 推送失败，请检查网络或项目地址
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
