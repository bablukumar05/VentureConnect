import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Rocket, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const MyStartupPage = () => {
  const [startupName, setStartupName] = useState('');
  const [tagline, setTagline] = useState('');
  const [industry, setIndustry] = useState('AI/ML');
  const [stage, setStage] = useState('Seed');
  const [description, setDescription] = useState('');
  const [businessModel, setBusinessModel] = useState('B2B SaaS');
  const [marketSize, setMarketSize] = useState('₹14,000 Cr TAM');
  const [fundingRequirement, setFundingRequirement] = useState('5000000');
  const [team, setTeam] = useState([{ name: '', role: '', linkedin: '' }]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await API.get('/startups/my-startup');
        if (res.data.startup) {
          const s = res.data.startup;
          setStartupName(s.startupName || '');
          setTagline(s.tagline || '');
          setIndustry(s.industry || 'AI/ML');
          setStage(s.stage || 'Seed');
          setDescription(s.description || '');
          setBusinessModel(s.businessModel || 'B2B SaaS');
          setMarketSize(s.marketSize || '₹14,000 Cr TAM');
          setFundingRequirement(s.fundingRequirement || '5000000');
          if (s.team && s.team.length > 0) setTeam(s.team);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStartup();
  }, []);

  const handleAddTeamMember = () => {
    setTeam([...team, { name: '', role: '', linkedin: '' }]);
  };

  const handleRemoveTeamMember = (index) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  const handleTeamChange = (index, field, value) => {
    const updated = [...team];
    updated[index][field] = value;
    setTeam(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    try {
      await API.post('/startups/profile', {
        startupName,
        tagline,
        industry,
        stage,
        description,
        businessModel,
        marketSize,
        fundingRequirement: Number(fundingRequirement),
        team,
      });

      setSuccessMsg('Startup profile updated & re-indexed by Investor Matching Engine!');
      setIsSaving(false);
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading Startup Profile..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Rocket className="w-6 h-6 text-indigo-400" /> Startup Venture Profile
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Complete your startup information. This profile feeds directly into the AI Investor Matching Engine.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Startup Name</label>
            <input
              type="text"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. NexusAI Solutions"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Autonomous AI Agents for Enterprise"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Industry Sector</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="AI/ML">AI / ML / DeepTech</option>
              <option value="FinTech">FinTech & Payments</option>
              <option value="SaaS">B2B SaaS / Enterprise</option>
              <option value="HealthTech">HealthTech & MedTech</option>
              <option value="EdTech">EdTech</option>
              <option value="E-commerce">E-commerce & D2C</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Venture Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="Idea">Idea / Concept</option>
              <option value="Pre-Seed">Pre-Seed</option>
              <option value="Seed">Seed Stage</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Growth">Growth</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Funding Requirement (INR ₹)</label>
            <input
              type="number"
              value={fundingRequirement}
              onChange={(e) => setFundingRequirement(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. 5000000 for ₹50 Lakhs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Market Size (TAM)</label>
            <input
              type="text"
              value={marketSize}
              onChange={(e) => setMarketSize(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. ₹14,000 Cr TAM"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Business Model</label>
          <input
            type="text"
            value={businessModel}
            onChange={(e) => setBusinessModel(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            placeholder="e.g. B2B SaaS (Monthly & Annual Tiers)"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Executive Summary</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            placeholder="Describe your core product value proposition, traction metrics, and roadmap..."
          />
        </div>

        {/* Dynamic Team Members */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">Founding Team Members</h4>
            <button
              type="button"
              onClick={handleAddTeamMember}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Team Member
            </button>
          </div>

          {team.map((member, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800 relative">
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleTeamChange(idx, 'name', e.target.value)}
                placeholder="Full Name"
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => handleTeamChange(idx, 'role', e.target.value)}
                placeholder="Role (e.g. CEO & Founder)"
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={member.linkedin}
                  onChange={(e) => handleTeamChange(idx, 'linkedin', e.target.value)}
                  placeholder="LinkedIn URL"
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                />
                {team.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTeamMember(idx)}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Saving Profile...' : 'Save Startup Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};
