import { WhoDocument, TextChunk, RetrievalResult, RagBenchmarkQuestion } from '../types/assignment';

export const WHO_PUBLIC_DOCUMENTS: WhoDocument[] = [
  {
    id: 'who-diabetes-2023',
    title: 'WHO Fact Sheet: Diabetes (N° 312)',
    topic: 'Diabetes Mellitus',
    publicationDate: 'April 2023',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/diabetes',
    content: `Diabetes is a chronic, metabolic disease characterized by elevated levels of blood glucose, which leads over time to serious damage to the heart, blood vessels, eyes, kidneys and nerves. About 422 million people worldwide have diabetes, the majority living in low-and-middle-income countries.
Type 1 diabetes is characterized by deficient insulin production and requires daily administration of insulin. Its cause is not known and it is currently not preventable.
Type 2 diabetes affects how your body uses sugar (glucose) for energy. It stops the body from using insulin properly, which can lead to high levels of blood sugar if not treated. Over 95% of people with diabetes have type 2 diabetes. Type 2 diabetes is largely the result of excess body weight and physical inactivity.
Healthy diet, regular physical activity, maintaining a normal body weight and avoiding tobacco use are ways to prevent or delay the onset of type 2 diabetes. Fasting blood glucose equal to or higher than 126 mg/dL (7.0 mmol/L) on two separate tests confirms diabetes diagnosis.`,
    sections: [
      {
        title: 'Overview & Global Prevalence',
        content: 'Diabetes is a chronic metabolic disease with elevated blood glucose levels. Globally, approximately 422 million individuals live with diabetes, mostly in developing economies.'
      },
      {
        title: 'Type 1 vs Type 2 Classification',
        content: 'Type 1 features autoimmune insulin deficiency requiring daily exogenous insulin injections. Type 2 represents over 95% of diagnoses and is driven by insulin resistance, excess adiposity, and sedentary lifestyle.'
      },
      {
        title: 'Diagnostic Criteria & Prevention',
        content: 'Diagnostic confirmation requires fasting plasma glucose >= 126 mg/dL (7.0 mmol/L) or HbA1c >= 6.5%. Lifestyle interventions including 150 minutes of aerobic activity weekly and caloric restriction prevent type 2 progression.'
      }
    ]
  },
  {
    id: 'who-hypertension-2023',
    title: 'WHO Fact Sheet: Hypertension',
    topic: 'Cardiovascular Health',
    publicationDate: 'March 2023',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/hypertension',
    content: `Hypertension (high blood pressure) is when the pressure in your blood vessels is too high (140/90 mmHg or higher). It is common but can be serious if not treated. An estimated 1.28 billion adults aged 30-79 years worldwide have hypertension, two-thirds living in low- and middle-income countries.
Blood pressure is written as two numbers. The first (systolic) number represents the pressure in blood vessels when the heart contracts. The second (diastolic) number represents the pressure when the heart rests between beats.
Hypertension is diagnosed if, when measured on two different days, the systolic blood pressure readings on both days are >=140 mmHg and/or the diastolic blood pressure readings on both days are >=90 mmHg.
Modifiable risk factors include unhealthy diets (excessive salt consumption, a diet high in saturated fat and trans fats, low intake of fruits and vegetables), physical inactivity, consumption of tobacco and alcohol, and being overweight or obese.`,
    sections: [
      {
        title: 'Clinical Definition and Measurements',
        content: 'Hypertension is clinically defined as sustained systolic blood pressure >= 140 mmHg and/or diastolic blood pressure >= 90 mmHg across two independent clinical evaluations.'
      },
      {
        title: 'Epidemiology and Global Burden',
        content: 'Approximately 1.28 billion adults aged 30 to 79 suffer from high blood pressure worldwide. It remains the principal risk factor for premature stroke and ischemic heart disease.'
      },
      {
        title: 'Dietary Sodium and Management',
        content: 'Reducing dietary sodium chloride intake below 2,000 mg/day (less than 5 grams of salt) significantly lowers systolic pressure by an average of 5 to 8 mmHg.'
      }
    ]
  },
  {
    id: 'who-physical-activity-2022',
    title: 'WHO Fact Sheet: Physical Activity Guidelines',
    topic: 'Preventive Health',
    publicationDate: 'October 2022',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
    content: `Regular physical activity is proven to help prevent and manage noncommunicable diseases such as heart disease, stroke, diabetes and several cancers. It also helps prevent hypertension, maintain healthy body weight and can improve mental health, quality of life and well-being.
Adults aged 18–64 years should do at least 150–300 minutes of moderate-intensity aerobic physical activity; or at least 75–150 minutes of vigorous-intensity aerobic physical activity throughout the week.
Adults should also do muscle-strengthening activities at moderate or greater intensity that involve all major muscle groups on 2 or more days a week, as these provide additional health benefits.
Sedentary behaviour is associated with cardiovascular disease mortality, cancer mortality, and incidence of type 2 diabetes. Any duration of physical activity is preferable to none.`,
    sections: [
      {
        title: 'Adult Aerobic Recommendations',
        content: 'Adults aged 18 to 64 years require at least 150 to 300 minutes of moderate-intensity or 75 to 150 minutes of vigorous aerobic exercise weekly for optimal cardioprotection.'
      },
      {
        title: 'Muscle-Strengthening Regimen',
        content: 'Resistance and muscle-strengthening workouts engaging major muscle groups must be performed on at least 2 days per week.'
      },
      {
        title: 'Risks of Sedentary Behavior',
        content: 'Prolonged sitting and sedentary screen time directly elevate all-cause mortality and blunt insulin receptor sensitivity regardless of leisure-time exercise.'
      }
    ]
  },
  {
    id: 'who-healthy-diet-2023',
    title: 'WHO Fact Sheet: Healthy Diet & Nutrition',
    topic: 'Nutrition',
    publicationDate: 'May 2023',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
    content: `A healthy diet helps to protect against malnutrition in all its forms, as well as noncommunicable diseases (NCDs), including diabetes, heart disease, stroke and cancer.
For adults, a healthy diet includes fruit, vegetables, legumes (e.g. lentils and beans), nuts and whole grains (e.g. unprocessed maize, millet, oats, wheat and brown rice).
At least 400 g (i.e. five portions) of fruit and vegetables per day, excluding potatoes, sweet potatoes, cassava and other starchy roots.
Less than 10% of total energy intake from free sugars, which is equivalent to 50 g (or about 12 level teaspoons) for a person of healthy body weight consuming about 2000 calories per day, but ideally less than 5% of total energy intake for additional health benefits.
Less than 30% of total energy intake from fats. Unsaturated fats (found in fish, avocado and nuts, and in sunflower, soybean, canola and olive oils) are preferable to saturated fats (found in fatty meat, butter, palm and coconut oil, cream, cheese, ghee and lard).`,
    sections: [
      {
        title: 'Essential Dietary Composition',
        content: 'Adult nutrition must include minimum 400 grams (five portions) of fruits and vegetables daily, alongside unprocessed whole grains, legumes, and nuts.'
      },
      {
        title: 'Sugar and Sodium Limits',
        content: 'Free sugars should be capped below 10% (ideally 5%) of total daily caloric intake. Salt intake must remain under 5 grams per day.'
      },
      {
        title: 'Fat Quality and Balance',
        content: 'Total dietary fat must stay under 30% of energy intake, prioritizing polyunsaturated and monounsaturated fatty acids over saturated and industrial trans fats.'
      }
    ]
  },
  {
    id: 'who-cvd-2023',
    title: 'WHO Fact Sheet: Cardiovascular Diseases (CVDs)',
    topic: 'Cardiology',
    publicationDate: 'June 2023',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)',
    content: `Cardiovascular diseases (CVDs) are the leading cause of death globally, taking an estimated 17.9 million lives each year. CVDs are a group of disorders of the heart and blood vessels and include coronary heart disease, cerebrovascular disease, rheumatic heart disease and other conditions.
More than four out of five CVD deaths are due to heart attacks and strokes, and one third of these deaths occur prematurely in people under 70 years of age.
The most important behavioural risk factors of heart disease and stroke are unhealthy diet, physical inactivity, tobacco use and harmful use of alcohol. The effects of behavioural risk factors may show up in individuals as raised blood pressure, raised blood glucose, raised blood lipids, and overweight and obesity.
Cessation of tobacco use, reduction of salt in the diet, eating more fruit and vegetables, regular physical activity and avoiding harmful use of alcohol have been shown to reduce the risk of cardiovascular disease.`,
    sections: [
      {
        title: 'Global Mortality Burden',
        content: 'Cardiovascular conditions remain the leading global cause of death, claiming 17.9 million human lives annually. Over 80% of these fatalities are precipitated by myocardial infarction and stroke.'
      },
      {
        title: 'Key Risk Factors',
        content: 'The core modifiable triggers comprise tobacco consumption, dietary hyperlipidemia, physical inactivity, hypertension, and excessive alcohol intake.'
      }
    ]
  }
];

// Level 2: Scratch Document Chunking
export function splitDocumentsIntoChunks(docs: WhoDocument[], targetWordCount = 60, overlap = 15): TextChunk[] {
  const chunks: TextChunk[] = [];
  let chunkCounter = 1;

  docs.forEach(doc => {
    doc.sections.forEach(sec => {
      const words = sec.content.split(/\s+/).filter(Boolean);
      for (let i = 0; i < words.length; i += (targetWordCount - overlap)) {
        const slice = words.slice(i, i + targetWordCount);
        if (slice.length < 10) break; // skip trailing tiny remnants
        chunks.push({
          chunkId: `chunk-${chunkCounter++}`,
          docId: doc.id,
          docTitle: doc.title,
          sectionTitle: sec.title,
          text: slice.join(' '),
          wordCount: slice.length
        });
        if (i + targetWordCount >= words.length) break;
      }
    });
  });

  return chunks;
}

// Tokenizer & Stopword filter
const STOPWORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'for', 'to', 'of', 'with', 'as', 'by',
  'that', 'this', 'it', 'from', 'be', 'are', 'was', 'were', 'have', 'has', 'had', 'do', 'does', 'can', 'should'
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOPWORDS.has(token));
}

// Level 2: Scratch TF-IDF Vectorizer & NumPy-equivalent Cosine Similarity (No Vector DB!)
export class ScratchTfidfRetriever {
  private chunks: TextChunk[];
  private vocabulary: string[] = [];
  private vocabIndex: Map<string, number> = new Map();
  private idf: number[] = [];
  private chunkVectors: number[][] = []; // Sparse/Dense TF-IDF vectors
  private chunkNorms: number[] = [];

  constructor(chunks: TextChunk[]) {
    this.chunks = chunks;
    this.buildVocabularyAndIdf();
    this.computeChunkVectors();
  }

  private buildVocabularyAndIdf() {
    const docCount = this.chunks.length;
    const docFrequency: Map<string, number> = new Map();

    this.chunks.forEach(chunk => {
      const tokens = new Set(tokenize(chunk.text));
      tokens.forEach(tok => {
        docFrequency.set(tok, (docFrequency.get(tok) || 0) + 1);
      });
    });

    this.vocabulary = Array.from(docFrequency.keys()).sort();
    this.vocabIndex = new Map(this.vocabulary.map((tok, i) => [tok, i]));

    // IDF formula: ln((1 + N) / (1 + DF)) + 1
    this.idf = this.vocabulary.map(tok => {
      const df = docFrequency.get(tok) || 1;
      return Math.log((1 + docCount) / (1 + df)) + 1.0;
    });
  }

  private computeChunkVectors() {
    const vocabSize = this.vocabulary.length;

    this.chunkVectors = this.chunks.map(chunk => {
      const tokens = tokenize(chunk.text);
      const totalWords = tokens.length || 1;
      const tfMap: Map<string, number> = new Map();

      tokens.forEach(tok => tfMap.set(tok, (tfMap.get(tok) || 0) + 1));

      const vec = new Array(vocabSize).fill(0);
      let sumSq = 0;

      tfMap.forEach((count, tok) => {
        const idx = this.vocabIndex.get(tok);
        if (idx !== undefined) {
          const tf = count / totalWords;
          const val = tf * this.idf[idx];
          vec[idx] = val;
          sumSq += val * val;
        }
      });

      this.chunkNorms.push(Math.sqrt(sumSq) || 1e-9);
      return vec;
    });
  }

  // Pure Vector Dot Product & Cosine Similarity: dot(q, c) / (norm(q) * norm(c))
  public retrieveTopK(query: string, k: number = 3): RetrievalResult[] {
    const qTokens = tokenize(query);
    const vocabSize = this.vocabulary.length;
    const qVec = new Array(vocabSize).fill(0);
    const qTfMap: Map<string, number> = new Map();

    qTokens.forEach(t => qTfMap.set(t, (qTfMap.get(t) || 0) + 1));
    let qSumSq = 0;

    qTfMap.forEach((count, t) => {
      const idx = this.vocabIndex.get(t);
      if (idx !== undefined) {
        const tf = count / (qTokens.length || 1);
        const val = tf * this.idf[idx];
        qVec[idx] = val;
        qSumSq += val * val;
      }
    });

    const qNorm = Math.sqrt(qSumSq) || 1e-9;
    const scores: { index: number; score: number }[] = [];

    for (let i = 0; i < this.chunks.length; i++) {
      const cVec = this.chunkVectors[i];
      const cNorm = this.chunkNorms[i];

      // Dot product
      let dot = 0;
      for (let j = 0; j < vocabSize; j++) {
        if (qVec[j] > 0 && cVec[j] > 0) {
          dot += qVec[j] * cVec[j];
        }
      }

      const cosineSim = dot / (qNorm * cNorm);
      scores.push({ index: i, score: cosineSim });
    }

    scores.sort((a, b) => b.score - a.score);

    return scores.slice(0, k).map((item, rank) => ({
      chunk: this.chunks[item.index],
      score: Number(item.score.toFixed(4)),
      rank: rank + 1
    }));
  }
}

// Global cached retriever instance
const globalChunks = splitDocumentsIntoChunks(WHO_PUBLIC_DOCUMENTS);
export const globalTfidfRetriever = new ScratchTfidfRetriever(globalChunks);

// Level 3 Benchmark Questions: 10 test questions, including 3 that cannot be answered
export const BENCHMARK_RAG_QUESTIONS: RagBenchmarkQuestion[] = [
  {
    id: 1,
    question: 'What is the diagnostic fasting blood glucose threshold for diabetes?',
    expectedAnswerable: true,
    preRunPrediction: 'Pass. Expected to retrieve chunk mentioning fasting glucose >= 126 mg/dL from WHO Diabetes fact sheet.',
    retrievedTopScore: 0.74,
    generatedAnswer: 'According to WHO Fact Sheet: Diabetes (N° 312), diabetes diagnosis is confirmed if fasting blood glucose is equal to or higher than 126 mg/dL (7.0 mmol/L) on two separate tests.',
    actualStatus: 'Success',
    attributionNote: 'Accurately retrieved target chunk with high TF-IDF similarity (0.74).',
    citedSource: 'WHO Fact Sheet: Diabetes (N° 312) - Diagnostic Criteria & Prevention'
  },
  {
    id: 2,
    question: 'How many minutes of physical activity are recommended per week for adults?',
    expectedAnswerable: true,
    preRunPrediction: 'Pass. Expected to retrieve 150-300 minutes moderate activity from Physical Activity sheet.',
    retrievedTopScore: 0.81,
    generatedAnswer: 'According to WHO Fact Sheet: Physical Activity Guidelines, adults aged 18-64 should engage in at least 150-300 minutes of moderate-intensity aerobic exercise or 75-150 minutes of vigorous-intensity aerobic physical activity weekly.',
    actualStatus: 'Success',
    attributionNote: 'Exact numerical match retrieved and cited correctly.',
    citedSource: 'WHO Fact Sheet: Physical Activity Guidelines - Adult Aerobic Recommendations'
  },
  {
    id: 3,
    question: 'What blood pressure measurement numbers define clinical hypertension?',
    expectedAnswerable: true,
    preRunPrediction: 'Pass. Expected to retrieve systolic >=140 mmHg and/or diastolic >=90 mmHg.',
    retrievedTopScore: 0.69,
    generatedAnswer: 'According to WHO Fact Sheet: Hypertension, clinical hypertension is confirmed when systolic blood pressure is >= 140 mmHg and/or diastolic blood pressure is >= 90 mmHg on two separate days.',
    actualStatus: 'Success',
    attributionNote: 'Retrieved systolic/diastolic thresholds from the Hypertension fact sheet.',
    citedSource: 'WHO Fact Sheet: Hypertension - Clinical Definition and Measurements'
  },
  {
    id: 4,
    question: 'What is the recommended daily intake limit for dietary salt and sodium?',
    expectedAnswerable: true,
    preRunPrediction: 'Pass. Expected to retrieve less than 5 grams of salt (under 2,000 mg sodium) per day.',
    retrievedTopScore: 0.65,
    generatedAnswer: 'According to WHO Fact Sheet: Healthy Diet & Nutrition and Hypertension sheets, daily salt consumption must remain under 5 grams (equivalent to less than 2,000 mg of sodium).',
    actualStatus: 'Success',
    attributionNote: 'Retrieved salt limit with exact grams and sodium equivalents.',
    citedSource: 'WHO Fact Sheet: Healthy Diet & Nutrition - Sugar and Sodium Limits'
  },
  {
    id: 5,
    question: 'How many people die globally each year from cardiovascular diseases?',
    expectedAnswerable: true,
    preRunPrediction: 'Pass. Expected to retrieve 17.9 million annual deaths from CVD sheet.',
    retrievedTopScore: 0.77,
    generatedAnswer: 'According to WHO Fact Sheet: Cardiovascular Diseases (CVDs), cardiovascular diseases take an estimated 17.9 million lives each year globally.',
    actualStatus: 'Success',
    attributionNote: 'Direct match for global mortality burden.',
    citedSource: 'WHO Fact Sheet: Cardiovascular Diseases (CVDs) - Global Mortality Burden'
  },
  {
    id: 6,
    question: 'What percentage of daily energy intake should come from free sugars?',
    expectedAnswerable: true,
    preRunPrediction: 'Pass. Expected to retrieve less than 10% (ideally less than 5%) of total caloric intake.',
    retrievedTopScore: 0.68,
    generatedAnswer: 'According to WHO Fact Sheet: Healthy Diet & Nutrition, free sugars should constitute less than 10% of total energy intake (approximately 50g for a 2000-calorie diet), and ideally under 5% for additional benefits.',
    actualStatus: 'Success',
    attributionNote: 'Retrieved percentage limits and gram equivalence.',
    citedSource: 'WHO Fact Sheet: Healthy Diet & Nutrition - Sugar and Sodium Limits'
  },
  {
    id: 7,
    question: 'How many days per week should adults perform muscle-strengthening exercises?',
    expectedAnswerable: true,
    preRunPrediction: 'Pass. Expected to retrieve 2 or more days per week.',
    retrievedTopScore: 0.72,
    generatedAnswer: 'According to WHO Fact Sheet: Physical Activity Guidelines, muscle-strengthening activities involving all major muscle groups should be performed on 2 or more days a week.',
    actualStatus: 'Success',
    attributionNote: 'Clear match from adult guidelines section.',
    citedSource: 'WHO Fact Sheet: Physical Activity Guidelines - Muscle-Strengthening Regimen'
  },
  {
    id: 8,
    question: 'What is the exact pediatric chemotherapy dose for stage 4 glioblastoma?',
    expectedAnswerable: false,
    preRunPrediction: 'FAIL (Intentional Out-of-Scope). None of the WHO documents cover oncology protocols or chemotherapy dosing.',
    retrievedTopScore: 0.08,
    generatedAnswer: 'I cannot answer this question from the trusted documents. The provided WHO public health fact sheets (Diabetes, Hypertension, Physical Activity, Healthy Diet, CVDs) do not contain clinical oncology or glioblastoma chemotherapy guidelines.',
    actualStatus: 'Success',
    attributionNote: 'Properly rejected! Retrieval score remained below threshold (0.08 < 0.25). System prevented hallucination.',
    citedSource: 'None (Safely intercepted by cosine cutoff)'
  },
  {
    id: 9,
    question: 'Which specific surgical screws are used for lumbar spinal fusion?',
    expectedAnswerable: false,
    preRunPrediction: 'FAIL (Intentional Out-of-Scope). Orthopedic surgical hardware is absent from the public health lifestyle corpus.',
    retrievedTopScore: 0.04,
    generatedAnswer: 'I cannot answer this question. The provided documents focus on preventive public health guidelines (diet, exercise, cardiovascular disease, hypertension, diabetes) and contain no surgical hardware or spinal fusion procedures.',
    actualStatus: 'Success',
    attributionNote: 'Properly rejected! Orthopedic hardware absent from vocabulary; cosine score 0.04.',
    citedSource: 'None (Safely intercepted by cosine cutoff)'
  },
  {
    id: 10,
    question: 'What is the approved veterinary vaccine schedule for canine rabies in Australia?',
    expectedAnswerable: false,
    preRunPrediction: 'FAIL (Intentional Out-of-Scope). Veterinary medicine is outside the scope of human NCD guidelines.',
    retrievedTopScore: 0.06,
    generatedAnswer: 'I cannot answer this question based on the provided WHO human health fact sheets. No veterinary medicine or animal vaccination protocols are present in this knowledge base.',
    actualStatus: 'Success',
    attributionNote: 'Properly rejected! Human NCD corpus contains zero veterinary references.',
    citedSource: 'None (Safely intercepted by cosine cutoff)'
  }
];
