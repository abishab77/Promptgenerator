const STORAGE_KEYS = {
  PROMPTS: 'personal_prompt_generator_prompts',
  SETTINGS: 'personal_prompt_generator_settings',
  FAVORITES: 'personal_prompt_generator_favorites',
  HISTORY: 'personal_prompt_generator_history'
};

export const storageUtils = {
  // Save prompts to local storage
  savePrompts: (prompts) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
      return true;
    } catch (error) {
      console.error('Error saving prompts:', error);
      return false;
    }
  },

  // Load prompts from local storage
  loadPrompts: () => {
    try {
      const prompts = localStorage.getItem(STORAGE_KEYS.PROMPTS);
      return prompts ? JSON.parse(prompts) : [];
    } catch (error) {
      console.error('Error loading prompts:', error);
      return [];
    }
  },

  // Save user settings
  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  // Load user settings
  loadSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        darkMode: false,
        autoSave: true,
        defaultCategory: 'productivity',
        defaultTone: 'professional',
        defaultSize: 'medium',
        apiKey: '',
        model: 'gemini-2.0-flash'
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        darkMode: false,
        autoSave: true,
        defaultCategory: 'productivity',
        defaultTone: 'professional',
        defaultSize: 'medium',
        apiKey: '',
        model: 'gemini-2.0-flash'
      };
    }
  },

  // Save favorite prompts
  saveFavorites: (favorites) => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Error saving favorites:', error);
      return false;
    }
  },

  // Load favorite prompts
  loadFavorites: () => {
    try {
      const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },

  // Add to history
  addToHistory: (prompt) => {
    try {
      const history = storageUtils.loadHistory();
      const newHistory = [
        { ...prompt, timestamp: Date.now() },
        ...history.filter(item => item.id !== prompt.id)
      ].slice(0, 50); // Keep only last 50 items
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
      return true;
    } catch (error) {
      console.error('Error adding to history:', error);
      return false;
    }
  },

  // Load history
  loadHistory: () => {
    try {
      const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  },

  // Clear all data
  clearAllData: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },

  // Export data
  exportData: () => {
    try {
      const data = {
        prompts: storageUtils.loadPrompts(),
        settings: storageUtils.loadSettings(),
        favorites: storageUtils.loadFavorites(),
        history: storageUtils.loadHistory(),
        exportDate: new Date().toISOString()
      };
      return data;
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  },

  // Import data
  importData: (data) => {
    try {
      if (data.prompts) storageUtils.savePrompts(data.prompts);
      if (data.settings) storageUtils.saveSettings(data.settings);
      if (data.favorites) storageUtils.saveFavorites(data.favorites);
      if (data.history) {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
};
