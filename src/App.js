import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Settings, 
  Download,
  Upload,
  Trash2,
  Home,
  BookOpen,
  Palette,
  Zap
} from 'lucide-react';
import { storageUtils } from './utils/storage';
import { exportUtils } from './utils/exportUtils';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import PromptBuilder from './components/PromptBuilder';
import PromptHistory from './components/PromptHistory';
import ResourceHub from './components/ResourceHub';
import SettingsModal from './components/SettingsModal';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [prompts, setPrompts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [settings, setSettings] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const loadData = () => {
      const savedSettings = storageUtils.loadSettings();
      const savedPrompts = storageUtils.loadPrompts();
      const savedFavorites = storageUtils.loadFavorites();
      
      setSettings(savedSettings);
      setDarkMode(savedSettings.darkMode || false);
      setPrompts(savedPrompts);
      setFavorites(savedFavorites);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save settings when they change
  useEffect(() => {
    if (!isLoading) {
      const newSettings = { ...settings, darkMode };
      storageUtils.saveSettings(newSettings);
      setSettings(newSettings);
    }
  }, [darkMode, isLoading]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addPrompt = (prompt) => {
    const newPrompt = {
      ...prompt,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    const updatedPrompts = [newPrompt, ...prompts];
    setPrompts(updatedPrompts);
    storageUtils.savePrompts(updatedPrompts);
    storageUtils.addToHistory(newPrompt);
  };

  const deletePrompt = (promptId) => {
    const updatedPrompts = prompts.filter(p => p.id !== promptId);
    setPrompts(updatedPrompts);
    storageUtils.savePrompts(updatedPrompts);
  };

  const toggleFavorite = (prompt) => {
    const isFavorite = favorites.some(f => f.id === prompt.id);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(f => f.id !== prompt.id);
    } else {
      updatedFavorites = [prompt, ...favorites];
    }
    
    setFavorites(updatedFavorites);
    storageUtils.saveFavorites(updatedFavorites);
  };

  const exportAllData = () => {
    const data = storageUtils.exportData();
    if (data) {
      exportUtils.exportDataAsJSON(data, 'personal-prompt-generator-data');
    }
  };

  const importData = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const data = await exportUtils.importDataFromJSON(file);
        if (storageUtils.importData(data)) {
          // Reload data
          const savedPrompts = storageUtils.loadPrompts();
          const savedFavorites = storageUtils.loadFavorites();
          const savedSettings = storageUtils.loadSettings();
          
          setPrompts(savedPrompts);
          setFavorites(savedFavorites);
          setSettings(savedSettings);
          setDarkMode(savedSettings.darkMode || false);
        }
      } catch (error) {
        console.error('Error importing data:', error);
      }
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      storageUtils.clearAllData();
      setPrompts([]);
      setFavorites([]);
      setSettings({
        darkMode: false,
        autoSave: true,
        defaultCategory: 'productivity',
        defaultTone: 'professional',
        defaultSize: 'medium'
      });
      setDarkMode(false);
    }
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'builder', label: 'Prompt Builder', icon: Sparkles },
    { id: 'history', label: 'History', icon: BookOpen },
    { id: 'resources', label: 'AI Tools', icon: Palette }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gradient">Loading Personal Prompt Generator...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#1e293b' : '#ffffff',
            color: darkMode ? '#f1f5f9' : '#1e293b',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`
          }
        }}
      />
      
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onExport={exportAllData}
        onImport={importData}
        onClear={clearAllData}
        onSettings={() => setShowSettings(true)}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory md:justify-center md:flex-wrap md:gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 snap-start whitespace-nowrap ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'home' && (
              <CategoryGrid 
                prompts={prompts}
                onPromptSelect={(prompt) => {
                  addPrompt(prompt);
                  setCurrentView('history');
                }}
              />
            )}
            
            {currentView === 'builder' && (
              <PromptBuilder 
                onSave={addPrompt}
                defaultSettings={settings}
              />
            )}
            
            {currentView === 'history' && (
              <PromptHistory 
                prompts={prompts}
                favorites={favorites}
                onDelete={deletePrompt}
                onToggleFavorite={toggleFavorite}
                onExport={exportUtils.exportToPDF}
                onCopy={exportUtils.copyToClipboard}
                onShare={exportUtils.sharePrompt}
                onCreateFirstPrompt={() => setCurrentView('builder')}
              />
            )}
            
            {currentView === 'resources' && (
              <ResourceHub />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          storageUtils.saveSettings(newSettings);
          setShowSettings(false);
        }}
      />

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCurrentView('builder')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-float"
      >
        <Sparkles size={24} />
      </motion.button>
    </div>
  );
}

export default App;
