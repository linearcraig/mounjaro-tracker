import React, { useState, useMemo, useEffect } from 'react';

const INITIAL_HEIGHT_INCHES = 73; // 6'1"
const TARGET_WEIGHT = 188.0;
const STARTING_WEIGHT = 241.4;

const RAW_SEED_DATA = [
  { date: '2026-06-16', weight: 241.4, jab: true, dosage: '2.5mg', doseVal: 2.5, site: 'Abdomen Right', notes: 'First jab 2.5mg' },
  { date: '2026-06-17', weight: 241.4, jab: false, dosage: '', doseVal: 0, site: '', notes: 'Feeling fine' },
  { date: '2026-06-18', weight: 240.3, jab: false, dosage: '', doseVal: 0, site: '', notes: 'Slight appetite drop' },
  { date: '2026-06-19', weight: 237.7, jab: false, dosage: '', doseVal: 0, site: '', notes: 'Good energy' },
  { date: '2026-06-20', weight: 236.1, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-21', weight: 236.1, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-22', weight: 235.6, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-23', weight: 235.0, jab: true, dosage: '2.5mg', doseVal: 2.5, site: 'Abdomen Left', notes: 'Jab 2' },
  { date: '2026-06-24', weight: 234.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-25', weight: 234.2, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-26', weight: 233.9, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-27', weight: 233.5, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-28', weight: 233.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-29', weight: 232.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-06-30', weight: 232.5, jab: true, dosage: '2.5mg', doseVal: 2.5, site: 'Thigh Right', notes: 'Jab 3' },
  { date: '2026-07-01', weight: 232.1, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-02', weight: 231.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-03', weight: 231.4, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-04', weight: 231.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-05', weight: 230.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-06', weight: 230.5, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-07', weight: 230.0, jab: true, dosage: '2.5mg', doseVal: 2.5, site: 'Thigh Left', notes: 'Jab 4' },
  { date: '2026-07-08', weight: 229.7, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-09', weight: 229.4, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-10', weight: 229.1, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-11', weight: 228.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-12', weight: 228.6, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-13', weight: 228.3, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-14', weight: 228.0, jab: true, dosage: '5mg', doseVal: 5.0, site: 'Abdomen Right', notes: 'Jab 5 - 5mg' },
  { date: '2026-07-15', weight: 227.9, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-16', weight: 227.7, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-17', weight: 227.4, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-18', weight: 227.1, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-19', weight: 226.9, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-20', weight: 226.5, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-21', weight: 226.2, jab: true, dosage: '5mg', doseVal: 5.0, site: 'Abdomen Left', notes: 'Jab 6' },
  { date: '2026-07-22', weight: 226.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-23', weight: 225.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-24', weight: 225.5, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-25', weight: 225.3, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-26', weight: 225.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-27', weight: 224.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-28', weight: 224.5, jab: true, dosage: '5mg', doseVal: 5.0, site: 'Thigh Right', notes: 'Jab 7' },
  { date: '2026-07-29', weight: 224.3, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-30', weight: 224.1, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-07-31', weight: 223.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-01', weight: 223.5, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-02', weight: 223.2, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-03', weight: 223.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-04', weight: 222.7, jab: true, dosage: '5mg', doseVal: 5.0, site: 'Thigh Left', notes: 'Jab 8' },
  { date: '2026-08-05', weight: 224.5, jab: false, dosage: '', doseVal: 0, site: '', notes: 'Salt / water retention' },
  { date: '2026-08-06', weight: 224.3, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-07', weight: 227.0, jab: true, dosage: '7.5mg', doseVal: 7.5, site: 'Abdomen Right', notes: 'Jab 9 - 7.5mg' },
  { date: '2026-08-08', weight: 226.2, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-09', weight: 226.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-10', weight: 225.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-11', weight: 224.5, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-12', weight: 223.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-13', weight: 223.2, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-14', weight: 222.5, jab: true, dosage: '7.5mg', doseVal: 7.5, site: 'Abdomen Left', notes: 'Jab 10' },
  { date: '2026-08-15', weight: 222.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-16', weight: 221.4, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-17', weight: 221.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-18', weight: 220.5, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-19', weight: 220.0, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-20', weight: 219.5, jab: true, dosage: '7.5mg', doseVal: 7.5, site: 'Thigh Right', notes: 'Jab 11' },
  { date: '2026-08-21', weight: 219.2, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-22', weight: 218.8, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-23', weight: 218.4, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-24', weight: 218.2, jab: false, dosage: '', doseVal: 0, site: '', notes: '' },
  { date: '2026-08-25', weight: 218.0, jab: false, dosage: '', doseVal: 0, site: '', notes: 'Current Weight: 218.0 lbs' }
];

const HALF_LIFE_DECAY = Math.pow(0.5, 1 / 5);

export default function MobileApp() {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('mounjaro_mobile_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return RAW_SEED_DATA;
  });

  const [unit, setUnit] = useState('lbs'); // 'lbs', 'st', 'kg'
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'chart', 'logs', 'meds'
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Form State
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formWeight, setFormWeight] = useState('218.0');
  const [formJab, setFormJab] = useState(false);
  const [formDosage, setFormDosage] = useState('7.5mg');
  const [formSite, setFormSite] = useState('Abdomen Left');
  const [formNotes, setFormNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('mounjaro_mobile_data', JSON.stringify(logs));
  }, [logs]);

  // Derived calculations
  const processedLogs = useMemo(() => {
    let accumulatedMed = 0;
    const sorted = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));

    return sorted.map((entry, idx, arr) => {
      const doseMg = entry.jab ? (entry.doseVal || parseFloat(entry.dosage) || 2.5) : 0;
      if (idx === 0) {
        accumulatedMed = doseMg;
      } else {
        accumulatedMed = (accumulatedMed * HALF_LIFE_DECAY) + doseMg;
      }

      const windowStart = Math.max(0, idx - 6);
      const windowEntries = arr.slice(windowStart, idx + 1);
      const sumWeight = windowEntries.reduce((acc, curr) => acc + curr.weight, 0);
      const avg7Day = sumWeight / windowEntries.length;

      const dailyChange = idx > 0 ? entry.weight - arr[idx - 1].weight : 0;
      const totalLost = STARTING_WEIGHT - entry.weight;
      const toLose = entry.weight - TARGET_WEIGHT;
      const bmi = (entry.weight / (INITIAL_HEIGHT_INCHES * INITIAL_HEIGHT_INCHES)) * 703;

      return {
        ...entry,
        doseMg,
        estMedInSystem: Number(accumulatedMed.toFixed(2)),
        avg7Day: Number(avg7Day.toFixed(1)),
        dailyChange: Number(dailyChange.toFixed(1)),
        totalLost: Number(totalLost.toFixed(1)),
        toLose: Number(toLose.toFixed(1)),
        bmi: Number(bmi.toFixed(1))
      };
    });
  }, [logs]);

  const current = useMemo(() => {
    if (processedLogs.length === 0) return {};
    const latest = processedLogs[processedLogs.length - 1];
    const jabs = processedLogs.filter(p => p.jab);
    const lastJab = jabs.length > 0 ? jabs[jabs.length - 1] : null;

    let nextJabDate = null;
    let daysUntilNextJab = 0;

    if (lastJab) {
      const d = new Date(lastJab.date);
      d.setDate(d.getDate() + 7);
      nextJabDate = d.toISOString().split('T')[0];
      const today = new Date('2026-08-25');
      const diffTime = d.getTime() - today.getTime();
      daysUntilNextJab = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentLogs = processedLogs.filter(p => new Date(p.date) >= thirtyDaysAgo);
    let weeklyRate = 1.8;
    if (recentLogs.length > 1) {
      const weightDiff = recentLogs[0].weight - latest.weight;
      const daysDiff = (new Date(latest.date) - new Date(recentLogs[0].date)) / (1000 * 60 * 60 * 24);
      if (daysDiff > 0) weeklyRate = (weightDiff / daysDiff) * 7;
    }

    const remainingLbs = latest.weight - TARGET_WEIGHT;
    const weeksToGoal = weeklyRate > 0 ? remainingLbs / weeklyRate : 0;
    const projectedGoalDate = new Date();
    projectedGoalDate.setDate(projectedGoalDate.getDate() + (weeksToGoal * 7));

    return {
      ...latest,
      lastJab,
      nextJabDate,
      daysUntilNextJab,
      weeklyRate: Number(weeklyRate.toFixed(1)),
      projectedGoalDate: projectedGoalDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }),
      progressPct: Math.min(100, Math.max(0, ((STARTING_WEIGHT - latest.weight) / (STARTING_WEIGHT - TARGET_WEIGHT)) * 100))
    };
  }, [processedLogs]);

  // Unit Formatters
  const formatWeight = (lbsVal) => {
    if (lbsVal === undefined || lbsVal === null) return '-';
    if (unit === 'kg') return `${(lbsVal * 0.45359237).toFixed(1)} kg`;
    if (unit === 'st') {
      const st = Math.floor(lbsVal / 14);
      const remLbs = (lbsVal % 14).toFixed(1);
      return `${st}st ${remLbs}lb`;
    }
    return `${lbsVal.toFixed(1)} lbs`;
  };

  const formatChange = (lbsVal) => {
    if (!lbsVal || lbsVal === 0) return '0.0';
    const sign = lbsVal > 0 ? '+' : '';
    if (unit === 'kg') return `${sign}${(lbsVal * 0.45359237).toFixed(1)} kg`;
    return `${sign}${lbsVal.toFixed(1)} lbs`;
  };

  const handleSaveEntry = (e) => {
    e.preventDefault();
    const newEntry = {
      date: formDate,
      weight: parseFloat(formWeight),
      jab: formJab,
      dosage: formJab ? formDosage : '',
      doseVal: formJab ? parseFloat(formDosage) : 0,
      site: formJab ? formSite : '',
      notes: formNotes
    };

    if (editingIndex !== null) {
      const updated = [...logs];
      updated[editingIndex] = newEntry;
      setLogs(updated);
    } else {
      const existingIdx = logs.findIndex(l => l.date === formDate);
      if (existingIdx >= 0) {
        const updated = [...logs];
        updated[existingIdx] = newEntry;
        setLogs(updated);
      } else {
        setLogs([...logs, newEntry]);
      }
    }

    setIsBottomSheetOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormWeight(current.weight ? current.weight.toString() : '218.0');
    setFormJab(false);
    setFormDosage('7.5mg');
    setFormSite('Abdomen Left');
    setFormNotes('');
  };

  return (
    <div className="flex justify-center bg-slate-950 min-h-screen">
      {/* Mobile Shell Container */}
      <div className="w-full max-w-md bg-slate-900 min-h-screen flex flex-col text-slate-100 shadow-2xl relative border-x border-slate-800 pb-20">
        
        {/* --- MOBILE HEADER & STATUS BAR --- */}
        <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-3 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <span className="text-slate-950 font-black text-sm">M</span>
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-tight">Mounjaro</h1>
              <p className="text-[10px] text-emerald-400 font-medium">Active • 7.5mg Week 3</p>
            </div>
          </div>

          {/* Compact Unit Selector */}
          <div className="bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 flex text-[11px] font-semibold">
            {['lbs', 'st', 'kg'].map(u => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-2 py-1 rounded-md transition-all ${unit === u ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                {u}
              </button>
            ))}
          </div>
        </header>

        {/* --- MAIN SCROLLABLE BODY --- */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          
          {/* TAB 1: HOME MOBILE VIEW */}
          {activeTab === 'home' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Hero Weight Card */}
              <div className="bg-gradient-to-br from-slate-800/90 via-slate-800/60 to-slate-900 rounded-3xl p-5 border border-slate-700/60 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Current Weight</span>
                    <div className="text-4xl font-black text-white tracking-tight mt-1">
                      {formatWeight(current.weight)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">Total Lost</span>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">
                      -{formatWeight(current.totalLost)}
                    </div>
                  </div>
                </div>

                {/* Progress Mini Bar */}
                <div className="mt-4 pt-3 border-t border-slate-700/50">
                  <div className="flex justify-between text-[11px] text-slate-300 font-medium mb-1.5">
                    <span>{current.progressPct?.toFixed(0)}% to Goal ({formatWeight(TARGET_WEIGHT)})</span>
                    <span className="text-amber-400">{formatWeight(current.toLose)} left</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${current.progressPct}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quick Glance 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Active Med</span>
                    <span className="text-purple-400">💉</span>
                  </div>
                  <div className="text-xl font-bold text-purple-300 mt-2">
                    {current.estMedInSystem} <span className="text-xs font-normal text-slate-400">mg</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">~5d half-life decay</div>
                </div>

                <div className="bg-slate-800/50 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Next Jab</span>
                    <span className="text-emerald-400">📅</span>
                  </div>
                  <div className="text-xl font-bold text-emerald-400 mt-2">
                    {current.daysUntilNextJab} <span className="text-xs font-normal text-slate-400">days</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{current.nextJabDate}</div>
                </div>

                <div className="bg-slate-800/50 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Weekly Pace</span>
                    <span className="text-blue-400">⚡</span>
                  </div>
                  <div className="text-xl font-bold text-blue-300 mt-2">
                    {current.weeklyRate} <span className="text-xs font-normal text-slate-400">lbs/wk</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Last 30-day velocity</div>
                </div>

                <div className="bg-slate-800/50 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Goal Target</span>
                    <span className="text-amber-400">🎯</span>
                  </div>
                  <div className="text-base font-bold text-amber-300 mt-2 truncate">
                    {current.projectedGoalDate}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Projected date</div>
                </div>
              </div>

              {/* Sparkline Weight Trend */}
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">30-Day Trend</span>
                  <span className="text-slate-400 text-[11px]">7-Day Avg: <strong className="text-emerald-400">{formatWeight(current.avg7Day)}</strong></span>
                </div>
                <div className="w-full h-36">
                  <MobileMiniChart data={processedLogs.slice(-30)} targetWeight={TARGET_WEIGHT} />
                </div>
              </div>

              {/* Recent Activity Card List */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs px-1">
                  <span className="font-bold text-slate-300">Recent Entries</span>
                  <button onClick={() => setActiveTab('logs')} className="text-emerald-400 font-semibold text-[11px]">View All →</button>
                </div>
                {processedLogs.slice(-4).reverse().map((entry) => (
                  <div key={entry.date} className="bg-slate-800/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        entry.jab ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-700/40 text-slate-400'
                      }`}>
                        {entry.jab ? '💉' : '⚖️'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{entry.date}</div>
                        <div className="text-[10px] text-slate-400">
                          {entry.jab ? `${entry.dosage} • ${entry.site}` : entry.notes || 'Daily log'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">{formatWeight(entry.weight)}</div>
                      <div className={`text-[10px] font-semibold ${entry.dailyChange < 0 ? 'text-emerald-400' : entry.dailyChange > 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                        {formatChange(entry.dailyChange)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FULL CHART VIEW */}
          {activeTab === 'chart' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h2 className="text-sm font-bold text-white">Full Weight Trajectory</h2>
                <div className="w-full h-64">
                  <MobileMiniChart data={processedLogs} targetWeight={TARGET_WEIGHT} showFull />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Weight</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-amber-400"></span> Target (188 lb)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Jab Dose</span>
                </div>
              </div>

              {/* BMI Progress Card */}
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">BMI Status</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-purple-300">{current.bmi}</span>
                  <span className="text-xs font-semibold text-emerald-400">Overweight (down from 31.8 Obese)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  You are now firmly out of the obese category (BMI &lt; 30.0) and on track toward normal range (&lt; 25.0).
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: LOGS LIST */}
          {activeTab === 'logs' && (
            <div className="space-y-2 animate-fadeIn">
              <div className="flex justify-between items-center px-1 pb-1">
                <h2 className="text-sm font-bold text-white">All Weight Logs ({processedLogs.length})</h2>
              </div>
              {processedLogs.slice().reverse().map((log) => (
                <div key={log.date} className="bg-slate-800/50 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{log.date}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>Lost: -{formatWeight(log.totalLost)}</span>
                      {log.jab && <span className="text-purple-400 font-semibold">• {log.dosage}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">{formatWeight(log.weight)}</div>
                    <div className={`text-[10px] font-semibold ${log.dailyChange < 0 ? 'text-emerald-400' : log.dailyChange > 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                      {formatChange(log.dailyChange)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: MEDICATION & ROTATION */}
          {activeTab === 'meds' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Injection Site Grid */}
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h2 className="text-sm font-bold text-white">Injection Site Rotation</h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { site: 'Abdomen Right', icon: '🩺' },
                    { site: 'Abdomen Left', icon: '🩺' },
                    { site: 'Thigh Right', icon: '🦵' },
                    { site: 'Thigh Left', icon: '🦵' },
                  ].map(item => {
                    const isLast = current.lastJab?.site === item.site;
                    return (
                      <div
                        key={item.site}
                        className={`p-3 rounded-xl border text-center ${
                          isLast
                            ? 'bg-purple-500/20 border-purple-500 text-purple-200 ring-1 ring-purple-400'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="text-xl">{item.icon}</div>
                        <div className="text-xs font-bold mt-1">{item.site}</div>
                        {isLast && <div className="text-[9px] uppercase font-bold text-purple-400 mt-0.5">Last Used</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Medication Accumulation Stats */}
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase">Tirzepatide Concentration</h3>
                <div className="text-2xl font-black text-purple-400">{current.estMedInSystem} mg</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Based on a 5-day half-life elimination curve. Your current active blood concentration reflects steady-state kinetics at 7.5mg.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* --- FLOATING ACTION BUTTON (FAB) --- */}
        <button
          onClick={() => { resetForm(); setIsBottomSheetOpen(true); }}
          className="fixed bottom-20 right-6 z-40 bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black p-3.5 rounded-full shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* --- MOBILE BOTTOM NAVIGATION BAR --- */}
        <nav className="fixed bottom-0 max-w-md w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2 z-40 flex justify-between items-center">
          {[
            { id: 'home', label: 'Summary', icon: '🏠' },
            { id: 'chart', label: 'Charts', icon: '📈' },
            { id: 'logs', label: 'Logs', icon: '📝' },
            { id: 'meds', label: 'Meds', icon: '💉' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                activeTab === tab.id ? 'text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* --- MOBILE BOTTOM SHEET / MODAL --- */}
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end justify-center p-0">
            <div className="bg-slate-900 border-t border-slate-700/80 w-full max-w-md rounded-t-3xl p-5 shadow-2xl space-y-4 animate-slideUp">
              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto -mt-2 mb-2"></div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white">Log Weight & Jab</h3>
                <button onClick={() => setIsBottomSheetOpen(false)} className="text-slate-400 text-lg font-bold">✕</button>
              </div>

              <form onSubmit={handleSaveEntry} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Jab Section */}
                <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700 space-y-2.5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                    <input
                      type="checkbox"
                      checked={formJab}
                      onChange={(e) => setFormJab(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700"
                    />
                    <span>Injecting Mounjaro Today?</span>
                  </label>

                  {formJab && (
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700/60">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-medium mb-1">Dose</label>
                        <select
                          value={formDosage}
                          onChange={(e) => setFormDosage(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs font-semibold"
                        >
                          <option value="2.5mg">2.5 mg</option>
                          <option value="5mg">5.0 mg</option>
                          <option value="7.5mg">7.5 mg</option>
                          <option value="10mg">10.0 mg</option>
                          <option value="12.5mg">12.5 mg</option>
                          <option value="15mg">15.0 mg</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 font-medium mb-1">Site</label>
                        <select
                          value={formSite}
                          onChange={(e) => setFormSite(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs"
                        >
                          <option value="Abdomen Right">Abdomen R</option>
                          <option value="Abdomen Left">Abdomen L</option>
                          <option value="Thigh Right">Thigh R</option>
                          <option value="Thigh Left">Thigh L</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Notes</label>
                  <input
                    type="text"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Energy, appetite, side effects..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBottomSheetOpen(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl shadow-md"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- HELPER: MOBILE RESPONSIVE SVG MINI CHART ---
function MobileMiniChart({ data, targetWeight }) {
  if (!data || data.length === 0) return null;

  const width = 360;
  const height = 140;
  const padding = { top: 15, right: 10, bottom: 20, left: 35 };

  const weights = data.map(d => d.weight);
  const minW = Math.min(...weights, targetWeight - 2);
  const maxW = Math.max(...weights);

  const getX = (idx) => padding.left + (idx / (data.length - 1 || 1)) * (width - padding.left - padding.right);
  const getY = (val) => height - padding.bottom - ((val - minW) / (maxW - minW || 1)) * (height - padding.top - padding.bottom);

  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.weight)}`).join(' ');
  const targetY = getY(targetWeight);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
      {/* Target Line */}
      <line x1={padding.left} y1={targetY} x2={width - padding.right} y2={targetY} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      
      {/* Weight Area Gradient */}
      <path d={path} fill="none" stroke="#10b981" strokeWidth="2.5" />

      {/* Jab Dots */}
      {data.map((d, i) => (
        <g key={i}>
          {d.jab && (
            <circle cx={getX(i)} cy={getY(d.weight)} r="4" fill="#c084fc" stroke="#581c87" strokeWidth="1.5" />
          )}
        </g>
      ))}
    </svg>
  );
}
```eof
