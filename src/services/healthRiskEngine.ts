import { HealthRecord, ModelMetrics, ScratchFeatureWeight, ThresholdStep } from '../types/healthSuite';

// Seeded pseudorandom number generator (LCG / Mulberry32)
export function createSeededRandom(seed: number) {
  let s = Math.abs(seed) || 42;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t >>> 0) / 4294967296);
  };
}

// 60 representative patient records derived from the public UCI Heart Failure Clinical Records dataset
// Features: age, anaemia, cpk, diabetes, ejection_fraction, hbp, platelets, serum_creatinine, sodium, sex, smoking, death_event
export const SAMPLE_HEART_DATASET: HealthRecord[] = [
  { age: 75, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 0, ejection_fraction: 20, high_blood_pressure: 1, platelets: 265000, serum_creatinine: 1.9, serum_sodium: 130, sex: 1, smoking: 0, death_event: 1 },
  { age: 55, anaemia: 0, creatinine_phosphokinase: 7861, diabetes: 0, ejection_fraction: 38, high_blood_pressure: 0, platelets: 263358, serum_creatinine: 1.1, serum_sodium: 136, sex: 1, smoking: 0, death_event: 1 },
  { age: 65, anaemia: 0, creatinine_phosphokinase: 146, diabetes: 0, ejection_fraction: 20, high_blood_pressure: 0, platelets: 162000, serum_creatinine: 1.3, serum_sodium: 129, sex: 1, smoking: 1, death_event: 1 },
  { age: 50, anaemia: 1, creatinine_phosphokinase: 111, diabetes: 0, ejection_fraction: 20, high_blood_pressure: 0, platelets: 210000, serum_creatinine: 1.9, serum_sodium: 137, sex: 1, smoking: 0, death_event: 1 },
  { age: 65, anaemia: 1, creatinine_phosphokinase: 160, diabetes: 1, ejection_fraction: 20, high_blood_pressure: 0, platelets: 327000, serum_creatinine: 2.7, serum_sodium: 116, sex: 0, smoking: 0, death_event: 1 },
  { age: 90, anaemia: 1, creatinine_phosphokinase: 47, diabetes: 0, ejection_fraction: 40, high_blood_pressure: 1, platelets: 204000, serum_creatinine: 2.1, serum_sodium: 132, sex: 1, smoking: 1, death_event: 1 },
  { age: 75, anaemia: 1, creatinine_phosphokinase: 246, diabetes: 0, ejection_fraction: 15, high_blood_pressure: 0, platelets: 127000, serum_creatinine: 4.0, serum_sodium: 137, sex: 1, smoking: 0, death_event: 1 },
  { age: 60, anaemia: 1, creatinine_phosphokinase: 315, diabetes: 1, ejection_fraction: 60, high_blood_pressure: 0, platelets: 454000, serum_creatinine: 1.1, serum_sodium: 131, sex: 1, smoking: 1, death_event: 1 },
  { age: 64, anaemia: 0, creatinine_phosphokinase: 240, diabetes: 0, ejection_fraction: 60, high_blood_pressure: 0, platelets: 153000, serum_creatinine: 1.0, serum_sodium: 138, sex: 1, smoking: 0, death_event: 0 },
  { age: 62, anaemia: 1, creatinine_phosphokinase: 231, diabetes: 0, ejection_fraction: 25, high_blood_pressure: 1, platelets: 253000, serum_creatinine: 0.9, serum_sodium: 140, sex: 1, smoking: 1, death_event: 1 },
  { age: 58, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 1, ejection_fraction: 38, high_blood_pressure: 0, platelets: 153000, serum_creatinine: 1.8, serum_sodium: 134, sex: 1, smoking: 0, death_event: 1 },
  { age: 68, anaemia: 1, creatinine_phosphokinase: 646, diabetes: 0, ejection_fraction: 25, high_blood_pressure: 0, platelets: 305000, serum_creatinine: 2.1, serum_sodium: 130, sex: 1, smoking: 0, death_event: 1 },
  { age: 73, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 0, ejection_fraction: 20, high_blood_pressure: 0, platelets: 263358, serum_creatinine: 1.83, serum_sodium: 134, sex: 1, smoking: 0, death_event: 1 },
  { age: 50, anaemia: 1, creatinine_phosphokinase: 168, diabetes: 0, ejection_fraction: 38, high_blood_pressure: 1, platelets: 276000, serum_creatinine: 1.1, serum_sodium: 137, sex: 1, smoking: 0, death_event: 0 },
  { age: 54, anaemia: 1, creatinine_phosphokinase: 427, diabetes: 0, ejection_fraction: 70, high_blood_pressure: 1, platelets: 151000, serum_creatinine: 9.0, serum_sodium: 137, sex: 0, smoking: 0, death_event: 1 },
  { age: 82, anaemia: 1, creatinine_phosphokinase: 379, diabetes: 0, ejection_fraction: 50, high_blood_pressure: 0, platelets: 47000, serum_creatinine: 1.3, serum_sodium: 136, sex: 1, smoking: 0, death_event: 1 },
  { age: 87, anaemia: 1, creatinine_phosphokinase: 149, diabetes: 0, ejection_fraction: 38, high_blood_pressure: 0, platelets: 262000, serum_creatinine: 0.9, serum_sodium: 140, sex: 1, smoking: 0, death_event: 1 },
  { age: 45, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 0, ejection_fraction: 14, high_blood_pressure: 0, platelets: 166000, serum_creatinine: 0.8, serum_sodium: 127, sex: 1, smoking: 0, death_event: 1 },
  { age: 70, anaemia: 1, creatinine_phosphokinase: 125, diabetes: 0, ejection_fraction: 25, high_blood_pressure: 1, platelets: 237000, serum_creatinine: 1.0, serum_sodium: 140, sex: 0, smoking: 0, death_event: 1 },
  { age: 48, anaemia: 1, creatinine_phosphokinase: 181, diabetes: 1, ejection_fraction: 55, high_blood_pressure: 0, platelets: 252000, serum_creatinine: 0.7, serum_sodium: 139, sex: 1, smoking: 0, death_event: 0 },
  { age: 65, anaemia: 1, creatinine_phosphokinase: 52, diabetes: 0, ejection_fraction: 25, high_blood_pressure: 1, platelets: 276000, serum_creatinine: 1.3, serum_sodium: 137, sex: 0, smoking: 0, death_event: 0 },
  { age: 65, anaemia: 1, creatinine_phosphokinase: 128, diabetes: 1, ejection_fraction: 30, high_blood_pressure: 1, platelets: 297000, serum_creatinine: 1.6, serum_sodium: 136, sex: 0, smoking: 0, death_event: 1 },
  { age: 68, anaemia: 1, creatinine_phosphokinase: 220, diabetes: 0, ejection_fraction: 35, high_blood_pressure: 1, platelets: 289000, serum_creatinine: 0.9, serum_sodium: 140, sex: 1, smoking: 1, death_event: 0 },
  { age: 53, anaemia: 0, creatinine_phosphokinase: 63, diabetes: 1, ejection_fraction: 60, high_blood_pressure: 0, platelets: 368000, serum_creatinine: 0.8, serum_sodium: 135, sex: 1, smoking: 0, death_event: 0 },
  { age: 50, anaemia: 0, creatinine_phosphokinase: 250, diabetes: 0, ejection_fraction: 25, high_blood_pressure: 0, platelets: 262000, serum_creatinine: 1.0, serum_sodium: 136, sex: 1, smoking: 1, death_event: 0 },
  { age: 70, anaemia: 0, creatinine_phosphokinase: 161, diabetes: 0, ejection_fraction: 25, high_blood_pressure: 0, platelets: 244000, serum_creatinine: 1.2, serum_sodium: 142, sex: 0, smoking: 0, death_event: 0 },
  { age: 70, anaemia: 1, creatinine_phosphokinase: 171, diabetes: 0, ejection_fraction: 60, high_blood_pressure: 1, platelets: 176000, serum_creatinine: 1.2, serum_sodium: 132, sex: 1, smoking: 1, death_event: 0 },
  { age: 70, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 1, ejection_fraction: 38, high_blood_pressure: 0, platelets: 251000, serum_creatinine: 1.3, serum_sodium: 139, sex: 1, smoking: 1, death_event: 0 },
  { age: 58, anaemia: 1, creatinine_phosphokinase: 400, diabetes: 0, ejection_fraction: 40, high_blood_pressure: 0, platelets: 164000, serum_creatinine: 1.0, serum_sodium: 139, sex: 1, smoking: 1, death_event: 0 },
  { age: 51, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 1, ejection_fraction: 35, high_blood_pressure: 0, platelets: 263358, serum_creatinine: 0.9, serum_sodium: 130, sex: 1, smoking: 0, death_event: 0 },
  { age: 60, anaemia: 0, creatinine_phosphokinase: 235, diabetes: 1, ejection_fraction: 38, high_blood_pressure: 0, platelets: 329000, serum_creatinine: 3.0, serum_sodium: 142, sex: 0, smoking: 0, death_event: 1 },
  { age: 85, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 0, ejection_fraction: 50, high_blood_pressure: 0, platelets: 168000, serum_creatinine: 3.0, serum_sodium: 132, sex: 1, smoking: 0, death_event: 1 },
  { age: 60, anaemia: 1, creatinine_phosphokinase: 260, diabetes: 1, ejection_fraction: 30, high_blood_pressure: 0, platelets: 489000, serum_creatinine: 1.0, serum_sodium: 131, sex: 1, smoking: 0, death_event: 0 },
  { age: 50, anaemia: 1, creatinine_phosphokinase: 249, diabetes: 1, ejection_fraction: 35, high_blood_pressure: 1, platelets: 319000, serum_creatinine: 1.0, serum_sodium: 128, sex: 0, smoking: 0, death_event: 0 },
  { age: 64, anaemia: 0, creatinine_phosphokinase: 1610, diabetes: 0, ejection_fraction: 60, high_blood_pressure: 0, platelets: 242000, serum_creatinine: 1.0, serum_sodium: 137, sex: 1, smoking: 0, death_event: 0 },
  { age: 70, anaemia: 0, creatinine_phosphokinase: 582, diabetes: 1, ejection_fraction: 35, high_blood_pressure: 0, platelets: 327000, serum_creatinine: 1.1, serum_sodium: 142, sex: 0, smoking: 0, death_event: 0 },
  { age: 60, anaemia: 1, creatinine_phosphokinase: 754, diabetes: 1, ejection_fraction: 40, high_blood_pressure: 1, platelets: 328000, serum_creatinine: 1.2, serum_sodium: 126, sex: 1, smoking: 0, death_event: 0 },
  { age: 52, anaemia: 0, creatinine_phosphokinase: 3964, diabetes: 1, ejection_fraction: 30, high_blood_pressure: 0, platelets: 372000, serum_creatinine: 1.1, serum_sodium: 134, sex: 1, smoking: 0, death_event: 0 },
  { age: 45, anaemia: 0, creatinine_phosphokinase: 2413, diabetes: 0, ejection_fraction: 38, high_blood_pressure: 0, platelets: 140000, serum_creatinine: 1.4, serum_sodium: 140, sex: 1, smoking: 1, death_event: 0 },
  { age: 60, anaemia: 0, creatinine_phosphokinase: 2656, diabetes: 1, ejection_fraction: 30, high_blood_pressure: 0, platelets: 305000, serum_creatinine: 2.3, serum_sodium: 137, sex: 1, smoking: 0, death_event: 0 },
  { age: 68, anaemia: 1, creatinine_phosphokinase: 577, diabetes: 0, ejection_fraction: 25, high_blood_pressure: 1, platelets: 166000, serum_creatinine: 1.0, serum_sodium: 138, sex: 1, smoking: 0, death_event: 0 },
  { age: 70, anaemia: 0, creatinine_phosphokinase: 69, diabetes: 0, ejection_fraction: 40, high_blood_pressure: 0, platelets: 293000, serum_creatinine: 1.7, serum_sodium: 136, sex: 0, smoking: 0, death_event: 0 },
  { age: 60, anaemia: 1, creatinine_phosphokinase: 95, diabetes: 0, ejection_fraction: 60, high_blood_pressure: 0, platelets: 337000, serum_creatinine: 1.0, serum_sodium: 138, sex: 1, smoking: 1, death_event: 0 },
  { age: 80, anaemia: 0, creatinine_phosphokinase: 898, diabetes: 0, ejection_fraction: 45, high_blood_pressure: 0, platelets: 200000, serum_creatinine: 1.1, serum_sodium: 140, sex: 1, smoking: 0, death_event: 0 },
  { age: 71, anaemia: 0, creatinine_phosphokinase: 126, diabetes: 0, ejection_fraction: 60, high_blood_pressure: 0, platelets: 228000, serum_creatinine: 1.0, serum_sodium: 140, sex: 1, smoking: 0, death_event: 0 },
  { age: 65, anaemia: 0, creatinine_phosphokinase: 335, diabetes: 0, ejection_fraction: 35, high_blood_pressure: 1, platelets: 290000, serum_creatinine: 1.1, serum_sodium: 138, sex: 1, smoking: 1, death_event: 0 },
  { age: 49, anaemia: 1, creatinine_phosphokinase: 102, diabetes: 0, ejection_fraction: 35, high_blood_pressure: 0, platelets: 271000, serum_creatinine: 0.7, serum_sodium: 140, sex: 1, smoking: 0, death_event: 0 },
  { age: 50, anaemia: 0, creatinine_phosphokinase: 318, diabetes: 0, ejection_fraction: 40, high_blood_pressure: 1, platelets: 216000, serum_creatinine: 2.3, serum_sodium: 131, sex: 0, smoking: 0, death_event: 0 },
  { age: 59, anaemia: 1, creatinine_phosphokinase: 176, diabetes: 1, ejection_fraction: 25, high_blood_pressure: 0, platelets: 221000, serum_creatinine: 1.0, serum_sodium: 136, sex: 1, smoking: 1, death_event: 1 },
  { age: 60, anaemia: 0, creatinine_phosphokinase: 166, diabetes: 0, ejection_fraction: 30, high_blood_pressure: 0, platelets: 62000, serum_creatinine: 1.7, serum_sodium: 127, sex: 0, smoking: 0, death_event: 1 }
];

export const FEATURE_NAMES = [
  'age',
  'anaemia',
  'creatinine_phosphokinase',
  'diabetes',
  'ejection_fraction',
  'high_blood_pressure',
  'platelets',
  'serum_creatinine',
  'serum_sodium',
  'sex',
  'smoking'
];

// Helper: Custom Confusion Matrix calculation (Level 2 requirement: write your own function)
export function computeCustomConfusionMatrix(yTrue: number[], yPred: number[]) {
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;

  for (let i = 0; i < yTrue.length; i++) {
    const actual = yTrue[i];
    const predicted = yPred[i];

    if (actual === 1 && predicted === 1) tp++;
    else if (actual === 0 && predicted === 1) fp++;
    else if (actual === 0 && predicted === 0) tn++;
    else if (actual === 1 && predicted === 0) fn++;
  }

  const accuracy = (tp + tn) / (tp + fp + tn + fn || 1);
  const precision = tp / (tp + fp || 1);
  const recall = tp / (tp + fn || 1);
  const f1 = (2 * precision * recall) / (precision + recall || 1);

  return {
    accuracy,
    precision,
    recall,
    f1,
    confusionMatrix: { tp, fp, tn, fn }
  };
}

// Level 2: Scratch Sigmoid function with numeric stability clipping
export function scratchSigmoid(z: number): number {
  // Prevent overflow: clip to [-25, 25]
  const clampedZ = Math.max(-25, Math.min(25, z));
  return 1 / (1 + Math.exp(-clampedZ));
}

// Level 2: Scratch Binary Cross-Entropy Loss
export function scratchBceLoss(yTrue: number[], probabilities: number[]): number {
  const m = yTrue.length;
  let sumLoss = 0;
  const eps = 1e-15; // Avoid log(0)

  for (let i = 0; i < m; i++) {
    const y = yTrue[i];
    const p = Math.max(eps, Math.min(1 - eps, probabilities[i]));
    sumLoss += y * Math.log(p) + (1 - y) * Math.log(1 - p);
  }

  return -(1 / m) * sumLoss;
}

// Complete Train/Test split using Candidate Seed S
export function trainTestSplitBySeed(dataset: HealthRecord[], seed: number, testRatio: number = 0.3) {
  const rng = createSeededRandom(seed);
  // Copy & shuffle deterministically
  const shuffled = [...dataset];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const testCount = Math.floor(shuffled.length * testRatio);
  const testSet = shuffled.slice(0, testCount);
  const trainSet = shuffled.slice(testCount);

  return { trainSet, testSet };
}

// Standard Scaling computation (Z-score normalization)
export function computeFeatureScaling(trainData: HealthRecord[]) {
  const means: Record<string, number> = {};
  const stds: Record<string, number> = {};

  FEATURE_NAMES.forEach(feat => {
    const values = trainData.map(d => (d as any)[feat] as number);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (values.length || 1);
    const std = Math.sqrt(variance) || 1e-6;

    means[feat] = mean;
    stds[feat] = std;
  });

  return { means, stds };
}

export function transformRecord(d: HealthRecord, means: Record<string, number>, stds: Record<string, number>): number[] {
  return FEATURE_NAMES.map(feat => {
    const val = (d as any)[feat] as number;
    return (val - means[feat]) / stds[feat];
  });
}

// Level 2: Scratch Logistic Regression with Gradient Descent
export function trainScratchLogisticRegression(
  trainData: HealthRecord[],
  epochs: number = 400,
  learningRate: number = 0.08
) {
  const { means, stds } = computeFeatureScaling(trainData);
  const X_train = trainData.map(d => transformRecord(d, means, stds));
  const y_train = trainData.map(d => d.death_event);
  const m = X_train.length;
  const n = FEATURE_NAMES.length;

  // Initialize weights and bias to zeros
  const weights: number[] = new Array(n).fill(0);
  let bias = 0;
  const lossHistory: number[] = [];

  for (let epoch = 0; epoch < epochs; epoch++) {
    // 1. Forward pass: z = Xw + b, p = sigmoid(z)
    const probs: number[] = [];
    for (let i = 0; i < m; i++) {
      let z = bias;
      for (let j = 0; j < n; j++) {
        z += X_train[i][j] * weights[j];
      }
      probs.push(scratchSigmoid(z));
    }

    // 2. Binary cross entropy loss
    if (epoch % 50 === 0 || epoch === epochs - 1) {
      lossHistory.push(scratchBceLoss(y_train, probs));
    }

    // 3. Backward pass: gradients
    // dw = (1/m) * X^T (p - y)
    // db = (1/m) * sum(p - y)
    const dw = new Array(n).fill(0);
    let db = 0;

    for (let i = 0; i < m; i++) {
      const err = probs[i] - y_train[i];
      db += err;
      for (let j = 0; j < n; j++) {
        dw[j] += err * X_train[i][j];
      }
    }

    // 4. Update parameters
    for (let j = 0; j < n; j++) {
      weights[j] -= learningRate * (dw[j] / m);
    }
    bias -= learningRate * (db / m);
  }

  // Predict function
  const predictProb = (record: HealthRecord) => {
    const x = transformRecord(record, means, stds);
    let z = bias;
    for (let j = 0; j < n; j++) {
      z += x[j] * weights[j];
    }
    return scratchSigmoid(z);
  };

  // Top 3 feature weights
  const featureWeights: ScratchFeatureWeight[] = FEATURE_NAMES.map((name, i) => ({
    feature: name,
    weight: weights[i],
    absWeight: Math.abs(weights[i]),
    impact: (weights[i] > 0 ? 'Increases Risk' : 'Decreases Risk') as 'Increases Risk' | 'Decreases Risk'
  })).sort((a, b) => b.absWeight - a.absWeight);

  return {
    weights,
    bias,
    means,
    stds,
    lossHistory,
    predictProb,
    featureWeights
  };
}

// Level 3: Sweep decision threshold from 0.8 down to 0.1 to observe precision degradation when recall >= 0.90
export function evaluateThresholdSweep(
  testData: HealthRecord[],
  predictProb: (d: HealthRecord) => number
): { steps: ThresholdStep[]; targetStep: ThresholdStep | null } {
  const probabilities = testData.map(d => predictProb(d));
  const yTrue = testData.map(d => d.death_event);
  const steps: ThresholdStep[] = [];

  for (let t = 80; t >= 10; t -= 5) {
    const thresh = t / 100;
    const yPred = probabilities.map(p => (p >= thresh ? 1 : 0));
    const metrics = computeCustomConfusionMatrix(yTrue, yPred);

    steps.push({
      threshold: thresh,
      precision: Number(metrics.precision.toFixed(3)),
      recall: Number(metrics.recall.toFixed(3)),
      accuracy: Number(metrics.accuracy.toFixed(3)),
      f1: Number(metrics.f1.toFixed(3)),
      tp: metrics.confusionMatrix.tp,
      fp: metrics.confusionMatrix.fp,
      fn: metrics.confusionMatrix.fn,
      tn: metrics.confusionMatrix.tn
    });
  }

  // Find first step where recall >= 0.90
  const targetStep = steps.find(s => s.recall >= 0.90) || steps[steps.length - 1];

  return { steps, targetStep };
}
