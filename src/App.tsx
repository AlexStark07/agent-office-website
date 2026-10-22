import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { TeamPage } from './pages/TeamPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { NavPage } from './types';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<NavPage>('team');
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);

  const handleNavigate = (page: NavPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout-root">
      {/* Top Fixed/Sticky Navigation with Dark-Mode Moving Spotlight */}
      <Navigation
        activePage={activePage}
        onNavigate={handleNavigate}
        onRequestAccess={() => setIsAccessModalOpen(true)}
      />

      {/* Main Page Content with Smooth Transition */}
      <main className="main-content-area" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="page-transition-wrapper"
          >
            {activePage === 'team' && (
              <TeamPage
                onNavigate={handleNavigate}
                onRequestAccess={() => setIsAccessModalOpen(true)}
              />
            )}
            {activePage === 'workflow' && (
              <WorkflowPage
                onNavigate={handleNavigate}
                onRequestAccess={() => setIsAccessModalOpen(true)}
              />
            )}
            {activePage === 'capabilities' && (
              <CapabilitiesPage
                onNavigate={handleNavigate}
                onRequestAccess={() => setIsAccessModalOpen(true)}
                onSelectAgent={() => {
                  handleNavigate('team');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Restrained Site Footer */}
      <Footer
        onNavigate={handleNavigate}
        onRequestAccess={() => setIsAccessModalOpen(true)}
      />

      {/* Interactive Early Access Modal */}
      <EarlyAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
