import React from 'react';
import { ToolMode } from '../types';

interface ContentSectionProps {
  mode: ToolMode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ mode }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-8">
      {/* Guide Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
          <span>📖</span> 使用指南
        </h2>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300">
          {mode === 'wheel' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">🎡 转盘抽奖使用步骤</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>添加奖项</strong>：输入奖项名称并点击"添加"按钮，或选择预设模板快速创建</li>
                <li><strong>自定义设置</strong>：调整奖项颜色、动画时长、转盘样式等，根据活动需要定制</li>
                <li><strong>开始抽奖</strong>：点击"开始抽奖"按钮，转盘将自动旋转并随机选出一个奖项</li>
                <li><strong>保存结果</strong>：查看抽奖结果并可选择保存或导出配置，方便下次使用</li>
              </ol>
            </div>
          )}
          
          {mode === 'team' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">👥 多人组队使用步骤</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>输入参与者</strong>：在文本框中输入参与者名单，每行一个名字</li>
                <li><strong>选择分组方式</strong>：选择按队伍数量分组或按每队人数分组</li>
                <li><strong>设置分组参数</strong>：输入队伍数量或每队人数</li>
                <li><strong>生成分组</strong>：点击"随机分组"按钮，系统将公平随机地分配团队</li>
              </ol>
            </div>
          )}
          
          {mode === 'number' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">🔢 随机数生成使用步骤</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>设置范围</strong>：输入随机数的最小值和最大值</li>
                <li><strong>选择数量</strong>：设定要生成的随机数个数</li>
                <li><strong>生成数字</strong>：点击"生成数字"按钮获取随机数序列</li>
                <li><strong>使用结果</strong>：将生成的随机数用于决策、抽奖或其他用途</li>
              </ol>
            </div>
          )}
          
          {mode === 'password' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">🔐 密码生成使用步骤</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>设置长度</strong>：使用滑块选择密码长度（6-32个字符）</li>
                <li><strong>选择字符类型</strong>：勾选要包含的字符类型（大小写字母、数字、符号）</li>
                <li><strong>生成密码</strong>：点击"生成密码"按钮创建随机密码</li>
                <li><strong>复制使用</strong>：点击生成的密码即可复制到剪贴板</li>
              </ol>
            </div>
          )}
          
          <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 p-4 rounded-r">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">💡 专业提示</h4>
            <p>提前准备好数据（如奖项列表、参与者名单），可使用Excel或文本文档整理后批量导入，节省时间。大型活动前请提前测试设备和网络连接，确保活动顺利进行。</p>
          </div>
        </div>
      </div>

      {/* Inspiration Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
          <span>💡</span> 创意灵感
        </h2>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300">
          {mode === 'wheel' && (
            <>
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🎡 什么是幸运大转盘？</h3>
                <p>幸运大转盘是一种常见的抽奖工具，通过旋转轮盘随机决定结果。在传统实体转盘的基础上，我们的在线转盘工具使用随机算法模拟转盘旋转过程，确保每次抽奖结果完全随机公平。</p>
                <p className="mt-2">与传统实体转盘相比，在线幸运大转盘具有更高的灵活性，支持奖项自定义、颜色调整、动画时间等功能，并能够记录抽奖历史，便于活动组织者管理和统计。</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🎯 企业活动中的创新抽奖应用</h3>
                <p>在当今竞争激烈的商业环境中，抽奖环节作为活动的亮点，如何设计得既有创意又能达到预期效果呢？</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>双重抽奖系统</strong>：先抽取参与者，再抽取奖品，增加环节互动性</li>
                  <li><strong>渐进式奖项设置</strong>：从小奖开始，逐步抽取更高级别奖项，制造期待感</li>
                  <li><strong>主题定制化转盘</strong>：根据公司产品或服务设计特色奖项名称</li>
                  <li><strong>部门竞赛模式</strong>：不同部门轮流抽奖，比较最终获得的总奖品价值</li>
                  <li><strong>知识问答结合</strong>：答对问题才能获得抽奖机会，寓教于乐</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🏫 教育场景中的抽奖转盘应用创新</h3>
                <p>在教育领域，保持学生的学习兴趣和参与度是教学成功的关键。抽奖转盘作为一种互动工具，能够有效提升课堂氛围，激发学习动力。</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li><strong>知识点复习转盘</strong>：各分区为不同知识点，随机抽取进行复习</li>
                  <li><strong>项目分组神器</strong>：随机分配课题或项目给学生小组</li>
                  <li><strong>即兴演讲训练</strong>：抽取演讲主题进行即兴演讲训练</li>
                  <li><strong>课堂挑战系统</strong>：不同难度的问题和任务随机抽取</li>
                  <li><strong>学习奖励机制</strong>：学生完成任务后获得抽奖机会，增强学习动力</li>
                </ol>
              </div>
            </>
          )}

          {mode === 'team' && (
            <>
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">👥 多人组队：公平高效的团队分配方案</h3>
                <p>无论是企业团建、课堂分组还是活动组织，公平合理的团队分配都是成功的关键。我们的多人组队工具采用先进的随机算法，确保分组过程完全公平透明。</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">⚙️ 分组算法原理</h3>
                <p>我们的工具采用经典的<strong>Fisher-Yates洗牌算法</strong>对参与者名单进行随机打乱，确保每个参与者被分配到任何队伍的概率完全相同。这种算法被公认为是最公平、最高效的随机排序方法之一。</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🏢 企业团队建设应用</h3>
                <p>在企业环境中，合理的团队分配可以促进跨部门协作，打破信息孤岛，激发创新思维。</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>跨部门融合</strong>：将不同部门的员工混合分组，促进交流</li>
                    <li><strong>技能互补</strong>：确保每个团队拥有多样化的技能组合</li>
                    <li><strong>领导力分布</strong>：将潜在领导者分散到不同团队</li>
                    <li><strong>经验平衡</strong>：新老员工合理搭配，促进知识传递</li>
                </ul>
              </div>
            </>
          )}

          {mode === 'number' && (
            <>
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🔢 随机数生成：公平与随机的科学</h3>
                <p>随机数在决策、抽奖、模拟和加密等领域有着广泛应用。我们的随机数生成器采用高质量的随机算法，确保生成的数字序列具有真正的随机性。</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🎲 随机数生成原理</h3>
                <p>我们的工具使用浏览器内置的<strong>Crypto.getRandomValues()</strong> API生成高质量的随机数。这种算法基于系统级的熵源（如硬件噪声），比传统的Math.random()方法具有更高的随机性和安全性。</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">📊 商业与决策应用</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>A/B测试分组</strong>：随机将用户分配到不同测试组</li>
                    <li><strong>抽奖活动</strong>：公平抽取获奖者</li>
                    <li><strong>资源分配</strong>：随机分配任务或资源</li>
                    <li><strong>模拟预测</strong>：用于风险评估和业务预测</li>
                </ul>
              </div>
            </>
          )}

          {mode === 'password' && (
            <>
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🔐 密码安全：保护您的数字身份</h3>
                <p>在数字化时代，强大的密码是保护个人隐私和敏感信息的第一道防线。我们的密码生成器使用加密安全的随机算法，帮助您创建难以破解的强密码。</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🛡️ 密码强度评估标准</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>足够长度</strong>：至少12个字符，推荐16个或更多</li>
                    <li><strong>字符多样性</strong>：混合使用大小写字母、数字和特殊符号</li>
                    <li><strong>不可预测性</strong>：避免使用字典单词、个人信息或常见模式</li>
                    <li><strong>唯一性</strong>：不同账户使用不同密码</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-2">🔑 密码生成原理</h3>
                <p>我们的密码生成器采用与随机数生成相同的加密安全算法，确保每个字符的选择都是真正随机的，不存在可预测的模式。</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;