import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import  { useEffect } from "react";

import { 
  X, 
  Settings, 
  Moon, 
  Sun, 
  Save, 
  RotateCcw,
  Palette,
  Zap,
  FileText,
  Target
} from 'lucide-react';
import { promptCategories, promptTones, promptSizes } from '../data/promptData';
import toast from 'react-hot-toast';

const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [formData, setFormData] = useState({
    darkMode: settings.darkMode || false,
    autoSave: settings.autoSave !== false, // default to true
    defaultCategory: settings.defaultCategory || 'productivity',
    defaultTone: settings.defaultTone || 'professional',
    defaultSize: settings.defaultSize || 'medium',
    notifications: settings.notifications !== false, // default to true
    compactMode: settings.compactMode || false,
    animations: settings.animations !== false, // default to true
    exportFormat: settings.exportFormat || 'pdf',
    language: settings.language || 'en',
    apiKey: settings.apiKey || '',
    model: settings.model || 'gemini-2.0-flash'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // const handleSave = () => {
  //   onSave(formData);
    
  //   toast.success('Settings saved successfully!');
  // };
 const handleSave = () => {
    onSave(formData);

    // set a flag before reload
    localStorage.setItem("showToast", "true");

    // refresh the page
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("showToast") === "true") {
      toast.success("Settings saved successfully!");
      localStorage.removeItem("showToast"); // clear flag after showing
    }
  }, []);

  const handleReset = () => {
    const defaultSettings = {
      darkMode: false,
      autoSave: true,
      defaultCategory: 'productivity',
      defaultTone: 'professional',
      defaultSize: 'medium',
      notifications: true,
      compactMode: false,
      animations: true,
      exportFormat: 'pdf',
      language: 'en'
    };
    setFormData(defaultSettings);
    toast.success('Settings reset to defaults!');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Settings
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Customize your Personal Prompt Generator experience
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Appearance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Palette size={20} />
                Appearance
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dark Mode */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Dark Mode
                    </label>
                    <div className="flex items-center gap-2">
                      <Sun size={16} className="text-yellow-500" />
                      <Moon size={16} className="text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="darkMode"
                      checked={formData.darkMode}
                      onChange={(e) => handleInputChange('darkMode', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor="darkMode" className="text-sm text-slate-600 dark:text-slate-400">
                      Enable dark theme
                    </label>
                  </div>
                </div>

                {/* Animations */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Animations
                    </label>
                    <Zap size={16} className="text-purple-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="animations"
                      checked={formData.animations}
                      onChange={(e) => handleInputChange('animations', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor="animations" className="text-sm text-slate-600 dark:text-slate-400">
                      Enable smooth animations
                    </label>
                  </div>
                </div>

                {/* Compact Mode */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Compact Mode
                    </label>
                    <Target size={16} className="text-green-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="compactMode"
                      checked={formData.compactMode}
                      onChange={(e) => handleInputChange('compactMode', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor="compactMode" className="text-sm text-slate-600 dark:text-slate-400">
                      Use compact layout
                    </label>
                  </div>
                </div>

                {/* Notifications */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Notifications
                    </label>
                    <FileText size={16} className="text-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="notifications"
                      checked={formData.notifications}
                      onChange={(e) => handleInputChange('notifications', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor="notifications" className="text-sm text-slate-600 dark:text-slate-400">
                      Show success notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Default Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Settings size={20} />
                Default Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Default Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Default Category
                  </label>
                  <select
                    value={formData.defaultCategory}
                    onChange={(e) => handleInputChange('defaultCategory', e.target.value)}
                    className="dropdown-select"
                  >
                    {promptCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Default Tone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Default Tone
                  </label>
                  <select
                    value={formData.defaultTone}
                    onChange={(e) => handleInputChange('defaultTone', e.target.value)}
                    className="dropdown-select"
                  >
                    {promptTones.map(tone => (
                      <option key={tone.id} value={tone.id}>
                        {tone.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Default Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Default Size
                  </label>
                  <select
                    value={formData.defaultSize}
                    onChange={(e) => handleInputChange('defaultSize', e.target.value)}
                    className="dropdown-select"
                  >
                    {promptSizes.map(size => (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Export Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileText size={20} />
                Export Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Export Format */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Default Export Format
                  </label>
                  <select
                    value={formData.exportFormat}
                    onChange={(e) => handleInputChange('exportFormat', e.target.value)}
                    className="dropdown-select"
                  >
                    <option value="pdf">PDF</option>
                    <option value="txt">Text File</option>
                    <option value="json">JSON</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="dropdown-select"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Auto Save */}
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Auto Save
                </label>
                <Save size={16} className="text-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoSave"
                  checked={formData.autoSave}
                  onChange={(e) => handleInputChange('autoSave', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="autoSave" className="text-sm text-slate-600 dark:text-slate-400">
                  Automatically save prompts to local storage
                </label>
              </div>
            </div>
          </div>

          {/* AI Settings */}
          <div className="space-y-4 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Zap size={20} />
              AI Settings
            </h3>

           <div className="grid grid-cols-1 gap-4">
              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Gemini API Key
                </label>
                <input 
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="dropdown-select"
                  
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Model
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  className="dropdown-select"
                >
                  <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                  <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                </select>
              </div>
            </div> 
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-700">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-300"
            >
              <RotateCcw size={16} />
              Reset to Defaults
            </motion.button>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="button-primary flex items-center gap-2"
              >
                <Save size={16} />
                Save Settings
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;
