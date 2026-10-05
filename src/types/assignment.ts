export type QuestionId = 'A' | 'B' | 'C' | 'D';

export interface HealthRecord {
  age: number;
  anaemia: number; // 0 or 1
  creatinine_phosphokinase: number;
  diabetes: number; // 0 or 1
  ejection_fraction: number; // percentage
  high_blood_pressure: number; // 0 or 1
  platelets: number;
  serum_creatinine: number;
  serum_sodium: number;
  sex: number; // 1 = male, 0 = female
  smoking: number; // 0 or 1
  death_event: number; // Target: 1 = high risk / event, 0 = no event
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  confusionMatrix: {
    tp: number;
    fp: number;
    tn: number;
    fn: number;
  };
}

export interface ScratchFeatureWeight {
  feature: string;
  weight: number;
  absWeight: number;
  impact: 'Increases Risk' | 'Decreases Risk';
}

export interface ThresholdStep {
  threshold: number;
  precision: number;
  recall: number;
  accuracy: number;
  f1: number;
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface SqlPredictionRecord {
  id: number;
  created_at: string;
  age: number;
  ejection_fraction: number;
  serum_creatinine: number;
  high_blood_pressure: number;
  predicted_prob: number;
  risk_category: 'Low' | 'Moderate' | 'High';
}

export interface SqlStatsResult {
  total_requests: number;
  avg_predicted_risk: number;
  high_risk_share_percent: number;
  query_execution_ms: number;
  raw_sql: string;
}

export interface PytestResult {
  name: string;
  description: string;
  status: 'passed' | 'failed';
  duration_ms: number;
  input_payload: any;
  expected_output: any;
  actual_output: any;
  details?: string;
}

export interface WhoDocument {
  id: string;
  title: string;
  topic: string;
  publicationDate: string;
  sourceUrl: string;
  content: string;
  sections: { title: string; content: string }[];
}

export interface TextChunk {
  chunkId: string;
  docId: string;
  docTitle: string;
  sectionTitle: string;
  text: string;
  wordCount: number;
}

export interface RetrievalResult {
  chunk: TextChunk;
  score: number; // Cosine similarity
  rank: number;
}

export interface RagBenchmarkQuestion {
  id: number;
  question: string;
  expectedAnswerable: boolean;
  preRunPrediction: string; // Candidate committed prediction
  retrievedTopScore: number;
  generatedAnswer: string;
  actualStatus: 'Success' | 'Failed (Retrieval)' | 'Failed (LLM)';
  attributionNote: string;
  citedSource?: string;
}

export interface ExercisePoseData {
  hip: [number, number];
  knee: [number, number];
  ankle: [number, number];
  rawAngle: number;
  smoothedAngle: number;
  state: 'UP' | 'DESCENDING' | 'DOWN' | 'ASCENDING';
  feedback: string;
}

export interface VideoTestBench {
  id: string;
  title: string;
  videoType: 'standard_form' | 'fast_tempo' | 'shallow_bad_form';
  description: string;
  predictedReps: number;
  actualReps: number;
  countedRepsDefault: number;
  countedRepsTuned: number;
  errorExplanation: string;
}
