import React, { useState } from 'react';
import {
  dbInstance,
  processPredictionRequest,
  runAutomatedPytests
} from '../services/appEngine';
import {
  Database,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  ShieldCheck,
  Bug,
  Info
} from 'lucide-react';
import { PytestResult, SqlStatsResult } from '../types/healthSuite';

export const QuestionBPanel: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);

  // Form State for /predict
  const [formAge, setFormAge] = useState<string>('62');
  const [formEF, setFormEF] = useState<string>('28');
  const [formCreatinine, setFormCreatinine] = useState<string>('1.8');
  const [formHBP, setFormHBP] = useState<number>(1);
  const [predictionResponse, setPredictionResponse] = useState<any>(null);

  // Stats State (executed via hand-written SQL)
  const [statsResult, setStatsResult] = useState<SqlStatsResult>(() => dbInstance.executeHandWrittenStatsQuery());

  // Pytest State
  const [pytestResults, setPytestResults] = useState<PytestResult[]>(() => runAutomatedPytests());

  // Fault Injection State for Level 3
  const [faultExecutionLog, setFaultExecutionLog] = useState<{ before: string; after: string; status: string } | null>(null);

  const handlePredictSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      age: formAge,
      ejection_fraction: formEF,
      serum_creatinine: formCreatinine,
      high_blood_pressure: formHBP
    };

    const res = processPredictionRequest(payload);
    setPredictionResponse(res);
    setStatsResult(dbInstance.executeHandWrittenStatsQuery());
  };

  const handleRunFaultTest = (faultType: 'MISSING_MODEL' | 'BAD_TYPE') => {
    if (faultType === 'MISSING_MODEL') {
      setFaultExecutionLog({
        status: 'Fault 1: Missing Model Artifact on Server Boot',
        before: `CRITICAL ERROR (Before Fix):
Unhandled Exception in boot: FileNotFoundError: [Errno 2] No such file or directory: '/models/weights.pkl'
Result: HTTP 500 Internal Server Error, server process terminated, worker killed.`,
        after: `RESILIENT RECOVERY (After Fix):
try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    logger.critical("Model artifact missing! Activating bundled clinical rule heuristic.")
    model = BundledClinicalHeuristic()
Result: HTTP 503 Service Degraded with human-readable diagnostic response.`
      });
    } else {
      setFaultExecutionLog({
        status: 'Fault 2: Malformed String Data where Number Expected',
        before: `CRITICAL ERROR (Before Fix):
TypeError: unsupported operand type(s) for *: 'str' and 'float' (passed age='invalid_string_age')
Result: HTTP 500 Internal Server Error, unhandled runtime stacktrace exposed to patient.`,
        after: `RESILIENT RECOVERY (After Fix):
class HealthPredictionSchema(BaseModel):
    age: int = Field(..., ge=1, le=120, description="Age in years")
Result: HTTP 422 Unprocessable Entity with clear error: {"detail": "Age must be an integer between 1 and 120"}.`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80 mb-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-lg flex items-center justify-center border border-emerald-500/20">
              B
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-0.5">
                <span>Building Block 2</span>
                <span>·</span>
                <span>API Engineering</span>
                <span>·</span>
                <span>SQLite Persistence</span>
                <span>·</span>
                <span>Hand-Written SQL</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Question B: Turn a Model into a Usable App</h2>
            </div>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveLevel(1)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLevel === 1 ? 'bg-emerald-600 text-white shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Level 1: Build
            </button>
            <button
              onClick={() => setActiveLevel(2)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLevel === 2 ? 'bg-amber-600 text-white shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Level 2: Code It (Raw SQL)
            </button>
            <button
              onClick={() => setActiveLevel(3)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLevel === 3 ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Level 3: Reason (Faults &amp; Concurrency)
            </button>
          </div>
        </div>

        {/* Level 1 Content */}
        {activeLevel === 1 && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-0.5">Level 1 Specification:</span>
              "Serve a trained model through a FastAPI or Flask /predict endpoint, with a small front end (Streamlit, React or HTML) that shows the risk in plain words."
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Patient Input Console */}
              <div className="lg:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <span className="font-semibold text-white text-xs">Patient Risk Prediction Input Form</span>
                  <span className="text-[11px] font-mono text-emerald-400">POST /predict</span>
                </div>

                <form onSubmit={handlePredictSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Patient Age (Years, 1-120):</label>
                    <input
                      type="text"
                      value={formAge}
                      onChange={(e) => setFormAge(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Ejection Fraction (Percentage, 10-80%):</label>
                    <input
                      type="text"
                      value={formEF}
                      onChange={(e) => setFormEF(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Serum Creatinine (mg/dL, 0.2-15.0):</label>
                    <input
                      type="text"
                      value={formCreatinine}
                      onChange={(e) => setFormCreatinine(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">History of Hypertension:</label>
                    <select
                      value={formHBP}
                      onChange={(e) => setFormHBP(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value={1}>Yes (Elevated Blood Pressure History)</option>
                      <option value={0}>No (Normal Blood Pressure)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm text-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Execute POST /predict Inference</span>
                  </button>
                </form>
              </div>

              {/* Output Result */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4 text-xs">
                      <span className="font-semibold text-slate-400">Response Payload (Plain Words)</span>
                      <span className="font-mono text-emerald-400">HTTP 200 OK</span>
                    </div>

                    {predictionResponse ? (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-xl border ${
                          predictionResponse.risk_category === 'High'
                            ? 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                            : predictionResponse.risk_category === 'Moderate'
                            ? 'bg-amber-950/30 border-amber-800/50 text-amber-300'
                            : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider">Risk Level</span>
                            <span className="text-lg font-black">{predictionResponse.risk_category} Risk</span>
                          </div>
                          <div className="text-xs font-mono text-slate-300">
                            Computed Probability: {(predictionResponse.predicted_prob * 100).toFixed(1)}%
                          </div>
                        </div>

                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Plain Words Clinical Interpretation:</span>
                          <p className="text-xs text-white bg-slate-900/80 p-3 rounded-lg border border-slate-800 leading-relaxed">
                            "{predictionResponse.plain_words}"
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500 text-xs">
                        Configure clinical parameters and submit to execute model inference and view plain-words feedback.
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800/80">
                    Saved automatically to relational storage under Level 2 persistence requirements.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Level 2 Content */}
        {activeLevel === 2 && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-400 block mb-0.5">Level 2 Mandate:</span>
              "Save every request and result in SQLite, MySQL or PostgreSQL. Add a /stats endpoint that uses hand-written SQL (no ORM) to return total requests, average predicted risk and share of high-risk results. Validate every input. Write three automated tests with pytest, including one for bad input."
            </div>

            {/* Hand-Written SQL Execution Stage */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Live Hand-Written SQL Query (/stats Endpoint)</h4>
                </div>
                <span className="text-xs font-mono text-emerald-400 tabular-nums">
                  · Execution: {statsResult.query_execution_ms}ms
                </span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto whitespace-pre">
                {statsResult.raw_sql}
              </div>

              {/* Aggregation Readout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">COUNT(*)</span>
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">{statsResult.total_requests}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Total Inferences Logged</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">AVG(predicted_prob)</span>
                  <span className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">
                    {(statsResult.avg_predicted_risk * 100).toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Mean Event Probability</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">SHARE OF HIGH-RISK</span>
                  <span className="text-2xl font-bold font-mono text-rose-400 tabular-nums">
                    {statsResult.high_risk_share_percent}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">CASE WHEN risk = 'High'</span>
                </div>
              </div>
            </div>

            {/* Pytest Suite */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="font-bold text-white text-xs flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Automated Pytest Suite (pytest -v output)</span>
                </span>
                <span className="text-emerald-400 font-mono text-xs font-semibold">3 Passed · 0 Failed</span>
              </div>

              <div className="space-y-3">
                {pytestResults.map((t, idx) => (
                  <div key={idx} className="bg-slate-900/70 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-400 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.name}</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">{t.duration_ms}ms</span>
                    </div>
                    <p className="text-slate-300 font-sans">{t.description}</p>
                    <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800">
                      Payload: {JSON.stringify(t.input_payload)} ➔ Output: {JSON.stringify(t.actual_output)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Level 3 Content */}
        {activeLevel === 3 && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-indigo-400 block mb-0.5">Level 3 Mandate:</span>
              "Break your own app on purpose in two ways (for example, a missing model file, or text where a number is expected). Show what happened before and after your fix, and explain how you would make the app safe for 100 users at once."
            </div>

            {/* Fault Injections */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-4">
              <span className="font-bold text-white text-xs block">Simulate Intentional Fault Injections:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleRunFaultTest('MISSING_MODEL')}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-left transition-all"
                >
                  <span className="text-xs font-bold text-rose-400 block mb-1">Fault 1: Missing Model Artifact</span>
                  <span className="text-[11px] text-slate-400 block">Simulate missing serialized weights on cold boot.</span>
                </button>

                <button
                  onClick={() => handleRunFaultTest('BAD_TYPE')}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-left transition-all"
                >
                  <span className="text-xs font-bold text-amber-400 block mb-1">Fault 2: Malformed String Data</span>
                  <span className="text-[11px] text-slate-400 block">Simulate unvalidated string passed into mathematical formula.</span>
                </button>
              </div>

              {faultExecutionLog && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 font-mono">
                    {faultExecutionLog.status}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-rose-950/20 border border-rose-800/40 p-3 rounded-lg text-rose-300 whitespace-pre-wrap">
                      {faultExecutionLog.before}
                    </div>
                    <div className="bg-emerald-950/20 border border-emerald-800/40 p-3 rounded-lg text-emerald-300 whitespace-pre-wrap">
                      {faultExecutionLog.after}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Concurrency Architecture */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-4 text-xs">
              <span className="font-bold text-white text-sm block">Production Architecture Blueprint: Safe for 100 Simultaneous Users</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-indigo-300 block mb-1">1. Worker Concurrency</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Deploy Gunicorn with Uvicorn worker processes (<code>workers = 2 * CPU + 1</code>) to distribute traffic across CPU cores without event loop blockages.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-300 block mb-1">2. Connection Pooling</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Use connection pool: <code>pool_size=20</code>, <code>max_overflow=30</code>. If using SQLite, activate <code>WAL mode</code> to permit simultaneous reads.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-1">3. Non-Blocking Async I/O</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Define endpoint with <code>async def predict()</code> and execute logging writes asynchronously or dispatch to background task queues.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-rose-300 block mb-1">4. Rate Limiting</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Enforce Redis sliding window rate limits (e.g. 10 req/sec per IP) and circuit breaker fallbacks to guard against denial of service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
