/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AiLabsSection } from './components/AiLabsSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LiveProductionSection } from './components/LiveProductionSection';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { FlagshipProject } from './data/portfolioData';

interface DemoModalState {
  project: FlagshipProject;
  chapterIndex: number;
  autoPlay: boolean;
}

export default function App() {
  const [demoModal, setDemoModal] = useState<DemoModalState | null>(null);

  const handleOpenProjectDemo = (
    project: FlagshipProject,
    chapterIndex = 0,
    autoPlay = false,
  ) => {
    setDemoModal({ project, chapterIndex, autoPlay });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#05070D] text-slate-100">
      {/* Subtle Ambient Radial Lighting + Crisp Engineering Dot-Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="bg-engineering-grid absolute inset-0 opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[540px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.11)_0%,rgba(59,130,246,0.06)_45%,transparent_75%)] blur-3xl" />
        <div className="absolute top-[38%] -right-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.09)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] -left-40 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Main Content Shell */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <LiveProductionSection onOpenProjectDemo={handleOpenProjectDemo} />
          <AiLabsSection onOpenProjectDemo={handleOpenProjectDemo} />
          <SkillsSection />
          <ArchitectureSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {/* Unified Interactive "Inspect & Watch Demo" Phone Modal */}
      <ProjectModal
        project={demoModal?.project ?? null}
        initialChapterIndex={demoModal?.chapterIndex ?? 0}
        autoPlayOnOpen={demoModal?.autoPlay ?? false}
        onClose={() => setDemoModal(null)}
      />
    </div>
  );
}
