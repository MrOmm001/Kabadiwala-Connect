import React, { useState } from 'react';
import { 
  Building2, QrCode, CheckCircle2, X, Truck, DollarSign, 
  Layers, ArrowUpRight, ShieldCheck, Scale, Zap, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RecyclerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecyclerDashboardModal: React.FC<RecyclerDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'incoming' | 'rates' | 'intake'>('incoming');
  const [approvedLots, setApprovedLots] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const incomingLots = [
    {
      id: 'LOT-KC-9812',
      collector: 'Ramesh K. (Hadapsar)',
      material: 'Grade-1 Heavy Armored Copper Cables',
      approxWeight: '38.0 KG',
      verifiedWeight: '37.8 KG',
      quotedAmount: 19760,
      payoutAmount: 19656,
      status: 'Awaiting Weighbridge Check',
      timestamp: '15 mins ago',
    },
    {
      id: 'LOT-KC-9941',
      collector: 'Suresh Patil (Bhosari)',
      material: 'Sony 21" CRT TV (Copper Yoke Intact)',
      approxWeight: '19.5 KG',
      verifiedWeight: '19.5 KG',
      quotedAmount: 1650,
      payoutAmount: 1650,
      status: 'Awaiting Weighbridge Check',
      timestamp: '42 mins ago',
    },
  ];

  const handleApprovePayout = (lotId: string) => {
    setApprovedLots((prev) => ({ ...prev, [lotId]: true }));
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00f59b', '#00d2ff'],
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#07150E] border border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A1F15] border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-300">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  GreenTech Circular Refineries Terminal
                </h3>
                <span className="text-[10px] font-mono-code bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40">
                  RECYCLER MODE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                CPCB Reg: CPCB/EW-REG/MH/2024/0981 • Weighbridge Terminal #2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-emerald-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation within Recycler Mode */}
        <div className="px-6 py-3 bg-[#050C08] border-b border-emerald-950 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'incoming'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'bg-[#081810] text-slate-400 hover:text-white'
            }`}
          >
            Incoming Collector Lots ({incomingLots.length})
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'rates'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'bg-[#081810] text-slate-400 hover:text-white'
            }`}
          >
            Manage Buying Rates (CPCB Linked)
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {activeTab === 'incoming' ? (
            <div className="space-y-4">
              <div className="text-xs text-slate-400 font-mono-code">
                Weighbridge sensor calibrated. Verify collector digital QR code to release direct instant payout:
              </div>

              {incomingLots.map((lot) => {
                const isApproved = approvedLots[lot.id];

                return (
                  <div
                    key={lot.id}
                    className="p-5 rounded-2xl bg-[#081B12] border border-emerald-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-code text-cyan-300 font-bold">
                          {lot.id}
                        </span>
                        <span className="text-[10px] text-slate-400">• {lot.timestamp}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{lot.material}</h4>
                      <p className="text-xs text-slate-300">Collector: {lot.collector}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                        <span>Weighbridge Certified: <strong className="text-emerald-400">{lot.verifiedWeight}</strong></span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="text-left sm:text-right">
                        <div className="text-lg font-black text-emerald-400 font-display">
                          ₹{lot.payoutAmount.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-slate-400">Direct UPI Payout</span>
                      </div>

                      {isApproved ? (
                        <span className="px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>UPI Paid Successfully</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApprovePayout(lot.id)}
                          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Approve & Release ₹{lot.payoutAmount.toLocaleString()}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-black/40 border border-emerald-950 space-y-3 text-xs text-slate-300">
              <div className="font-bold text-white text-sm">Automated Spot Price Pegging</div>
              <p>
                GreenTech Refineries buying rates automatically synchronize with the London Metal Exchange (LME) and MCX Spot Copper indices. Minimum floor price protection is guaranteed for informal collectors.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#06120C] border border-emerald-900">
                  <span className="text-slate-400 text-[10px] block">COPPER CABLES</span>
                  <strong className="text-emerald-400 text-sm">₹520 / kg</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#06120C] border border-emerald-900">
                  <span className="text-slate-400 text-[10px] block">CRT TV CHASSIS</span>
                  <strong className="text-emerald-400 text-sm">₹85 / kg</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#06120C] border border-emerald-900">
                  <span className="text-slate-400 text-[10px] block">DISHTV ANTENNAS</span>
                  <strong className="text-emerald-400 text-sm">₹62 / kg</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0A1F15] border-t border-emerald-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Switch back to Collector Mode anytime from the top navigation bar.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
