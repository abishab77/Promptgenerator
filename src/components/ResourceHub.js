import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Star, 
  Filter, 
  Search,
  Palette,
  Code,
  PenTool,
  Video,
  Music,
  Zap,
  Sparkles
} from 'lucide-react';
import { aiTools } from '../data/promptData';

const ResourceHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Filter and sort tools
  const filteredTools = aiTools
    .filter(category => selectedCategory === 'all' || category.category === selectedCategory)
    .map(category => ({
      ...category,
      tools: category.tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.tools.length > 0);

  // Sort tools within each category
  filteredTools.forEach(category => {
    category.tools.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'free':
          return b.free - a.free;
        default:
          return 0;
      }
    });
  });

  const categories = [
    { id: 'all', name: 'All Tools', icon: Sparkles, color: 'from-purple-500 to-blue-600' },
    { id: 'Writing', name: 'Writing', icon: PenTool, color: 'from-blue-500 to-cyan-600' },
    { id: 'Coding', name: 'Coding', icon: Code, color: 'from-green-500 to-emerald-600' },
    { id: 'Image', name: 'Image', icon: Palette, color: 'from-pink-500 to-rose-600' },
    { id: 'Video', name: 'Video', icon: Video, color: 'from-red-500 to-orange-600' },
    { id: 'Audio', name: 'Audio', icon: Music, color: 'from-yellow-500 to-amber-600' },
    { id: 'Productivity', name: 'Productivity', icon: Zap, color: 'from-indigo-500 to-purple-600' }
  ];

  const handleToolClick = (tool) => {
    window.open(tool.link, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star size={16} className="text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">AI Tools Directory</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Discover the best free and paid AI tools for your creative and professional needs
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span>🛠️ {aiTools.reduce((acc, cat) => acc + cat.tools.length, 0)} tools</span>
          <span>•</span>
          <span>📂 {aiTools.length} categories</span>
          <span>•</span>
          <span>⭐ Top-rated AI solutions</span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 glass-effect rounded-2xl space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Category and Sort Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical</option>
              <option value="free">Free First</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white/20'
              }`}
            >
              <Icon size={18} />
              {category.name}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Tools Grid */}
      <div className="space-y-8">
        {filteredTools.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * categoryIndex }}
            className="space-y-4"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {category.category}
              </h2>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                {category.tools.length} tools
              </span>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool, toolIndex) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (categoryIndex + toolIndex) }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => handleToolClick(tool)}
                  className="prompt-card cursor-pointer group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {renderStars(tool.rating)}
                      <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                        {tool.rating}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tool.free
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                      }`}>
                        {tool.free ? 'Free' : 'Paid'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      <span className="text-xs">Visit</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No tools found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search or category filter to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Chrome Extension CTA removed per request */}
    </div>
  );
};

export default ResourceHub;
