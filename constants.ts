
import { GeneInfo } from './types';

export const GENE_DATA: GeneInfo[] = [
  {
    gene: 'MTHFR',
    description: '叶酸代谢相关，关联 MTX 相关的黏膜炎及骨髓抑制风险',
    snps: [
      { id: 'mthfr_677', name: 'C677T', options: ['CC', 'CT', 'TT'], defaultValue: 'CC' },
      { id: 'mthfr_1298', name: 'A1298C', options: ['AA', 'AC', 'CC'], defaultValue: 'AA' }
    ]
  },
  {
    gene: 'SLCO1B1',
    description: '药物转运相关，影响 MTX 排泄延迟及全身毒性风险',
    snps: [
      { id: 'slco1b1_521', name: 'T521C', options: ['TT', 'TC', 'CC'], defaultValue: 'TT' }
    ]
  },
  {
    gene: 'CEP72',
    description: '关联长春新碱 (VCR) 诱导的周围神经病变风险',
    snps: [
      { id: 'cep72_rs924607', name: 'rs924607', options: ['CC', 'CT', 'TT'], defaultValue: 'CC' }
    ]
  },
  {
    gene: 'NUDT15',
    description: '关联巯嘌呤 (6-MP/6-TG) 诱导的严重骨髓抑制及脱发',
    snps: [
      { id: 'nudt15_415', name: 'C415T (*3)', options: ['CC', 'CT', 'TT'], defaultValue: 'CC' }
    ]
  },
  {
    gene: 'TPMT',
    description: '关联巯嘌呤代谢，影响中性粒细胞减少及骨髓毒性',
    snps: [
      { id: 'tpmt_238', name: 'G238C (*2)', options: ['GG', 'GC', 'CC'], defaultValue: 'GG' },
      { id: 'tpmt_460', name: 'G460A (*3B)', options: ['GG', 'GA', 'AA'], defaultValue: 'GG' },
      { id: 'tpmt_719', name: 'A719G (*3C)', options: ['AA', 'AG', 'GG'], defaultValue: 'AA' }
    ]
  }
];
