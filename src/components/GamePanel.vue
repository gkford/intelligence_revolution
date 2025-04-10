<template>
  <div class="game-panel">
    <div class="left-column">
      <ResourcePanel />
      <DatacentrePanel class="datacentre-grow" />
    </div>
    <div class="right-column">
      <TechnologyPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourcePanel from './ResourcePanel.vue';
import DatacentrePanel from './DatacentrePanel.vue';
import TechnologyPanel from './TechnologyPanel.vue';
</script>

<style scoped>
.game-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.left-column .datacentre-grow {
  flex-grow: 1; /* Allow DatacentrePanel to take available space */
}
</style>
