import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Settings, 
  Download, 
  Upload, 
  Trash2,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

const Header = ({ 
  darkMode, 
  toggleDarkMode, 
  onExport, 
  onImport, 
  onClear, 
  onSettings 
}) => {
  const handleImport = (event) => {
    onImport(event);
    toast.success('Data imported successfully!');
  };

  const handleExport = () => {
    onExport();
    toast.success('Data exported successfully!');
  };

  const handleClear = () => {
    onClear();
    toast.success('All data cleared successfully!');
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo only (title removed) */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20 transition-all duration-300"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Import Button 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('import-file').click()}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20 transition-all duration-300"
              title="Import data"
            >
              <Upload size={20} />
            </motion.button>
            <input
              id="import-file"
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
*/}
            {/* Export Button
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20 transition-all duration-300"
              title="Export data"
            >
              <Download size={20} />
            </motion.button>
 */}
            {/* Clear Data Button 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20 transition-all duration-300"
              title="Clear all data"
            >
              <Trash2 size={20} />
            </motion.button>
*/}
            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSettings}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20 transition-all duration-300"
              title="Settings"
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
