// src/utils/dataManager.ts
import { DataManager } from '@/types/types';
import * as data from '@/data';

// For now, this is a simulation of CRUD operations in memory
// In the future, this could be connected to a backend API or local storage
class DataManagerImpl implements DataManager {
  private cache: Record<string, any[]> = {};

  constructor() {
    // Initialize cache with all available data
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        this.cache[key] = [...value];
      }
    });
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
    
    return updatedItem as T;
  }

  // Remove an item
  remove<T extends { id: number | string }>(collection: string, id: number | string): boolean {
    const items = this.cache[collection] || [];
    const index = items.findIndex((item: T) => item.id === id);
    
    if (index < 0) return false;
    
    items.splice(index, 1);
    this.cache[collection] = items;
    
    return true;
  }

  // Implement local storage persistence (for browser environments)
  saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      Object.entries(this.cache).forEach(([key, value]) => {
        localStorage.setItem(`data_${key}`, JSON.stringify(value));
      });
    }
  }

  // Load from local storage (for browser environments)
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      Object.keys(this.cache).forEach((key) => {
        const saved = localStorage.getItem(`data_${key}`);
        if (saved) {
          try {
            this.cache[key] = JSON.parse(saved);
          } catch (e) {
            console.error(`Error loading ${key} from local storage:`, e);
          }
        }
      });
    }
  }

  // Clear local storage data
  clearLocalStorage(): void {
    if (typeof window !== 'undefined') {
      Object.keys(this.cache).forEach((key) => {
        localStorage.removeItem(`data_${key}`);
      });
    }
  }

  // Reset to original data
  resetToDefault(): void {
    this.cache = {};
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        this.cache[key] = [...value];
      }
    });
    this.saveToLocalStorage();
  }
}

// Create singleton instance
export const dataManager = new DataManagerImpl();

// Example usage:
// const projects = dataManager.getAll<ProjectDetails>('projects');
// const project = dataManager.getById<ProjectDetails>('projects', 1);
// dataManager.add('projects', newProject);
// dataManager.update('projects', 1, { title: 'Updated Title' });
// dataManager.remove('projects', 1);