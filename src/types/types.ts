// Common interfaces and types used throughout the application

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
    image: React.ReactNode;
  }