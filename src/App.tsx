/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AiLabsSection } from './components/AiLabsSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { CaseStudyDrawer } from './components/CaseStudyDrawer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LiveProductionSection } from './components/LiveProductionSection';
import { Navbar } from './components/Navbar';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { Tarak3DStudioSection } from './components/Tarak3DStudioSection';
import { FlagshipProject } from './data/portfolioData';

interface DemoModalState {
  project: FlagshipProject;
  chapterIndex: number;
  autoPlay: boolean;
}

export default function App() {
  const [demoModal, setDemoModal] = useState<DemoModalState | null>(null);
  const [caseStudyProject, setCaseStudyProject] =
    useState<FlagshipProject | null>(null);

  const handleOpenProjectDemo = (
    project: FlagshipProject,
    chapterIndex = 0,
    autoPlay = false,
  ) => {
    setCaseStudyProject(null);
    setDemoModal({ project, chapterIndex, autoPlay });
  };

  const handleOpenCaseStudy = (project: FlagshipProject) => {
    setDemoModal(null);
    setCaseStudyProject(project);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-[#04060C] via-[#070B16] to-[#0A0F1E] text-slate-100">
      {/* Controlled Radial Ambient Light Blooms + Crisp Engineering Dot-Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="bg-engineering-grid absolute inset-0 opacity-65" />
        {/* Hero subtle cyan/blue studio bloom */}
        <div className="absolute -top-44 left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.10)_0%,rgba(59,130,246,0.055)_46%,transparent_74%)] blur-3xl" />
        {/* Featured Projects controlled ambient bloom */}
        <div className="absolute top-[36%] -right-44 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.085)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[14%] -left-44 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.055)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Main Content Shell */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <LiveProductionSection
            onOpenProjectDemo={handleOpenProjectDemo}
            onOpenCaseStudy={handleOpenCaseStudy}
          />
          <Tarak3DStudioSection />
          <AiLabsSection
            onOpenProjectDemo={handleOpenProjectDemo}
            onOpenCaseStudy={handleOpenCaseStudy}
          />
          <SkillsSection />
          <ArchitectureSection />
          <ProjectEstimator />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {/* Unified Interactive "Inspect & Watch Demo" 9:16 Phone Modal */}
      <ProjectModal
        project={demoModal?.project ?? null}
        initialChapterIndex={demoModal?.chapterIndex ?? 0}
        autoPlayOnOpen={demoModal?.autoPlay ?? false}
        onClose={() => setDemoModal(null)}
      />

      {/* Interactive Slide-Over Architecture & Case Study Drawer */}
      <CaseStudyDrawer
        project={caseStudyProject}
        onClose={() => setCaseStudyProject(null)}
        onWatchDemo={(project) => handleOpenProjectDemo(project, 0, true)}
      />
    </div>
  );
}
