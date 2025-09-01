import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { promptCategories, samplePrompts } from '../data/promptData';
import toast from 'react-hot-toast';

const CategoryGrid = ({ prompts, onPromptSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePromptSelect = (prompt) => {
    const newPrompt = {
      content: prompt,
      category: selectedCategory.id,
      tone: 'professional',
      size: 'medium',
      timestamp: Date.now()
    };
    onPromptSelect(newPrompt);
    toast.success('Prompt added to your collection!');
    setSelectedCategory(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          Welcome to Your Personal Prompt Generator
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Explore categories, create custom prompts, and build your AI toolkit. 
          Everything you need to craft the perfect prompts for any AI platform.
        </p>
        {/* Stats removed per request */}
      </motion.div>

      {/* Category Grid */}
      {!selectedCategory ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {promptCategories.map((category, index) => {
            const Icon = category.icon;
            const categoryPrompts = prompts.filter(p => p.category === category.id);
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category)}
                className="category-card group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                      {categoryPrompts.length}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">prompts</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {(samplePrompts[category.id] || []).length} templates
                  </span>
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* Selected Category View */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </motion.button>

          {/* Category Header */}
          <div className="text-center space-y-4">
            <div className={`w-20 h-20 bg-gradient-to-br ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-lg mx-auto`}>
              <selectedCategory.icon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              {selectedCategory.name}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {selectedCategory.description}
            </p>
          </div>

          {/* Sample Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePrompts[selectedCategory.id]?.map((prompt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => handlePromptSelect(prompt)}
                className="prompt-card cursor-pointer group"
              >
                <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {prompt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Click to add
                  </span>
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Prompt Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary"
            >
              Create Custom {selectedCategory.name} Prompt
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Stats Section */}
      {!selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 glass-effect rounded-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {prompts.length}
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Total Prompts Created
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {new Set(prompts.map(p => p.category)).size}
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Categories Used
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {prompts.length > 0 ? Math.round(prompts.reduce((acc, p) => acc + p.content.length, 0) / prompts.length) : 0}
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Avg. Prompt Length
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryGrid;
