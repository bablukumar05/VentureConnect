import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Sparkles, Brain, ShieldAlert, TrendingUp, Award, CheckCircle2, AlertTriangle, RefreshCw, FileText } from 'lucide-react';

export const AIAnalyzerPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const fetchAnalysis = async () => {
    try {
      const res = await API.get('/ai/analysis');
      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error('Failed to load AI Analysis:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const handleReanalyze = async () => {
    setIsRegenerating(true);
    try {
      const res = await API.post('/ai/analyze');
      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error('Re-analysis error:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (isLoading) return <LoadingSpinner label="Running Neural AI Startup Analyzer..." />;

  const aiData = analysis || {
    businessIdeaScore: 87,
    marketAnalysis: {
      tam: '₹10,000 Cr',
      sam: '₹2,500 Cr',
      som: '₹350 Cr',
      growthRateYoY: '24%',
      marketDrivers: ['High enterprise SaaS adoption', 'Accelerated cloud migration'],
    },
    swotAnalysis: {
      strengths: ['High founder domain expertise', '88% MoM retention rate', 'Proprietary AI engine'],
      weaknesses: ['CAC optimization needed', 'Early brand awareness'],
      opportunities: ['Expansion into Tier-1 enterprise accounts', 'Strategic partner ecosystem'],
      threats: ['Incumbent pricing pressure'],
    },
    riskPrediction: {
      riskLevel: 'Medium',
      riskScore: 22,
      keyRisks: ['Burn rate escalation', 'Market saturation'],
      mitigationStrategies: ['Maintain 18mo runway', 'Focus on Product-Led Growth'],
    },
    pitchDeckReview: {
      readinessScore: 91,
      strengths: ['Clear problem-solution narrative', 'Polished slide aesthetics', 'Strong unit economics'],
      weaknesses: ['GTM slide needs channel breakdown'],
      suggestions: ['Add customer video testimonials', 'Explicitly detail TAM/SAM methodology'],
    },
    investorRecommendation: {
      bestMatch: 'Peak XV Partners (Sequoia India)',
      confidenceScore: 94,
      reasoning: '94% alignment with early-stage SaaS & AI investment mandate.',
    },
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900/50 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Premium Intelligence Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Startup & Pitch Deck Analyzer</h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Automated deep-learning evaluation of your business model, market size, risk profile, and investor readiness.
          </p>
        </div>

        <button
          onClick={handleReanalyze}
          disabled={isRegenerating}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Analyzing Model...' : 'Re-Run AI Analysis'}
        </button>
      </div>

      {/* Top 3 Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Business Idea Score */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Idea Score</span>
            <div className="text-3xl font-black text-white mt-1">{aiData.businessIdeaScore} / 100</div>
            <p className="text-xs text-emerald-400 font-semibold mt-1">Top 5th Percentile Rating</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Brain className="w-7 h-7" />
          </div>
        </div>

        {/* AI Investor Recommendation Confidence */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Investor Recommendation</span>
            <div className="text-3xl font-black text-emerald-400 mt-1">{aiData.investorRecommendation?.confidenceScore || 94}%</div>
            <p className="text-xs text-slate-300 font-medium truncate mt-1">Match: {aiData.investorRecommendation?.bestMatch}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-7 h-7" />
          </div>
        </div>

        {/* Pitch Deck Readiness */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Investment Readiness</span>
            <div className="text-3xl font-black text-purple-400 mt-1">{aiData.pitchDeckReview?.readinessScore || 91}%</div>
            <p className="text-xs text-purple-300 font-semibold mt-1">Ready for Angel & Seed Pitch</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <FileText className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* AI Investor Recommendation Banner */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 to-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" /> AI Investor Recommendation: Best Match
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Confidence Score: {aiData.investorRecommendation?.confidenceScore || 94}%
          </span>
        </div>
        <div className="text-xl font-extrabold text-emerald-400">{aiData.investorRecommendation?.bestMatch}</div>
        <p className="text-sm text-slate-300">{aiData.investorRecommendation?.reasoning}</p>
      </div>

      {/* Market Analysis & Risk Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Analysis */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" /> Market Size & TAM Analysis
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 block">TAM</span>
              <span className="text-lg font-extrabold text-white">{aiData.marketAnalysis?.tam}</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 block">SAM</span>
              <span className="text-lg font-extrabold text-indigo-300">{aiData.marketAnalysis?.sam}</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 block">SOM</span>
              <span className="text-lg font-extrabold text-emerald-300">{aiData.marketAnalysis?.som}</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Growth Drivers</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {aiData.marketAnalysis?.marketDrivers?.map((driver, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> {driver}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk Prediction */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" /> Risk Prediction & Mitigation
            </h3>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold">
              Level: {aiData.riskPrediction?.riskLevel} Risk
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Identified Vulnerabilities</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {aiData.riskPrediction?.keyRisks?.map((risk, idx) => (
                <li key={idx} className="flex items-center gap-2 text-rose-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {risk}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended Mitigation</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {aiData.riskPrediction?.mitigationStrategies?.map((mit, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {mit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SWOT Analysis Grid */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">SWOT Matrix Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-2">
            <h4 className="text-sm font-bold text-emerald-400">Strengths</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiData.swotAnalysis?.strengths?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-xl space-y-2">
            <h4 className="text-sm font-bold text-rose-400">Weaknesses</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiData.swotAnalysis?.weaknesses?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-2">
            <h4 className="text-sm font-bold text-indigo-400">Opportunities</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiData.swotAnalysis?.opportunities?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-2">
            <h4 className="text-sm font-bold text-amber-400">Threats</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiData.swotAnalysis?.threats?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* AI Pitch Deck Review Detail */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" /> AI Pitch Deck Breakdown & Suggestions
          </h3>
          <span className="text-xs font-extrabold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
            Readiness Score: {aiData.pitchDeckReview?.readinessScore}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Deck Strengths</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiData.pitchDeckReview?.strengths?.map((s, idx) => (
                <li key={idx}>✔ {s}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Deck Weaknesses</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiData.pitchDeckReview?.weaknesses?.map((w, idx) => (
                <li key={idx}>✖ {w}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Actionable Suggestions</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiData.pitchDeckReview?.suggestions?.map((sug, idx) => (
                <li key={idx}>💡 {sug}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
