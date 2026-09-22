/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, Language, RoleMode } from './types';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { CreateLotWizard } from './components/CreateLotWizard';
import { CreateOwnSection } from './components/CreateOwnSection';
import { RecyclerDirectory } from './components/RecyclerDirectory';
import { DashboardScreen } from './components/DashboardScreen';
import { AgenticChatModal } from './components/AgenticChatModal';
import { AiDemoVideoModal } from './components/AiDemoVideoModal';
import { RecyclerDashboardModal } from './components/RecyclerDashboardModal';
import { Bot, Play, Recycle, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [roleMode, setRoleMode] = useState<RoleMode>('collector');

  // Modals state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isRecyclerModalOpen, setIsRecyclerModalOpen] = useState<boolean>(false);
  const [videoDemoPreset, setVideoDemoPreset] = useState<'tv' | 'cables' | 'dishtv' | 'phone'>('tv');

  const handleOpenVideoDemoWithPreset = (preset: 'tv' | 'cables' | 'dishtv' | 'phone' = 'tv') => {
    setVideoDemoPreset(preset);
    setIsVideoDemoOpen(true);
  };

  const handleToggleRoleMode = () => {
    if (roleMode === 'collector') {
      setRoleMode('recycler');
      setIsRecyclerModalOpen(true);
    } else {
      setRoleMode('collector');
    }
  };

  return (
    <div className="min-h-screen bg-[#050C08] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black font-sans">
      {/* Top Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onChangeLanguage={setLanguage}
        roleMode={roleMode}
        onToggleRoleMode={handleToggleRoleMode}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenVideoDemo={() => handleOpenVideoDemoWithPreset('tv')}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'home' && (
          <HomeScreen
            language={language}
            onNavigate={setCurrentTab}
            onOpenChat={() => setIsChatOpen(true)}
            onOpenVideoDemo={() => handleOpenVideoDemoWithPreset('tv')}
            onQuickInspect3D={(model) => {
              if (model === 'tv' || model === 'cables' || model === 'dishtv' || model === 'phone') {
                handleOpenVideoDemoWithPreset(model);
              } else {
                setIsChatOpen(true);
              }
            }}
          />
        )}

        {currentTab === 'sell' && (
          <CreateLotWizard
            language={language}
            onLotCreated={(lot) => {
              // lot created
            }}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'createown' && (
          <CreateOwnSection language={language} />
        )}

        {currentTab === 'recyclers' && (
          <RecyclerDirectory />
        )}

        {currentTab === 'dashboard' && (
          <DashboardScreen
            language={language}
            onOpenVideoDemo={() => handleOpenVideoDemoWithPreset('tv')}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}
      </main>

      {/* Floating ScrapSense AI Trigger Button */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => handleOpenVideoDemoWithPreset('tv')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#081F14]/90 hover:bg-[#0E3523] border border-cyan-500/50 text-cyan-300 backdrop-blur-xl shadow-2xl text-xs font-bold transition-all hover:scale-105"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Watch 3D AI Demo</span>
        </button>

        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-black font-extrabold text-sm shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-black animate-ping" />
          </div>
          <span>Ask ScrapSense AI</span>
          <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/20 text-[10px] uppercase font-mono-code">
            Live
          </span>
        </button>
      </aside>

      {/* Modals */}
      <AgenticChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenVideoDemo={() => {
          setIsChatOpen(false);
          setIsVideoDemoOpen(true);
        }}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          setIsChatOpen(false);
        }}
      />

      <AiDemoVideoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        presetItem={videoDemoPreset}
      />

      <RecyclerDashboardModal
        isOpen={isRecyclerModalOpen}
        onClose={() => {
          setIsRecyclerModalOpen(false);
          setRoleMode('collector');
        }}
      />

      {/* Footer */}
      <footer className="w-full border-t border-emerald-950 bg-[#040A07] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">KabaadSetu (कबाड़-सेतु)</span>
            <span>— Bringing the Informal Collector into the Formal Recycling Chain</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              CPCB E-Waste Registered
            </span>
            <span>•</span>
            <span>Zero Broker Fee</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono-code">MCX Metal Spot Sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
