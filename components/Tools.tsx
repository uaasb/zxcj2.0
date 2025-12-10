
import React, { useState } from 'react';
import { Copy, Users, Dice5, Lock, ShieldCheck } from 'lucide-react';

/* --- Team Generator --- */
export const TeamTool: React.FC<{ addHistory: (val: string) => void }> = ({ addHistory }) => {
  const [participants, setParticipants] = useState('');
  const [goalType, setGoalType] = useState<'count' | 'size'>('count');
  const [goalValue, setGoalValue] = useState(3);
  const [teams, setTeams] = useState<string[][]>([]);

  const generateTeams = () => {
    const names = participants.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    if (names.length === 0) return alert('请输入参与者名单');
    
    // Fisher-Yates Shuffle
    const shuffled = [...names];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let numTeams = 0;
    if (goalType === 'count') {
      numTeams = Math.min(goalValue, shuffled.length);
    } else {
      numTeams = Math.ceil(shuffled.length / goalValue);
    }

    if (numTeams <= 0) numTeams = 1;

    const resultTeams: string[][] = Array.from({ length: numTeams }, () => []);
    shuffled.forEach((name, index) => {
      resultTeams[index % numTeams].push(name);
    });

    setTeams(resultTeams);
    addHistory(`分组成功: ${names.length}人分入${numTeams}队`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">👥 多人组队</h3>
      <div className="mb-2">
        <textarea 
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          placeholder="输入名单，例如：&#10;小明&#10;小红&#10;小刚"
          className="w-full h-32 p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:outline-none focus:border-indigo-500"
        />
        {/* Privacy Note Added */}
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <ShieldCheck size={12} /> 名单仅在本地浏览器处理，不会上传至服务器。
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" checked={goalType === 'count'} onChange={() => setGoalType('count')} className="accent-indigo-600" />
          按队伍数分组
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" checked={goalType === 'size'} onChange={() => setGoalType('size')} className="accent-indigo-600" />
          按每队人数分组
        </label>
      </div>
      <input 
        type="number" 
        min="1" 
        value={goalValue} 
        onChange={(e) => setGoalValue(parseInt(e.target.value) || 1)}
        className="w-full p-2 mb-4 border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700" 
      />
      <button onClick={generateTeams} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">随机分组</button>
      
      {teams.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.map((team, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-bold text-indigo-600 mb-1">队伍 {idx + 1} ({team.length}人)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{team.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* --- Random Number Generator --- */
export const NumberTool: React.FC<{ addHistory: (val: string) => void }> = ({ addHistory }) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [result, setResult] = useState<string>('-');

  const generate = () => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    const res = arr.join(', ');
    setResult(res);
    addHistory(`随机数: ${res}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
       <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🔢 随机数生成</h3>
       <div className="flex gap-4 mb-4">
         <div className="flex-1">
           <label className="text-xs text-gray-500 mb-1 block">最小值</label>
           <input 
            type="number" 
            value={min} 
            onChange={(e) => setMin(Number(e.target.value))} 
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600" 
           />
         </div>
         <div className="flex-1">
           <label className="text-xs text-gray-500 mb-1 block">最大值</label>
           <input 
            type="number" 
            value={max} 
            onChange={(e) => setMax(Number(e.target.value))} 
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600" 
           />
         </div>
       </div>
       <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1 block">生成数量</label>
          <input 
            type="number" 
            value={count} 
            onChange={(e) => setCount(Number(e.target.value))} 
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600" 
          />
       </div>
       <button onClick={generate} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">生成数字</button>
       <div className="mt-6 text-center text-3xl font-bold text-rose-500 break-all">{result}</div>
    </div>
  );
};

/* --- Password Generator --- */
export const PasswordTool: React.FC<{ addHistory: (val: string) => void }> = ({ addHistory }) => {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNum, setUseNum] = useState(true);
  const [useSym, setUseSym] = useState(true);
  const [password, setPassword] = useState('点击生成');

  const generate = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijkmnpqrstuvwxyz';
    if (useNum) chars += '23456789';
    if (useSym) chars += '!@#$%^&*';
    
    if (!chars) return;
    
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
    addHistory(`密码: ${pwd.substring(0, 3)}***`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('已复制');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🔐 密码生成</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>长度</span>
          <span>{length}</span>
        </div>
        <input type="range" min="6" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useUpper} onChange={() => setUseUpper(!useUpper)} /> A-Z</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useLower} onChange={() => setUseLower(!useLower)} /> a-z</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useNum} onChange={() => setUseNum(!useNum)} /> 0-9</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useSym} onChange={() => setUseSym(!useSym)} /> @#$</label>
      </div>
      <button onClick={generate} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">生成密码</button>
      <div 
        onClick={copyToClipboard} 
        className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center font-mono text-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
      >
        <span className="break-all">{password}</span>
        {password !== '点击生成' && <Copy size={16} className="text-gray-400" />}
      </div>
      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 justify-center">
        <ShieldCheck size={12} /> 密码在本地生成，不经过网络
      </p>
    </div>
  );
};
