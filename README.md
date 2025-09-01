# Personal Prompt Generator

A stunning, web-based tool designed for individuals who want to create, customize, and manage AI prompts across multiple platforms (ChatGPT, Claude, Gemini, etc.).

![Personal Prompt Generator](https://img.shields.io/badge/Version-1.0.0-purple) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 Stunning Design
- **Modern gradient backgrounds** with glassmorphism effects
- **Dark/light mode toggle** with smooth transitions
- **Fully responsive** across desktop, tablet, and mobile
- **Purple/blue professional color palette**
- **Smooth animations** and micro-interactions

### 📁 Prompt Management
- **8 predefined categories** with icons and counters (Productivity, Coding, Writing, Design, Marketing, Education, Research, Fun)
- **Modify existing prompts** with built-in editor
- **Create new prompts** with advanced prompt builder
- **8 tone options** (Formal, Informal, Professional, Persuasive, Humorous, Creative, Storytelling, Educational)
- **5 size presets** (One-liner, Short, Medium, Long, Detailed)

### 💾 Storage & Export
- **Local storage history** with automatic saving/loading
- **PDF export** using jsPDF
- **Copy to clipboard** with one-click functionality
- **Share across platforms** (LinkedIn, Twitter, WhatsApp, Email)
- **Import/Export data** as JSON files

### 🛠 Resource Hub
- **Top free AI tools** directory categorized by type
- **Tool ratings and descriptions**
- **Direct links to AI platforms**
- **Chrome extension CTA**

### 🔧 Advanced Features
- **Search and filter** prompts by keyword, category, tone, or size
- **Favorites system** for frequently used prompts
- **Grid and list view modes**
- **Comprehensive settings panel**
- **Analytics dashboard** with usage statistics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Promptgenerator.git
   cd personal-prompt-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The build files will be created in the `build` folder, ready for deployment.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # App header with navigation
│   ├── CategoryGrid.js # Category selection grid
│   ├── PromptBuilder.js # Advanced prompt creation
│   ├── PromptHistory.js # Prompt management and history
│   ├── ResourceHub.js  # AI tools directory
│   └── SettingsModal.js # User settings panel
├── data/
│   └── promptData.js   # Categories, tones, sizes, and sample data
├── utils/
│   ├── storage.js      # Local storage utilities
│   └── exportUtils.js  # PDF export and clipboard functions
├── App.js              # Main application component
├── App.css             # Custom styles and animations
├── index.js            # React entry point
└── index.css           # TailwindCSS imports and base styles
```

## 🎯 Core Features Breakdown

### 1. Category System
- **8 main categories** with unique icons and color schemes
- **Sample prompts** for each category
- **Category-specific templates** and suggestions

### 2. Prompt Builder
- **Real-time character counter**
- **Preview mode** for prompt review
- **AI generation simulation** with templates
- **Advanced controls** for category, tone, and size

### 3. History Management
- **Comprehensive filtering** (search, category, tone, size)
- **Multiple sorting options** (newest, oldest, longest, shortest, favorites)
- **Grid and list view modes**
- **Bulk operations** and management

### 4. Export & Sharing
- **PDF export** with professional formatting
- **Clipboard integration** for easy copying
- **Web Share API** for native sharing
- **JSON import/export** for data portability

### 5. Settings & Customization
- **Dark/light mode** toggle
- **Default preferences** for new prompts
- **Animation controls**
- **Export format settings**
- **Language preferences**

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Blue (#3B82F6) gradients
- **Secondary**: Slate grays for text and backgrounds
- **Accent**: Various colors for category differentiation

### Typography
- **Headings**: Bold, gradient text with animations
- **Body**: Clean, readable sans-serif fonts
- **Code**: Monospace for technical content

### Components
- **Glass cards** with backdrop blur effects
- **Gradient buttons** with hover animations
- **Smooth transitions** throughout the interface
- **Responsive grid layouts**

## 🔧 Technical Stack

- **Frontend**: React 18.2.0
- **Styling**: TailwindCSS 3.3.0
- **Animations**: Framer Motion 10.16.4
- **Icons**: Lucide React 0.263.1
- **PDF Export**: jsPDF 2.5.1
- **Notifications**: React Hot Toast 2.4.1
- **Build Tool**: Create React App

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect React settings
3. Deploy with one click!

### Manual Deployment
1. Run `npm run build`
2. Upload the `build` folder to your web server
3. Configure your server to serve `index.html` for all routes

## 🔮 Future Features

### Phase 2: Enhanced UI
- [ ] Advanced animations and micro-interactions
- [ ] Custom themes and color schemes
- [ ] Accessibility improvements
- [ ] Performance optimizations

### Phase 3: Resource Hub
- [ ] User-generated tool reviews
- [ ] Tool comparison features
- [ ] Integration with AI platforms
- [ ] Community features

### Phase 4: Chrome Extension
- [ ] Context-aware prompt generation
- [ ] Quick access toolbar
- [ ] Website integration
- [ ] Sync with web app

### Phase 5: Advanced Features
- [ ] Analytics dashboard
- [ ] Template system
- [ ] Collaboration features
- [ ] API integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Framer Motion** for smooth animations
- **TailwindCSS** for utility-first styling
- **jsPDF** for PDF generation capabilities
- **React Hot Toast** for elegant notifications

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/personal-prompt-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/personal-prompt-generator/discussions)
- **Email**: support@personalpromptgenerator.com

---

**Made with ❤️ for the AI community**

*Personal Prompt Generator - Empowering creativity through intelligent prompt management.*
