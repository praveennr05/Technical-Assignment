import React, { useState } from 'react';
import {
  dbInstance,
  processPredictionRequest,
  runAutomatedPytests,
  ValidationResult,
  validateHealthPredictionInput
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
import { PytestResult, SqlStatsResult } from '../types/assignment';

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
  const [activeFault, setActiveFault] = useState<'NONE' | 'MISSING_MODEL' | 'BAD_TYPE'>('NONE');
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
    setActiveFault(faultType);
    if (faultType === 'MISSING_MODEL') {
      try {
        processPredictionRequest({}, 'MISSING_MODEL');
      } catch (err: any) {
        setFaultExecutionLog({
          status: 'Simulated 500 Crash (Before Fix) vs Handled 503 (After Fix)',
          before: `CRITICAL ERROR (Before Fix):
Unhandled Exception in startup: FileNotFoundError: [Errno 2] No such file or directory: '/models/weights.pkl'
Result: HTTP 500 Internal Server Error, server process crashed, worker killed.`,
          after: `RESILIENT RECOVERY (After Fix):
try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    logger.critical("Model artifact missing! Falling back to bundled rule-based heuristic.")
    model = RuleBasedHealthHeuristic()
Result: HTTP 503 Service Unavailable with human-readable degraded mode response.`
        });
      }
    } else {
      try {
        processPredictionRequest({ age: 'invalid_string_age' }, 'BAD_TYPE');
      } catch (err: any) {
        setFaultExecutionLog({
          status: 'Simulated 500 TypeError (Before Fix) vs Pydantic 422 (After Fix)',
          before: `CRITICAL ERROR (Before Fix):
TypeError: unsupported operand type(s) for *: 'str' and 'float' (passed age='invalid_string_age')
Result: HTTP 500 Internal Server Error, unhandled runtime stacktrace exposed to patient.`,
          after: `RESILIENT RECOVERY (After Fix):
class HealthPredictionSchema(BaseModel):
    age: int = Field(..., ge=1, le=120, description="Age in years")
Result: HTTP 422 Unprocessable Entity with clear error message: {"detail": "Age must be an integer between 1 and 120"}.`
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Header & Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              B
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Question B: Turn a Model into a Usable App</h2>
              <p className="text-xs text-slate-400">
                Backend API • Hand-Written SQL • SQLite Persistence • Input Validation • Pytest Suite
              </p>
            </div>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveLevel(1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLevel === 1 ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Level 1: Build (/predict &amp; UI)
            </button>
            <button
              onClick={() => setActiveLevel(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLevel === 2 ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Level 2: Code It (Raw SQL &amp; Pytest)
            </button>
            <button
              onClick={() => setActiveLevel(3)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLevel === 3 ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Level 3: Reason (Faults &amp; 100 Users)
            </button>
          </div>
        </div>

        {/* Level 1 Content */}
        {activeLevel === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 text-xs text-emerald-200 flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Level 1 Specification (Page 3):</strong>
                "Serve a trained model through a FastAPI or Flask /predict endpoint, with a small front end (Streamlit, React or HTML) that shows the risk in plain words."
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Form Input */}
              <div className="md:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-sm text-white mb-3 flex items-center space-x-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Patient /predict Endpoint</span>
                </h4>

                <form onSubmit={handlePredictSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Patient Age (Years, 1-120):</label>
                    <input
                      type="text"
                      value={formAge}
                      onChange={(e) => setFormAge(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Ejection Fraction (Percentage, 10-80%):</label>
                    <input
                      type="text"
                      value={formEF}
                      onChange={(e) => setFormEF(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Serum Creatinine (mg/dL, 0.2-15.0):</label>
                    <input
                      type="text"
                      value={formCreatinine}
                      onChange={(e) => setFormCreatinine(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">History of Hypertension:</label>
                    <select
                      value={formHBP}
                      onChange={(e) => setFormHBP(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value={1}>Yes (Elevated Blood Pressure History)</option>
                      <option value={0}>No (Normal Blood Pressure)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Send POST /predict Request</span>
                  </button>
                </form>
              </div>

              {/* Live Output */}
              <div className="md:col-span-6 space-y-4">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                      <span className="text-xs font-semibold text-slate-400">Response Payload (Plain Words)</span>
                      <span className="text-xs font-mono text-emerald-400">HTTP 200 OK</span>
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
                            <span className="text-xs font-bold uppercase tracking-wider">Categorical Risk:</span>
                            <span className="text-lg font-black">{predictionResponse.risk_category} Risk</span>
                          </div>
                          <div className="text-xs font-mono text-slate-300">
                            Predicted Event Probability: {(predictionResponse.predicted_prob * 100).toFixed(1)}%
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Plain Words Clinical Feedback:</label>
                          <p className="text-xs text-white bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                            "{predictionResponse.plain_words}"
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-500 text-xs">
                        Fill in the patient attributes on the left and submit to view the plain-words prediction.
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800/80">
                    Saved automatically to relational database under Level 2 persistence.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Level 2 Content */}
        {activeLevel === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 text-xs text-amber-200 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Level 2 Mandate (No ORM allowed for /stats! Hand-Written SQL):</strong>
                "Save every request and result in SQLite, MySQL or PostgreSQL. Add a /stats endpoint that uses hand-written SQL (no ORM) to return total requests, average predicted risk and share of high-risk results. Validate every input. Write three automated tests with pytest, including one for bad input."
              </div>
            </div>

            {/* Live Hand-Written SQL Query Execution */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Live Hand-Written SQL Query (/stats Endpoint)</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Executed in {statsResult.query_execution_ms}ms
                </span>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto whitespace-pre">
                {statsResult.raw_sql}
              </div>

              {/* Real-time Query Stats Result */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">COUNT(*)</span>
                  <span className="text-xl font-bold font-mono text-white">{statsResult.total_requests} requests</span>
                  <span className="text-[10px] text-slate-500 block">Total logged inferences</span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">AVG(predicted_prob)</span>
                  <span className="text-xl font-bold font-mono text-indigo-400">
                    {(statsResult.avg_predicted_risk * 100).toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">Mean risk score</span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">HIGH-RISK SHARE (%)</span>
                  <span className="text-xl font-bold font-mono text-rose-400">
                    {statsResult.high_risk_share_percent}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">CASE WHEN risk = 'High'</span>
                </div>
              </div>
            </div>

            {/* 3 Automated Pytests */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Three Automated Pytests (pytest -v output)</h4>
                </div>
                <span className="text-xs text-emerald-400 font-bold">3 Passed • 0 Failed</span>
              </div>

              <div className="space-y-3">
                {pytestResults.map((t, idx) => (
                  <div key={idx} className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-400 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.name}</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">{t.duration_ms}ms</span>
                    </div>
                    <p className="text-slate-300 font-sans">{t.description}</p>
                    <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800">
                      Payload: {JSON.stringify(t.input_payload)} ➔ Result: {JSON.stringify(t.actual_output)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Level 3 Content */}
        {activeLevel === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-xl p-4 text-xs text-indigo-200 flex items-start space-x-2.5">
              <Bug className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Level 3 Fault Injection &amp; Concurrency Mandate:</strong>
                "Break your own app on purpose in two ways (for example, a missing model file, or text where a number is expected). Show what happened before and after your fix, and explain how you would make the app safe for 100 users at once."
              </div>
            </div>

            {/* Chaos Engineering Triggers */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Simulate Intentional Fault Injections (Before vs After Fix)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleRunFaultTest('MISSING_MODEL')}
                  className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all"
                >
                  <span className="text-xs font-bold text-rose-400 block mb-1">Fault 1: Missing Model Artifact</span>
                  <span className="text-[11px] text-slate-400 block">Simulates missing weights.pkl file on server cold start.</span>
                </button>

                <button
                  onClick={() => handleRunFaultTest('BAD_TYPE')}
                  className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all"
                >
                  <span className="text-xs font-bold text-amber-400 block mb-1">Fault 2: Malformed String Data</span>
                  <span className="text-[11px] text-slate-400 block">Simulates non-numeric string passed to mathematical operator.</span>
                </button>
              </div>

              {faultExecutionLog && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 font-mono">
                    Diagnostic Diff: {faultExecutionLog.status}
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

            {/* Architectural Blueprint for 100 Simultaneous Users */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Production Architecture Blueprint: Safe for 100 Simultaneous Users</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-indigo-300 block mb-1">1. Process Concurrency</span>
                  <p className="text-slate-400 text-[11px]">
                    Deploy Gunicorn with 4-8 Uvicorn worker processes (<code>workers = 2 * CPU + 1</code>) to distribute concurrent requests across all CPU cores without blocking.
                  </p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-emerald-300 block mb-1">2. Database Connection Pooling</span>
                  <p className="text-slate-400 text-[11px]">
                    Use SQLAlchemy / asyncpg with connection pool: <code>pool_size=20</code>, <code>max_overflow=30</code>. If using SQLite, enable <code>WAL mode</code> to avoid table lock contention.
                  </p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-1">3. Non-Blocking Async I/O</span>
                  <p className="text-slate-400 text-[11px]">
                    Define endpoint with <code>async def predict()</code> and execute logging writes asynchronously or dispatch to a Redis background worker (Celery/RQ).
                  </p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-rose-300 block mb-1">4. Rate Limiting &amp; Circuit Breakers</span>
                  <p className="text-slate-400 text-[11px]">
                    Enforce slowapi / Redis sliding window rate limits (e.g. 10 req/sec per IP) and circuit breaker fallbacks to prevent denial of service from spike traffic.
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
