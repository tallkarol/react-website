// src/components/admin/AdminPanel.tsx
import { useState } from 'react';
import { dataManager } from '@/utils/dataManager';
// import { ProjectDetails, ServiceDetails, Testimonial } from '@/types/types';

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
          technologies: [],
          features: []
        };
        break;
      case 'services':
        newItem = {
          id: Date.now(),
          title: 'New Service',
          description: 'Service description',
          features: [],
          benefits: [],
          process: []
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
          image: null
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
    if (confirm('Are you sure? This will reset all data to default values.')) {
      dataManager.resetToDefault();
      loadData(activeTab);
    }
  };
  
  // Initialize data if empty
  if (items.length === 0) {
    loadData(activeTab);
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Content Management System</h1>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-indigo-600' : 'bg-slate-800'}`}
            onClick={() => loadData('projects')}
          >
            Projects
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'services' ? 'bg-indigo-600' : 'bg-slate-800'}`}
            onClick={() => loadData('services')}
          >
            Services
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'testimonials' ? 'bg-indigo-600' : 'bg-slate-800'}`}
            onClick={() => loadData('testimonials')}
          >
            Testimonials
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'features' ? 'bg-indigo-600' : 'bg-slate-800'}`}
            onClick={() => loadData('features')}
          >
            Features
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Item List */}
          <div className="md:w-1/3 bg-slate-800 p-4 rounded">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <div>
                <button 
                  className="px-3 py-1 bg-indigo-600 rounded mr-2 text-sm"
                  onClick={createNewItem}
                >
                  Add New
                </button>
                <button 
                  className="px-3 py-1 bg-red-600 rounded text-sm"
                  onClick={resetData}
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 cursor-pointer rounded ${selectedItem?.id === item.id ? 'bg-indigo-900' : 'bg-slate-700 hover:bg-slate-600'}`}
                  onClick={() => selectItem(item.id)}
                >
                  <h3 className="font-medium">{item.title || item.author || item.content}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-300 truncate">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Item Details/Editor */}
          <div className="md:w-2/3 bg-slate-800 p-4 rounded">
            {selectedItem ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {isEditing ? 'Edit Item' : 'Item Details'}
                  </h2>
                  <div>
                    <button 
                      className={`px-3 py-1 rounded mr-2 ${isEditing ? 'bg-gray-600' : 'bg-indigo-600'}`}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {!isEditing && (
                      <button 
                        className="px-3 py-1 bg-red-600 rounded"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this item?')) {
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Dynamic form fields based on selected item */}
                    {Object.entries(selectedItem).map(([key, value]) => {
                      // Skip special fields
                      if (key === 'id' || key === 'icon' || key === 'image') return null;
                      
                      // Handle arrays separately
                      if (Array.isArray(value)) {
                        return (
                          <div key={key} className="space-y-2">
                            <label className="block text-sm font-medium">{key}</label>
                            <div className="bg-slate-700 p-2 rounded">
                              <p className="text-xs text-gray-300 mb-2">Array with {value.length} items</p>
                              <button 
                                type="button"
                                className="px-2 py-1 bg-indigo-600 rounded text-xs"
                                onClick={() => {
                                  // This is a placeholder - in a real app you'd open a modal to edit arrays
                                  alert('Array editing would be implemented in a full admin panel');
                                }}
                              >
                                Edit Array
                              </button>
                            </div>
                          </div>
                        );
                      }
                      
                      // Handle objects separately
                      if (typeof value === 'object' && value !== null) {
                        return (
                          <div key={key} className="space-y-2">
                            <label className="block text-sm font-medium">{key}</label>
                            <div className="bg-slate-700 p-2 rounded">
                              <p className="text-xs text-gray-300 mb-2">Object with {Object.keys(value).length} properties</p>
                              <button 
                                type="button"
                                className="px-2 py-1 bg-indigo-600 rounded text-xs"
                                onClick={() => {
                                  // This is a placeholder
                                  alert('Object editing would be implemented in a full admin panel');
                                }}
                              >
                                Edit Object
                              </button>
                            </div>
                          </div>
                        );
                      }
                      
                      // Default text field for strings and numbers
                      return (
                        <div key={key} className="space-y-2">
                          <label className="block text-sm font-medium">{key}</label>
                          {typeof value === 'string' && value.length > 100 ? (
                            <textarea
                              name={key}
                              defaultValue={value as string}
                              className="w-full bg-slate-700 border border-slate-600 rounded p-2"
                              rows={4}
                            />
                          ) : (
                            <input
                              type="text"
                              name={key}
                              defaultValue={value as string}
                              className="w-full bg-slate-700 border border-slate-600 rounded p-2"
                            />
                          )}
                        </div>
                      );
                    })}
                    
                    <div className="pt-4">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 rounded">
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {/* Display item details */}
                    {Object.entries(selectedItem).map(([key, value]) => {
                      // Skip displaying certain fields
                      if (key === 'id' || key === 'icon' || key === 'image') return null;
                      
                      return (
                        <div key={key} className="border-b border-slate-700 pb-3">
                          <h3 className="text-sm font-medium text-gray-400">{key}</h3>
                          {Array.isArray(value) ? (
                            <div className="mt-1">
                              <p className="text-sm text-gray-300">Array with {value.length} items:</p>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                {value.slice(0, 5).map((item, i) => (
                                  <li key={i} className="text-sm">
                                    {typeof item === 'object' ? JSON.stringify(item).slice(0, 50) : String(item)}
                                  </li>
                                ))}
                                {value.length > 5 && <li className="text-sm text-gray-400">... and {value.length - 5} more</li>}
                              </ul>
                            </div>
                          ) : typeof value === 'object' && value !== null ? (
                            <div className="mt-1">
                              <p className="text-sm text-gray-300">Object with properties:</p>
                              <pre className="bg-slate-700 p-2 rounded mt-2 text-xs overflow-x-auto">
                                {JSON.stringify(value, null, 2)}
                              </pre>
                            </div>
                          ) : (
                            <p className="mt-1">{String(value)}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                Select an item to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;