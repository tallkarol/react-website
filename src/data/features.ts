// src/data/features.ts
import { Feature } from '@/types/types';

// Define the features array with simple data structure
export const features: Feature[] = [
  {
    id: 'performance',
    title: "High Performance",
    description: "Our applications are built for speed and efficiency, ensuring optimal user experience across all devices.",
    image: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20", // CSS class for background
    type: 'performance', // Type identifier for rendering specific UI
    metrics: [
      { name: "Load Time", value: "0.8s", percentage: 90 },
      { name: "First Contentful Paint", value: "1.2s", percentage: 85 },
      { name: "Time to Interactive", value: "2.1s", percentage: 75 }
    ]
  },
  {
    id: 'scalability',
    title: "Scalable Architecture",
    description: "Our solutions grow with your business, handling increased loads while maintaining performance and reliability.",
    image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20", // CSS class for background
    type: 'scalability', // Type identifier for rendering specific UI
    statistics: {
      servers: 3,
      loadBalancing: true,
      microservices: 5
    }
  },
  {
    id: 'security',
    title: "Enhanced Security",
    description: "We implement advanced security measures to protect your data and ensure compliance with industry standards.",
    image: "bg-gradient-to-br from-purple-500/20 to-pink-500/20", // CSS class for background
    type: 'security', // Type identifier for rendering specific UI
    protections: [
      { name: "SSL/TLS Encryption", active: true },
      { name: "DDOS Protection", active: true },
      { name: "Data Encryption", active: true }
    ],
    securityScore: 92
  }
];

export const getFeatureById = (id: string): Feature | undefined => {
  return features.find(feature => feature.id === id);
};