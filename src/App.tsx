import React, { useState, useMemo } from 'react';
import {
  RAW_DOCUMENT_LINES,
  SECTIONS_OVERVIEW,
  ASSIGNMENT_METADATA,
  DocumentLine
} from './data/assignmentDocument';
import { generateReadme, generatePersonalIntelligence } from './data/templates';
import {
  generatePythonLevel1A,
  generatePythonLevel2A,
  generatePythonFastApiApp
} from './services/pythonGenerator';
import { QuestionAPanel } from './components/QuestionAPanel';
import { QuestionBPanel } from './components/QuestionBPanel';
import { QuestionCPanel } from './components/QuestionCPanel';
import { QuestionDPanel } from './components/QuestionDPanel';
import { GitChecklist } from './components/GitChecklist';
import {
  FileText,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Cpu,
  Clock,
  Mail,
  Video,
  GitBranch,
  Layers,
  Search,
  Copy,
  Check,
  Activity,
  Database,
  Award,
  Terminal,
  ChevronRight,
  ListOrdered,
  Download,
  FolderGit2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'question_a' | 'question_b' | 'question_c' | 'question_d' | 'workbench' | 'reader' | 'submission'
  >('overview');

  // Candidate Profile State
  const [candidateName, setCandidateName] = useState('Praveen N R');
  const [usn, setUsn] = useState('1MS21AI042');
  const [question1, setQuestion1] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [question2, setQuestion2] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Line Reader State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImportance, setSelectedImportance] = useState<string>('all');
  const [selectedPage, setSelectedPage] = useState<number | 'all'>('all');
  const [selectedLine, setSelectedLine] = useState<DocumentLine | null>(RAW_DOCUMENT_LINES[2]);

  // Personal Seed S: Last 4 digits of USN
  const computedSeed = useMemo(() => {
    const digits = usn.replace(/\D/g, '');
    if (digits.length >= 4) {
      return digits.slice(-4);
    }
    return usn.slice(-4).padStart(4, '0');
  }, [usn]);

  const chosenQuestions = useMemo(() => {
    const set = new Set([question1, question2]);
    return Array.from(set) as ('A' | 'B' | 'C' | 'D')[];
  }, [question1, question2]);

  const filteredLines = useMemo(() => {
    return RAW_DOCUMENT_LINES.filter(line => {
      if (selectedPage !== 'all' && line.page !== selectedPage) return false;
      if (selectedCategory !== 'all' && line.category !== selectedCategory) return false;
      if (selectedImportance !== 'all' && line.importance !== selectedImportance) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          line.text.toLowerCase().includes(q) ||
          line.section.toLowerCase().includes(q) ||
          (line.annotation && line.annotation.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedPage, selectedCategory, selectedImportance, searchQuery]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  AI for Personal Health and Wellness
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ALL 4 BLOCKS IMPLEMENTED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Candidate: <strong className="text-slate-200">{candidateName}</strong> ({usn}) • Deterministic Seed: <strong className="text-emerald-400 font-mono">S = {computedSeed}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Deadline: 6 Oct 2026, 5:00 PM IST</span>
            </div>
            <button
              onClick={() => setActiveTab('workbench')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center space-x-1.5"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Project Deliverables</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 border-t border-slate-800/60 overflow-x-auto scrollbar-none text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Overview &amp; Scenario</span>
          </button>

          <button
            onClick={() => setActiveTab('question_a')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'question_a'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center">A</span>
            <span>Block A: Risk Predictor</span>
          </button>

          <button
            onClick={() => setActiveTab('question_b')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'question_b'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center">B</span>
            <span>Block B: Usable App</span>
          </button>

          <button
            onClick={() => setActiveTab('question_c')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'question_c'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-4 h-4 rounded bg-purple-500/20 text-purple-400 text-[10px] font-bold flex items-center justify-center">C</span>
            <span>Block C: Trusted Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('question_d')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'question_d'
                ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-4 h-4 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center">D</span>
            <span>Block D: Exercise Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('workbench')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'workbench'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Code &amp; Deliverables Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('reader')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'reader'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>Line-by-Line Document</span>
          </button>

          <button
            onClick={() => setActiveTab('submission')}
            className={`py-2.5 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'submission'
                ? 'border-rose-500 text-rose-400 bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Submission &amp; Audit</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Mission Hero */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                  Health-Tech Team Startup Scenario • Production Implementation
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Building Practical AI Tools for Personal Health
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  "A small health-tech team needs four building blocks: a risk predictor, an app that uses it, a trusted question-answering assistant, and an exercise tracker."
                  While the exam allows answering any 2, <strong className="text-indigo-400">all four full modules</strong> have been constructed and executed below with their complete 3 levels!
                </p>

                {/* Candidate Seed Quick Config */}
                <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-semibold">Your USN:</span>
                    <input
                      type="text"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 font-mono text-xs w-32 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-lg text-emerald-300 font-mono">
                    Deterministic Seed: <strong>S = {computedSeed}</strong>
                  </div>

                  <span className="text-slate-500 text-[11px]">
                    (Controls train/test split, PRNG, and model weights across all modules)
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Interactive Building Blocks Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                  <span>The Four Assignment Building Blocks</span>
                </h3>
                <span className="text-xs text-slate-400">Click any block to enter its live lab</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Block A */}
                <div
                  onClick={() => setActiveTab('question_a')}
                  className="bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/5 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                      A
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      Question A • P.2
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                    Predict a Health Risk
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3">
                    UCI Heart dataset cleaning, Logistic Regression &amp; Random Forest with seed S, pure NumPy scratch sigmoid/BCE/gradient descent, and Recall ≥ 0.90 threshold sweep.
                  </p>
                  <div className="flex items-center text-xs text-blue-400 font-semibold space-x-1">
                    <span>Open Question A Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Block B */}
                <div
                  onClick={() => setActiveTab('question_b')}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-500/5 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-black text-sm flex items-center justify-center border border-emerald-500/30">
                      B
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      Question B • P.3
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    Turn a Model into a Usable App
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3">
                    FastAPI /predict endpoint, relational persistence, hand-written SQL /stats (no ORM!), 3 automated pytests, and chaos engineering fault injections.
                  </p>
                  <div className="flex items-center text-xs text-emerald-400 font-semibold space-x-1">
                    <span>Open Question B Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Block C */}
                <div
                  onClick={() => setActiveTab('question_c')}
                  className="bg-slate-900 border border-slate-800 hover:border-purple-500/60 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-500/5 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-black text-sm flex items-center justify-center border border-purple-500/30">
                      C
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      Question C • P.3
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                    Trusted Health Assistant (RAG)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3">
                    5 WHO public health factsheets, pure NumPy TF-IDF &amp; cosine similarity (no vector DB!), 10 benchmark test questions, and retrieval error attribution.
                  </p>
                  <div className="flex items-center text-xs text-purple-400 font-semibold space-x-1">
                    <span>Open Question C Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Block D */}
                <div
                  onClick={() => setActiveTab('question_d')}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-amber-500/5 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-black text-sm flex items-center justify-center border border-amber-500/30">
                      D
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      Question D • P.3
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    Track an Exercise with a Camera
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3">
                    Vector 3-point joint angle math, moving average smoothing, dual-threshold hysteresis rep state machine, and 3 candidate video evaluations.
                  </p>
                  <div className="flex items-center text-xs text-amber-400 font-semibold space-x-1">
                    <span>Open Question D Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Architectural Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Executive Assignment Rules &amp; Evaluation Philosophy</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-white block mb-1">Depth Over Superficiality</span>
                  <p className="text-slate-400">
                    "A complete answer to two questions is better than partial answers to four. Levels 2 and 3 carry more weight than Level 1."
                  </p>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-emerald-400 block mb-1">Predictions Before Results</span>
                  <p className="text-slate-400">
                    "Commit each Level 3 prediction to GitHub before you run the test. The commit time is your proof."
                  </p>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">Unique Numbers Seed S</span>
                  <p className="text-slate-400">
                    "Let S be the last four digits of your USN. Identical results in two submissions will lead to both being rejected."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BUILDING BLOCK LABS */}
        {activeTab === 'question_a' && <QuestionAPanel candidateSeed={computedSeed} />}
        {activeTab === 'question_b' && <QuestionBPanel />}
        {activeTab === 'question_c' && <QuestionCPanel />}
        {activeTab === 'question_d' && <QuestionDPanel />}

        {/* REPOSITORY WORKBENCH & CODE EXPORTER */}
        {activeTab === 'workbench' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <span>Complete Candidate Repository Suite &amp; Source Code Exporter</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                All files adhere strictly to Section 4 &amp; Section 5 requirements: customized with seed <span className="font-mono text-emerald-400 font-bold">S = {computedSeed}</span>, your 2 chosen questions, and verified syntax.
              </p>

              {/* Chosen Questions Config */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center gap-4 text-xs mb-6">
                <span className="font-semibold text-slate-300">Your Chosen 2 Questions for Submission:</span>
                <select
                  value={question1}
                  onChange={(e) => setQuestion1(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200"
                >
                  <option value="A">Question A (Predict Health Risk)</option>
                  <option value="B">Question B (Usable App / FastAPI)</option>
                  <option value="C">Question C (Trusted RAG Assistant)</option>
                  <option value="D">Question D (Exercise Tracker CV)</option>
                </select>
                <span className="text-slate-500">&amp;</span>
                <select
                  value={question2}
                  onChange={(e) => setQuestion2(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200"
                >
                  <option value="A">Question A (Predict Health Risk)</option>
                  <option value="B">Question B (Usable App / FastAPI)</option>
                  <option value="C">Question C (Trusted RAG Assistant)</option>
                  <option value="D">Question D (Exercise Tracker CV)</option>
                </select>
              </div>

              {/* Git Requirements & Compliance Checklist */}
              <div className="mb-6">
                <GitChecklist candidateSeed={computedSeed} />
              </div>

              {/* Files Accordion */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* README.md */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col h-[420px]">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                    <span className="font-bold text-xs text-white font-mono flex items-center space-x-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>README.md (Deliverable 1)</span>
                    </span>
                    <button
                      onClick={() => handleCopy(generateReadme(computedSeed, chosenQuestions), 'readme')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center space-x-1"
                    >
                      {copiedType === 'readme' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'readme' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto text-[11px] font-mono text-slate-300 whitespace-pre p-2 bg-slate-900/60 rounded">
                    {generateReadme(computedSeed, chosenQuestions)}
                  </div>
                </div>

                {/* PERSONAL_INTELLIGENCE.md */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col h-[420px]">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                    <span className="font-bold text-xs text-white font-mono flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>PERSONAL_INTELLIGENCE.md (Deliverable 3)</span>
                    </span>
                    <button
                      onClick={() => handleCopy(generatePersonalIntelligence(computedSeed, chosenQuestions), 'pi')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center space-x-1"
                    >
                      {copiedType === 'pi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'pi' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto text-[11px] font-mono text-slate-300 whitespace-pre p-2 bg-slate-900/60 rounded">
                    {generatePersonalIntelligence(computedSeed, chosenQuestions)}
                  </div>
                </div>
              </div>

              {/* Code Snippets for Real Python Repo */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Downloadable / Ready-to-Commit Python Scripts</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-white block">question_a/level2_scratch.py</span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        NumPy Logistic Regression from scratch (sigmoid, BCE loss, gradient descent, scratch confusion matrix).
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(generatePythonLevel2A(computedSeed), 'py2a')}
                      className="mt-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center space-x-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedType === 'py2a' ? 'Copied Script!' : 'Copy Script'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-white block">question_b/app/main.py</span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        FastAPI backend, SQLite persistence, and hand-written SQL /stats aggregation query.
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(generatePythonFastApiApp(computedSeed), 'pyfastapi')}
                      className="mt-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center space-x-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedType === 'pyfastapi' ? 'Copied Script!' : 'Copy Script'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-white block">Git Pre-Run Commit Command</span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Commit Level 3 prediction to GitHub BEFORE running tests as timestamp proof.
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(`git commit -m "docs: commit level 3 predictions prior to empirical runs"`, 'gitcmd')}
                      className="mt-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center space-x-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedType === 'gitcmd' ? 'Copied Command!' : 'Copy Command'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LINE-BY-LINE READER TAB */}
        {activeTab === 'reader' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <ListOrdered className="w-4 h-4 text-indigo-400" />
                    <span>Verbatim Line-by-Line Document Inspection ({filteredLines.length} / {RAW_DOCUMENT_LINES.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Search and inspect every sentence from all 5 pages.
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Page Filter:</label>
                  <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-300"
                  >
                    <option value="all">All Pages (1 to 5)</option>
                    <option value={1}>Page 1 (Why &amp; Scenario)</option>
                    <option value={2}>Page 2 (Timing, Seed &amp; Q-A)</option>
                    <option value={3}>Page 3 (Q-B, Q-C, Q-D)</option>
                    <option value={4}>Page 4 (Mandatory AI &amp; Deliverables)</option>
                    <option value={5}>Page 5 (Grading &amp; Submission)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-300"
                  >
                    <option value="all">All Categories</option>
                    <option value="rule">Rules &amp; Constraints</option>
                    <option value="question">Questions &amp; Levels</option>
                    <option value="deliverable">Deliverables</option>
                    <option value="integrity">Personal Intelligence &amp; AI</option>
                    <option value="grading">Grading Criteria</option>
                    <option value="submission">Submission Email &amp; Rules</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Severity:</label>
                  <select
                    value={selectedImportance}
                    onChange={(e) => setSelectedImportance(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-300"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">🚨 Critical Rejection Traps</option>
                    <option value="high">⭐ High Importance</option>
                    <option value="normal">Normal Context</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedImportance('all');
                      setSelectedPage('all');
                    }}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded transition-colors text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-h-[550px] overflow-y-auto divide-y divide-slate-800">
                {filteredLines.map((line) => {
                  const isSelected = selectedLine?.lineNum === line.lineNum;
                  return (
                    <div
                      key={line.lineNum}
                      onClick={() => setSelectedLine(line)}
                      className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-indigo-950/60 border-l-4 border-indigo-500'
                          : 'hover:bg-slate-800/40 border-l-4 border-transparent'
                      }`}
                    >
                      <span className="font-mono text-xs text-slate-500 w-8 shrink-0 pt-0.5 text-right">
                        {line.lineNum}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            P.{line.page}
                          </span>
                          <span className="text-[10px] font-medium text-indigo-400">
                            {line.section}
                          </span>
                          {line.importance === 'critical' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-rose-500/20 text-rose-300">
                              CRITICAL
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-200">{line.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-4 space-y-4">
                {selectedLine && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24 space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="font-mono text-indigo-400">Line #{selectedLine.lineNum}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-300">Page {selectedLine.page} of 5</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1 font-semibold uppercase text-[10px]">Verbatim Text:</span>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-200">
                        "{selectedLine.text}"
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1 font-semibold uppercase text-[10px]">Compliance Interpretation:</span>
                      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-emerald-400/90 leading-relaxed">
                        {selectedLine.annotation}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUBMISSION & AUDIT TAB */}
        {activeTab === 'submission' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Email Formatter Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>Section 7: Exact Email Submission Formatter</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                All attributes formatted strictly in compliance with Section 7 instructions on Page 5.
              </p>

              <div className="space-y-4 max-w-2xl bg-slate-950 p-5 rounded-xl border border-slate-800 font-sans text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Recipient Email:</span>
                  <code className="text-emerald-400 font-mono font-bold">{ASSIGNMENT_METADATA.recipientEmail}</code>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Required Email Subject:</span>
                  <code className="text-indigo-300 font-mono font-bold">
                    B.E. Assignment – {candidateName.trim() || '&lt;Full Name&gt;'} – {usn.trim() || '&lt;USN&gt;'}
                  </code>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Required Video Filename:</span>
                  <code className="text-amber-300 font-mono font-bold">
                    {candidateName.replace(/\s+/g, '') || '&lt;FullName&gt;'}_Assignment_Demo.mp4
                  </code>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Google Drive Permission:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    "Anyone with the link can view"
                  </span>
                </div>

                <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-lg text-amber-300 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fatal Clause from Page 5:</strong> "A Drive link that cannot be opened will be treated as a missing item." Always verify link permissions in an incognito window before sending your email!
                  </span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      const emailBody = `Dear Examiner,

Please find my submission for the B.E. (AI & ML) Technical Assignment on "AI for Personal Health and Wellness":

Candidate Name: ${candidateName}
USN: ${usn}
Personal Seed S: ${computedSeed}
Selected Questions: ${chosenQuestions.map(q => `Question ${q}`).join(' & ')}

1. GitHub Repository: https://github.com/candidate-username/health-ai-assignment
2. Demo Video (Google Drive): https://drive.google.com/file/d/your-demo-video-link/view?usp=sharing
   (Filename: ${candidateName.replace(/\s+/g, '')}_Assignment_Demo.mp4, Shared as "Anyone with the link can view")

Thank you,
${candidateName}
`;
                      handleCopy(emailBody, 'submission_email');
                    }}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center space-x-2 transition-colors"
                  >
                    {copiedType === 'submission_email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedType === 'submission_email' ? 'Email Template Copied!' : 'Copy Pre-Filled Submission Email'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div>Technical Assignment: AI for Personal Health and Wellness • Complete Suite</div>
          <div>Recipient: <span className="text-slate-400 font-mono">mnaveennk@iisc.ac.in</span> | Deadline: 6 Oct 2026, 5:00 PM IST</div>
        </div>
      </footer>
    </div>
  );
}
