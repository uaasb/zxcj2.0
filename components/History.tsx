import React from 'react';
import { HistoryItem, ToolMode } from '../types';
import { Trash } from 'lucide-react';

interface HistoryProps {
  history: HistoryItem[];
  mode: ToolMode;
  clearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ history, mode, clearHistory }) => {
  const filtered = history.filter(h => h.mode === mode);
  
  const getTitle = () => {
    switch (mode) {
      case 'wheel': return '🎡 转盘记录';
      case 'team': return '👥 组队记录';
      case 'number': return '🔢 随机数记录';
      case 'password': return '🔐 密码记录';
      default: return '记录';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 mt-4">
      <div className="flex justify-between items-center mb-4 border-b pb-2 dark:border-gray-700">
        <h3 className="text-lg font-bold">{getTitle()}</h3>
        <button onClick={clearHistory} className="text-xs text-rose-500 hover:underline flex items-center gap-1">
          <Trash size={12} /> 清空
        </button>
      </div>
      <ul className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
        {filtered.length === 0 ? (
          <li className="text-center text-gray-400 py-4 text-sm">暂无记录</li>
        ) : (
          filtered.map(item => (
            <li key={item.id} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
              <span className="font-semibold text-indigo-600 truncate mr-2">{item.value}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{item.timestamp}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default History;