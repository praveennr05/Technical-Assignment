import React, { useState } from 'react';
import {
  FileCode2,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Terminal,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import {
  generateHealthRiskJupyterNotebook,
  generateLogisticRegressionNotebook,
  generateRandomForestNotebook
} from '../services/notebookGenerator';

interface Props {
  candidateSeed: string;
}

export const NotebookViewer: React.FC<Props> = ({ candidateSeed }) => {
  const [selectedNotebook, setSelectedNotebook] = useState<'both' | 'lr' | 'rf'>('both');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedCellId, setCopiedCellId] = useState<number | null>(null);
  const [expandedCells, setExpandedCells] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true
  });

  const notebookJsonString =
    selectedNotebook === 'lr'
      ? generateLogisticRegressionNotebook(candidateSeed)
      : selectedNotebook === 'rf'
      ? generateRandomForestNotebook(candidateSeed)
      : generateHealthRiskJupyterNotebook(candidateSeed);

  const notebookFileName =
    selectedNotebook === 'lr'
      ? `logistic_regression_seed_${candidateSeed}.ipynb`
      : selectedNotebook === 'rf'
      ? `random_forest_seed_${candidateSeed}.ipynb`
      : `question_a_health_risk_models_seed_${candidateSeed}.ipynb`;

  const notebookDiskPath =
    selectedNotebook === 'lr'
      ? 'question_a/logistic_regression.ipynb'
      : selectedNotebook === 'rf'
      ? 'question_a/random_forest.ipynb'
      : 'question_a/health_risk_models.ipynb';

  // Handle Download of .ipynb file
  const handleDownload = () => {
    const blob = new Blob([notebookJsonString], { type: 'application/x-ipynb+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = notebookFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(notebookJsonString);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyCell = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCellId(idx);
    setTimeout(() => setCopiedCellId(null), 2000);
  };

  const toggleCell = (idx: number) => {
    setExpandedCells(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Parsed notebook structure for UI preview
  const notebookData = JSON.parse(notebookJsonString);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-semibold text-white tracking-tight">
                Jupyter Notebook Explorer (.ipynb)
              </h3>
              <span className="text-xs font-mono text-cyan-400">
                · Seed S: {candidateSeed}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Download and inspect the standalone Python Jupyter notebooks for Logistic Regression and Random Forest.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {notebookFileName}</span>
          </button>
          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors flex items-center space-x-1"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Raw JSON</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notebook Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setSelectedNotebook('both')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedNotebook === 'both' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Combined Both Models (.ipynb)
          </button>
          <button
            onClick={() => setSelectedNotebook('lr')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedNotebook === 'lr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Logistic Regression (.ipynb)
          </button>
          <button
            onClick={() => setSelectedNotebook('rf')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedNotebook === 'rf' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Random Forest (.ipynb)
          </button>
        </div>

        {/* Disk Location Indicator */}
        <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] font-mono">
          <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Path on disk:</span>
          <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{notebookDiskPath}</code>
        </div>
      </div>

      {/* Colab / Jupyter Run Instructions */}
      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Local Run Command:</span>
          <code className="bg-slate-900 px-2 py-0.5 rounded text-cyan-300 font-mono text-[11px]">
            jupyter notebook {notebookDiskPath}
          </code>
        </div>
        <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
          <span>Dependencies:</span>
          <span className="font-mono text-slate-300">numpy pandas scikit-learn matplotlib seaborn</span>
        </div>
      </div>

      {/* Interactive Notebook Cell Previews */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-medium text-slate-300">Cell-by-Cell Notebook Preview ({notebookData.cells.length} cells)</span>
          <span>Click any cell header to expand / collapse</span>
        </div>

        {notebookData.cells.map((cell: any, idx: number) => {
          const isCode = cell.cell_type === 'code';
          const isExpanded = expandedCells[idx] ?? true;
          const textContent = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all overflow-hidden ${
                isCode
                  ? 'bg-slate-950/90 border-slate-800/80'
                  : 'bg-slate-900/40 border-slate-800/60'
              }`}
            >
              {/* Cell Header */}
              <div
                onClick={() => toggleCell(idx)}
                className="px-3.5 py-2 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between cursor-pointer select-none text-xs"
              >
                <div className="flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                  {isCode ? (
                    <span className="font-mono text-cyan-400 text-[11px]">
                      [In {cell.execution_count}]: Code Cell
                    </span>
                  ) : (
                    <span className="font-sans text-slate-400 text-[11px] flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-indigo-400" />
                      <span>Markdown Documentation</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {isCode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCell(textContent, idx);
                      }}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1 px-2 py-0.5 rounded hover:bg-slate-800"
                    >
                      {copiedCellId === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Cell</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Cell Body */}
              {isExpanded && (
                <div className="p-3.5 text-xs overflow-x-auto">
                  {isCode ? (
                    <pre className="font-mono text-cyan-100/90 leading-relaxed text-[12px] whitespace-pre">
                      {textContent}
                    </pre>
                  ) : (
                    <div className="text-slate-300 leading-relaxed font-sans whitespace-pre-line text-xs">
                      {textContent}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
