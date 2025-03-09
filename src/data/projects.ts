// src/data/projects.ts
import { ProjectDetails } from '@/types/types';

export const projects: ProjectDetails[] = [
  {
    id: 1,
    title: "AI-Powered Customer Dashboard",
    category: "Artificial Intelligence",
    client: "Innovate Retail",
    duration: "3 months",
    description: "A custom dashboard that uses machine learning to analyze customer behavior and provide actionable insights.",
    challenge: "The client needed a way to understand customer behavior patterns across multiple touchpoints and use that data to make informed business decisions. Their existing analytics tools were siloed and difficult to use.",
    solution: "We developed a centralized dashboard that ingests data from multiple sources and applies machine learning algorithms to identify patterns and suggest actions. The interface was designed to make complex data accessible to non-technical staff.",
    results: "The solution resulted in a 40% increase in customer retention and a 25% boost in sales through targeted promotions based on the dashboard insights.",
    image: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
    technologies: ["React", "TensorFlow.js", "Node.js", "GraphQL", "MongoDB"],
    features: [
      "Real-time data visualization",
      "Predictive analytics",
      "Customer segmentation",
      "Behavioral pattern recognition",
      "Automated reporting"
    ],
    gallery: [
      "bg-gradient-to-br from-indigo-600/20 to-purple-600/20",
      "bg-gradient-to-br from-indigo-700/20 to-purple-700/20",
      "bg-gradient-to-br from-indigo-800/20 to-purple-800/20"
    ],
    testimonial: {
      quote: "The dashboard has transformed how we understand our customers. We're now able to predict trends and respond proactively instead of reactively.",
      author: "Sarah Johnson",
      position: "COO, Innovate Retail"
    }
  },
  {
    id: 2,
    title: "Enterprise Resource Planning System",
    category: "Business Automation",
    client: "Global Manufacturing Co.",
    duration: "6 months",
    description: "A comprehensive ERP solution that streamlines operations across departments and improves efficiency.",
    challenge: "The client was struggling with outdated systems that didn't communicate with each other, causing delays, data inconsistencies, and inefficient processes across their organization.",
    solution: "We implemented a modular ERP system with custom integrations for their specific industry needs. The solution included modules for inventory management, production planning, HR, and financial management.",
    results: "Process efficiency improved by 65%, reporting time decreased by 80%, and the company saved over $500,000 annually through better resource allocation.",
    image: "bg-gradient-to-br from-blue-500/20 to-teal-500/20",
    technologies: ["Angular", "PostgreSQL", "Express", "Docker", "Kubernetes"],
    features: [
      "Integrated modules for all departments",
      "Real-time reporting and analytics",
      "Automated workflow management",
      "Supply chain optimization",
      "Mobile access for field staff"
    ],
    testimonial: {
      quote: "This ERP system has brought our company into the modern age. The efficiency gains have been remarkable, and the system keeps getting better with each update.",
      author: "Michael Chen",
      position: "CTO, Global Manufacturing Co."
    }
  },
  {
    id: 3,
    title: "E-commerce Mobile Application",
    category: "Mobile Development",
    client: "Fashion Forward",
    duration: "4 months",
    description: "A feature-rich mobile shopping experience with AR product visualization and AI-driven recommendations.",
    challenge: "The client wanted to increase their mobile sales and reduce return rates by giving customers a better way to visualize products before purchase.",
    solution: "We developed a native mobile app with AR capabilities that allow users to see how products would look in their space or on themselves. The app also features AI-powered recommendations based on user preferences and behavior.",
    results: "The app achieved a 300% ROI within the first year, with a 45% reduction in product returns and a 78% increase in mobile conversion rates.",
    image: "bg-gradient-to-br from-orange-500/20 to-pink-500/20",
    technologies: ["React Native", "Firebase", "Redux", "AR Kit", "TensorFlow Lite"],
    features: [
      "AR product visualization",
      "Personalized recommendations",
      "Seamless checkout process",
      "Real-time inventory updates",
      "Social sharing integration"
    ],
    gallery: [
      "bg-gradient-to-br from-orange-600/20 to-pink-600/20",
      "bg-gradient-to-br from-orange-700/20 to-pink-700/20",
      "bg-gradient-to-br from-orange-800/20 to-pink-800/20"
    ],
    testimonial: {
      quote: "The AR features in our app have been a game-changer. Our customers love being able to 'try before they buy' and it's dramatically improved our conversion rates.",
      author: "Emily Rodriguez",
      position: "Marketing Director, Fashion Forward"
    }
  },
  {
    id: 4,
    title: "Predictive Maintenance Platform",
    category: "IoT & Cloud",
    client: "Industrial Solutions Inc.",
    duration: "5 months",
    description: "A cloud-based system that monitors equipment health and predicts maintenance needs to prevent downtime.",
    challenge: "The client was experiencing significant revenue loss due to unexpected equipment failures and maintenance downtime in their manufacturing plants.",
    solution: "We implemented an IoT sensor network connected to a cloud platform that monitors equipment health in real-time. Machine learning algorithms analyze the data to predict potential failures before they occur.",
    results: "Downtime was reduced by 85%, maintenance costs decreased by 30%, and equipment lifespan increased by an estimated 20%.",
    image: "bg-gradient-to-br from-green-500/20 to-cyan-500/20",
    technologies: ["Python", "AWS IoT", "Machine Learning", "Grafana", "Node-RED"],
    features: [
      "Real-time equipment monitoring",
      "Predictive maintenance alerts",
      "Customizable dashboards",
      "Historical performance analysis",
      "Maintenance scheduling automation"
    ],
    testimonial: {
      quote: "This platform has transformed our maintenance operations from reactive to proactive. The cost savings have been substantial, but the real value is in the peace of mind.",
      author: "James Wilson",
      position: "Operations Manager, Industrial Solutions Inc."
    }
  }
];

// Project categories export
export const projectCategories = ["All", "Artificial Intelligence", "Business Automation", "Mobile Development", "IoT & Cloud"];

// Helper functions
export const getProjectById = (id: number): ProjectDetails | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): ProjectDetails[] => {
  if (category === "All") return projects;
  return projects.filter(project => project.category === category);
};