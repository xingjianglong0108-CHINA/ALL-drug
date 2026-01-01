
export type Genotype = string;

export interface SNP {
  id: string;
  name: string;
  options: string[];
  defaultValue: string;
}

export interface GeneInfo {
  gene: string;
  description: string;
  themeColor: string; // TailWind color class prefix like 'blue', 'purple', etc.
  snps: SNP[];
}

export interface Recommendation {
  drug: string;
  finding: string;
  suggestion: string;
  level: 'info' | 'warning' | 'danger';
}

export interface GeneticReportState {
  [snpId: string]: string;
}
