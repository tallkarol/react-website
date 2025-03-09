// src/data/index.ts - Central export point for all data
export * from './projects';
export * from './services';
export * from './testimonials';
export * from './features';

// You could also add utility functions here for data manipulation
export const getItemById = <T extends { id: number | string }>(
  items: T[],
  id: number | string
): T | undefined => {
  return items.find(item => item.id === id);
};