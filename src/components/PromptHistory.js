import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Heart, 
  Copy, 
  Download, 
  Share2, 
  Trash2, 
  Star,
  Calendar,
  Tag,
  MessageSquare
} from 'lucide-react';
import { promptCategories, promptTones, promptSizes } from '../data/promptData';
import toast from 'react-hot-toast';

const PromptHistory = ({ 
  prompts, 
  favorites, 
  onDelete, 
  onToggleFavorite, 
  onExport, 
  onCopy, 
  onShare,
  onCreateFirstPrompt
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTone, setSelectedTone] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Filter and sort prompts
  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(prompt => 
        prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prompt.title && prompt.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prompt => prompt.category === selectedCategory);
    }

    // Tone filter
    if (selectedTone !== 'all') {
      filtered = filtered.filter(prompt => prompt.tone === selectedTone);
    }

    // Size filter
    if (selectedSize !== 'all') {
      filtered = filtered.filter(prompt => prompt.size === selectedSize);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp - a.timestamp;
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'longest':
          return b.content.length - a.content.length;
        case 'shortest':
          return a.content.length - b.content.length;
        case 'favorite':
          const aIsFavorite = favorites.some(f => f.id === a.id);
          const bIsFavorite = favorites.some(f => f.id === b.id);
          return bIsFavorite - aIsFavorite;
        default:
          return 0;
      }
    });

    return filtered;
  }, [prompts, favorites, searchTerm, selectedCategory, selectedTone, selectedSize, sortBy]);

  const handleCopy = async (prompt) => {
    const success = await onCopy(prompt.content);
    if (success) {
      toast.success('Prompt copied to clipboard!');
    }
  };

  const handleExport = (prompt) => {
    const success = onExport(prompt);
    if (success) {
      toast.success('Prompt exported as PDF!');
    }
  };

  const handleShare = async (prompt) => {
    const success = await onShare(prompt);
    if (success) {
      toast.success('Prompt shared successfully!');
    }
  };

  const handleDelete = (promptId) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      onDelete(promptId);
      toast.success('Prompt deleted successfully!');
    }
  };

  const getCategoryInfo = (categoryId) => {
    return promptCategories.find(cat => cat.id === categoryId);
  };

  const getToneInfo = (toneId) => {
    return promptTones.find(tone => tone.id === toneId);
  };

  const getSizeInfo = (sizeId) => {
    return promptSizes.find(size => size.id === sizeId);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (prompts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          No prompts yet
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Start creating your first prompt using the Prompt Builder or explore categories to get started.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateFirstPrompt}
          className="button-primary"
        >
          Create Your First Prompt
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">Prompt History</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Manage and organize your saved prompts
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span>📝 {prompts.length} prompts</span>
          <span>•</span>
          <span>❤️ {favorites.length} favorites</span>
          <span>•</span>
          <span>📊 {new Set(prompts.map(p => p.category)).size} categories</span>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 glass-effect rounded-2xl space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search prompts by content or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Categories</option>
              {promptCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tone Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tone
            </label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Tones</option>
              {promptTones.map(tone => (
                <option key={tone.id} value={tone.id}>
                  {tone.name}
                </option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Sizes</option>
              {promptSizes.map(size => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="longest">Longest First</option>
              <option value="shortest">Shortest First</option>
              <option value="favorite">Favorites First</option>
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              View
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Showing {filteredPrompts.length} of {prompts.length} prompts
        </p>
      </div>

      {/* Prompts Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPrompts.map((prompt, index) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isFavorite={favorites.some(f => f.id === prompt.id)}
                onToggleFavorite={() => onToggleFavorite(prompt)}
                onCopy={() => handleCopy(prompt)}
                onExport={() => handleExport(prompt)}
                onShare={() => handleShare(prompt)}
                onDelete={() => handleDelete(prompt.id)}
                getCategoryInfo={getCategoryInfo}
                getToneInfo={getToneInfo}
                getSizeInfo={getSizeInfo}
                formatDate={formatDate}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredPrompts.map((prompt, index) => (
              <PromptListItem
                key={prompt.id}
                prompt={prompt}
                isFavorite={favorites.some(f => f.id === prompt.id)}
                onToggleFavorite={() => onToggleFavorite(prompt)}
                onCopy={() => handleCopy(prompt)}
                onExport={() => handleExport(prompt)}
                onShare={() => handleShare(prompt)}
                onDelete={() => handleDelete(prompt.id)}
                getCategoryInfo={getCategoryInfo}
                getToneInfo={getToneInfo}
                getSizeInfo={getSizeInfo}
                formatDate={formatDate}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredPrompts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No prompts found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Prompt Card Component
const PromptCard = ({ 
  prompt, 
  isFavorite, 
  onToggleFavorite, 
  onCopy, 
  onExport, 
  onShare, 
  onDelete,
  getCategoryInfo,
  getToneInfo,
  getSizeInfo,
  formatDate,
  index
}) => {
  const categoryInfo = getCategoryInfo(prompt.category);
  const toneInfo = getToneInfo(prompt.tone);
  const sizeInfo = getSizeInfo(prompt.size);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="prompt-card group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {categoryInfo && (
            <div className={`w-8 h-8 bg-gradient-to-br ${categoryInfo.color} rounded-lg flex items-center justify-center`}>
              <categoryInfo.icon className="w-4 h-4 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
              {prompt.title || 'Untitled Prompt'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {formatDate(prompt.timestamp)}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className={`p-2 rounded-lg transition-all duration-300 ${
            isFavorite
              ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
              : 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </motion.button>
      </div>

      {/* Content */}
      <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-4">
        {prompt.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoryInfo && (
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
            {categoryInfo.name}
          </span>
        )}
        {toneInfo && (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
            {toneInfo.name}
          </span>
        )}
        {sizeInfo && (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
            {sizeInfo.name}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCopy}
            className="p-2 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onExport}
            className="p-2 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            title="Export as PDF"
          >
            <Download size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onShare}
            className="p-2 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            title="Share prompt"
          >
            <Share2 size={16} />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
          title="Delete prompt"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Prompt List Item Component
const PromptListItem = ({ 
  prompt, 
  isFavorite, 
  onToggleFavorite, 
  onCopy, 
  onExport, 
  onShare, 
  onDelete,
  getCategoryInfo,
  getToneInfo,
  getSizeInfo,
  formatDate,
  index
}) => {
  const categoryInfo = getCategoryInfo(prompt.category);
  const toneInfo = getToneInfo(prompt.tone);
  const sizeInfo = getSizeInfo(prompt.size);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="prompt-card group"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        {categoryInfo && (
          <div className={`w-12 h-12 bg-gradient-to-br ${categoryInfo.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <categoryInfo.icon className="w-6 h-6 text-white" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {prompt.title || 'Untitled Prompt'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {formatDate(prompt.timestamp)}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleFavorite}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isFavorite
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            </motion.button>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-3 line-clamp-2">
            {prompt.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categoryInfo && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                {categoryInfo.name}
              </span>
            )}
            {toneInfo && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                {toneInfo.name}
              </span>
            )}
            {sizeInfo && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                {sizeInfo.name}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCopy}
              className="button-secondary text-xs flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExport}
              className="button-secondary text-xs flex items-center gap-1"
            >
              <Download size={14} />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShare}
              className="button-secondary text-xs flex items-center gap-1"
            >
              <Share2 size={14} />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="button-secondary text-xs flex items-center gap-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 size={14} />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PromptHistory;
