import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, RotateCcw, CheckCircle2, Cpu, Scan, Box, TrendingUp, ShieldCheck, ChevronRight, Zap } from 'lucide-react';
import { ThreeDProductViewer } from './ThreeDProductViewer';

interface AiDemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetItem?: 'tv' | 'cables' | 'dishtv' | 'phone';
}

export const AiDemoVideoModal: React.FC<AiDemoVideoModalProps> = ({
  isOpen,
  onClose,
  presetItem = 'tv',
}) => {
  const [selectedDemo, setSelectedDemo] = useState<'tv' | 'cables' | 'dishtv' | 'phone'>(presetItem);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);

  const demoPresets = {
    tv: {
      name: 'Sony Trinitron 21" Color CRT TV',
      samplePhoto: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80',
      tag: 'Cathode Ray Tube E-Waste',
      brandDetected: 'Sony Trinitron KV-21 Chassis',
      dimensions: '510 x 480 x 490 mm (Est. 19.5 kg)',
      purity: 'Electrolytic Copper Yoke (1.4kg) + Lead-Glass Funnel',
      marketQuote: '₹1,650 (CPCB Verified dismantler rate)',
      middlemanCutSaved: '₹600 saved (Middleman offered only ₹1,050)',
      verdict: 'Sell to CPCB Recycler (Hazardous CRT glass recovery)',
      threeDType: 'tv',
    },
    cables: {
      name: '38kg Heavy Industrial Copper Cables',
      samplePhoto: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      tag: 'Non-Ferrous High Purity',
      brandDetected: 'Polycab 4-Core Armored Spec',
      dimensions: '18mm Dia x 25m Coil (38.0 kg Net)',
      purity: '98.5% Pure Bright Bare Copper Core',
      marketQuote: '₹19,760 (@ ₹520/kg MCX London Metal Exchange Spot)',
      middlemanCutSaved: '₹3,420 saved (Local scrap buyer quoted ₹430/kg)',
      verdict: 'Authorized Direct Sale (Mechanical stripping, No burning)',
      threeDType: 'cables',
    },
    dishtv: {
      name: 'DishTV Parabolic Satellite Antenna & Set',
      samplePhoto: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
      tag: 'Ferrous & Parabolic Structure',
      brandDetected: 'DishTV Ku-Band Parabolic Array',
      dimensions: '650mm Elliptical Dish (14.2 kg)',
      purity: 'Galvanized Sheet Iron + Aluminum LNB feed horn',
      marketQuote: '₹880 Scrap OR ₹2,400 DIY Solar Cooker Value!',
      middlemanCutSaved: 'Dual Option: Direct Aggregator or ReCraft in CreateOwn',
      verdict: 'ReCraft into Solar Cooker / Birdbath via CreateOwn',
      threeDType: 'dishtv',
    },
    phone: {
      name: 'Samsung Galaxy A-Series 4G Smartphone',
      samplePhoto: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      tag: 'Refurbish Opportunity',
      brandDetected: 'Samsung Exynos SM-A205 Core',
      dimensions: '158 x 74 x 7.8 mm (180g)',
      purity: 'Fully intact logic board + dead battery & cracked glass',
      marketQuote: 'Scrap: ₹350 ➔ Refurbished Value: ₹2,400!',
      middlemanCutSaved: '+₹2,050 Extra Value by Refurbishing without middleman',
      verdict: 'Send to Refurbish Lab (DO NOT CRUSH FOR SCRAP)',
      threeDType: 'phone',
    },
  };

  const steps = [
    {
      title: 'Seller Photo Capture & Multi-Angle Scan',
      desc: 'Collector photographs old material with phone camera. Laser grid calculates geometry & bulk volume.',
      icon: Scan,
      badge: 'Multimodal AI Vision',
    },
    {
      title: 'Multimodal Agentic Feature Extraction',
      desc: 'Neural matrix extracts Brand, Model, Dimensions, Material purity grade, and detects hazardous components.',
      icon: Cpu,
      badge: 'Vision-Language AI',
    },
    {
      title: 'Procedural 3D Digital Twin Reconstruction',
      desc: 'Instant CAD digital twin rendered in 3D. Exploded layer view enables verification of copper coils, logic boards, and battery.',
      icon: Box,
      badge: 'Interactive 3D Engine',
    },
    {
      title: 'Real-Time Price Discovery & Valuation Ticker',
      desc: 'Agent benchmarks against live MCX metals spot prices & CPCB E-Waste registry to guarantee zero middleman deductions.',
      icon: TrendingUp,
      badge: 'MCX & CPCB Live Index',
    },
    {
      title: 'Direct Recycler / Refurbish Match & Payout',
      desc: 'Matches top-rated authorized recyclers or refurbishers. Generates tamper-proof QR handover certificate and instant UPI payout.',
      icon: ShieldCheck,
      badge: 'Zero-Middleman Handover',
    },
  ];

  // Auto-play steps simulation
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % steps.length);
          return 0;
        }
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, steps.length]);

  if (!isOpen) return null;

  const currentData = demoPresets[selectedDemo];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#07130D] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-900/50 bg-[#0A1A12]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100 font-display">
                  ScrapSense AI: Live Demonstration & 3D Reconstruction
                </h3>
                <span className="text-[11px] font-mono-code bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  AGENTIC VIDEO DEMO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Witness how user photo uploads turn into interactive 3D digital twins & real-time fair market pricing
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

        {/* Demo Selector Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#050C08] border-b border-emerald-950 overflow-x-auto">
          <span className="text-xs text-slate-400 font-mono-code uppercase mr-2">Select Material Sample:</span>
          {(['tv', 'cables', 'dishtv', 'phone'] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedDemo(key);
                setActiveStep(0);
                setPlaybackProgress(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDemo === key
                  ? 'bg-emerald-500 text-black font-semibold shadow-md'
                  : 'bg-[#0B1E15] text-slate-300 hover:bg-[#122A1E] border border-emerald-900/40'
              }`}
            >
              {key === 'tv' && '📺 CRT Television'}
              {key === 'cables' && '🔌 Long Copper Cables'}
              {key === 'dishtv' && '📡 DishTV Antenna'}
              {key === 'phone' && '📱 Old Phone (Refurbish)'}
            </button>
          ))}
        </div>

        {/* Main Stage: Left is Visual Stage, Right is AI Extraction Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-emerald-900/40">
          {/* Left Visual Area (7 Cols) */}
          <div className="lg:col-span-7 p-5 bg-[#060D0A] flex flex-col justify-between relative min-h-[380px] sm:min-h-[460px]">
            {/* Step Badge */}
            <div className="flex items-center justify-between mb-3 z-10">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                STAGE {activeStep + 1}/5: {steps[activeStep].badge}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2.5 py-1 rounded-md bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 text-xs flex items-center gap-1 border border-emerald-500/30"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => {
                    setActiveStep(0);
                    setPlaybackProgress(0);
                  }}
                  className="p-1 rounded-md bg-emerald-950 hover:bg-emerald-900 text-slate-300 text-xs border border-emerald-900"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Canvas content based on step */}
            <div className="relative flex-1 flex items-center justify-center rounded-2xl overflow-hidden border border-emerald-900/40 bg-[#081710]">
              {activeStep === 0 && (
                <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
                  <img
                    src={currentData.samplePhoto}
                    alt={currentData.name}
                    className="max-h-72 w-auto rounded-xl object-cover shadow-2xl border border-emerald-500/40"
                  />
                  {/* Laser Scan Grid Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/15 to-transparent animate-pulse pointer-events-none" />
                  <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-emerald-400 shadow-[0_0_15px_#00f59b] animate-bounce" />
                  <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1.5 rounded-lg border border-emerald-500/50 text-xs font-mono-code text-emerald-300">
                    📷 USER-INPUT PHOTO SCANNED: {currentData.name}
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="relative w-full h-full min-h-[300px] p-6 flex flex-col justify-center gap-3">
                  <div className="text-xs font-mono-code text-emerald-400 mb-1">
                    ⚡ AGENTIC VISION-LANGUAGE PARSER (GEMINI MULTIMODAL):
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-black/60 rounded-xl border border-emerald-900">
                      <span className="text-slate-400 block text-[10px]">RECOGNIZED BRAND & MODEL</span>
                      <span className="font-bold text-emerald-300 text-sm">{currentData.brandDetected}</span>
                    </div>
                    <div className="p-3 bg-black/60 rounded-xl border border-emerald-900">
                      <span className="text-slate-400 block text-[10px]">PHYSICAL DIMENSIONS & MASS</span>
                      <span className="font-bold text-cyan-300 text-sm">{currentData.dimensions}</span>
                    </div>
                    <div className="p-3 bg-black/60 rounded-xl border border-emerald-900">
                      <span className="text-slate-400 block text-[10px]">PURITY & VALUE CONCENTRATION</span>
                      <span className="font-semibold text-amber-300">{currentData.purity}</span>
                    </div>
                    <div className="p-3 bg-black/60 rounded-xl border border-emerald-900">
                      <span className="text-slate-400 block text-[10px]">AI VERDICT & PATHWAY</span>
                      <span className="font-bold text-emerald-400">{currentData.verdict}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-xs text-slate-400 font-mono-code bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                    Confidence: 96.8% • Zero hallucination guard active • 3D Mesh generated
                  </div>
                </div>
              )}

              {(activeStep === 2 || activeStep === 3 || activeStep === 4) && (
                <div className="w-full h-full min-h-[300px] flex flex-col justify-center relative">
                  <ThreeDProductViewer
                    modelType={currentData.threeDType}
                    height="h-72 sm:h-80"
                    showHud={true}
                    interactive={true}
                  />
                  {activeStep === 3 && (
                    <div className="absolute top-12 left-4 bg-black/85 border border-emerald-500 px-3 py-2 rounded-xl text-xs backdrop-blur-md">
                      <div className="text-emerald-400 font-mono-code font-bold">MCX SPOT BENCHMARK:</div>
                      <div className="text-white font-bold text-sm">{currentData.marketQuote}</div>
                      <div className="text-[10px] text-emerald-300">Live verified directly from registry</div>
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className="absolute top-12 right-4 bg-black/85 border border-amber-500 px-3 py-2 rounded-xl text-xs backdrop-blur-md">
                      <div className="text-amber-400 font-mono-code font-bold">ZERO MIDDLEMAN BENEFIT:</div>
                      <div className="text-emerald-300 font-bold">{currentData.middlemanCutSaved}</div>
                      <div className="text-[10px] text-slate-300">Handover QR Ready</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Video Progress Bar */}
            <div className="mt-3">
              <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-100"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400 font-mono-code">
                <span>{steps[activeStep].title}</span>
                <span>{Math.round(playbackProgress)}%</span>
              </div>
            </div>
          </div>

          {/* Right Explanation & Step Flow (5 Cols) */}
          <div className="lg:col-span-5 p-5 bg-[#091811] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-emerald-900/50">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-mono-code mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                Pipeline Execution Steps
              </h4>

              <div className="space-y-2.5">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCurrent = idx === activeStep;
                  const isDone = idx < activeStep;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveStep(idx);
                        setPlaybackProgress(0);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        isCurrent
                          ? 'bg-emerald-500/20 border-emerald-500 shadow-lg'
                          : isDone
                          ? 'bg-black/30 border-emerald-900/60 opacity-80'
                          : 'bg-black/10 border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                          isCurrent
                            ? 'bg-emerald-400 text-black shadow-md'
                            : isDone
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-semibold ${
                              isCurrent ? 'text-white' : 'text-slate-300'
                            }`}
                          >
                            {step.title}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Key Benefit Banner */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 to-black border border-emerald-500/30">
              <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                100% Transparent Price Guarantee
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Informal collectors gain direct access to official authorized smelter quotes without losing 20-40% to local middlemen.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3.5 bg-[#0A1A12] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono-code">
            Ready to test your own materials? Click <span className="text-emerald-400">"Create New Lot"</span> or chat with ScrapSense AI.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Close & Explore App</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
