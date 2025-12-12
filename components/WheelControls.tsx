
import React from 'react';
import { WheelItem } from '../types';
import { QUICK_TEMPLATES, DEFAULT_COLORS } from '../constants';
import { Trash2, Plus, Grid, RotateCcw } from 'lucide-react';

interface WheelControlsProps {
  items: WheelItem[];
  setItems: (items: WheelItem[]) => void;
  size: number;
  setSize: (size: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  selectedTemplate: string;
  setSelectedTemplate: (tpl: string) => void;
}

const WheelControls: React.FC<WheelControlsProps> = ({
  items,
  setItems,
  size,
  setSize,
  duration,
  setDuration,
  selectedTemplate,
  setSelectedTemplate
}) => {

  const handleLoadTemplate = (key: string) => {
    // If selecting 'custom' (Restore Default) and already on custom, confirm
    if (key === 'custom' && selectedTemplate === 'custom') {
       if (!confirm('确定要恢复默认设置吗？当前编辑的内容将丢失。')) return;
    }

    setSelectedTemplate(key);
    const template = QUICK_TEMPLATES[key];
    
    // Transform template items to full WheelItems with IDs
    const newItems: WheelItem[] = template.items.map((item, idx) => ({
      id: Date.now().toString() + idx,
      text: item.text || '',
      color: item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]
    }));
    
    setItems(newItems);
  };

  const updateItem = (id: string, field: keyof WheelItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    // If user edits manually, switch template highlight to custom
    if (selectedTemplate !== 'custom') setSelectedTemplate('custom');
  };

  const deleteItem = (id: string) => {
    if (items.length <= 2) {
      alert('至少保留2个选项');
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    const newItem: WheelItem = {
      id: Date.now().toString(),
      text: '',
      color: DEFAULT_COLORS[items.length % DEFAULT_COLORS.length]
    };
    setItems([...items, newItem]);
  };

  const clearAllItems = () => {
    if (confirm('确定要清空所有选项吗？')) {
      const newItems = [
        { id: Date.now().toString(), text: '', color: DEFAULT_COLORS[0] },
        { id: (Date.now() + 1).toString(), text: '', color: DEFAULT_COLORS[1] }
      ];
      setItems(newItems);
      setSelectedTemplate('custom');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-700 flex items-center gap-2">
        <Grid size={20} /> 转盘设置
      </h3>

      {/* Templates */}
      <div className="mb-6">
        <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-2">快速模板</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(QUICK_TEMPLATES).map(([key, tpl]) => (
            <button
              key={key}
              onClick={() => handleLoadTemplate(key)}
              className={`flex-1 min-w-[80px] px-3 py-2 text-sm rounded-lg border transition-all font-medium ${
                selectedTemplate === key
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size Controls - HIDDEN ON MOBILE */}
      <div className="hidden md:block mb-6">
        <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-2">转盘大小</label>
        <div className="flex gap-2">
          {[
            { label: '小', val: 300 },
            { label: '中', val: 380 },
            { label: '大', val: 460 }
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => setSize(opt.val)}
              className={`flex-1 py-2 text-sm rounded-lg border transition-all font-medium ${
                size === opt.val
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Animation Speed */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-semibold mb-2">
          <span>动画时间</span>
          <span>{duration} 秒</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="10" 
          step="0.5" 
          value={duration} 
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Editor List */}
      <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar space-y-2 mb-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input 
              type="color" 
              value={item.color} 
              onChange={(e) => updateItem(item.id, 'color', e.target.value)}
              className="w-8 h-9 p-0.5 border border-gray-200 rounded cursor-pointer bg-white" 
            />
            <input 
              type="text" 
              value={item.text} 
              placeholder={`选项 ${index + 1}`}
              onChange={(e) => updateItem(item.id, 'text', e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:outline-none focus:border-indigo-500"
            />
            <button 
              onClick={() => deleteItem(item.id)}
              className="p-2 text-white bg-rose-500 rounded hover:opacity-90 transition-opacity"
              title="删除此项"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={addItem}
          className="flex-1 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} /> 添加选项
        </button>
        <button 
          onClick={clearAllItems}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
          title="清空所有选项"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};

export default WheelControls;
