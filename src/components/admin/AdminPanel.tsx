// src/components/admin/AdminPanel.tsx
import { useState, useEffect } from 'react';
import { dataManager } from '@/utils/dataManager';
// import { ProjectDetails, ServiceDetails, Testimonial, Feature } from '@/types/types';

type DataType = 'projects' | 'services' | 'testimonials' | 'features';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<DataType>('projects');
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load data for the selected tab
  const loadData = (type: DataType) => {
    setActiveTab(type);
    let data: any[] = [];
    
    // Use the collection parameter when calling dataManager methods
    data = dataManager.getAll(type);
    
    setItems(data);
    setSelectedItem(null);
    setIsEditing(false);
  };

  // Initial data load
  useEffect(() => {
    loadData(activeTab);
  }, []);
  
  // Handle item selection
  const selectItem = (id: number | string) => {
    const item = dataManager.getById(activeTab, id);
    setSelectedItem(item);
    setIsEditing(false);
  };
  
  // Handle form submission for updates
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    
    const formData = new FormData(e.currentTarget);
    const updates: Record<string, any> = {};
    
    // Convert form data to object
    formData.forEach((value, key) => {
      // Try to parse JSON for arrays and objects
      if (typeof value === 'string') {
        try {
          if (value.trim().startsWith('[') || value.trim().startsWith('{')) {
            updates[key] = JSON.parse(value);
            return;
          }
        } catch (e) {
          // If parsing fails, use the string value
        }
      }
      updates[key] = value;
    });
    
    // Update the item - pass the collection name
    dataManager.update(activeTab, selectedItem.id, updates);
    
    // Save changes to local storage
    dataManager.saveToLocalStorage();
    
    // Reload data
    loadData(activeTab);
    setIsEditing(false);
  };
  
  // Create a new item
  const createNewItem = () => {
    // Create a skeleton item based on data type
    let newItem: any = { id: Date.now() };
    
    switch (activeTab) {
      case 'projects':
        newItem = {
          id: Date.now(),
          title: 'New Project',
          category: 'Artificial Intelligence',
          description: 'Project description',
          image: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
          technologies: ['React', 'Node.js'],
          features: ['Feature 1', 'Feature 2']
        };
        break;
      case 'services':
        newItem = {
          id: Date.now(),
          title: 'New Service',
          description: 'Service description',
          iconType: 'webApp', // This matches the service data format
          features: ['Feature 1', 'Feature 2'],
          benefits: [
            {
              title: 'Benefit 1',
              description: 'Benefit description'
            }
          ],
          process: [
            {
              title: 'Process 1',
              description: 'Process description'
            }
          ]
        };
        break;
      case 'testimonials':
        newItem = {
          id: Date.now(),
          content: 'New testimonial',
          author: 'Client Name',
          position: 'Position, Company',
          avatar: 'bg-indigo-500'
        };
        break;
      case 'features':
        newItem = {
          id: String(Date.now()),
          title: 'New Feature',
          description: 'Feature description',
          image: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
          type: 'performance'
        };
        break;
    }
    
    // Pass the collection name when adding
    dataManager.add(activeTab, newItem);
    dataManager.saveToLocalStorage();
    loadData(activeTab);
  };
  
  // Reset to default data
  const resetData = () => {
    if (window.confirm('Are you sure? This will reset all data to default values.')) {
      dataManager.resetToDefault();
      loadData(activeTab);
    }
  };
  
  // Format object values for display
  // const formatValue = (value: any): string => {
  //   if (value === null || value === undefined) return 'null';
  //   if (typeof value === 'object') return JSON.stringify(value, null, 2);
  //   return String(value);
  // }
  
  // Custom button styles to ensure visibility
  const buttonStyles = {
    primary: {
      backgroundColor: '#4f46e5', // indigo-600
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    secondary: {
      backgroundColor: '#4b5563', // gray-600
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    danger: {
      backgroundColor: '#dc2626', // red-600
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    tab: {
      active: {
        backgroundColor: '#4f46e5', // indigo-600
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        fontWeight: 500,
        cursor: 'pointer'
      },
      inactive: {
        backgroundColor: '#1e293b', // slate-800
        color: 'white',
        border: 'none', 
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        fontWeight: 500,
        cursor: 'pointer'
      }
    }
  };
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Content Management System</h1>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            style={activeTab === 'projects' ? buttonStyles.tab.active : buttonStyles.tab.inactive}
            onClick={() => loadData('projects')}
          >
            Projects
          </button>
          <button 
            style={activeTab === 'services' ? buttonStyles.tab.active : buttonStyles.tab.inactive}
            onClick={() => loadData('services')}
          >
            Services
          </button>
          <button 
            style={activeTab === 'testimonials' ? buttonStyles.tab.active : buttonStyles.tab.inactive}
            onClick={() => loadData('testimonials')}
          >
            Testimonials
          </button>
          <button 
            style={activeTab === 'features' ? buttonStyles.tab.active : buttonStyles.tab.inactive}
            onClick={() => loadData('features')}
          >
            Features
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {/* Item List */}
            <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    style={buttonStyles.primary}
                    onClick={createNewItem}
                  >
                    Add New
                  </button>
                  <button 
                    style={buttonStyles.danger}
                    onClick={resetData}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
                {items.map((item) => (
                  <div 
                    key={item.id}
                    style={{ 
                      padding: '0.75rem', 
                      cursor: 'pointer', 
                      borderRadius: '0.375rem',
                      backgroundColor: selectedItem?.id === item.id ? '#312e81' : '#334155',
                      transition: 'background-color 0.2s'
                    }}
                    onClick={() => selectItem(item.id)}
                  >
                    <h3 style={{ fontWeight: '500' }}>{item.title || item.author || item.content}</h3>
                    {item.description && (
                      <p style={{ fontSize: '0.875rem', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Item Details/Editor */}
            <div style={{ flex: '2', minWidth: '300px', backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem' }}>
              {selectedItem ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                      {isEditing ? 'Edit Item' : 'Item Details'}
                    </h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        style={isEditing ? buttonStyles.secondary : buttonStyles.primary}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                      {!isEditing && (
                        <button 
                          style={buttonStyles.danger}
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this item?')) {
                              dataManager.remove(activeTab, selectedItem.id);
                              dataManager.saveToLocalStorage();
                              loadData(activeTab);
                            }
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {/* Dynamic form fields based on selected item */}
                      {Object.entries(selectedItem).map(([key, value]) => {
                        // Skip special fields that shouldn't be directly edited
                        if (
                          key === 'id' || 
                          key === 'icon' || 
                          key === 'benefits' || 
                          key === 'process' || 
                          key === 'protections' || 
                          key === 'metrics' || 
                          key === 'statistics'
                        ) {
                          return null;
                        }
                        
                        // Handle arrays separately with simplified editing
                        if (Array.isArray(value)) {
                          return (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>{key}</label>
                              <textarea
                                name={key}
                                defaultValue={JSON.stringify(value)}
                                style={{ 
                                  width: '100%', 
                                  backgroundColor: '#334155', 
                                  border: '1px solid #475569', 
                                  borderRadius: '0.25rem', 
                                  padding: '0.5rem',
                                  height: '6rem',
                                  fontFamily: 'monospace',
                                  fontSize: '0.875rem',
                                  color: 'white'
                                }}
                                placeholder={`Enter JSON array for ${key}`}
                                spellCheck="false"
                              />
                              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Enter as JSON array, e.g. ["item1", "item2"]</p>
                            </div>
                          );
                        }
                        
                        // Handle objects with simplified editing
                        if (typeof value === 'object' && value !== null) {
                          return (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>{key}</label>
                              <textarea
                                name={key}
                                defaultValue={JSON.stringify(value, null, 2)}
                                style={{ 
                                  width: '100%', 
                                  backgroundColor: '#334155', 
                                  border: '1px solid #475569', 
                                  borderRadius: '0.25rem', 
                                  padding: '0.5rem',
                                  height: '8rem',
                                  fontFamily: 'monospace',
                                  fontSize: '0.875rem',
                                  color: 'white'
                                }}
                                placeholder={`Enter JSON object for ${key}`}
                                spellCheck="false"
                              />
                              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Enter as JSON object</p>
                            </div>
                          );
                        }
                        
                        // Default text field for strings and numbers
                        return (
                          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>{key}</label>
                            {typeof value === 'string' && value.length > 100 ? (
                              <textarea
                                name={key}
                                defaultValue={value as string}
                                style={{ 
                                  width: '100%', 
                                  backgroundColor: '#334155', 
                                  border: '1px solid #475569', 
                                  borderRadius: '0.25rem', 
                                  padding: '0.5rem',
                                  height: '8rem',
                                  color: 'white'
                                }}
                                rows={4}
                              />
                            ) : (
                              <input
                                type="text"
                                name={key}
                                defaultValue={String(value)}
                                style={{ 
                                  width: '100%', 
                                  backgroundColor: '#334155', 
                                  border: '1px solid #475569', 
                                  borderRadius: '0.25rem', 
                                  padding: '0.5rem',
                                  color: 'white'
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                      
                      <div style={{ paddingTop: '1rem' }}>
                        <button 
                          type="submit" 
                          style={{ ...buttonStyles.primary, padding: '0.75rem 1rem' }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {/* Display item details */}
                      {Object.entries(selectedItem).map(([key, value]) => {
                        // Skip certain fields for display clarity
                        if (key === 'icon') return null;
                        
                        return (
                          <div key={key} style={{ borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.25rem' }}>
                              {key}
                            </h3>
                            {Array.isArray(value) ? (
                              <div>
                                <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                                  Array with {value.length} items:
                                </p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                  {value.slice(0, 5).map((item, i) => (
                                    <li key={i} style={{ fontSize: '0.875rem', color: 'white' }}>
                                      {typeof item === 'object' ? JSON.stringify(item).slice(0, 50) : String(item)}
                                    </li>
                                  ))}
                                  {value.length > 5 && <li style={{ fontSize: '0.875rem', color: '#94a3b8' }}>... and {value.length - 5} more</li>}
                                </ul>
                              </div>
                            ) : typeof value === 'object' && value !== null ? (
                              <div>
                                <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                                  Object with properties:
                                </p>
                                <pre style={{ 
                                  backgroundColor: '#334155', 
                                  padding: '0.5rem', 
                                  borderRadius: '0.25rem', 
                                  marginTop: '0.5rem', 
                                  fontSize: '0.75rem', 
                                  overflowX: 'auto',
                                  color: 'white'
                                }}>
                                  {JSON.stringify(value, null, 2)}
                                </pre>
                              </div>
                            ) : (
                              <p style={{ marginTop: '0.25rem', color: 'white' }}>{String(value)}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '16rem', 
                  color: '#94a3b8' 
                }}>
                  Select an item to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;