<template>
  <div class="technology-panel">
    <h2>Technology</h2>
    <div class="work-allocator-container">
      <WorkAllocatorPanel />
    </div>
    <div class="tech-container">
      <div class="products-section">
        <h3>Products</h3>
        <ProductGrid />
      </div>
      <div class="discoveries-section">
        <h3>Discoveries</h3>
        <DiscoveryGrid />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductGrid from './ProductGrid.vue';
import DiscoveryGrid from './DiscoveryGrid.vue';
import WorkAllocatorPanel from './WorkAllocatorPanel.vue';
</script>

<style scoped>
.technology-panel {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  height: 100%;
  display: flex;
  min-height: 1100px; /* Add minimum height */
  flex-direction: column;
}

.work-allocator-container {
  margin-bottom: 1rem;
}

h2 {
  margin-top: 0;
  color: #2c3e50;
}

.tech-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  flex-grow: 1;
  min-height: 0;
}

.products-section,
.discoveries-section {
  display: flex;
  flex-direction: column;
  min-height: 0; /* allow children to shrink */
}

.products-section > *:last-child {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.products-section > *:last-child {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.discoveries-section > *:last-child {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

h3 {
  color: #2c3e50;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}
</style>
