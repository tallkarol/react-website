// Common interfaces and types used throughout the application
import { ReactNode } from 'react';

// For form handling
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  options?: Array<{
    value: string;
    label: string;
  }>;
}

// For the testimonials section
export interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  avatar: string;
}

// For the services section
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

// For the projects section
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  icon: React.ReactNode;
}

// For the features section
export interface Feature {
  id: string;
  title: string;
  description: string;
  image: string; // CSS class for background
  type: string; // For rendering specific UI elements
  metrics?: { name: string; value: string; percentage: number }[];
  statistics?: {
    servers: number;
    loadBalancing: boolean;
    microservices: number;
  };
  protections?: { name: string; active: boolean }[];
  securityScore?: number;
}

// Project data types
export interface ProjectDetails {
  id: number;
  title: string;
  category: string;
  client?: string;
  duration?: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies: string[];
  features: string[];
  image: string;
  gallery?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

// Updated Service data types
export interface ServiceDetails {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  iconType: string; // Using iconType instead of icon for serialization
  features: string[];
  benefits: {
    title: string;
    description: string;
    icon?: ReactNode; // Optional icon
  }[];
  process: {
    title: string;
    description: string;
    icon?: ReactNode; // Optional icon
  }[];
  technologies?: string[];
  caseStudies?: {
    title: string;
    description: string;
    link?: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

// You could add more shared types here as needed
export interface CaseStudy {
  id: number;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

// Admin/management interfaces - if you decide to add a UI for data management
export interface DataManager {
  getAll: <T>(collection: string) => T[];
  getById: <T extends { id: number | string }>(collection: string, id: number | string) => T | undefined;
  add: <T>(collection: string, item: T) => T;
  update: <T extends { id: number | string }>(collection: string, id: number | string, updates: Partial<T>) => T | undefined;
  remove: <T extends { id: number | string }>(collection: string, id: number | string) => boolean;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearLocalStorage: () => void;
  resetToDefault: () => void;
}