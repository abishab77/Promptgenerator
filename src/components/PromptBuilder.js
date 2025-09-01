import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Copy, 
  Download, 
  Share2, 
  Sparkles,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { promptCategories, promptTones, promptSizes } from '../data/promptData';
import { exportUtils } from '../utils/exportUtils';
import { geminiClient } from '../utils/ai';
import toast from 'react-hot-toast';

const PromptBuilder = ({ onSave, defaultSettings = {} }) => {
  const [formData, setFormData] = useState({
    content: '',
    category: defaultSettings.defaultCategory || 'productivity',
    tone: defaultSettings.defaultTone || 'professional',
    size: defaultSettings.defaultSize || 'medium',
    title: ''
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(formData.content.length);
  }, [formData.content]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrompt = async () => {
    setIsGenerating(true);
    try {
      const toneDesc = getToneDescription();
      const sizeDesc = getSizeDescription();
      const systemText = `You are an assistant that composes high-quality prompts for AI models. Respect the requested tone (${formData.tone}: ${toneDesc}) and target length (${formData.size}: ${sizeDesc}). Output only the prompt text.`;

      const userText = `Compose an AI prompt for the "${formData.category}" category. If relevant, adapt to this draft or idea provided by the user (may be empty):\n\n${formData.content || ''}`;

      // Expect apiKey/model from parent settings via defaultSettings
      const apiKey = defaultSettings.apiKey || '';
      const model = defaultSettings.model || 'gemini-2.0-flash';

      if (!apiKey) {
        throw new Error('Missing Gemini API key. Add it in Settings.');
      }

      const aiText = await geminiClient.generateContent({
        apiKey,
        model,
        userText,
        systemText
      });

      setFormData(prev => ({ ...prev, content: aiText }));
      toast.success('AI prompt generated');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to generate with Gemini');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!formData.content.trim()) {
      toast.error('Please enter a prompt content');
      return;
    }

    const newPrompt = {
      ...formData,
      timestamp: Date.now()
    };

    onSave(newPrompt);
    toast.success('Prompt saved successfully!');
    
    // Reset form
    setFormData({
      content: '',
      category: defaultSettings.defaultCategory || 'productivity',
      tone: defaultSettings.defaultTone || 'professional',
      size: defaultSettings.defaultSize || 'medium',
      title: ''
    });
  };

  const handleCopy = async () => {
    const success = await exportUtils.copyToClipboard(formData.content);
    if (success) {
      toast.success('Prompt copied to clipboard!');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleExport = () => {
    if (!formData.content.trim()) {
      toast.error('Please enter a prompt content');
      return;
    }

    const prompt = {
      ...formData,
      timestamp: Date.now()
    };
    
    const success = exportUtils.exportToPDF(prompt, formData.title || 'prompt');
    if (success) {
      toast.success('Prompt exported as PDF!');
    } else {
      toast.error('Failed to export PDF');
    }
  };

  const handleShare = async () => {
    if (!formData.content.trim()) {
      toast.error('Please enter a prompt content');
      return;
    }

    const prompt = {
      ...formData,
      timestamp: Date.now()
    };
    
    const success = await exportUtils.sharePrompt(prompt);
    if (success) {
      toast.success('Prompt shared successfully!');
    } else {
      toast.error('Failed to share prompt');
    }
  };

  const getSizeDescription = () => {
    const size = promptSizes.find(s => s.id === formData.size);
    return size ? size.description : '';
  };

  const getToneDescription = () => {
    const tone = promptTones.find(t => t.id === formData.tone);
    return tone ? tone.description : '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">Prompt Builder</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Create custom AI prompts with advanced controls for category, tone, and size
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Prompt Title (Optional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a title for your prompt..."
              className="input-field"
            />
          </div>

          {/* Content Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Prompt Content
              </label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {charCount} characters
                </span>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  {previewMode ? <EyeOff size={14} /> : <Eye size={14} />}
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
              </div>
            </div>
            
            {previewMode ? (
              <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg min-h-[200px]">
                <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300">
                  {formData.content || 'No content to preview'}
                </div>
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Enter your AI prompt here... Be specific and detailed for better results."
                className="input-field min-h-[200px] resize-y"
                rows={8}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="button-primary flex items-center gap-2"
            >
              <Save size={18} />
              Save Prompt
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              disabled={!formData.content.trim()}
              className="button-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy size={18} />
              Copy
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              disabled={!formData.content.trim()}
              className="button-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Export PDF
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              disabled={!formData.content.trim()}
              className="button-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 size={18} />
              Share
            </motion.button>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Generate Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 glass-effect rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              AI Generation
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePrompt}
              disabled={isGenerating}
              className="w-full button-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Prompt
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 glass-effect rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Category
            </h3>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="dropdown-select"
            >
              {promptCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Tone Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 glass-effect rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Tone
            </h3>
            <select
              value={formData.tone}
              onChange={(e) => handleInputChange('tone', e.target.value)}
              className="dropdown-select"
            >
              {promptTones.map((tone) => (
                <option key={tone.id} value={tone.id}>
                  {tone.name}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Size Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 glass-effect rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Size
            </h3>
            <select
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              className="dropdown-select"
            >
              {promptSizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name} — Max {size.maxLength} chars
                </option>
              ))}
            </select>
          </motion.div>

          {/* Reset Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 glass-effect rounded-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFormData({
                  content: '',
                  category: defaultSettings.defaultCategory || 'productivity',
                  tone: defaultSettings.defaultTone || 'professional',
                  size: defaultSettings.defaultSize || 'medium',
                  title: ''
                });
                toast.success('Form reset successfully!');
              }}
              className="w-full button-secondary flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Reset Form
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;
