import { useState } from 'react';
import ServiceDetailsModal, { ServiceDetails } from '../ui/ServiceDetailsModal';

// Sample service data
const services: ServiceDetails[] = [
  {
    id: 1,
    title: "Custom Web Applications",
    description: "Tailored web solutions designed to address your specific business challenges and goals.",
    longDescription: "Our custom web applications are built to transform your business processes, enhance customer experiences, and drive operational efficiency. We focus on creating solutions that perfectly align with your unique requirements and scale with your growth.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clipRule="evenodd" />
      </svg>
    ),
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
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.5 7.5h-9v9h9v-9Z" />
        <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z" clipRule="evenodd" />
      </svg>
    ),
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
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
      </svg>
    ),
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
  },
];

const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openServiceModal = (service: ServiceDetails) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="services" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cutting-edge solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-slate-800 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-slate-700/50"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className={`rounded-full w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300 ${
                  hoveredId === service.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-indigo-500/20 text-indigo-500'
                }`}
              >
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              
              <div className="space-y-3 mb-6">
                {service.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                {service.features.length > 4 && (
                  <div className="text-gray-400 text-sm italic pt-1">
                    +{service.features.length - 4} more features
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => openServiceModal(service)}
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
              >
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Service Modal */}
      {selectedService && (
        <ServiceDetailsModal
          isOpen={isModalOpen}
          onClose={closeServiceModal}
          service={selectedService}
        />
      )}
    </section>
  );
};

export default ServicesSection;