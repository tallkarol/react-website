// src/data/services.ts
import { ServiceDetails } from '@/types/types';

export const services: ServiceDetails[] = [
  {
    id: 1,
    title: "Custom Web Applications",
    description: "Tailored web solutions designed to address your specific business challenges and goals.",
    longDescription: "Our custom web applications are built to transform your business processes, enhance customer experiences, and drive operational efficiency. We focus on creating solutions that perfectly align with your unique requirements and scale with your growth.",
    iconType: 'webApp',
    features: [
      "Responsive, mobile-first design",
      "Scalable architecture",
      "Intuitive user interfaces",
      "Seamless third-party integrations",
      "Comprehensive security measures",
      "Performance optimization",
      "Ongoing support and maintenance"
    ],
    benefits: [
      {
        title: "Customized to Your Needs",
        description: "Built specifically for your business processes and workflows, eliminating the compromises required by off-the-shelf solutions."
      },
      {
        title: "Scalable Growth",
        description: "Designed to evolve and expand alongside your business, accommodating new features and increased user load."
      },
      {
        title: "Integration Capabilities",
        description: "Seamlessly connects with your existing systems and third-party services to create a unified ecosystem."
      },
      {
        title: "Competitive Advantage",
        description: "Provides unique capabilities tailored to your business that off-the-shelf solutions cannot match."
      }
    ],
    process: [
      {
        title: "Requirements Analysis",
        description: "We work closely with you to understand your business processes, challenges, and goals."
      },
      {
        title: "Solution Design",
        description: "Our team develops a comprehensive architecture and design for your custom application."
      },
      {
        title: "Agile Development",
        description: "Using iterative development methods, we build your solution with regular feedback cycles."
      },
      {
        title: "Quality Assurance",
        description: "Rigorous testing ensures your application performs flawlessly across all scenarios."
      },
      {
        title: "Deployment & Training",
        description: "We carefully launch your application and provide training to ensure smooth adoption."
      },
      {
        title: "Ongoing Support",
        description: "Our team continues to maintain, support, and enhance your application post-launch."
      }
    ],
    technologies: [
      "React", "Angular", "Vue.js", "Node.js", "PHP", "Python", "Ruby on Rails", "PostgreSQL", "MongoDB", "AWS", "Azure", "Docker"
    ],
    caseStudies: [
      {
        title: "Enterprise Resource Planning System",
        description: "A comprehensive ERP solution for a manufacturing company that streamlined operations and increased efficiency by 65%."
      },
      {
        title: "Customer Portal Platform",
        description: "A secure client portal for a financial services firm that improved client satisfaction and reduced support calls by 40%."
      }
    ],
    faq: [
      {
        question: "How long does it typically take to develop a custom web application?",
        answer: "Development timelines vary based on complexity, but most projects take between 3-6 months from initial concept to launch."
      },
      {
        question: "Do you provide support after the application is launched?",
        answer: "Yes, we offer ongoing maintenance, support, and enhancement services to ensure your application continues to evolve with your business needs."
      },
      {
        question: "How do you ensure the security of custom applications?",
        answer: "We implement industry best practices for security, including encryption, secure authentication, regular security audits, and compliance with relevant standards."
      }
    ]
  },
  {
    id: 2,
    title: "AI-Powered Solutions",
    description: "Intelligent tools that leverage machine learning to automate processes and drive insights.",
    longDescription: "Our AI-powered solutions harness the latest advancements in artificial intelligence and machine learning to transform raw data into actionable intelligence, automate complex processes, and create innovative customer experiences that give you a competitive edge.",
    iconType: 'ai',
    features: [
      "Natural language processing",
      "Predictive analytics",
      "Computer vision solutions",
      "Machine learning models",
      "Deep learning algorithms",
      "Neural networks",
      "Automated decision systems"
    ],
    benefits: [
      {
        title: "Data-Driven Decisions",
        description: "Transform raw data into actionable insights that guide strategic decision-making."
      },
      {
        title: "Process Automation",
        description: "Automate complex, repetitive tasks to increase efficiency and reduce operational costs."
      },
      {
        title: "Enhanced Customer Experience",
        description: "Deliver personalized interactions and recommendations that improve customer satisfaction and loyalty."
      },
      {
        title: "Predictive Capabilities",
        description: "Anticipate trends, behaviors, and potential issues before they impact your business."
      }
    ],
    process: [
      {
        title: "Data Assessment",
        description: "We evaluate your existing data sources and identify what additional data might be needed."
      },
      {
        title: "AI Strategy Development",
        description: "Our team designs a tailored AI strategy aligned with your business objectives."
      },
      {
        title: "Model Development",
        description: "We build and train custom machine learning models using your specific data."
      },
      {
        title: "Integration & Testing",
        description: "The AI solution is integrated with your systems and thoroughly tested for accuracy."
      },
      {
        title: "Deployment & Monitoring",
        description: "We deploy your solution and establish ongoing monitoring to ensure optimal performance."
      }
    ],
    technologies: [
      "TensorFlow", "PyTorch", "Scikit-learn", "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "Neural Networks", "AWS SageMaker", "Google AI Platform", "Azure Machine Learning"
    ],
    caseStudies: [
      {
        title: "AI-Powered Customer Dashboard",
        description: "A machine learning solution that increased customer retention by 40% through predictive analytics and personalized recommendations."
      },
      {
        title: "Automated Document Processing",
        description: "An intelligent document processing system that reduced manual processing time by 85% while improving accuracy by 40%."
      }
    ],
    faq: [
      {
        question: "Do we need a large amount of data to implement AI solutions?",
        answer: "While more data generally produces better results, we can work with various data volumes. We can also help you identify and collect relevant data if needed."
      },
      {
        question: "How long does it take to see results from AI implementations?",
        answer: "Initial results are typically visible within 1-3 months, with continuous improvements as the system learns from more data over time."
      }
    ]
  },
  {
    id: 3,
    title: "Business Process Automation",
    description: "Streamline operations by automating repetitive tasks and optimizing workflows.",
    longDescription: "Our business process automation solutions eliminate manual, time-consuming tasks and streamline complex workflows to increase efficiency, reduce errors, and allow your team to focus on high-value activities that drive growth and innovation.",
    iconType: 'automation',
    features: [
      "Workflow automation",
      "Document processing",
      "Business intelligence dashboards",
      "Integration with existing systems",
      "Process mapping and optimization",
      "Custom automation scripts",
      "Approval workflow management"
    ],
    benefits: [
      {
        title: "Increased Efficiency",
        description: "Automate repetitive tasks to complete processes faster and with fewer resources."
      },
      {
        title: "Reduced Errors",
        description: "Minimize human error in routine processes for more reliable, consistent outcomes."
      },
      {
        title: "Cost Savings",
        description: "Lower operational costs through reduced manual labor and improved resource allocation."
      },
      {
        title: "Enhanced Visibility",
        description: "Gain real-time insights into process performance and identify bottlenecks quickly."
      }
    ],
    process: [
      {
        title: "Process Analysis",
        description: "We map your current processes and identify opportunities for automation and optimization."
      },
      {
        title: "Automation Strategy",
        description: "Our team develops a comprehensive strategy for implementing automation across your business."
      },
      {
        title: "Solution Development",
        description: "We build custom automation tools tailored to your specific workflows and systems."
      },
      {
        title: "Implementation & Training",
        description: "The automation solutions are implemented with minimal disruption, and your team receives training."
      },
      {
        title: "Continuous Improvement",
        description: "We monitor performance and continue to refine and enhance your automation systems."
      }
    ],
    technologies: [
      "Workflow Engines", "RPA (Robotic Process Automation)", "Business Process Management", "Low-Code Platforms", "API Integration", "Document Management", "OCR Technology", "Zapier", "Power Automate", "UiPath"
    ],
    caseStudies: [
      {
        title: "Financial Services Automation",
        description: "An automated approval workflow system that reduced processing time from days to minutes and improved compliance tracking by 100%."
      },
      {
        title: "Manufacturing Process Optimization",
        description: "A comprehensive production workflow automation that increased output by 35% while reducing errors by 80%."
      }
    ],
    faq: [
      {
        question: "Which business processes are best suited for automation?",
        answer: "Repetitive, rule-based processes with high volume are ideal candidates, such as data entry, document processing, approval workflows, and routine customer communications."
      },
      {
        question: "Will automation replace our employees?",
        answer: "Rather than replacing employees, automation typically enhances their productivity by freeing them from repetitive tasks so they can focus on more valuable, creative work."
      }
    ]
  }
];

export const getServiceById = (id: number): ServiceDetails | undefined => {
  return services.find(service => service.id === id);
};