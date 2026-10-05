import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Clock,
  Terminal,
  FolderGit2
} from 'lucide-react';

export interface GitChecklistItem {
  id: string;
  category: 'repo_setup' | 'commits_cadence' | 'prediction_proof' | 'file_structure' | 'final_audit';
  title: string;
  description: string;
  ruleCitation: string;
  severity: 'critical' | 'high' | 'recommended';
  suggestedCommand?: string;
}

const DEFAULT_ITEMS: GitChecklistItem[] = [
  {
    id: 'repo-created',
    category: 'repo_setup',
    title: 'New GitHub repository created after challenge release',
    description: 'Repository must be fresh (public, or shared with mnaveennk@iisc.ac.in). Old or repurposed repos are invalid.',
    ruleCitation: 'Page 4, Deliverable 1',
    severity: 'critical',
    suggestedCommand: 'git init && git branch -M main'
  },
  {
    id: 'folder-structure',
    category: 'file_structure',
    title: 'One dedicated folder per chosen question (with Levels 1 to 3)',
    description: 'Clean layout: e.g. /question_a and /question_b containing level1, level2, level3 files.',
    ruleCitation: 'Page 4, Deliverable 1',
    severity: 'critical',
    suggestedCommand: 'mkdir -p question_a question_b'
  },
  {
    id: 'readme-seed',
    category: 'file_structure',
    title: 'README.md created with Candidate Seed S and reproduction steps',
    description: 'Must explicitly declare your calculated Seed S (last 4 digits of USN) and exact virtualenv/run commands.',
    ruleCitation: 'Page 4, Deliverable 1',
    severity: 'critical',
    suggestedCommand: 'touch README.md requirements.txt'
  },
  {
    id: 'commit-1-baseline',
    category: 'commits_cadence',
    title: 'Commit 1: Initial repository scaffold & Level 1 baseline',
    description: 'Pushed at start of working session containing directory skeleton and Level 1 standard models.',
    ruleCitation: 'Page 4, Commit spread requirement',
    severity: 'high',
    suggestedCommand: 'git add . && git commit -m "feat: init project scaffold and level 1 baseline models"'
  },
  {
    id: 'commit-2-scratch',
    category: 'commits_cadence',
    title: 'Commit 2: Level 2 scratch math/SQL implementations and unit tests',
    description: 'Pushed midway, demonstrating pure scratch algorithms (NumPy sigmoid/gradient descent or raw SQL).',
    ruleCitation: 'Page 4, Commit spread requirement',
    severity: 'high',
    suggestedCommand: 'git commit -m "feat: implement level 2 scratch algorithms without banned libraries"'
  },
  {
    id: 'commit-3-prediction',
    category: 'prediction_proof',
    title: 'Commit 3: Level 3 predictions committed BEFORE running tests (CRITICAL PROOF)',
    description: 'Commit timestamp serves as legal proof of prediction before execution. Must precede empirical test results.',
    ruleCitation: 'Page 4, Section 4.2',
    severity: 'critical',
    suggestedCommand: 'git commit -m "docs: commit level 3 predictions prior to empirical evaluations"'
  },
  {
    id: 'commit-4-results',
    category: 'commits_cadence',
    title: 'Commit 4: Empirical numbers, decision logs & final documentation',
    description: 'Pushed after running tests, recording actual test results, tables, and threshold sweeps.',
    ruleCitation: 'Page 4, Commit spread requirement',
    severity: 'high',
    suggestedCommand: 'git commit -m "feat: add empirical results, threshold analysis and completed decision logs"'
  },
  {
    id: 'anti-dump-check',
    category: 'commits_cadence',
    title: 'Commit history verified: At least 4 commits distributed across time',
    description: 'A single final commit upload is explicitly flagged and rejected. Ensure commit timestamps show steady progress.',
    ruleCitation: 'Page 4, "A single upload at the end will be flagged"',
    severity: 'critical',
    suggestedCommand: 'git log --oneline --graph'
  },
  {
    id: 'personal-intelligence',
    category: 'file_structure',
    title: 'PERSONAL_INTELLIGENCE.md file added with Decision Log & AI Declaration',
    description: 'One-page document: 2 decisions per question with numerical evidence + AI tools & error fixed.',
    ruleCitation: 'Page 4, Section 4 & Deliverable 3',
    severity: 'critical',
    suggestedCommand: 'touch PERSONAL_INTELLIGENCE.md'
  },
  {
    id: 'deadline-cutoff',
    category: 'final_audit',
    title: 'All commits pushed strictly before 5:00 PM IST on 6 October 2026',
    description: 'Any commits made after the window closes will be ignored by reviewers. Verify remote push status.',
    ruleCitation: 'Page 5, Section 7',
    severity: 'critical',
    suggestedCommand: 'git push origin main'
  }
];

interface Props {
  candidateSeed: string;
}

export const GitChecklist: React.FC<Props> = ({ candidateSeed }) => {
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`health_ai_git_checklist_${candidateSeed}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [copiedCmdId, setCopiedCmdId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed' | 'critical'>('all');

  useEffect(() => {
    try {
      localStorage.setItem(`health_ai_git_checklist_${candidateSeed}`, JSON.stringify(completedIds));
    } catch {
      // Ignore local storage error
    }
  }, [completedIds, candidateSeed]);

  const toggleItem = (id: string) => {
    setCompletedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const markAll = (status: boolean) => {
    const updated: Record<string, boolean> = {};
    DEFAULT_ITEMS.forEach(item => {
      updated[item.id] = status;
    });
    setCompletedIds(updated);
  };

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmdId(id);
    setTimeout(() => setCopiedCmdId(null), 2000);
  };

  const totalCount = DEFAULT_ITEMS.length;
  const completedCount = DEFAULT_ITEMS.filter(item => completedIds[item.id]).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Critical item compliance
  const criticalItems = DEFAULT_ITEMS.filter(item => item.severity === 'critical');
  const criticalCompleted = criticalItems.filter(item => completedIds[item.id]).length;
  const allCriticalDone = criticalCompleted === criticalItems.length;

  const filteredItems = DEFAULT_ITEMS.filter(item => {
    const isDone = !!completedIds[item.id];
    if (activeFilter === 'pending') return !isDone;
    if (activeFilter === 'completed') return isDone;
    if (activeFilter === 'critical') return item.severity === 'critical';
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Git Requirements &amp; Commit History Compliance Tracker
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Seed: S = {candidateSeed}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Audit tool enforcing the 4-commit spread, pre-run prediction commits, README seed, and directory rules.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => markAll(true)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Check All
          </button>
          <button
            onClick={() => markAll(false)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress & Compliance Readout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="sm:col-span-8 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center space-x-2">
              <span>Overall Git &amp; Deliverables Readiness</span>
              <span className="font-mono text-indigo-400">({completedCount} / {totalCount} requirements checked)</span>
            </span>
            <span className="font-mono font-bold text-white text-sm">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                progressPercent === 100
                  ? 'bg-emerald-500'
                  : progressPercent >= 60
                  ? 'bg-indigo-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Status Badge */}
        <div className="sm:col-span-4 flex justify-end">
          {progressPercent === 100 ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 px-3.5 py-2 rounded-xl text-xs flex items-center space-x-2 font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Submission Ready</span>
            </div>
          ) : !allCriticalDone ? (
            <div className="bg-rose-950/40 border border-rose-500/40 text-rose-300 px-3 py-2 rounded-xl text-xs flex items-center space-x-2 font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="block font-bold">Critical Items Pending</span>
                <span className="text-[10px] text-rose-400/80">{criticalItems.length - criticalCompleted} critical rules unverified</span>
              </div>
            </div>
          ) : (
            <div className="bg-indigo-950/40 border border-indigo-500/40 text-indigo-300 px-3 py-2 rounded-xl text-xs flex items-center space-x-2 font-semibold">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>In Progress ({totalCount - completedCount} pending)</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 text-xs border-b border-slate-800 pb-3">
        <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold mr-2">Filter:</span>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          All ({DEFAULT_ITEMS.length})
        </button>
        <button
          onClick={() => setActiveFilter('pending')}
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            activeFilter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          Pending ({totalCount - completedCount})
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            activeFilter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          Completed ({completedCount})
        </button>
        <button
          onClick={() => setActiveFilter('critical')}
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            activeFilter === 'critical' ? 'bg-rose-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          Critical ({criticalItems.length})
        </button>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map(item => {
          const isDone = !!completedIds[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isDone
                  ? 'bg-slate-950/70 border-slate-800/80 opacity-90'
                  : item.severity === 'critical'
                  ? 'bg-slate-950 border-rose-900/40 hover:border-rose-700/60'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                  className="mt-0.5 text-indigo-400 hover:text-indigo-300 transition-colors shrink-0"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                      {item.title}
                    </span>
                    {item.severity === 'critical' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        CRITICAL
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-500">
                      [{item.ruleCitation}]
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Suggested Shell Command */}
              {item.suggestedCommand && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 w-full sm:w-auto flex items-center justify-between sm:justify-end space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300"
                >
                  <code className="text-indigo-300 line-clamp-1 max-w-[240px]">{item.suggestedCommand}</code>
                  <button
                    onClick={() => copyCommand(item.suggestedCommand!, item.id)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy shell command"
                  >
                    {copiedCmdId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
