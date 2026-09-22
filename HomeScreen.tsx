import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, TrendingUp, ShieldCheck, Play, ArrowRight, Volume2, 
  VolumeX, Camera, Recycle, Wrench, Scissors, Box, Layers, 
  AlertTriangle, Phone, ExternalLink, ChevronRight, CheckCircle2, Zap
} from 'lucide-react';
import { Language, ScrapPriceInfo, MaterialKey } from '../types';
import { SCRAP_PRICES } from '../data/mockData';
import { ThreeDProductViewer } from './ThreeDProductViewer';

interface HomeScreenProps {
  language: Language;
  onNavigate: (tab: 'home' | 'sell' | 'createown' | 'recyclers' | 'dashboard') => void;
  onOpenChat: () => void;
  onOpenVideoDemo: () => void;
  onQuickInspect3D: (model: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onNavigate,
  onOpenChat,
  onOpenVideoDemo,
  onQuickInspect3D,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioText, setAudioText] = useState('');
  const [inspectedPrice, setInspectedPrice] = useState<ScrapPriceInfo>(SCRAP_PRICES[0]);

  const handleVoiceReadout = (price: ScrapPriceInfo) => {
    let utteranceText = '';
    if (language === 'hi') {
      utteranceText = `${price.nameHi} का आज का भाव ${price.currentRate} रुपये प्रति किलोग्राम है। बिना बिचौलिए के सीधे अधिकृत रिसाइक्लर को बेचें।`;
    } else if (language === 'mr') {
      utteranceText = `${price.nameMr} चा आजचा दर ${price.currentRate} रुपये प्रति किलो आहे. अधिकृत रिसायकलिंग केंद्राला थेट विका.`;
    } else {
      utteranceText = `Today's fair spot rate for ${price.name} is ₹${price.currentRate} per kilogram. Zero middleman deduction with CPCB authorized smelters.`;
    }

    setAudioText(utteranceText);
    setIsPlayingAudio(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(utteranceText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Live Market Pulse Ticker */}
      <div className="overflow-hidden rounded-2xl bg-[#06140D] border border-emerald-900/60 p-2.5 flex items-center shadow-lg">
        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-mono-code font-bold shrink-0 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>MCX METALS & CPCB LIVE SPOT</span>
        </div>
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap text-xs font-mono-code text-slate-300 pl-4 scrollbar-none">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">COPPER CABLES:</span>
            <span>₹520/kg</span>
            <span className="text-emerald-400 text-[10px]">(+3.8%)</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">CRT TV CHASSIS:</span>
            <span>₹85/kg</span>
            <span className="text-cyan-400 text-[10px]">(+1.2%)</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">DISHTV ANTENNA:</span>
            <span>₹62/kg</span>
            <span className="text-slate-400 text-[10px]">(Stable)</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">PCB MOTHERBOARD:</span>
            <span>₹185/kg</span>
            <span className="text-emerald-400 text-[10px]">(+2.1%)</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">4 CPCB Recycler Hubs Online in Pune Corridor</span>
        </div>
      </div>

      {/* Hero Section: Cyber-Emerald Eco-Tech */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#061B12] via-[#09281B] to-[#04120B] border border-emerald-500/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-4 opacity-10 pointer-events-none hidden lg:block">
          <Recycle className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-POWERED DIRECT RECYCLING ECOSYSTEM</span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Fair Scrap Prices. Verified Recyclers. <span className="text-emerald-400">Zero Middlemen.</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            KabaadSetu connects informal collectors directly with authorized CPCB recyclers and refurbishers. Get instant 3D geometry twins of your scrap, benchmark live market rates, and discover how to upcycle waste in our brand-new <strong className="text-emerald-300">CreateOwn Studio</strong>.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('sell')}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Sell / Create Lot Now</span>
            </button>

            <button
              onClick={() => onNavigate('createown')}
              className="px-5 py-3 rounded-2xl bg-[#092217] hover:bg-[#123625] text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <Scissors className="w-4 h-4 text-emerald-400" />
              <span>CreateOwn DIY Studio</span>
            </button>

            <button
              onClick={onOpenVideoDemo}
              className="px-4 py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Watch AI Video Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Voice Readout Banner (Essential for Vernacular / Low-Literacy Scrap Collectors) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0C2419] to-[#071710] border border-emerald-500/30 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleVoiceReadout(inspectedPrice)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isPlayingAudio
                ? 'bg-emerald-400 text-black animate-pulse shadow-lg shadow-emerald-400/50'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div>
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <span>🔊 Vernacular Voice Readout Active</span>
              <span className="text-[10px] font-mono-code bg-emerald-950 px-1.5 py-0.2 rounded text-emerald-400">
                LOW-LITERACY ACCESSIBLE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {audioText || (language === 'hi' ? '“तांबे के केबल का आज का भाव ₹520 प्रति किलो है।”' : '“Today’s pure copper wire rate is ₹520 per kg.”')}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleVoiceReadout(inspectedPrice)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 shrink-0"
        >
          Listen Rate
        </button>
      </div>

      {/* Interactive Price Discovery & 3D Twin Preview */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
              <span>Today’s Scrap Spot Rates & 3D Inspection</span>
              <span className="text-xs font-mono-code bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                DAILY VERIFIED
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live market indices from MCX and CPCB. Tap any card to inspect its 3D digital twin or trigger voice readout.
            </p>
          </div>

          <div className="text-xs font-mono-code text-slate-400">
            Click 3D Icon for CAD Disassembly
          </div>
        </div>

        {/* Dynamic Split: Selected Item 3D Twin Showcase + Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 3D Turntable Viewport (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#081810] border border-emerald-900/70 p-5 flex flex-col justify-between space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-code text-emerald-400 uppercase">
                  ACTIVE 3D DIGITAL TWIN
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {inspectedPrice.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-emerald-400 font-display">
                  ₹{inspectedPrice.currentRate}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono-code">
                  {inspectedPrice.unit}
                </span>
              </div>
            </div>

            {/* 3D Canvas */}
            <ThreeDProductViewer
              modelType={inspectedPrice.threeDType}
              height="h-64 sm:h-72"
              showHud={true}
              interactive={true}
            />

            <div className="p-3 rounded-2xl bg-[#06120C] border border-emerald-950 text-xs text-slate-300 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Purity: {inspectedPrice.purityGrade}</span>
              <button
                onClick={() => onNavigate('sell')}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Create Lot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Pictorial Grid Cards (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SCRAP_PRICES.map((item) => {
              const isSelected = inspectedPrice.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setInspectedPrice(item);
                    handleVoiceReadout(item);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#0B2519] border-emerald-500 shadow-xl shadow-emerald-950/60'
                      : 'bg-[#07170F] border-emerald-950 hover:border-emerald-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono-code text-slate-400">
                        {item.marketSource.split('&')[0]}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                        {language === 'hi' ? item.nameHi : language === 'mr' ? item.nameMr : item.name}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-black text-emerald-400 font-display">
                        ₹{item.currentRate}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono-code">{item.unit}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-950 text-xs">
                    <span className="text-[10px] font-mono-code text-emerald-300">
                      7D Range: ₹{item.low7d} – ₹{item.high7d}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white">
                      <Box className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Inspect 3D</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Safety & Hazardous Waste Guidance Cards */}
      <div className="p-6 rounded-3xl bg-[#091811] border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white font-display">
            Collector Health & Safety Protocols
          </h3>
          <span className="text-[10px] font-mono-code bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
            OFFICIAL MANDATE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#050C08] border border-emerald-950 space-y-1.5">
            <div className="font-bold text-emerald-300 text-sm">❌ Never Burn Cables Openly</div>
            <p className="text-slate-400 leading-relaxed">
              Open wire burning releases cancer-causing dioxins and reduces copper payout. Authorized recyclers use mechanical stripping machines and pay +₹15/kg bonus for unburned bare wire.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#050C08] border border-emerald-950 space-y-1.5">
            <div className="font-bold text-cyan-300 text-sm">📺 Do Not Smash CRT TV Glass</div>
            <p className="text-slate-400 leading-relaxed">
              CRT funnels contain toxic lead-barium silicate and implosion hazard. Handover intact units to CPCB recyclers who extract deflection copper yokes safely.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#050C08] border border-emerald-950 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">🔋 Handle Swollen Batteries Carefully</div>
            <p className="text-slate-400 leading-relaxed">
              Never puncture or incinerate lithium-ion or lead-acid cells. Store in dry, shaded sand buckets before authorized hazardous transporter collection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
