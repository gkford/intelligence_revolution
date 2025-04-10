<template>
  <div class="work-allocator-panel">
    <h3>Work Allocation</h3>
    <!-- Display allocation percentages -->
    <div class="allocation-display">
      <div>Products: {{ Math.round((1 - datacentreStore.proportionWorkSpentOnResearch) * 100) }}%</div>
      <div>Research: {{ Math.round(datacentreStore.proportionWorkSpentOnResearch * 100) }}%</div>
    </div>
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      :value="datacentreStore.proportionWorkSpentOnResearch"
      @input="handleSliderChange"
    />
    <!-- Display warning or default note -->
    <div class="allocation-note" :class="{ 'warning': showWasteWarning }">
      {{ allocationMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDatacentreStore } from '../stores/datacentre';
import { useTechTreeStore } from '../stores/techTree'; // Import tech tree store

const datacentreStore = useDatacentreStore();
const techTreeStore = useTechTreeStore(); // Get tech tree store instance

// Determine if the waste warning should be shown (based on the flag in datacentre store)
const showWasteWarning = computed(() => datacentreStore.manualWorkWasted);

// Compute the message to display (either warning or default)
const allocationMessage = computed(() => {
  if (showWasteWarning.value) {
    const researchAllocated = datacentreStore.proportionWorkSpentOnResearch > 0;
    const productAllocated = datacentreStore.proportionWorkSpentOnResearch < 1;
    const researchSelected = !!techTreeStore.currentlySelectedDiscovery;
    const productSelected = !!techTreeStore.currentlySelectedProduct;
    const researchAvailable = techTreeStore.availableDiscoveries.length > 0;
    const productAvailable = techTreeStore.availableProducts.length > 0;

    const wasteResearch = researchAllocated && !researchSelected;
    const wasteProduct = productAllocated && !productSelected;

    let message = "Work is being wasted! Reallocate work";
    const selectOptions = [];
    if (wasteResearch && researchAvailable) {
      selectOptions.push("select a discovery");
    }
    if (wasteProduct && productAvailable) {
      selectOptions.push("select a product");
    }

    if (selectOptions.length > 0) {
      message += ` or ${selectOptions.join(' and ')}`;
    }
    message += ".";
    return message;
  }
  // Default message
  return "Drag slider to change allocation between Products and Research";
});

function handleSliderChange(event) {
  const newValue = parseFloat(event.target.value);
  datacentreStore.setWorkAllocation(newValue);
}
</script>

<style scoped>
.work-allocator-panel {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  color: #2c3e50;
}

.allocation-display {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  font-weight: bold;
}

input[type="range"] {
  width: 100%;
  margin: 1rem 0 0.5rem;
  cursor: pointer;
}

.allocation-note {
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  font-style: italic;
  min-height: 1.2em; /* Reserve space */
  transition: color 0.3s ease;
}

.allocation-note.warning {
  color: var(--error-color, #e53935);
  font-weight: bold;
  font-style: normal;
}
</style>
