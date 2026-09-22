import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Play, Youtube, Clock, Award, CheckCircle2, ChevronRight, 
  Filter, Heart, Share2, Upload, ExternalLink, X, BookOpen, Layers,
  Lightbulb, Compass, Scissors, Recycle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DIYProject, Language } from '../types';
import { CREATE_OWN_PROJECTS } from '../data/mockData';

interface CreateOwnSectionProps {
  language: Language;
}

export const CreateOwnSection: React.FC<CreateOwnSectionProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<DIYProject | null>(null);
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});
  const [completedProjects, setCompletedProjects] = useState<Record<string, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submittedCreations, setSubmittedCreations] = useState<Array<{
    title: string;
    material: string;
    author: string;
    points: number;
    likes: number;
  }>>([
    {
      title: 'Balcony Vertical Herb Wall from 8 Sprite Bottles',
      material: 'Plastic Bottles',
      author: 'Sunita M. (Pune)',
      points: 240,
      likes: 89,
    },
    {
      title: 'Stripped 4-Core Copper Cable Dragon Figurine',
      material: 'Wire & Metal',
      author: 'Vikram K. (Pimpri)',
      points: 380,
      likes: 142,
    },
    {
      title: 'Plush Stuffed Bear into Ergonomic Office Lumbar Pillow',
      material: 'Damaged Soft Toys',
      author: 'Ramesh K. (Hadapsar)',
      points: 180,
      likes: 67,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newMaterial, setNewMaterial] = useState('Plastic Bottles');
  const [newAuthor, setNewAuthor] = useState('');

  const filterCategories = [
    { key: 'all', label: '🌟 All Upcycling DIYs' },
    { key: 'plastic_bottles', label: '🍾 Plastic Bottles' },
    { key: 'soft_toys', label: '🧸 Damaged Soft Toys' },
    { key: 'wire_metal', label: '🔌 Wire & Metal' },
    { key: 'dishtv_ewaste', label: '📡 DishTV & E-Waste' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? CREATE_OWN_PROJECTS
    : CREATE_OWN_PROJECTS.filter((p) => p.materialType === selectedCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCompleteProject = (proj: DIYProject) => {
    setCompletedProjects((prev) => ({ ...prev, [proj.id]: true }));
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f59b', '#00d2ff', '#ffb800'],
      });
    } catch (e) {
      // fallback
    }
  };

  const handleAddCommunitySubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setSubmittedCreations([
      {
        title: newTitle,
        material: newMaterial,
        author: newAuthor.trim() || 'Anonymous Recrafter',
        points: 200,
        likes: 1,
      },
      ...submittedCreations,
    ]);
    setNewTitle('');
    setNewAuthor('');
    setShowSubmitModal(false);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header for CreateOwn */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#072016] via-[#0B2A1E] to-[#06150E] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
          <Scissors className="w-48 h-48 text-emerald-300" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>CREATEOWN • REUSE, RECRAFT & UPCYCLE STUDIO</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Turn Scrap into Treasure with Hands-On <span className="text-emerald-400">YouTube Video Guides</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Don’t just sell scrap for pennies! Transform discarded <span className="text-emerald-400 font-semibold">plastic bottles</span> into self-watering gardens, <span className="text-cyan-300 font-semibold">damaged soft toys</span> into cloud floor poufs, <span className="text-amber-300 font-semibold">long cables & wire</span> into bonsai art, and <span className="text-emerald-300 font-semibold">DishTV antennas</span> into high-efficiency solar cookers.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Share Your DIY Creation (+200 EcoPoints)</span>
            </button>

            <a
              href="#diy-grid"
              className="px-4 py-2.5 rounded-xl bg-[#091C13] hover:bg-[#113123] text-emerald-300 border border-emerald-800/60 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Video Tutorials ({CREATE_OWN_PROJECTS.length})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Material Filters */}
      <div id="diy-grid" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
              selectedCategory === cat.key
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-[#081810] text-slate-300 hover:bg-[#0E281C] border border-emerald-950 hover:border-emerald-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isLiked = likedProjects[project.id];
          const isCompleted = completedProjects[project.id];

          return (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer rounded-3xl bg-[#07150E] border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/50 flex flex-col overflow-hidden"
            >
              {/* Thumbnail Container with Play Overlay */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07150E] via-transparent to-black/30" />

                {/* Material Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 text-xs font-semibold text-emerald-300">
                  <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.materialLabel}</span>
                </div>

                {/* Eco Points Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/40 text-xs font-bold text-amber-300">
                  <Award className="w-3.5 h-3.5" />
                  <span>+{project.ecoPoints} Pts</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 group-hover:bg-red-500 group-hover:scale-110 flex items-center justify-center text-white shadow-xl transition-all border-2 border-white/20">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded text-[11px] font-mono-code text-slate-300">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{project.timeEstimate}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        project.difficulty === 'Easy'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : project.difficulty === 'Intermediate'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {project.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono-code">
                      {project.steps.length} Simple Steps
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display line-clamp-2">
                    {language === 'hi' ? project.titleHi : language === 'mr' ? project.titleMr : project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Key materials preview */}
                <div className="pt-2 border-t border-emerald-950/80">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Uses:</span>
                    <span className="text-slate-300 truncate">{project.materialsList.slice(0, 2).join(', ')}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={(e) => handleLike(project.id, e)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${
                        isLiked
                          ? 'text-rose-400 bg-rose-500/10 border border-rose-500/30'
                          : 'text-slate-400 hover:text-white bg-black/30'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{project.userLikes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
                      <span>Watch & Recraft</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Recrafter Spotlight */}
      <div className="mt-12 rounded-3xl bg-[#081810] border border-emerald-900/60 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Community ReCraft Showcase
              </h2>
              <span className="text-xs font-mono-code bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                LIVE CREATIONS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Real informal collectors and makers turning scrap materials into useful household items
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold self-start sm:self-auto transition-all"
          >
            + Submit Your Project
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {submittedCreations.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#06110B] border border-emerald-950 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  {item.material}
                </span>
                <h4 className="text-sm font-bold text-slate-200 mt-2 line-clamp-2">
                  {item.title}
                </h4>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-emerald-950">
                <span>By {item.author}</span>
                <span className="text-amber-300 font-bold">+{item.points} EcoPts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal with Step-by-Step Guidance */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl bg-[#081810] border border-emerald-500/50 rounded-3xl shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-4 bg-[#0B2217] border-b border-emerald-900/60">
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span className="text-xs font-mono-code text-emerald-300 font-bold uppercase">
                    YOUTUBE VIDEO TUTORIAL • {activeProject.materialLabel}
                  </span>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-emerald-900/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed Section */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeProject.youtubeVideoId}?rel=0&modestbranding=1`}
                  title={activeProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Instructions & Materials Detail */}
              <div className="p-6 space-y-6 max-h-[40vh] overflow-y-auto">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    {activeProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {activeProject.summary}
                  </p>
                </div>

                {/* Materials Needed Checklist */}
                <div className="p-4 rounded-2xl bg-[#050E09] border border-emerald-900/60">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono-code mb-2.5 flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    Required Waste Materials & Tools
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProject.materialsList.map((mat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Procedure */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono-code">
                    Execution Steps
                  </h4>
                  {activeProject.steps.map((step) => (
                    <div
                      key={step.number}
                      className="p-3 rounded-xl bg-[#06120C] border border-emerald-950 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-100">{step.title}</div>
                        <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs italic text-emerald-300">
                  {activeProject.featuredQuote}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 py-4 bg-[#0A1F15] border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={activeProject.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Video in YouTube App</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCompleteProject(activeProject)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      completedProjects[activeProject.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedProjects[activeProject.id]
                        ? 'Completed! (+EcoPoints Claimed)'
                        : `I Made This! (+${activeProject.ecoPoints} Pts)`}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Submit Community DIY Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#081810] border border-emerald-500/50 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-display">
                  Share Your ReCraft Creation
                </h3>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCommunitySubmission} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Creation Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Copper Wire Pen Stand or Bottle Planter"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#050C08] border border-emerald-900 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Waste Material Used
                  </label>
                  <select
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    className="w-full bg-[#050C08] border border-emerald-900 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Plastic Bottles">Plastic Bottles</option>
                    <option value="Damaged Soft Toys">Damaged Soft Toys</option>
                    <option value="Wire & Metal">Wire & Metal</option>
                    <option value="DishTV & E-Waste">DishTV & E-Waste</option>
                    <option value="Cardboard & Mixed">Cardboard & Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh (Pune)"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#050C08] border border-emerald-900 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900 text-xs text-emerald-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You will instantly earn +200 Green Karma EcoPoints on submission!</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-lg"
                >
                  Publish to Community Showcase
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
