import { 
  Zap, 
  Code, 
  PenTool, 
  Palette, 
  Megaphone, 
  GraduationCap, 
  Search, 
  Smile,
  FileText,
  Briefcase,
  Heart,
  Lightbulb,
  BookOpen,
  Target,
  Star,
  Sparkles
} from 'lucide-react';

export const promptCategories = [
  {
    id: 'productivity',
    name: 'Productivity',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    count: 12,
    description: 'Boost your efficiency and get more done'
  },
  {
    id: 'coding',
    name: 'Coding',
    icon: Code,
    color: 'from-green-400 to-blue-500',
    count: 18,
    description: 'Programming assistance and code generation'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    color: 'from-purple-400 to-pink-500',
    count: 15,
    description: 'Content creation and writing assistance'
  },
  {
    id: 'design',
    name: 'Design',
    icon: Palette,
    color: 'from-pink-400 to-red-500',
    count: 10,
    description: 'Design ideas and creative inspiration'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Megaphone,
    color: 'from-blue-400 to-indigo-500',
    count: 14,
    description: 'Marketing strategies and campaigns'
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    color: 'from-indigo-400 to-purple-500',
    count: 16,
    description: 'Learning and educational content'
  },
  {
    id: 'research',
    name: 'Research',
    icon: Search,
    color: 'from-teal-400 to-cyan-500',
    count: 13,
    description: 'Research assistance and analysis'
  },
  {
    id: 'fun',
    name: 'Fun',
    icon: Smile,
    color: 'from-orange-400 to-yellow-500',
    count: 8,
    description: 'Entertainment and creative fun'
  }
];

export const promptTones = [
  {
    id: 'formal',
    name: 'Formal',
    icon: FileText,
    description: 'Professional and business-like'
  },
  {
    id: 'informal',
    name: 'Informal',
    icon: Heart,
    description: 'Casual and friendly'
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Briefcase,
    description: 'Expert and authoritative'
  },
  {
    id: 'persuasive',
    name: 'Persuasive',
    icon: Target,
    description: 'Convincing and compelling'
  },
  {
    id: 'humorous',
    name: 'Humorous',
    icon: Smile,
    description: 'Funny and entertaining'
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: Sparkles,
    description: 'Imaginative and innovative'
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    icon: BookOpen,
    description: 'Narrative and engaging'
  },
  {
    id: 'educational',
    name: 'Educational',
    icon: GraduationCap,
    description: 'Instructive and informative'
  }
];

export const promptSizes = [
  {
    id: 'one-liner',
    name: 'One-liner',
    description: 'Short and concise',
    maxLength: 50
  },
  {
    id: 'short',
    name: 'Short',
    description: 'Brief and to the point',
    maxLength: 150
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Balanced length',
    maxLength: 300
  },
  {
    id: 'long',
    name: 'Long',
    description: 'Detailed and comprehensive',
    maxLength: 600
  },
  {
    id: 'detailed',
    name: 'Detailed',
    description: 'Very comprehensive',
    maxLength: 1000
  }
];

export const samplePrompts = {
  productivity: [
    "Create a daily productivity routine that maximizes focus and minimizes distractions",
    "Design a time management system for balancing work, personal projects, and self-care",
    "Develop a morning ritual that sets a positive tone for the entire day"
  ],
  coding: [
    "Write clean, efficient code for a React component that handles user authentication",
    "Create a comprehensive error handling system for a Node.js API",
    "Design a responsive layout using CSS Grid and Flexbox best practices"
  ],
  writing: [
    "Craft a compelling blog post introduction that hooks readers in the first paragraph",
    "Write a professional email template for following up after a job interview",
    "Create engaging social media content that drives engagement and shares"
  ],
  design: [
    "Design a modern, minimalist logo for a tech startup",
    "Create a color palette that conveys trust and professionalism",
    "Design a user interface that prioritizes accessibility and usability"
  ],
  marketing: [
    "Develop a content marketing strategy for a B2B software company",
    "Create a social media campaign that increases brand awareness",
    "Design an email marketing sequence that converts leads to customers"
  ],
  education: [
    "Create an interactive lesson plan for teaching programming to beginners",
    "Design a study guide that helps students retain information effectively",
    "Develop a curriculum that makes complex topics accessible to all learners"
  ],
  research: [
    "Conduct a comprehensive analysis of market trends in the AI industry",
    "Research best practices for implementing sustainable business practices",
    "Analyze the impact of remote work on team productivity and collaboration"
  ],
  fun: [
    "Create a creative writing prompt that sparks imagination and storytelling",
    "Design a fun team-building activity that encourages collaboration",
    "Write a humorous script for a short comedy sketch"
  ]
};

export const aiTools = [
  {
    category: 'Writing',
    tools: [
      {
        name: 'Grammarly',
        description: 'AI-powered writing assistant for grammar and style',
        link: 'https://grammarly.com',
        rating: 4.8,
        free: true
      },
      {
        name: 'Jasper',
        description: 'AI content creation platform for marketing and writing',
        link: 'https://jasper.ai',
        rating: 4.6,
        free: false
      },
      {
        name: 'Copy.ai',
        description: 'AI copywriting tool for marketing content',
        link: 'https://copy.ai',
        rating: 4.5,
        free: true
      }
    ]
  },
  {
    category: 'Coding',
    tools: [
      {
        name: 'GitHub Copilot',
        description: 'AI pair programmer that helps write code',
        link: 'https://github.com/features/copilot',
        rating: 4.7,
        free: false
      },
      {
        name: 'Tabnine',
        description: 'AI code completion tool for developers',
        link: 'https://www.tabnine.com',
        rating: 4.4,
        free: true
      },
      {
        name: 'Replit',
        description: 'Online IDE with AI coding assistance',
        link: 'https://replit.com',
        rating: 4.3,
        free: true
      }
    ]
  },
  {
    category: 'Image',
    tools: [
      {
        name: 'DALL-E 2',
        description: 'AI image generation from text descriptions',
        link: 'https://openai.com/dall-e-2',
        rating: 4.8,
        free: false
      },
      {
        name: 'Midjourney',
        description: 'AI art generation for creative projects',
        link: 'https://midjourney.com',
        rating: 4.9,
        free: false
      },
      {
        name: 'Canva AI',
        description: 'AI-powered design tool for graphics and presentations',
        link: 'https://canva.com',
        rating: 4.6,
        free: true
      }
    ]
  },
  {
    category: 'Video',
    tools: [
      {
        name: 'Runway ML',
        description: 'AI video editing and generation platform',
        link: 'https://runwayml.com',
        rating: 4.5,
        free: false
      },
      {
        name: 'Synthesia',
        description: 'AI video generation with virtual presenters',
        link: 'https://synthesia.io',
        rating: 4.4,
        free: false
      },
      {
        name: 'Kapwing',
        description: 'Online video editor with AI features',
        link: 'https://kapwing.com',
        rating: 4.3,
        free: true
      }
    ]
  },
  {
    category: 'Audio',
    tools: [
      {
        name: 'Descript',
        description: 'AI audio editing and transcription tool',
        link: 'https://descript.com',
        rating: 4.6,
        free: true
      },
      {
        name: 'Mubert',
        description: 'AI music generation for content creators',
        link: 'https://mubert.com',
        rating: 4.2,
        free: true
      },
      {
        name: 'ElevenLabs',
        description: 'AI voice cloning and text-to-speech',
        link: 'https://elevenlabs.io',
        rating: 4.7,
        free: true
      }
    ]
  },
  {
    category: 'Productivity',
    tools: [
      {
        name: 'Notion AI',
        description: 'AI-powered workspace for notes and collaboration',
        link: 'https://notion.so',
        rating: 4.7,
        free: true
      },
      {
        name: 'ChatGPT',
        description: 'AI chatbot for conversation and assistance',
        link: 'https://chat.openai.com',
        rating: 4.8,
        free: true
      },
      {
        name: 'Claude',
        description: 'AI assistant for writing and analysis',
        link: 'https://claude.ai',
        rating: 4.6,
        free: true
      }
    ]
  }
];
