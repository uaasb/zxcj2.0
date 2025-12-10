
import React from 'react';
import { X, ShieldCheck, Lock, Database } from 'lucide-react';

interface PrivacyModalProps {
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-t-2xl">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
            <ShieldCheck className="text-green-500" /> 隐私政策与使用条款
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar text-sm leading-relaxed text-gray-600 dark:text-gray-300 space-y-6">
          
          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-base">1. 数据收集与处理声明</h3>
            <p>本网站（在线抽奖系统）承诺尊重并保护您的隐私。我们<strong>不收集、不存储、不分享</strong>您的任何个人身份信息（PII）。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
              <li><strong>本地处理</strong>：您在“多人组队”、“转盘抽奖”等功能中输入的名单、选项等数据，仅在您的浏览器（客户端）本地运行，不会传输至任何服务器。</li>
              <li><strong>数据存储</strong>：所有的历史记录（如抽奖结果）仅保存在您浏览器的 LocalStorage 中，您可以随时通过清空浏览器缓存来删除这些数据。</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-base">2. Cookie 使用政策</h3>
            <p>本工具核心功能不使用 Cookie 跟踪用户行为。但为了维持网站运营，我们可能接入 Google AdSense 等第三方服务，这些服务可能会使用 Cookie 来提供广告投放。</p>
            <p className="mt-1">您可以随时在浏览器设置中禁用 Cookie，这不会影响本工具的基本功能使用。</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-base">3. 合规与免责声明（重要）</h3>
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r">
              <p className="font-bold text-amber-800 dark:text-amber-200 mb-1">非商业用途限制</p>
              <p>本工具仅设计用于<strong>教育教学、团队建设、家庭娱乐</strong>等非盈利场景。严禁将本工具用于：</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>非法博彩、网络赌博或任何形式的赌博活动。</li>
                <li>涉及高价值现金、实物奖品的商业性有奖销售（请遵守当地法律，如中国《反不正当竞争法》关于有奖销售的规定）。</li>
                <li>诱导用户付费参与的抽奖活动。</li>
              </ul>
            </div>
            <p className="mt-2">使用者需自行承担因不当使用本工具而产生的法律责任。本网站不对任何抽奖结果所产生的经济纠纷负责。</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-base">4. 联系我们</h3>
            <p>如果您对本隐私政策有任何疑问，或发现任何违规使用的情况，请通过页面底部的联系方式反馈。</p>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors shadow-lg"
          >
            我已阅读并同意
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
