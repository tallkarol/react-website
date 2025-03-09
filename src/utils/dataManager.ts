// src/utils/dataManager.ts
import { DataManager } from '@/types/types';
import * as initialData from '@/data';

// For now, this is a simulation of CRUD operations in memory
// In the future, this could be connected to a backend API or local storage
class DataManagerImpl implements DataManager {
  private cache: Record<string, any[]> = {};
  private initialized = false;

  constructor() {
    this.initializeCache();
  }

  private initializeCache() {
    // First, try to load from localStorage
    this.loadFromLocalStorage();

    // If we don't have data in localStorage or something failed, use the initial data
    if (!this.initialized) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          this.cache[key] = JSON.parse(JSON.stringify(value)); // Deep clone to avoid reference issues
        }
      });
      this.initialized = true;
      
      // Save to localStorage for future use
      this.saveToLocalStorage();
    }
  }

  // Generic get all items of a collection
  getAll<T>(collection: string): T[] {
    return this.cache[collection] || [];
  }

  // Get specific item by ID
  getById<T extends { id: number | string }>(collection: string, id: number | string): T | undefined {
    const items = this.cache[collection] || [];
    return items.find((item: T) => item.id === id);
  }

  // Add new item to a collection
  add<T>(collection: string, item: T): T {
    if (!this.cache[collection]) {
      this.cache[collection] = [];
    }
    this.cache[collection].push(item);
    this.saveToLocalStorage(); // Save immediately after adding
    return item;
  }

  // Update an existing item
  update<T extends { id: number | string }>(
    collection: string,
    id: number | string,
    updates: Partial<T>
  ): T | undefined {
    const items = this.cache[collection] || [];
    const index = items.findIndex((item: T) => item.id === id);
    
    if (index < 0) return undefined;
    
    const updatedItem = { ...items[index], ...updates };
    items[index] = updatedItem;
    this.cache[collection] = items;
    
    this.saveToLocalStorage(); // Save immediately after updating
    return updatedItem as T;
  }

  // Remove an item
  remove<T extends { id: number | string }>(collection: string, id: number | string): boolean {
    const items = this.cache[collection] || [];
    const index = items.findIndex((item: T) => item.id === id);
    
    if (index < 0) return false;
    
    items.splice(index, 1);
    this.cache[collection] = items;
    
    this.saveToLocalStorage(); // Save immediately after removing
    return true;
  }

  // Implement local storage persistence
  saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('techsynergy_data', JSON.stringify(this.cache));
        console.log('Data saved to localStorage');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }

  // Load from local storage
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem('techsynergy_data');
        if (savedData) {
          this.cache = JSON.parse(savedData);
          this.initialized = true;
          console.log('Data loaded from localStorage');
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        this.initialized = false;
      }
    }
  }

  // Clear local storage data
  clearLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('techsynergy_data');
      console.log('Data cleared from localStorage');
    }
  }

  // Reset to original data
  resetToDefault(): void {
    this.cache = {};
    Object.entries(initialData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        this.cache[key] = JSON.parse(JSON.stringify(value)); // Deep clone
      }
    });
    this.saveToLocalStorage();
    console.log('Data reset to defaults');
  }
}

// Create singleton instance
export const dataManager = new DataManagerImpl();