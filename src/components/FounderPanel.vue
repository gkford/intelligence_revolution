<template>
  <div class="founder-panel panel-card">
    <h3>Founder Actions (Startup Phase)</h3>
    <p>Manually drive initial breakthroughs by applying focused effort to discoveries.</p>
    <div v-if="canDoResearch">
      <p>
        <span v-if="techTreeStore.currentlySelectedDiscovery">
          Discovery: <strong>{{ selectedDiscoveryName }}</strong>
        </span>
        <span v-if="techTreeStore.currentlySelectedDiscovery && techTreeStore.currentlySelectedProduct"> | </span>
        <span v-if="techTreeStore.currentlySelectedProduct">
          Product: <strong>{{ selectedProductName }}</strong>
        </span>
      </p>
      <button @click="doStartupWork" :disabled="!canDoResearch">
        Focus Effort (Applies 1 Work)
      </button>
    </div>
    <div v-else>
      <p class="info-message">Select an available Discovery or Product to begin.</p>
      <button disabled>Focus Effort</button>
    </div>

    <div class="manual-work-info">
      Each click applies 1 unit of work distributed by allocation ratio
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTechTreeStore } from '../stores/techTree';
import { useResourcesStore } from '../stores/resources';
import { findTechById } from '../stores/staticData';
import { useDatacentreStore } from '../stores/datacentre'; // Import datacentre store

const techTreeStore = useTechTreeStore();
const resourcesStore = useResourcesStore();
const datacentreStore = useDatacentreStore();

const canDoResearch = computed(() =>
  !!techTreeStore.currentlySelectedDiscovery || !!techTreeStore.currentlySelectedProduct
);

const selectedDiscoveryName = computed(() => {
  if (!techTreeStore.currentlySelectedDiscovery) return 'None';
  const tech = findTechById(techTreeStore.currentlySelectedDiscovery);
  return tech?.name ?? 'Unknown';
});

const selectedProductName = computed(() => {
  if (!techTreeStore.currentlySelectedProduct) return 'None';
  const tech = findTechById(techTreeStore.currentlySelectedProduct);
  return tech?.name ?? 'Unknown';
});

function doStartupWork() {
  if (!canDoResearch.value) {
    console.warn("Attempted manual work without any selection.");
    return;
  }

  let wasWorkWasted = false; // Track if any waste occurred in this click
  const totalWorkAmount = 1;
  const researchProportion = datacentreStore.proportionWorkSpentOnResearch;
  const productProportion = 1 - researchProportion;

  if (techTreeStore.currentlySelectedDiscovery) {
    const discoveryWorkAmount = totalWorkAmount * researchProportion;
    if (discoveryWorkAmount > 0) {
      console.log(`Applying ${discoveryWorkAmount.toFixed(2)} manual work to discovery ${techTreeStore.currentlySelectedDiscovery}`);
      techTreeStore.progressWork(techTreeStore.currentlySelectedDiscovery, discoveryWorkAmount);
    }
  } else if (researchProportion > 0) {
    console.log(`Wasting ${(totalWorkAmount * researchProportion).toFixed(2)} work allocated to research - no discovery selected`);
    wasWorkWasted = true;
  }

  if (techTreeStore.currentlySelectedProduct) {
    const productWorkAmount = totalWorkAmount * productProportion;
    if (productWorkAmount > 0) {
      console.log(`Applying ${productWorkAmount.toFixed(2)} manual work to product ${techTreeStore.currentlySelectedProduct}`);
      techTreeStore.progressWork(techTreeStore.currentlySelectedProduct, productWorkAmount);
    }
  } else if (productProportion > 0) {
    console.log(`Wasting ${(totalWorkAmount * productProportion).toFixed(2)} work allocated to products - no product selected`);
    wasWorkWasted = true;
  }

  // Optional: Add visual feedback here (e.g., button flash)

  // If any work was wasted during this click, flag it in the store
  if (wasWorkWasted) {
    datacentreStore.flagManualWorkWaste();
  }
}
</script>

<style scoped>
.panel-card { /* Use a consistent card style */
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h3 {
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

button {
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
   background-color: #3aa876;
}

.error-message {
  color: var(--error-color, #e53935);
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

.info-message {
   color: var(--muted-text, #666);
   font-style: italic;
   text-align: center;
}

.manual-work-info {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color, #ddd);
  font-size: 0.85rem;
  color: var(--muted-text, #666);
  font-family: monospace;
  text-align: center;
}
</style>
