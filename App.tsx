
import React, { useState, useMemo } from 'react';
import { GENE_DATA } from './constants';
import { GeneticReportState, Recommendation } from './types';
import { getRecommendations } from './services/recommendationEngine';
import GlassCard from './components/GlassCard';

const App: React.FC = () => {
  const [state, setState] = useState<GeneticReportState>(() => {
    const initialState: GeneticReportState = {};
    GENE_DATA.forEach(gene => {
      gene.snps.forEach(snp => {
        initialState[snp.id] = snp.defaultValue;
      });
    });
    return initialState;
  });

  const recommendations = useMemo(() => getRecommendations(state), [state]);

  const handleSnpChange = (snpId: string, value: string) => {
    setState(prev => ({ ...prev, [snpId]: value }));
  };

  const getThemeStyles = (color: string) => {
    const maps: Record<string, { bg: string, border: string, text: string, light: string }> = {
      blue: { bg: 'bg-blue-50/30', border: 'border-blue-400/60', text: 'text-blue-500', light: 'from-blue-50/60' },
      indigo: { bg: 'bg-indigo-50/30', border: 'border-indigo-400/60', text: 'text-indigo-500', light: 'from-indigo-50/60' },
      cyan: { bg: 'bg-cyan-50/30', border: 'border-cyan-400/60', text: 'text-cyan-500', light: 'from-cyan-50/60' },
      violet: { bg: 'bg-violet-50/30', border: 'border-violet-400/60', text: 'text-violet-500', light: 'from-violet-50/60' },
      pink: { bg: 'bg-pink-50/40', border: 'border-pink-300/60', text: 'text-pink-400', light: 'from-pink-50/80' },
      rose: { bg: 'bg-rose-50/30', border: 'border-rose-300/60', text: 'text-rose-400', light: 'from-rose-50/60' }
    };
    return maps[color] || maps.blue;
  };

  return (
    <div className="max-w-[800px] mx-auto py-12 px-5 antialiased">
      {/* App Header */}
      <header className="mb-10 pl-1">
        <p className="text-[#007aff] text-[13px] font-bold tracking-wider uppercase mb-1">PGx Clinical Support</p>
        <h1 className="text-[34px] font-extrabold tracking-tight text-[#1c1c1e] mb-2">ALL 药物基因组学</h1>
        <div className="flex items-center gap-3">
          <p className="text-[#8e8e93] text-[17px] font-medium leading-tight">基于基因检测报告的临床用药决策辅助</p>
          <span className="text-[11px] px-1.5 py-0.5 rounded bg-black/5 text-[#8e8e93]/70 font-bold tracking-widest uppercase border border-black/5">LZRYEK</span>
        </div>
      </header>

      <div className="space-y-10">
        {/* Detection Inputs - Enhanced Themed Groups */}
        <section>
          <div className="flex items-end justify-between px-1 mb-3">
             <h3 className="text-[13px] font-medium text-[#8e8e93] uppercase tracking-wide">基因检测结果录入</h3>
          </div>
          
          <div className="space-y-4">
            {GENE_DATA.map((geneGroup) => {
              const styles = getThemeStyles(geneGroup.themeColor);
              return (
                <div 
                  key={geneGroup.gene} 
                  className={`relative overflow-hidden rounded-[22px] border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] ${styles.bg}`}
                >
                  {/* Left Accent Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${styles.border.split('/')[0].replace('border-', 'bg-')}`}></div>
                  
                  {/* Gene Header Row */}
                  <div className={`px-6 py-4 bg-gradient-to-r ${styles.light} to-transparent border-b border-black/[0.03]`}>
                    <div className="flex items-center gap-3">
                       <span className={`text-[18px] font-extrabold tracking-tight ${styles.text}`}>{geneGroup.gene}</span>
                       <span className="h-3 w-[1px] bg-black/10"></span>
                       <span className="text-[13px] text-[#8e8e93] font-medium">{geneGroup.description}</span>
                    </div>
                  </div>

                  {/* SNPs List */}
                  <div className="divide-y divide-black/[0.03]">
                    {geneGroup.snps.map((snp) => (
                      <div key={snp.id} className="flex items-center justify-between py-3.5 px-6 hover:bg-white/40 transition-colors">
                        <label htmlFor={snp.id} className="text-[15px] font-semibold text-[#3a3a3c]">{snp.name}</label>
                        <div className="relative flex items-center">
                          <select
                            id={snp.id}
                            value={state[snp.id]}
                            onChange={(e) => handleSnpChange(snp.id, e.target.value)}
                            className={`appearance-none bg-white/60 border border-black/5 rounded-[12px] px-4 py-1.5 pr-8 text-[15px] font-bold ${styles.text} focus:ring-4 focus:ring-current/10 cursor-pointer transition-all min-w-[110px] text-right shadow-sm`}
                          >
                            {snp.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <div className={`absolute right-2.5 pointer-events-none ${styles.text}`}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="space-y-4">
          <div className="flex items-end justify-between px-1">
             <h3 className="text-[13px] font-medium text-[#8e8e93] uppercase tracking-wide">决策建议</h3>
             <span className="flex items-center gap-1.5 text-[12px] text-[#34c759] font-bold">
               <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse"></span>
               实时分析中
             </span>
          </div>

          <div className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <div key={i} className="list-item-enter" style={{ animationDelay: `${i * 0.1}s` }}>
                  <RecommendationCard recommendation={rec} />
                </div>
              ))
            ) : (
              <GlassCard className="text-center py-10">
                <div className="text-[#8e8e93] text-[15px]">所有检测项均为野生型或正常代谢，无需特殊剂量调整。</div>
              </GlassCard>
            )}
          </div>
        </section>

        {/* Info Disclaimer */}
        <footer className="pt-10 pb-20 border-t border-black/[0.05] text-center space-y-2">
          <p className="text-[12px] text-[#8e8e93] leading-relaxed max-w-md mx-auto">
            本工具遵循 NCCN/CPIC 指南。所有临床决策均需结合患者实际肝肾功能、年龄及化疗反应，由主治医师确认。
          </p>
          <div className="flex justify-center gap-4 text-[11px] font-bold text-[#007aff] uppercase tracking-tighter">
            <span>v1.0.5 Release</span>
            <span>Clinical Support System</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const styles = {
    info: {
      bg: 'bg-white/80',
      border: 'border-[#007aff]/10',
      accent: 'text-[#007aff]',
      iconBg: 'bg-[#007aff]/10',
      tag: 'bg-[#007aff] text-white'
    },
    warning: {
      bg: 'bg-[#fff9f0]/90',
      border: 'border-[#ff9500]/20',
      accent: 'text-[#ff9500]',
      iconBg: 'bg-[#ff9500]/10',
      tag: 'bg-[#ff9500] text-white'
    },
    danger: {
      bg: 'bg-[#fff2f2]/90',
      border: 'border-[#ff3b30]/20',
      accent: 'text-[#ff3b30]',
      iconBg: 'bg-[#ff3b30]/10',
      tag: 'bg-[#ff3b30] text-white'
    }
  }[recommendation.level];

  const icons = {
    info: <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    warning: <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    danger: <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  };

  return (
    <div className={`${styles.bg} backdrop-blur-[20px] rounded-[24px] border ${styles.border} p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden group`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl ${styles.iconBg} ${styles.accent} transition-transform group-hover:scale-110 duration-300`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            {icons[recommendation.level]}
          </svg>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="text-[20px] font-bold tracking-tight text-[#1c1c1e]">{recommendation.drug}</h4>
            <span className={`px-2 py-0.5 rounded-[6px] text-[10px] font-black uppercase tracking-widest ${styles.tag}`}>
              {recommendation.level === 'danger' ? 'High Risk' : recommendation.level === 'warning' ? 'Monitor' : 'Notice'}
            </span>
          </div>
          
          <div className="space-y-1">
            <p className="text-[13px] font-bold text-[#8e8e93] uppercase tracking-wide">基因型发现</p>
            <p className="text-[16px] text-[#3a3a3c] font-medium leading-snug">{recommendation.finding}</p>
          </div>

          <div className="pt-3 border-t border-black/5">
            <p className="text-[13px] font-bold text-[#8e8e93] uppercase tracking-wide mb-1">调整方案</p>
            <p className="text-[17px] text-[#1c1c1e] font-bold leading-relaxed">{recommendation.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
