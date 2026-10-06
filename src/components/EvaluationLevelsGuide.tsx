import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Code2,
  Brain,
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  candidateSeed: string;
  activeQuestion?: 'A' | 'B' | 'C' | 'D';
}

export const EvaluationLevelsGuide: React.FC<Props> = ({ candidateSeed, activeQuestion }) => {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 'all'>('all');

  const levelsData = [
    {
      level: 'Level 1: Build',
      levelNum: 1,
      whatItTests: 'Can you get a working result?',
      rules: 'Any library allowed',
      tagline: 'Working baseline result using standard packages',
      bannedForLevel2: 'N/A (Any library permitted)',
      questionImplementations: {
        A: 'scikit-learn LogisticRegression & RandomForest on UCI Heart Data with Seed S',
        B: 'FastAPI /predict endpoint with React/Streamlit UI displaying plain words',
        C: 'RAG pipeline over 5 WHO fact sheets with mandatory source citations',
        D: 'OpenCV & MediaPipe pose rep tracking baseline'
      }
    },
    {
      level: 'Level 2: Code it yourself',
      levelNum: 2,
      whatItTests: 'Do you understand how it works inside?',
      rules: 'Write the named part from scratch; the named libraries are not allowed for that part',
      tagline: 'Pure first-principles mathematical or raw driver implementation',
      bannedForLevel2: 'scikit-learn (Q-A) / ORMs like SQLAlchemy (Q-B) / Vector DBs like Chroma/FAISS (Q-C) / Prebuilt angle APIs (Q-D)',
      questionImplementations: {
        A: 'Pure NumPy sigmoid, BCE loss, gradient descent, custom confusion matrix, top-3 weights comparison',
        B: 'SQLite persistence + hand-written raw SQL for /stats (no ORM) + input bounds validation + 3 pytests',
        C: 'Custom sliding-window chunking, scratch TF-IDF vocabulary, NumPy cosine similarity (no vector DB)',
        D: 'Scratch 3-point vector angle math, moving-average filter, dual-threshold hysteresis state machine'
      }
    },
    {
      level: 'Level 3: Reason with your results',
      levelNum: 3,
      whatItTests: 'Can you think about what your own system did?',
      rules: 'Predict first, then test, then explain using your own numbers',
      tagline: 'Pre-run hypothesis committed to Git before testing, evaluated with candidate seed S',
      bannedForLevel2: 'Unverified guesses or running tests before committing predictions',
      questionImplementations: {
        A: 'Predict precision drop before threshold sweep to Recall >= 0.90; test with seed S; explain screening tradeoff',
        B: 'Break app on purpose in 2 modes (missing model, bad string type); verify before/after fixes; 100-user concurrency plan',
        C: 'Formulate 10 test questions (3 unanswerable); predict failures before run; attribute root-cause (retrieval vs LLM)',
        D: 'Record 3 videos (1 bad form); predict rep counts prior to processing; compare predicted vs counted vs actual; analyze threshold tuning'
      }
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      {/* Title & Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight flex items-center space-x-2">
              <span>Three-Tier Evaluation Framework</span>
              <span className="text-xs font-mono text-emerald-400">
                · Page 2 Mandate
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Every question must satisfy all 3 levels. Seed <strong className="text-white font-mono">S = {candidateSeed}</strong> guarantees your unique numbers.
            </p>
          </div>
        </div>

        {/* Level filter tabs */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedLevel === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All 3 Levels
          </button>
          <button
            onClick={() => setSelectedLevel(1)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedLevel === 1 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 1
          </button>
          <button
            onClick={() => setSelectedLevel(2)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedLevel === 2 ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 2
          </button>
          <button
            onClick={() => setSelectedLevel(3)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedLevel === 3 ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 3
          </button>
        </div>
      </div>

      {/* The Exact Table from the Document */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-3.5 w-1/4">Level</th>
              <th className="p-3.5 w-1/3">What it tests</th>
              <th className="p-3.5 w-5/12">Rules</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-sans">
            {levelsData
              .filter(l => selectedLevel === 'all' || l.levelNum === selectedLevel)
              .map((row) => (
                <tr key={row.levelNum} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5 align-top">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${
                        row.levelNum === 1 ? 'bg-blue-400' : row.levelNum === 2 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`} />
                      <strong className="text-white font-semibold">{row.level}</strong>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      {row.tagline}
                    </span>
                  </td>

                  <td className="p-3.5 text-slate-200 align-top leading-relaxed">
                    <span className="font-medium text-white">{row.whatItTests}</span>
                    {activeQuestion && (
                      <div className="mt-2 text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800/80">
                        <strong className="text-indigo-300">Question {activeQuestion}:</strong>{' '}
                        {row.questionImplementations[activeQuestion]}
                      </div>
                    )}
                  </td>

                  <td className="p-3.5 align-top leading-relaxed">
                    <span className={`inline-block font-medium ${
                      row.levelNum === 2 ? 'text-amber-300' : row.levelNum === 3 ? 'text-emerald-300' : 'text-slate-300'
                    }`}>
                      {row.rules}
                    </span>
                    {row.levelNum === 2 && (
                      <div className="mt-1.5 text-[11px] text-rose-300/90 font-mono">
                        Banned: {row.bannedForLevel2}
                      </div>
                    )}
                    {row.levelNum === 3 && (
                      <div className="mt-1.5 text-[11px] text-emerald-400 font-mono">
                        Verification: Git commit timestamp proof before test run
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Seed Formula Reminder below Table (Exact text from image) */}
      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Your personal seed:</strong> Let <code className="text-emerald-400 font-mono font-bold">S</code> be the last four digits of your USN (<code className="text-white font-mono">{candidateSeed}</code>). Use S in every train/test split and every model so your numbers differ from everyone else's.
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Strict Anti-Duplicate Clause Enforced
        </span>
      </div>
    </div>
  );
};
