
import React from 'react';
import { ToolMode } from '../types';
import { ShieldAlert, GraduationCap, Users } from 'lucide-react';

interface ContentSectionProps {
  mode: ToolMode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ mode }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-8">
      
      {/* Compliance Warning - Always Visible */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
        <ShieldAlert className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p className="font-bold mb-1">合规使用提醒</p>
          <p>本工具仅供非商业性质的<strong>教育辅助、团队娱乐、家庭活动</strong>使用。</p>
          <p>严禁用于任何形式的网络赌博、商业性付费抽奖或违反当地法律法规的有奖销售活动（如涉及高额现金/实物奖品）。请理性使用工具，切勿过度依赖。</p>
        </div>
      </div>

      {/* Guide Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
          <span>📖</span> 使用指南
        </h2>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300">
          {mode === 'wheel' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">🎡 转盘工具使用步骤</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>设置选项</strong>：输入活动选项（如“背诵诗词”、“做俯卧撑”），或选择预设模板。</li>
                <li><strong>自定义样式</strong>：调整转盘颜色，使其更符合课堂或聚会氛围。</li>
                <li><strong>开始运行</strong>：点击按钮，系统将通过物理引擎模拟随机旋转。</li>
                <li><strong>公平结果</strong>：结果完全随机生成，适合用于公正的决策辅助。</li>
              </ol>
            </div>
          )}
          
          {mode === 'team' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">👥 团队分组步骤</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>输入名单</strong>：在文本框中输入成员名字（数据仅在本地处理）。</li>
                <li><strong>选择模式</strong>：可选择“按队伍数”或“按每队人数”进行分配。</li>
                <li><strong>一键生成</strong>：点击分组，算法将确保每个成员被公平随机分配。</li>
              </ol>
            </div>
          )}
          
          {mode === 'number' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">🔢 随机数生成器</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>设定区间</strong>：输入所需的数字范围（如 1-50 号学号）。</li>
                <li><strong>生成数量</strong>：选择需要抽取的幸运数字个数。</li>
                <li><strong>获取结果</strong>：生成不重复或可重复的随机数字序列。</li>
              </ol>
            </div>
          )}
          
          {mode === 'password' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">🔐 强密码生成器</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>选择强度</strong>：设置密码长度和字符组合（数字/符号/大小写）。</li>
                <li><strong>本地生成</strong>：密码在您的设备上即时生成，不经过网络传输。</li>
                <li><strong>安全复制</strong>：生成后直接复制使用，建议配合密码管理器存储。</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Inspiration Card - REWRITTEN FOR AD POLICY COMPLIANCE */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
          <span>💡</span> 应用场景推荐
        </h2>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300">
          {mode === 'wheel' && (
            <>
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                   <GraduationCap size={18}/> 智慧教学辅助
                </h3>
                <p>转盘工具是活跃课堂气氛的绝佳助手。老师可以利用它来：</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>随机提问</strong>：将学号录入转盘，公平公正地抽取回答问题的同学。</li>
                  <li><strong>知识点复习</strong>：将“古诗词”、“历史年代”、“数学公式”作为选项，转到哪里复习哪里。</li>
                  <li><strong>课堂奖励</strong>：设置“免写一次作业”、“领唱机会”等精神奖励，激发学习兴趣。</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                   <Users size={18}/> 团队建设与聚会
                </h3>
                <p>在非盈利的团队活动或家庭聚会中，增加互动趣味性：</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>午餐吃什么</strong>：解决选择困难症，随机决定聚餐地点。</li>
                  <li><strong>真心话大冒险</strong>：将各种有趣的惩罚或问题放入转盘。</li>
                  <li><strong>家务分配</strong>：家庭成员通过转盘决定谁洗碗、谁扫地，公平有趣。</li>
                </ul>
              </div>
            </>
          )}

          {mode === 'team' && (
            <>
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🏫 校园活动分组</h3>
                <p>在体育课、辩论赛或小组讨论中，使用随机分组工具可以避免“小圈子”现象，促进同学间的广泛交流，确保每个小组实力的随机与均衡。</p>
              </div>
              
              <div>
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🏢 破冰与研讨会</h3>
                <p>在内部培训或研讨会上，快速将不同背景的参与者混合分组，有助于打破部门壁垒，促进跨领域的思维碰撞与协作。</p>
              </div>
            </>
          )}
          
          {(mode === 'number' || mode === 'password') && (
            <div>
               <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🛠️ 实用工具箱</h3>
               <p>基于数学随机算法的辅助工具，适用于需要公正决策或信息安全的场景。无论是抽取实验样本编号，还是生成本地安全密钥，都能提供可靠的支持。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
