import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Send, Bot, User, Sparkles, Upload, Camera, Layers, 
  ExternalLink, CheckCircle2, TrendingUp, AlertCircle, Wrench, 
  Tv, Cable, Radio, Smartphone, Play, HelpCircle
} from 'lucide-react';
import { ChatMessage, AgentAnalysisResult } from '../types';
import { INITIAL_CHAT_MESSAGES, SAMPLE_ANALYSIS_PRESETS } from '../data/mockData';
import { ThreeDProductViewer } from './ThreeDProductViewer';

interface AgenticChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVideoDemo: () => void;
  onNavigateToTab?: (tab: 'home' | 'sell' | 'createown' | 'recyclers' | 'dashboard') => void;
}

export const AgenticChatModal: React.FC<AgenticChatModalProps> = ({
  isOpen,
  onClose,
  onOpenVideoDemo,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnalyzing]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query && !selectedPhotoPreview) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query || 'Uploaded photo for material analysis and price estimation',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mediaUrl: selectedPhotoPreview || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setSelectedPhotoPreview(null);
    setIsAnalyzing(true);

    // AI Analysis simulation
    setTimeout(() => {
      let analysisResult: AgentAnalysisResult | undefined;
      let replyText = '';
      let suggestedPrompts: string[] = [];
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('tv') || lowerQuery.includes('crt') || lowerQuery.includes('television')) {
        analysisResult = SAMPLE_ANALYSIS_PRESETS.tv;
        replyText = `I have analyzed your CRT Television. Cathode ray tube units have a heavy copper deflection yoke (1.4kg) and lead-silicate funnel glass. According to the CPCB e-waste registry, this lot is worth ₹1,550 – ₹1,750. Please do not break the glass manually!`;
        suggestedPrompts = ['🚚 Book Authorized Recycler', '🔍 Inspect 3D Deflection Coil', '📜 Generate Handover Receipt'];
      } else if (lowerQuery.includes('cable') || lowerQuery.includes('wire') || lowerQuery.includes('copper')) {
        analysisResult = SAMPLE_ANALYSIS_PRESETS.cables;
        replyText = `Identified Grade-1 Heavy Armored Copper Cables. Net weight analyzed at ~38kg. Current MCX London Metal Exchange Spot rate for pure electrolytic copper is ₹520/kg. Total estimated lot payout: ₹19,200 – ₹20,400 with zero middleman fee!`;
        suggestedPrompts = ['🚚 Request Doorstep Pickup', '🎨 How to recraft cables in CreateOwn', '📊 View 7-Day Copper Price Trend'];
      } else if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('repair')) {
        analysisResult = SAMPLE_ANALYSIS_PRESETS.phone;
        replyText = `⭐ SMART ADVISOR: Do NOT crush this phone for scrap (only ₹350)! The motherboard and Exynos processor are completely healthy. If you send it to a verified refurbisher for screen & battery revival, it sells for ₹2,100 – ₹2,400. That gives you +₹1,800 extra earnings!`;
        suggestedPrompts = ['🛠️ Connect with Refurbish Lab', '📱 View Phone 3D Exploded Layers', '💰 Compare Scrap vs Refurbish'];
      } else if (lowerQuery.includes('dish') || lowerQuery.includes('antenna')) {
        analysisResult = SAMPLE_ANALYSIS_PRESETS.dishtv;
        replyText = `Identified DishTV Parabolic Satellite Antenna lot. Raw metal scrap is ₹800 – ₹920. Alternatively, you can convert this dish into an outdoor Solar Sun Cooker or birdbath in CreateOwn, which has a finished craft value of ₹2,400+!`;
        suggestedPrompts = ['🎨 Open CreateOwn Solar Cooker Tutorial', '🚚 Sell to Metal Scrap Dealer', '✨ 3D Inspect Satellite Dish'];
      } else if (lowerQuery.includes('plastic') || lowerQuery.includes('bottle') || lowerQuery.includes('createown')) {
        replyText = `Great inquiry! In our "CreateOwn" studio, you can recraft plastic bottles into self-watering hydroponic planters or vertical herb towers, and turn damaged soft toys into ergonomic floor cushions! Check our step-by-step YouTube tutorials in CreateOwn.`;
        suggestedPrompts = ['🍾 Explore CreateOwn Tutorials', '🧸 Soft Toy Upcycling Ideas', '🔌 Copper Wire Bonsai Tree'];
      } else {
        analysisResult = SAMPLE_ANALYSIS_PRESETS.pcb;
        replyText = `I have run deep agentic analysis on your input. Detected high-grade computer PCBs & electronics. Estimated fair valuation is ₹2,100 – ₹2,350 based on current precious metal recovery indices (Gold, Silver, Palladium).`;
        suggestedPrompts = ['🔍 3D Exploded View', '🚚 Authorized Recyclers nearby', '💰 Today’s Scrap Rate Board'];
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: analysisResult,
        has3DPreview: Boolean(analysisResult),
        suggestedPrompts,
      };

      setMessages((prev) => [...prev, botReply]);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleQuickPreset = (type: 'tv' | 'cables' | 'dishtv' | 'phone') => {
    if (type === 'tv') handleSendMessage('Analyze this Sony CRT TV scrap lot');
    if (type === 'cables') handleSendMessage('Check current price for 38kg copper cables');
    if (type === 'phone') handleSendMessage('Should I sell this old phone for scrap or repair?');
    if (type === 'dishtv') handleSendMessage('Check rate for DishTV antenna lot');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-4xl h-[92vh] max-h-[850px] bg-[#07130D] border border-emerald-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#091A11] border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#07130D] rounded-[14px] flex items-center justify-center text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#07130D] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100 font-display">
                  ScrapSense Agentic AI (कबाड़-मित्र)
                </h3>
                <span className="text-[10px] font-mono-code bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  MCX & CPCB SYNC
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live Brand, Purity & 3D Geometry Analysis • Zero Middleman Margin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenVideoDemo}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Watch AI Video Demo</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-emerald-900/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Material Presets Ticker */}
        <div className="px-4 py-2 bg-[#050C08] border-b border-emerald-950 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] font-mono-code shrink-0">Instant Test:</span>
          <button
            onClick={() => handleQuickPreset('tv')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C2218] hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 shrink-0"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Old CRT TV</span>
          </button>
          <button
            onClick={() => handleQuickPreset('cables')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C2218] hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 shrink-0"
          >
            <Cable className="w-3.5 h-3.5" />
            <span>38kg Copper Cables</span>
          </button>
          <button
            onClick={() => handleQuickPreset('phone')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C2218] hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/60 shrink-0"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Old Phone (Repair vs Scrap)</span>
          </button>
          <button
            onClick={() => handleQuickPreset('dishtv')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C2218] hover:bg-amber-900/60 text-amber-300 border border-amber-800/60 shrink-0"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>DishTV Antenna</span>
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#060D0A]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-[#0E281C] text-emerald-400 border border-emerald-600/40'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2">
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-black font-medium shadow-md rounded-tr-none'
                        : 'bg-[#0B1E15] text-slate-200 border border-emerald-900/70 shadow-lg rounded-tl-none'
                    }`}
                  >
                    {msg.mediaUrl && (
                      <div className="mb-2.5 rounded-xl overflow-hidden border border-emerald-800">
                        <img src={msg.mediaUrl} alt="Uploaded material" className="max-h-48 w-full object-cover" />
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1.5 ${
                        msg.sender === 'user' ? 'text-black/70' : 'text-slate-400 font-mono-code'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Multimodal Analysis Card with 3D Preview if available */}
                  {msg.analysis && (
                    <div className="p-4 rounded-2xl bg-[#081810] border border-emerald-500/40 shadow-xl space-y-3">
                      {/* Analysis Header */}
                      <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono-code">
                            AI Multimodal Diagnostics
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-code bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                          Confidence: {msg.analysis.confidenceScore}%
                        </span>
                      </div>

                      {/* Key Attributes Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-black/50 p-2.5 rounded-xl border border-emerald-900/40">
                          <span className="text-slate-400 block text-[10px]">DETECTED BRAND & MODEL</span>
                          <span className="font-bold text-slate-100">{msg.analysis.brand}</span>
                          <span className="text-[11px] text-emerald-400 block truncate">{msg.analysis.model}</span>
                        </div>
                        <div className="bg-black/50 p-2.5 rounded-xl border border-emerald-900/40">
                          <span className="text-slate-400 block text-[10px]">ESTIMATED MASS & SIZE</span>
                          <span className="font-bold text-cyan-300 text-sm">~{msg.analysis.estimatedWeightKg} KG</span>
                          <span className="text-[10px] text-slate-400 block truncate">{msg.analysis.dimensions}</span>
                        </div>
                      </div>

                      {/* Interactive 3D Product Twin Viewport */}
                      {msg.has3DPreview && (
                        <div className="mt-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              Interactive 3D Digital Twin (Rotate, Explode & Inspect)
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono-code">360° Touch CAD</span>
                          </div>
                          <ThreeDProductViewer
                            modelType={msg.analysis.model3DType}
                            height="h-56 sm:h-64"
                            showHud={true}
                          />
                        </div>
                      )}

                      {/* Valuation Box */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-[#0C2419] to-[#081A12] border border-emerald-500/50 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-300 block">MCX & CPCB FAIR VALUE</span>
                          <div className="text-lg sm:text-xl font-bold text-emerald-400 font-display">
                            ₹{msg.analysis.predictedPriceMin.toLocaleString()} – ₹{msg.analysis.predictedPriceMax.toLocaleString()}
                          </div>
                          <span className="text-[10px] text-slate-400">Zero middleman cut • Direct payout</span>
                        </div>

                        <div className="text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              msg.analysis.decisionRecommendation === 'direct_repair'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                                : msg.analysis.decisionRecommendation === 'create_own_diy'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                            }`}
                          >
                            {msg.analysis.decisionRecommendation === 'direct_repair' && '🛠️ High Repair Value'}
                            {msg.analysis.decisionRecommendation === 'create_own_diy' && '🎨 ReCraft in CreateOwn'}
                            {msg.analysis.decisionRecommendation === 'sell_recycle' && '♻️ Certified Recycler'}
                          </span>
                        </div>
                      </div>

                      {/* Strategic Recommendation */}
                      <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-950 text-xs">
                        <span className="font-semibold text-emerald-300 block mb-0.5">Recommendation:</span>
                        <p className="text-slate-300 leading-snug">{msg.analysis.decisionRationale}</p>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.analysis.decisionRecommendation === 'create_own_diy' && onNavigateToTab && (
                          <button
                            onClick={() => {
                              onNavigateToTab('createown');
                              onClose();
                            }}
                            className="px-3.5 py-1.8 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <span>Open CreateOwn Tutorials</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {onNavigateToTab && (
                          <button
                            onClick={() => {
                              onNavigateToTab('sell');
                              onClose();
                            }}
                            className="px-3.5 py-1.8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <span>Create Official Lot Now</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Suggested Quick Prompts */}
                  {msg.suggestedPrompts && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#0E281C] hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing / Analyzing state */}
          {isAnalyzing && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0E281C] border border-emerald-600/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-[#0B1E15] border border-emerald-900 text-xs text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ScrapSense analyzing item geometry, live MCX metals spot prices & CPCB registries...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#091A11] border-t border-emerald-900/60">
          {selectedPhotoPreview && (
            <div className="mb-2 flex items-center gap-2 bg-black/60 p-2 rounded-xl border border-emerald-900 w-fit">
              <img src={selectedPhotoPreview} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
              <div className="text-xs text-slate-300">Photo attached for 3D scan</div>
              <button
                onClick={() => setSelectedPhotoPreview(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedPhotoPreview('https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80');
                  setInputText('Inspect this CRT Television and predict copper yoke value');
                }}
                title="Simulate Camera Capture"
                className="p-2.5 rounded-xl bg-[#0B1E15] hover:bg-[#123122] text-emerald-400 border border-emerald-900/60 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything or describe item (e.g., '35kg copper cables rate in Pune')..."
              className="flex-1 bg-[#050C08] border border-emerald-900/80 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
            />

            <button
              type="submit"
              disabled={!inputText.trim() && !selectedPhotoPreview}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-black font-bold transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
