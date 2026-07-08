'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Search, AlertTriangle, Check, X } from 'lucide-react';
import { Institution, User } from '@/types';
import LiveToast from './LiveToast';

interface QueueTableProps {
  institution: Institution;
  user: User;
  queueTab: 'all' | 'pending' | 'urgent' | 'actioned';
  setQueueTab: (tab: 'all' | 'pending' | 'urgent' | 'actioned') => void;
}

interface ToastData {
  id: string;
  studentName: string;
  itemName: string;
  message: string;
}

export default function RequestQueueTable({ institution, queueTab, setQueueTab }: QueueTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [liveToast, setLiveToast] = useState<ToastData | null>(null);

  const [requests, setRequests] = useState([
    { name: 'Ngozi Okeke', matric: '2021/UNILAG/5592', dept: 'Economics', title: 'Department Clearance', id: 'REQ_11', age: '168 hrs ago', type: 'urgent', status: 'pending', requiresFileReview: true },
    { name: 'Fatima Abubakar', matric: '2021/UNILAG/1149', dept: 'Economics', title: 'Bursary Clearance', id: 'REQ_6', age: '120 hrs ago', type: 'urgent', status: 'pending', requiresFileReview: false },
    { name: 'Chinedu Okafor', matric: '2021/UNILAG/1054', dept: 'Accounting', title: 'Sports & Recreation Clearance', id: 'REQ_4', age: '96 hrs ago', type: 'urgent', status: 'pending', requiresFileReview: false },
    { name: 'Obinna Eze', matric: '2021/UNILAG/4921', dept: 'Law', title: 'Library Clearance', id: 'REQ_1', age: '24 hrs ago', type: 'urgent', status: 'pending', requiresFileReview: false },
    { name: 'Emeka Nwosu', matric: '2021/UNILAG/7124', dept: 'Systems Engineering', title: 'Library Clearance', id: 'REQ_SIM_1782907584281', age: '0 hrs ago', type: 'live', status: 'pending', requiresFileReview: false },
    { name: 'Khadijat Balogun', matric: '2021/UNILAG/9696', dept: 'Accounting', title: 'Academic Registry Clearance', id: 'REQ_SIM_1782907569280', age: '0 hrs ago', type: 'live', status: 'pending', requiresFileReview: true },
    { name: 'Ngozi Obi', matric: '2021/UNILAG/7639', dept: 'Law', title: 'Bursary Clearance', id: 'REQ_SIM_1782907404282', age: '0 hrs ago', type: 'live', status: 'pending', requiresFileReview: false },
    { name: 'Ngozi Nwosu', matric: '2021/UNILAG/4955', dept: 'Systems Engineering', title: 'Sports & Recreation Clearance', id: 'REQ_SIM_1782907389282', age: '0 hrs ago', type: 'live', status: 'pending', requiresFileReview: false }
  ]);

  // Simulated Polling Interval for live feed requests
  useEffect(() => {
    const interval = setInterval(() => {
      const firstNames = ['Adewale', 'Chuka', 'Folake', 'Uchenna', 'Babatunde', 'Amara'];
      const lastNames = ['Balogun', 'Opara', 'Coker', 'Igwe', 'Adeyemi', 'Obi'];
      const items = ['Library', 'Bursary', 'Sports & Recreation', 'Academic Registry'];
      
      const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const simulatedId = `REQ_SIM_${Date.now()}`;

      const newRequest = {
        name: randomName,
        matric: `2021/${institution.code}/${Math.floor(1000 + Math.random() * 9000)}`,
        dept: institution.departments[Math.floor(Math.random() * institution.departments.length)] || 'Economics',
        title: `${randomItem} Clearance`,
        id: simulatedId,
        age: '0 hrs ago',
        type: 'live',
        status: 'pending',
        requiresFileReview: Math.random() > 0.7
      };

      setRequests(prev => [newRequest, ...prev]);
      setLiveToast({
        id: simulatedId,
        studentName: randomName,
        itemName: randomItem,
        message: `Submitted a new ${randomItem} clearance request.`
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [institution]);

  const handleSelectAllToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(requests.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleRowCheckboxToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAction = (id: string, newStatus: 'cleared' | 'flagged') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    setSelectedIds(prev => prev.filter(item => item !== id));
  };

  const handleBulkApprove = () => {
    setRequests(prev => prev.map(r => selectedIds.includes(r.id) && !r.requiresFileReview ? { ...r, status: 'cleared' } : r));
    setSelectedIds([]);
  };

  const handleBulkFlag = () => {
    setRequests(prev => prev.map(r => selectedIds.includes(r.id) ? { ...r, status: 'flagged' } : r));
    setSelectedIds([]);
  };

  const selectedObjects = requests.filter(r => selectedIds.includes(r.id));
  const bulkApprovalLocked = selectedObjects.some(r => r.requiresFileReview);
  const isAllSelected = requests.length > 0 && selectedIds.length === requests.length;

  return (
    <div className="space-y-4 font-sans w-full relative">
      
      {/* Dynamic Toast Alert Portal */}
      <LiveToast liveToast={liveToast} onClose={() => setLiveToast(null)} />

      {/* Header Info Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e0e] border border-white/5 p-6 rounded-2xl shadow-xl">
        <div>
          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
            CLEARANCE DESK
          </span>
          <h2 className="text-xl font-serif italic text-white leading-tight mt-1.5">Clearance Request Data Queues</h2>
          <p className="text-xs text-white/40 mt-1">
            High-density real-time workspace for administrative and verification staff to inspect, audit, and approve student clearance profiles.
          </p>
        </div>
        <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-mono text-white rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Requests</span>
        </button>
      </div>

      {/* Horizontal Queue Tab Filters */}
      <div className="flex flex-wrap items-center gap-2 bg-bg-dark border border-white/10 p-1.5 rounded-2xl w-fit font-mono text-xs">
        <button onClick={() => setQueueTab('all')} className={`px-4 py-2 rounded-xl font-bold transition-all ${queueTab === 'all' ? 'bg-white/10 text-white' : 'text-white/40'}`}>
          All Requests <span className="text-[10px] opacity-40 pl-0.5 font-sans">{requests.length + 24}</span>
        </button>
        <button onClick={() => setQueueTab('pending')} className={`px-4 py-2 rounded-xl font-bold transition-all ${queueTab === 'pending' ? 'bg-white/10 text-white' : 'text-white/40'}`}>
          Pending My Review <span className="text-[10px] text-amber-500 font-bold pl-0.5 font-sans">0</span>
        </button>
        <button onClick={() => setQueueTab('urgent')} className={`px-4 py-2 rounded-xl font-bold transition-all ${queueTab === 'urgent' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/10' : 'text-white/40'}`}>
          Urgent Escalations <span className="text-[10px] font-bold pl-0.5 font-sans">8</span>
        </button>
        <button onClick={() => setQueueTab('actioned')} className={`px-4 py-2 rounded-xl font-bold transition-all ${queueTab === 'actioned' ? 'bg-white/10 text-white' : 'text-white/40'}`}>
          Actioned <span className="text-[10px] opacity-40 pl-0.5 font-sans">4</span>
        </button>
      </div>

      {/* Filters Search strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#0a0a0a] p-4 rounded-xl border border-white/5 text-xs text-white/70">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matric..."
            className="w-full bg-bg-dark border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-white/20 focus:outline-none"
          />
        </div>
        <select className="bg-bg-dark border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer"><option>Filter by Faculty (All)</option></select>
        <select className="bg-bg-dark border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer"><option>Filter by Type (All)</option></select>
        <select className="bg-bg-dark border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer"><option>Sort: Longest In Queue</option></select>
      </div>

      {/* Request Data Matrix Container */}
      <div className="bg-[#0e0e0e] rounded-2xl border border-white/10 shadow-2xl p-5 overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4 min-h-13">
          <h3 className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-2 font-mono">
            <span>ACTIVE QUEUE STREAM</span>
            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-sans tracking-normal font-medium normal-case">
              Showing {requests.length} Of 32 Requests
            </span>
          </h3>

          <AnimatePresence>
            {selectedIds.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                className="flex flex-wrap items-center gap-3 bg-bg-dark border border-amber-500/20 px-4 py-1.5 rounded-xl shadow-xl font-mono text-[11px]"
              >
                <span className="text-amber-400 font-black">{selectedIds.length} Selected</span>
                <div className="h-4 w-1 bg-white/10" />

                {bulkApprovalLocked ? (
                  <div className="flex items-center gap-1.5 text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md font-bold font-sans">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Requires File Review: Bulk Approval Locked</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold font-sans">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Clears Eligible</span>
                  </div>
                )}

                <div className="h-4 w-1 bg-white/10" />

                <button
                  type="button"
                  disabled={bulkApprovalLocked}
                  onClick={handleBulkApprove}
                  className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${
                    bulkApprovalLocked 
                      ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5' 
                      : 'bg-green-500 hover:bg-green-400 text-black cursor-pointer shadow-sm'
                  }`}
                >
                  Bulk Approve
                </button>

                <button
                  type="button"
                  onClick={handleBulkFlag}
                  className="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-md text-[10px] font-bold cursor-pointer"
                >
                  Flag All
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="text-white/40 hover:text-white transition-colors text-[10px]"
                >
                  Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="overflow-x-auto w-full no-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead>
              <tr className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/30 border-b border-white/5 pb-2">
                <th className="py-2 pl-2 w-12">
                  <input 
                    type="checkbox" 
                    checked={isAllSelected}
                    onChange={handleSelectAllToggle}
                    className="rounded bg-black border-white/10 focus:ring-0 cursor-pointer w-3.5 h-3.5 checked:bg-green-500 checked:border-green-500 text-green-500" 
                  />
                </th>
                <th className="py-2">Student Profile</th>
                <th className="py-2">Requirement Title</th>
                <th className="py-2">Queue Age</th>
                <th className="py-2">Priority</th>
                <th className="py-2 text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs font-sans divide-y divide-white/5">
              {requests.map((req) => {
                const isSelected = selectedIds.includes(req.id);
                return (
                  <tr key={req.id} className={`transition-colors group ${isSelected ? 'bg-white/2' : 'hover:bg-white/1'}`}>
                    <td className="py-4 pl-2">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleRowCheckboxToggle(req.id)}
                        className="rounded bg-black border-white/10 focus:ring-0 cursor-pointer w-3.5 h-3.5 checked:bg-green-500 checked:border-green-500 text-green-500" 
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-sm">
                          {req.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-bold text-white block leading-tight">{req.name}</span>
                          <span className="text-[10px] font-mono text-white/40 mt-0.5 block">{req.matric} • {req.dept}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <span className="font-bold text-white block">{req.title}</span>
                        <span className="text-[9px] font-mono text-white/30 mt-0.5 block">ID: {req.id}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        req.type === 'urgent' ? 'bg-rose-500/5 text-rose-400 border-rose-500/10' : 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${req.type === 'urgent' ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'}`} />
                        {req.age}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 bg-rose-500/5 text-rose-400 border border-rose-500/10 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider font-sans">
                        <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                        URGENT
                      </span>
                    </td>
                    <td className="py-4 text-right pr-4">
                      {req.status === 'pending' ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button 
                            type="button"
                            onClick={() => handleAction(req.id, 'flagged')}
                            className="p-1.5 rounded-lg bg-rose-500/5 border border-rose-500/10 text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleAction(req.id, 'cleared')}
                            className="p-1.5 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 stroke-3" />
                          </button>
                        </div>
                      ) : (
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-black uppercase tracking-widest border ${
                          req.status === 'cleared' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {req.status}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}