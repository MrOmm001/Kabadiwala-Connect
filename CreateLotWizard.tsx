import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Camera, Upload, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, 
  Layers, ArrowRight, ShieldCheck, QrCode, Phone, MapPin, Truck, RefreshCw, Box
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, MaterialKey, RecyclerFacility } from '../types';
import { SCRAP_PRICES, AUTHORIZED_RECYCLERS } from '../data/mockData';
import { ThreeDProductViewer } from './ThreeDProductViewer';

interface CreateLotWizardProps {
  language: Language;
  onLotCreated: (lot: any) => void;
  onNavigateToDashboard: () => void;
}

export const CreateLotWizard: React.FC<CreateLotWizardProps> = ({
  language,
  onLotCreated,
  onNavigateToDashboard,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  );
  const [selectedMaterialKey, setSelectedMaterialKey] = useState<MaterialKey>('cables');
  const [weightKg, setWeightKg] = useState<number>(25);
  const [condition, setCondition] = useState<'Good (Repairable)' | 'Standard Scrap' | 'Damaged/Mixed'>('Standard Scrap');
  const [pickupRequired, setPickupRequired] = useState<boolean>(true);
  const [matchedRecycler, setMatchedRecycler] = useState<RecyclerFacility>(AUTHORIZED_RECYCLERS[0]);
  const [createdLotCode, setCreatedLotCode] = useState<string | null>(null);

  const activePriceObj = SCRAP_PRICES.find((p) => p.key === selectedMaterialKey) || SCRAP_PRICES[0];
  const calculatedEstimatedValue = Math.round(weightKg * activePriceObj.currentRate);

  const samplePresets = [
    {
      key: 'cables' as MaterialKey,
      label: '🔌 Long Copper Cables',
      img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      weight: 38,
    },
    {
      key: 'tv' as MaterialKey,
      label: '📺 Old CRT TV',
      img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80',
      weight: 20,
    },
    {
      key: 'dishtv' as MaterialKey,
      label: '📡 DishTV Antenna',
      img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
      weight: 15,
    },
    {
      key: 'phone' as MaterialKey,
      label: '📱 Old Phone (Refurbish)',
      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      weight: 1,
    },
    {
      key: 'pcb' as MaterialKey,
      label: '🟩 Motherboard PCBs',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      weight: 12,
    },
  ];

  const handleSelectPreset = (preset: typeof samplePresets[0]) => {
    setSelectedMaterialKey(preset.key);
    setSelectedPhoto(preset.img);
    setWeightKg(preset.weight);
  };

  const handleFinishLot = () => {
    const lotId = `KC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedLotCode(lotId);
    onLotCreated({
      id: lotId,
      material: activePriceObj.name,
      category: selectedMaterialKey,
      weightKg,
      condition,
      estimatedValue: calculatedEstimatedValue,
      matchedRecycler: matchedRecycler.name,
      pickupRequested: pickupRequired,
      photoUrl: selectedPhoto,
      createdAt: 'Just now',
    });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f59b', '#00d2ff', '#ffb800'],
      });
    } catch (e) {}
  };

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-8">
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>MATERIAL LOT CREATION • 5-STEP STREAMLINED WIZARD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Create New E-Waste & Scrap Handover Lot
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Photograph your materials, let ScrapSense AI calculate volume & purity, and match with verified CPCB recyclers in seconds.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-5 gap-2">
        {[
          { num: 1, label: 'Photograph' },
          { num: 2, label: 'AI Category' },
          { num: 3, label: 'Weight (KG)' },
          { num: 4, label: 'Condition' },
          { num: 5, label: 'Valuation & 3D' },
        ].map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <div key={step.num} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-500/30'
                    : isDone
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-[#091C13] text-slate-500 border border-emerald-950'
                }`}
              >
                {isDone ? '✓' : step.num}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 text-center truncate w-full">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP CONTAINER */}
      <div className="rounded-3xl bg-[#081810] border border-emerald-900/60 p-6 sm:p-8 shadow-2xl">
        {/* STEP 1: Photograph & Material Scan */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Step 1: Capture or Select Material Photo
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Take a clear photo of your scrap lot. ScrapSense AI uses edge detection to measure wire thickness, CRT glass type, and PCB density.
              </p>
            </div>

            {/* Photo Preview Stage */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-900/80 bg-black aspect-video max-h-72 flex items-center justify-center">
              <img
                src={selectedPhoto}
                alt="Selected material preview"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-mono-code text-emerald-300 bg-black/80 px-3 py-1 rounded-lg border border-emerald-500/40">
                  📷 CAMERA READY • HIGH CONTRAST SCAN
                </span>
              </div>
            </div>

            {/* Quick Sample Preset Buttons */}
            <div>
              <span className="text-xs text-slate-400 font-mono-code block mb-2">
                Or Select from Standard Scrap Presets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.key}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      selectedMaterialKey === preset.key
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-[#06120C] border-emerald-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Run AI Classification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: AI Category Classification */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Step 2: AI Classification & Purity Grade
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                ScrapSense AI identified this material. Confirm the classification or pick a different category below.
              </p>
            </div>

            {/* AI Confidence Banner */}
            <div className="p-4 rounded-2xl bg-[#0B2519] border border-emerald-500/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-mono-code font-bold">
                    AI CLASSIFICATION DETECTED:
                  </div>
                  <div className="text-base font-bold text-white font-display">
                    {activePriceObj.name}
                  </div>
                  <div className="text-xs text-slate-300">{activePriceObj.purityGrade}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-black font-bold text-xs">
                  96.4% Confidence
                </span>
                <span className="block text-[10px] text-slate-400 mt-1 font-mono-code">
                  Zero Middleman Margin
                </span>
              </div>
            </div>

            {/* Material Category Switcher Grid */}
            <div>
              <span className="text-xs text-slate-400 font-mono-code block mb-2">
                Need to change? Select category:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SCRAP_PRICES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedMaterialKey(cat.key)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedMaterialKey === cat.key
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-md'
                        : 'bg-[#06120C] border-emerald-950 hover:border-emerald-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-200">{cat.name}</div>
                    <div className="text-sm font-bold text-emerald-400 mt-1">
                      ₹{cat.currentRate} <span className="text-[10px] text-slate-400">{cat.unit}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-emerald-950">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Proceed to Weight</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Weight Calculator */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Step 3: Approximate Weight Estimation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter approximate kilogram weight. The recycler will perform final calibration at their weighbridge.
              </p>
            </div>

            {/* Big Numeric Display */}
            <div className="p-8 rounded-3xl bg-[#06120C] border border-emerald-900/80 text-center space-y-4">
              <span className="text-xs font-mono-code text-slate-400 uppercase">Estimated Mass</span>
              <div className="text-5xl sm:text-6xl font-black text-emerald-400 font-display">
                {weightKg} <span className="text-2xl text-slate-400 font-normal">KG</span>
              </div>

              {/* Slider */}
              <div className="max-w-md mx-auto pt-2">
                <input
                  type="range"
                  min="1"
                  max="150"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-emerald-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Quick Add Buttons */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {[+5, +10, +25, +50].map((inc) => (
                  <button
                    key={inc}
                    onClick={() => setWeightKg((prev) => Math.min(prev + inc, 200))}
                    className="px-3 py-1.5 rounded-xl bg-[#0A2216] hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 text-xs font-semibold transition-colors"
                  >
                    +{inc} KG
                  </button>
                ))}
                <button
                  onClick={() => setWeightKg(1)}
                  className="px-3 py-1.5 rounded-xl bg-black/40 text-slate-400 hover:text-white text-xs"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-emerald-950">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Select Condition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Condition Selection */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Step 4: Quality & Material Condition Grade
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Condition helps our algorithm decide if this material should be refurbished, recycled, or recrafted in CreateOwn.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: 'Good (Repairable)',
                  title: 'Good (Repairable / Refurbish)',
                  desc: 'Device powers on or board is intact. Higher payout when refurbished!',
                  tag: 'Refurbish Preferred',
                  color: 'cyan',
                },
                {
                  id: 'Standard Scrap',
                  title: 'Standard Scrap (Pure Raw Core)',
                  desc: 'Clean intact coils, bare wire, or unburned chassis ready for industrial smelting.',
                  tag: 'Full Spot Rate',
                  color: 'emerald',
                },
                {
                  id: 'Damaged/Mixed',
                  title: 'Damaged / Mixed Debris',
                  desc: 'Mixed with insulation, plastic casing, or minor corrosion.',
                  tag: 'Standard Sorting',
                  color: 'amber',
                },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCondition(c.id as any)}
                  className={`p-5 rounded-3xl border text-left flex flex-col justify-between space-y-4 transition-all ${
                    condition === c.id
                      ? 'bg-emerald-500/20 border-emerald-500 shadow-xl'
                      : 'bg-[#06120C] border-emerald-950 hover:border-emerald-800'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {c.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2.5">{c.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="text-xs font-bold text-emerald-400">
                    {condition === c.id ? '✓ Selected' : 'Tap to choose'}
                  </div>
                </button>
              ))}
            </div>

            {/* Pickup Option */}
            <div className="p-4 rounded-2xl bg-[#06120C] border border-emerald-950 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Doorstep Electric Tempo Pickup</div>
                  <div className="text-[11px] text-slate-400">Authorized recycler sends weighbridge van to your shop</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={pickupRequired}
                onChange={(e) => setPickupRequired(e.target.checked)}
                className="w-5 h-5 accent-emerald-400 rounded cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-emerald-950">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Calculate Valuation & 3D Twin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Final Quote, 3D Preview & Recycler Match */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Step 5: Fair Valuation Quote & 3D Digital Twin Inspection
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Official lot valuation guaranteed by CPCB & MCX spot benchmark. No hidden middleman deductions.
              </p>
            </div>

            {/* Valuation Card & 3D Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: 3D Twin */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 font-mono-code flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5" />
                    Interactive 3D Digital Twin
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-code">Rotate & Explode Layers</span>
                </div>
                <ThreeDProductViewer
                  modelType={activePriceObj.threeDType}
                  height="h-64 sm:h-72"
                  showHud={true}
                />
              </div>

              {/* Right: Quote Breakdown & Match */}
              <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0B2519] to-[#06130D] border border-emerald-500/50 shadow-xl space-y-3">
                  <span className="text-xs font-mono-code text-slate-400 uppercase">
                    ESTIMATED SPOT VALUE (ZERO BROKER FEE)
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display">
                    ₹{calculatedEstimatedValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-emerald-900/60">
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <strong className="text-white">₹{activePriceObj.currentRate} / kg</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Mass:</span>
                      <strong className="text-white">{weightKg} KG Net</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Index:</span>
                      <span className="text-emerald-400">{activePriceObj.marketSource}</span>
                    </div>
                  </div>
                </div>

                {/* Recycler Match */}
                <div className="p-4 rounded-2xl bg-[#06120C] border border-emerald-950 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>RECOMMENDED RECYCLER:</span>
                    <span className="text-emerald-400 font-bold">⭐ {matchedRecycler.reliabilityScore}/100 Score</span>
                  </div>
                  <div className="font-bold text-white text-sm">{matchedRecycler.name}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {matchedRecycler.distanceKm} km away
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      {matchedRecycler.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Action / Handover Complete Banner */}
            {createdLotCode ? (
              <div className="p-6 rounded-3xl bg-[#0A271B] border border-emerald-500 text-center space-y-3 shadow-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white font-display">
                  Lot Successfully Registered!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Lot ID <strong className="text-emerald-300">{createdLotCode}</strong> is now broadcasted to {matchedRecycler.name}. Handover pickup is confirmed.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={onNavigateToDashboard}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg transition-all"
                  >
                    View in Dashboard & Sale History
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center pt-4 border-t border-emerald-950">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={handleFinishLot}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-black font-extrabold text-sm flex items-center gap-2 shadow-xl transition-all"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirm Handover & Lock Price (₹{calculatedEstimatedValue.toLocaleString()})</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
