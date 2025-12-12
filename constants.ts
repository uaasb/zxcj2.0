
import { WheelItem } from './types';

export const DEFAULT_COLORS = [
  '#ff7675', '#fab1a0', '#fd79a8', '#a29bfe', '#74b9ff', 
  '#55efc4', '#ffeaa7', '#00cec9', '#e84393', '#6c5ce7'
];

export const DEFAULT_WHEEL_ITEMS: WheelItem[] = [
  { id: '1', text: '自定义选项 1', color: DEFAULT_COLORS[0] },
  { id: '2', text: '自定义选项 2', color: DEFAULT_COLORS[1] },
  { id: '3', text: '自定义选项 3', color: DEFAULT_COLORS[2] },
];

export const QUICK_TEMPLATES: Record<string, { name: string; items: Partial<WheelItem>[] }> = {
  eat: { 
    name: '吃什么', 
    items: [
      { text: '中餐', color: '#ff7675' }, 
      { text: '西餐', color: '#fab1a0' }, 
      { text: '日料', color: '#81ecec' }, 
      { text: '火锅', color: '#e17055' },
      { text: '烧烤', color: '#d63031' },
      { text: '随便', color: '#a29bfe' }
    ] 
  },
  drink: {
    name: '喝什么',
    items: [
      { text: '奶茶', color: '#fab1a0' },
      { text: '咖啡', color: '#636e72' },
      { text: '果汁', color: '#fdcb6e' },
      { text: '可乐', color: '#d63031' },
      { text: '白开水', color: '#74b9ff' }
    ]
  },
  activity: {
    name: '周末去哪',
    items: [
      { text: '看电影', color: '#a29bfe' },
      { text: '逛街', color: '#ff7675' },
      { text: '爬山', color: '#00b894' },
      { text: '宅家', color: '#fab1a0' },
      { text: '打游戏', color: '#0984e3' }
    ]
  },
  study: {
    name: '内卷什么',
    items: [
      { text: '英语', color: '#fd79a8' },
      { text: '数学', color: '#74b9ff' },
      { text: '编程', color: '#55efc4' },
      { text: '阅读', color: '#ffeaa7' },
      { text: '健身', color: '#ff7675' }
    ]
  },
  yesno: { 
    name: '是/否', 
    items: [
      { text: '是', color: '#55efc4' }, 
      { text: '否', color: '#ff7675' }
    ] 
  },
  people: { 
    name: '人物抽签', 
    items: [
      { text: '小王', color: '#ff7675' }, 
      { text: '小红', color: '#fab1a0' }, 
      { text: '小李', color: '#81ecec' }, 
      { text: '小刘', color: '#a29bfe' }, 
      { text: '小陈', color: '#55efc4' }
    ] 
  },
  4: {
      name: '四人',
      items: [
        { text: 'A', color: '#ff7675' },
        { text: 'B', color: '#fab1a0' },
        { text: 'C', color: '#81ecec' },
        { text: 'D', color: '#a29bfe' }
      ]
  },
  custom: {
    name: '恢复默认',
    items: DEFAULT_WHEEL_ITEMS.map(item => ({ text: item.text, color: item.color }))
  }
};
