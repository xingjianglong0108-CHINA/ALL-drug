
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

  return (
    <div className="min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 font-semibold text-xs tracking-widest uppercase">
            Pharmacogenomics Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
            ALL 药物基因组学
          </h1>
          <p className="text-slate-500 text-lg">临床决策辅助工具 v1.0 (基于 NCCN & CPIC 指南)</p>
        </header>

        {/* Input Table */}
        <GlassCard title="检测结果录入 (基因检测报告)" className="animate-in fade-in duration-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/50">
                  <th className="py-4 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider">基因</th>
                  <th className="py-4 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider">SNP 位点</th>
                  <th className="py-4 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider">基因型</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {GENE_DATA.map((geneGroup) => (
                  <React.Fragment key={geneGroup.gene}>
                    {geneGroup.snps.map((snp, index) => (
                      <tr key={snp.id} className="hover:bg-white/30 transition-colors">
                        {index === 0 && (
                          <td 
                            className="py-4 px-4 align-top" 
                            rowSpan={geneGroup.snps.length}
                          >
                            <div className="font-bold text-slate-700 text-lg mb-1">{geneGroup.gene}</div>
                            <div className="text-xs text-slate-400 font-normal leading-relaxed max-w-[180px]">
                              {geneGroup.description}
                            </div>
                          </td>
                        )}
                        <td className="py-4 px-4 text-slate-600 font-medium">
                          {snp.name}
                        </td>
                        <td className="py-4 px-4">
                          <div className="relative">
                            <select
                              value={state[snp.id]}
                              onChange={(e) => handleSnpChange(snp.id, e.target.value)}
                              className="w-full md:w-48 bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer appearance-none"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                            >
                              {snp.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Recommendations Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m7.733 12.91a1 1 0 00.17.3c.047.058.05.02.062.126a1 1 0 00.18.322l.262.262a1 1 0 00.672.223.999.999 0 00.672-.223l.262-.262a1 1 0 00.18-.322.992.992 0 00.062-.126 1.001 1.001 0 00.17-.3m-10.333-5.714a11.969 11.969 0 018.167 6.835m0 0a11.969 11.969 0 018.167-6.835" />
              </svg>
              决策建议
            </h2>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">实时更新</span>
          </div>

          <div className="grid gap-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <div key={i} className={`transform transition-all duration-500 translate-y-0 animate-in fade-in slide-in-from-bottom-4`}>
                  <RecommendationCard recommendation={rec} />
                </div>
              ))
            ) : (
              <GlassCard className="text-center py-12">
                <div className="text-slate-400 text-lg">当前选择下所有代谢均为正常，暂无特殊调剂建议。</div>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <footer className="mt-16 text-center text-slate-400 text-sm max-w-2xl mx-auto border-t border-slate-200/50 pt-8 pb-10">
          注意：本工具仅供临床医生参考。具体用药方案必须结合患者临床特征（年龄、疾病风险分层、肝肾功能等）及其他实验室检查结果综合判断。
        </footer>
      </div>
    </div>
  );
};

const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const styles = {
    info: 'border-blue-200 bg-blue-50/40 text-blue-700',
    warning: 'border-amber-200 bg-amber-50/40 text-amber-700',
    danger: 'border-rose-200 bg-rose-50/40 text-rose-700'
  }[recommendation.level];

  const icons = {
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
    ),
    warning: (
      <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
    ),
    danger: (
      <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
    )
  };

  return (
    <div className={`p-6 rounded-2xl border-2 shadow-sm backdrop-blur-md ${styles}`}>
      <div className="flex items-start gap-4">
        <div className="mt-1 p-2 rounded-xl bg-white/50">{icons[recommendation.level]}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold uppercase tracking-tight">{recommendation.drug}</h3>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/40 border border-current opacity-80`}>
              {recommendation.level}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-xs font-semibold opacity-70 uppercase tracking-wide block mb-1">发现:</span>
            <p className="font-medium text-slate-800">{recommendation.finding}</p>
          </div>
          <div>
            <span className="text-xs font-semibold opacity-70 uppercase tracking-wide block mb-1">调整建议:</span>
            <p className="text-slate-900 leading-relaxed font-semibold">{recommendation.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
