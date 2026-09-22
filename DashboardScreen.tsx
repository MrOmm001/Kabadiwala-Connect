import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, ShieldCheck, QrCode, ArrowUpRight, Wrench, Download, 
  CheckCircle2, DollarSign, Calendar, Eye, Smartphone, Tv, Cable, 
  Radio, Cpu, Layers, Award, Sparkles, X, FileText, ArrowRight
} from 'lucide-react';
import { Language, SaleHistoryItem, RepairHistoryItem } from '../types';
import { SALE_HISTORY, REPAIR_HISTORY } from '../data/mockData';

interface DashboardScreenProps {
  language: Language;
  onOpenVideoDemo: () => void;
  onOpenChat: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  language,
  onOpenVideoDemo,
  onOpenChat,
}) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'repairs'>('sales');
  const [selectedSale, setSelectedSale] = useState<SaleHistoryItem | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<RepairHistoryItem | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [activeQrData, setActiveQrData] = useState<{ title: string; code: string; amount: number; buyer: string } | null>(null);

  const totalSaleEarnings = SALE_HISTORY.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalRepairSaved = REPAIR_HISTORY.reduce((sum, item) => sum + item.netValueSaved, 0);
  const totalWeightDiverted = SALE_HISTORY.reduce((sum, item) => sum + item.weightKg, 0);

  const openQrModal = (title: string, code: string, amount: number, buyer: string) => {
    setActiveQrData({ title, code, amount, buyer });
    setShowQrModal(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Earnings */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#092217] to-[#05110B] border border-emerald-500/40 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono-code mb-2">
            <span>TOTAL SCRAP EARNINGS</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            ₹{totalSaleEarnings.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero middleman commission deduction</span>
          </div>
        </div>

        {/* Card 2: Value Saved through Repair */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#082024] to-[#041113] border border-cyan-500/40 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono-code mb-2">
            <span>VALUE SAVED VIA REPAIR</span>
            <Wrench className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-display">
            +₹{totalRepairSaved.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>4 Devices refurbished vs crushed</span>
          </div>
        </div>

        {/* Card 3: E-Waste Diverted */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1C1808] to-[#0F0C04] border border-amber-500/40 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono-code mb-2">
            <span>E-WASTE DIVERTED</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-display">
            {totalWeightDiverted.toFixed(1)} <span className="text-base font-normal text-slate-300">KG</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>100% Traceable CPCB smelting</span>
          </div>
        </div>

        {/* Card 4: Collector Status Badge */}
        <div className="p-5 rounded-3xl bg-[#081810] border border-emerald-900/60 relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono-code mb-1">COLLECTOR ID: KC-2026-PUN</div>
            <div className="text-lg font-bold text-white">Ramesh K. (Pune Hub)</div>
            <div className="text-xs text-emerald-400 mt-0.5">Tier 4 Verified Green Collector</div>
          </div>
          <div className="pt-2 border-t border-emerald-950 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Green Karma Points:</span>
            <span className="text-xs font-bold text-emerald-300">2,480 Pts</span>
          </div>
        </div>
      </div>

      {/* Primary History Switcher Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/50 pb-4">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#06120C] border border-emerald-900/60 w-fit">
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'sales'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Sale History (TV, Long Cables, DishTV)</span>
          </button>

          <button
            onClick={() => setActiveTab('repairs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'repairs'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Repair & Refurbish History (Old Phone, etc.)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code">
          <span>Official CPCB/MPCB Tamper-Proof Audit Trail</span>
        </div>
      </div>

      {/* CONTENT AREA */}
      {activeTab === 'sales' ? (
        /* Sale History Cards: TV, Long Cables, DishTV, PCBs */
        <div className="space-y-4">
          <div className="text-xs text-slate-400 font-mono-code mb-1">
            Displaying direct material sales with authorized recyclers (TV, Long Cables, DishTV sets):
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SALE_HISTORY.map((sale) => (
              <div
                key={sale.id}
                className="p-5 sm:p-6 rounded-3xl bg-[#07170F] border border-emerald-900/70 hover:border-emerald-500/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl"
              >
                {/* Left info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0A2216] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    {sale.category === 'tv' && <Tv className="w-6 h-6" />}
                    {sale.category === 'cables' && <Cable className="w-6 h-6" />}
                    {sale.category === 'dishtv' && <Radio className="w-6 h-6" />}
                    {sale.category === 'pcb' && <Cpu className="w-6 h-6" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white font-display">
                        {sale.itemTitle}
                      </h3>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {sale.lotId}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        ✓ {sale.paymentStatus} via {sale.paymentMethod}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      Sold to: <span className="text-emerald-400 font-semibold">{sale.buyerName}</span> ({sale.buyerCpcb})
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
                      <span>Mass: <strong className="text-white">{sale.weightKg} KG</strong></span>
                      <span>Rate: <strong className="text-white">₹{sale.ratePerKg}/kg</strong></span>
                      <span>Date: <strong className="text-white">{sale.date}</strong></span>
                      <span className="text-emerald-400 font-mono-code">QR: {sale.handoverCode}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 italic pt-1">
                      Recovered: {sale.recoveredResources}
                    </div>
                  </div>
                </div>

                {/* Right Amount & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-emerald-950 gap-2 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display">
                      ₹{sale.totalAmount.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono-code">DIRECT PAYOUT RECEIVED</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openQrModal(sale.itemTitle, sale.handoverCode, sale.totalAmount, sale.buyerName)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Handover QR</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Repair & Refurbish History Cards: Old Phone, etc. */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-xs text-cyan-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              <strong>Smart Refurbish Ledger:</strong> By connecting old phones and appliances to certified refurbishers instead of selling them as raw scrap, collectors unlocked <strong>+₹6,050 in extra revenue</strong>!
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {REPAIR_HISTORY.map((rep) => (
              <div
                key={rep.id}
                className="p-5 sm:p-6 rounded-3xl bg-[#061618] border border-cyan-900/60 hover:border-cyan-500/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl"
              >
                {/* Left Details */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#082226] border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Smartphone className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white font-display">
                        {rep.deviceName}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        {rep.status}
                      </span>
                      <span className="text-[10px] font-mono-code text-slate-400">
                        Turnaround: {rep.daysTurnaround} day
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      Diagnosed: <span className="text-slate-200">{rep.issueDiagnosed}</span>
                    </p>

                    <div className="text-xs text-slate-400">
                      Serviced at: <span className="text-cyan-400 font-semibold">{rep.repairFacility}</span> • {rep.date}
                    </div>

                    <div className="text-[11px] text-cyan-300/80 pt-0.5 font-mono-code">
                      Warranty: {rep.warrantyProvided}
                    </div>
                  </div>
                </div>

                {/* Right Profit Comparison */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-cyan-950 gap-2 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-400">
                      Scrap Value: <span className="line-through text-rose-400">₹{rep.scrapEstimatedValue}</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-cyan-300 font-display">
                      Refurbished: ₹{rep.refurbishedMarketValue}
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      Net Gain: +₹{rep.netValueSaved} 🚀
                    </div>
                  </div>

                  <button
                    onClick={() => openQrModal(rep.deviceName, `REP-CERT-${rep.id}`, rep.refurbishedMarketValue, rep.repairFacility)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Digital Handover QR Modal */}
      <AnimatePresence>
        {showQrModal && activeQrData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#081810] border border-emerald-500/50 rounded-3xl p-6 text-center shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-emerald-400 font-bold uppercase">
                  DIGITAL HANDOVER PASS
                </span>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Realistic QR Code Box */}
              <div className="p-4 bg-white rounded-2xl mx-auto w-fit shadow-2xl border-4 border-emerald-400">
                <div className="w-44 h-44 bg-black p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-12 h-12 bg-white p-2"><div className="w-8 h-8 bg-black" /></div>
                    <div className="w-12 h-12 bg-white p-2"><div className="w-8 h-8 bg-black" /></div>
                  </div>
                  <div className="text-white text-[9px] font-mono-code text-center py-2">
                    {activeQrData.code}
                  </div>
                  <div className="flex justify-between">
                    <div className="w-12 h-12 bg-white p-2"><div className="w-8 h-8 bg-black" /></div>
                    <div className="w-10 h-10 bg-emerald-400 rounded-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-base">{activeQrData.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Buyer: {activeQrData.buyer}</p>
                <div className="text-lg font-extrabold text-emerald-400 mt-2">
                  ₹{activeQrData.amount.toLocaleString()} (Verified)
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-black/50 p-2.5 rounded-xl border border-emerald-950 font-mono-code">
                Show this QR at the recycler weighbridge terminal or refurbish center to verify handover instantly.
              </div>

              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg transition-all"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
