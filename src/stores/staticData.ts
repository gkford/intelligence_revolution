import { ref } from 'vue';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get the correct directory path in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct absolute paths to the JSON files
const hardwarePath = path.resolve(__dirname, '../data/hardware.json');
const techTreePath = path.resolve(__dirname, '../data/techTree.json');

// Read the files synchronously and parse the JSON
const hardwareData = JSON.parse(fs.readFileSync(hardwarePath, 'utf-8'));
const techTreeData = JSON.parse(fs.readFileSync(techTreePath, 'utf-8'));

// Use simple refs for static data accessible across the app
export const allHardware = ref(hardwareData);
export const allTech = ref(techTreeData);

// Helper function to find tech by ID
export function findTechById(id: string) {
  // First, check products
  const product = allTech.value.products.find(item => item.id === id);
  if (product) return { ...product, type: 'product' };
  
  // Then check discoveries
  const discovery = allTech.value.discoveries.find(item => item.id === id);
  if (discovery) return { ...discovery, type: 'discovery' };
  
  return null;
}

// Helper function to find hardware by ID
export function findHardwareById(id: string) {
  return allHardware.value.find(item => item.id === id) || null;
}

// Helper function to find hardware by Tier (for upgrades)
export function findHardwareByTier(tier: number) {
  // For this implementation, we'll use index+1 as tier
  if (tier <= 0 || tier > allHardware.value.length) return null;
  return allHardware.value[tier - 1];
}

// Helper function to get the next hardware upgrade
export function getNextHardware(currentId: string) {
  const currentIndex = allHardware.value.findIndex(hw => hw.id === currentId);
  if (currentIndex < 0 || currentIndex >= allHardware.value.length - 1) {
    return null;
  }
  return allHardware.value[currentIndex + 1];
}

// Constants (can also live here or in a dedicated constants file)
export const COST_PER_RESEARCHER = 5; // Example value
export const BASE_INCOME = 10;
export const GAME_DURATION_MINUTES = 20;
export const START_YEAR = 1950;
export const END_YEAR = 2030;
export const NORMAL_TIMEOUT = 100; // For testing

export default {
  allHardware,
  allTech,
  findTechById,
  findHardwareById,
  findHardwareByTier,
  getNextHardware,
  COST_PER_RESEARCHER,
  BASE_INCOME,
  GAME_DURATION_MINUTES,
  START_YEAR,
  END_YEAR,
  NORMAL_TIMEOUT
};
