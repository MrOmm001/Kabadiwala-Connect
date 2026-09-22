import React from 'react';
import { 
  Recycle, Bot, Play, Sparkles, User, Building2, Globe, 
  Home, Camera, Scissors, ShieldCheck, DollarSign, Menu, X
} from 'lucide-react';
import { Language, RoleMode, TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  roleMode: RoleMode;
  onToggleRoleMode: () => void;
  onOpenChat: () => void;
  onOpenVideoDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onChangeLanguage,
  roleMode,
  onToggleRoleMode,
  onOpenChat,
  onOpenVideoDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { key: 'home' as TabType, label: 'Home', icon: Home },
    { key: 'sell' as TabType, label: 'Sell Lot', icon: Camera },
    { 
      key: 'createown' as TabType, 
      label: 'CreateOwn', 
      icon: Scissors, 
      badge: 'NEW DIY' 
    },
    { key: 'recyclers' as TabType, label: 'Recyclers', icon: ShieldCheck },
    { key: 'dashboard' as TabType, label: 'Dashboard', icon: DollarSign },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050E09]/90 backdrop-blur-xl border-b border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-400 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050E09] rounded-[14px] flex items-center justify-center text-emerald-400">
                <Recycle className="w-6 h-6 animate-spin-slow" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-white tracking-tight font-display">
                  Kabaad<span className="text-emerald-400">Setu</span>
                </span>
                <span className="text-[10px] font-mono-code font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  AI LIVE
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">
                कबाड़-सेतु • Circular Scrap Ecosystem
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#07170F] p-1.5 rounded-2xl border border-emerald-950">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-emerald-950/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono-code px-1.5 py-0.2 rounded-full uppercase ${
                        isActive
                          ? 'bg-black text-emerald-300'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#07170F] border border-emerald-950 text-xs font-semibold">
              {(['en', 'hi', 'mr'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onChangeLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    language === lang
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'म'}
                </button>
              ))}
            </div>

            {/* Role Toggle Switcher */}
            <button
              onClick={onToggleRoleMode}
              title="Switch between Collector and Recycler dashboard view"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081B12] hover:bg-[#0D2B1D] border border-emerald-900/80 text-xs font-semibold text-slate-300 transition-colors"
            >
              {roleMode === 'collector' ? (
                <>
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xl:inline">Collector (Ramesh)</span>
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden xl:inline">Recycler (GreenTech)</span>
                </>
              )}
            </button>

            {/* AI Video Demo Button */}
            <button
              onClick={onOpenVideoDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span className="hidden md:inline">AI Demo</span>
            </button>

            {/* ScrapSense AI FAB / Bot Trigger */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3.5 py-1.8 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>ScrapSense AI</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 rounded-xl bg-emerald-500 text-black font-bold"
            >
              <Bot className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#07170F] text-slate-300 border border-emerald-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#06140D] border-b border-emerald-900 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onSelectTab(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold ${
                    isActive
                      ? 'bg-emerald-500 text-black'
                      : 'bg-[#081A11] text-slate-300 border border-emerald-950'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-950 text-xs">
            <div className="flex items-center gap-1">
              {(['en', 'hi', 'mr'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onChangeLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    language === lang ? 'bg-emerald-500 text-black' : 'text-slate-400'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onOpenVideoDemo();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-cyan-400 font-bold"
            >
              Watch Video Demo ▶
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
