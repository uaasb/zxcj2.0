import React, { useState, useEffect } from 'react';
import { WheelItem, HistoryItem, ToolMode } from './types';
import { DEFAULT_WHEEL_ITEMS } from './constants';
import WheelCanvas from './components/WheelCanvas';
import WheelControls from './components/WheelControls';
import { TeamTool, NumberTool, PasswordTool } from './components/Tools';
import History from './components/History';
import ContentSection from './components/ContentSection';
import { Sun, Moon } from 'lucide-react';
import { playWinSound } from './utils/audio';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Mode State
  const [mode, setMode] = useState<ToolMode>('wheel');

  // Wheel State 
  // User Requirement: Do not read from localStorage for wheel items to ensure default/custom state is fresh.
  const [wheelItems, setWheelItems] = useState<WheelItem[]>(DEFAULT_WHEEL_ITEMS);
  
  const [wheelSize, setWheelSize] = useState(380);
  const [spinDuration, setSpinDuration] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('custom');

  // History State
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('appHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal State
  const [resultModal, setResultModal] = useState<string | null>(null);

  // --- Effects ---
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // We still save changes, but we don't load them on initial mount as per requirement.
  useEffect(() => {
    localStorage.setItem('wheelDataV8', JSON.stringify(wheelItems));
  }, [wheelItems]);

  useEffect(() => {
    localStorage.setItem('appHistory', JSON.stringify(history));
  }, [history]);

  // --- Handlers ---
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToHistory = (value: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      mode,
      value,
      timestamp: new Date().toLocaleTimeString()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 30));
  };

  const handleSpinEnd = (winner: string) => {
    setResultModal(winner);
    addToHistory(winner);
    playWinSound();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          {/* Responsive Header Layout */}
          <h1 className="flex flex-col md:flex-row md:items-end gap-0.5 md:gap-3 overflow-hidden">
            <span className="text-xl md:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 whitespace-nowrap flex items-center gap-2">
              <span>🎡</span> 在线抽奖系统
            </span>
            <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 font-normal truncate max-w-[200px] md:max-w-none">
              快速抽奖模板/多人组队/随机数/密码
            </span>
          </h1>
          
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <nav className="hidden md:flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-full">
              {[
                { id: 'wheel', label: '转盘' },
                { id: 'team', label: '组队' },
                { id: 'number', label: '随机数' },
                { id: 'password', label: '密码' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id as ToolMode)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    mode === tab.id 
                      ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-sm' 
                      : 'text-gray-500 dark:text-gray-300 hover:text-indigo-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            >
              {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden border-t dark:border-gray-700 bg-white dark:bg-gray-800 p-2 overflow-x-auto">
           <div className="flex justify-center gap-2">
              {[
                { id: 'wheel', label: '转盘' },
                { id: 'team', label: '组队' },
                { id: 'number', label: '随机数' },
                { id: 'password', label: '密码' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id as ToolMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    mode === tab.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Area */}
          <div className="lg:col-span-8 order-1">
            {mode === 'wheel' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 dark:border-gray-700 min-h-[400px] flex flex-col items-center justify-center">
                <WheelCanvas 
                  items={wheelItems} 
                  size={wheelSize} 
                  spinDuration={spinDuration} 
                  onSpinEnd={handleSpinEnd}
                  isSpinning={isSpinning}
                  setIsSpinning={setIsSpinning}
                />
              </div>
            )}
            
            <div className={`${mode === 'wheel' ? 'hidden' : 'block'} animate-fadeIn`}>
              {mode === 'team' && <TeamTool addHistory={(val) => addToHistory(val)} />}
              {mode === 'number' && <NumberTool addHistory={(val) => addToHistory(val)} />}
              {mode === 'password' && <PasswordTool addHistory={(val) => addToHistory(val)} />}
            </div>
            
          </div>

          {/* Right Column: Controls & History */}
          <div className="lg:col-span-4 order-2 space-y-6">
            
            {/* Contextual Controls */}
            {mode === 'wheel' && (
              <WheelControls 
                items={wheelItems}
                setItems={setWheelItems}
                size={wheelSize}
                setSize={setWheelSize}
                duration={spinDuration}
                setDuration={setSpinDuration}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            )}

            {/* History Panel */}
            <History 
              history={history} 
              mode={mode} 
              clearHistory={() => setHistory(prev => prev.filter(h => h.mode !== mode))} 
            />
          </div>
        </div>

        {/* Restored Content Section for SEO */}
        <ContentSection mode={mode} />

      </main>

      {/* Result Modal */}
      {resultModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center transform scale-100 animate-bounce-in border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 text-lg mb-2">🎉 恭喜选中</h3>
            <div className="text-4xl font-extrabold text-rose-500 mb-6 break-words">{resultModal}</div>
            <button 
              onClick={() => setResultModal(null)}
              className="px-8 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}