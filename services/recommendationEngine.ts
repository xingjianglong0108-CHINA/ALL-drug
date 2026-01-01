
import { GeneticReportState, Recommendation } from '../types';

export function getRecommendations(state: GeneticReportState): Recommendation[] {
  const recs: Recommendation[] = [];

  // --- Methotrexate (MTX) Recommendations ---
  const m677 = state['mthfr_677'];
  const m1298 = state['mthfr_1298'];
  const s521 = state['slco1b1_521'];

  if (m677 === 'TT' || m1298 === 'CC') {
    recs.push({
      drug: '甲氨蝶呤 (MTX)',
      finding: `MTHFR ${m677}/${m1298} 变异导致叶酸代谢减弱。`,
      suggestion: '可能增加 MTX 毒性风险，需密切监测血药浓度及毒性反应。建议关注低钾血症。',
      level: 'warning'
    });
  } else if (m677 === 'CT' || m1298 === 'AC') {
    recs.push({
      drug: '甲氨蝶呤 (MTX)',
      finding: 'MTHFR 位点存在杂合变异。',
      suggestion: '建议根据临床表现监测相关毒性。',
      level: 'info'
    });
  }

  if (s521 === 'CC') {
    recs.push({
      drug: '甲氨蝶呤 (MTX)',
      finding: 'SLCO1B1 T521C 纯合突变型。',
      suggestion: '显著降低 MTX 清除率，血药浓度最高，全身毒性显著增加。需高度警惕并可能需要减量。',
      level: 'danger'
    });
  } else if (s521 === 'TC') {
    recs.push({
      drug: '甲氨蝶呤 (MTX)',
      finding: 'SLCO1B1 T521C 杂合突变型。',
      suggestion: 'MTX 清除率降低，毒性风险增加。建议个体化给药，监测毒性。',
      level: 'warning'
    });
  }

  // --- Vincristine (VCR) Recommendations ---
  const c72 = state['cep72_rs924607'];
  if (c72 === 'TT') {
    recs.push({
      drug: '长春新碱 (VCR)',
      finding: 'CEP72 rs924607 T/T 基因型。',
      suggestion: '极高风险发生周围神经病变（神经毒性更早、更严重）。建议调整剂量。',
      level: 'danger'
    });
  } else if (c72 === 'CT') {
    recs.push({
      drug: '长春新碱 (VCR)',
      finding: 'CEP72 rs924607 C/T 基因型。',
      suggestion: '存在发生周围神经病变的风险，优于 T/T 型，但仍需监测。',
      level: 'warning'
    });
  }

  // --- Thiopurines (6-MP / 6-TG) Recommendations ---
  const n415 = state['nudt15_415'];
  const t238 = state['tpmt_238'];
  const t460 = state['tpmt_460'];
  const t719 = state['tpmt_719'];

  const isTPMTHetero = t238 === 'GC' || t460 === 'GA' || t719 === 'AG';
  const isTPMTHomo = t238 === 'CC' || t460 === 'AA' || t719 === 'GG';

  // NUDT15 Logic
  if (n415 === 'TT') {
    recs.push({
      drug: '巯嘌呤 (6-MP/6-TG)',
      finding: 'NUDT15 C415T 纯合突变型 (慢代谢型)。',
      suggestion: '极高风险发生严重骨髓抑制。剂量至少减少 90% (或起始 10mg/m²/day)，建议换药或极大减量。',
      level: 'danger'
    });
  } else if (n415 === 'CT') {
    recs.push({
      drug: '巯嘌呤 (6-MP/6-TG)',
      finding: 'NUDT15 C415T 杂合突变型 (中间代谢型)。',
      suggestion: '骨髓抑制风险高。建议起始剂量减少 30-80%，2-4周达稳态后根据耐受性调整。',
      level: 'warning'
    });
  }

  // TPMT Logic
  if (isTPMTHomo) {
    recs.push({
      drug: '巯嘌呤 (6-MP/6-TG)',
      finding: 'TPMT 纯合变异型 (慢代谢型)。',
      suggestion: 'TPMT 活性极低或缺失，极易发生致死性中性粒细胞减少。恶性肿瘤时剂量建议减少 10 倍以上。',
      level: 'danger'
    });
  } else if (isTPMTHetero) {
    recs.push({
      drug: '巯嘌呤 (6-MP/6-TG)',
      finding: 'TPMT 杂合变异型 (中间代谢型)。',
      suggestion: 'TPMT 活性中等。起始剂量减少 30-80%，严密监测血象。',
      level: 'warning'
    });
  }

  return recs;
}
