<template>
  <div id="app">
    <HeaderPanel />
    
    <main>
      <GamePanel />
      
      <!-- Debug Panel with advanced actions - will be removed later -->
      <DebugPanel />
    </main>
    
    <footer>
      <p>Version {{ version }}</p>
      <p v-if="versionInfo?.buildTime" class="build-time">
        Built: {{ new Date(versionInfo.buildTime).toLocaleString() }}
      </p>
    </footer>

    <!-- Modal Components -->
    <QuizModal />
    <InfoPopup />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useVersion } from './composables/useVersion';
import HeaderPanel from './components/HeaderPanel.vue';
import GamePanel from './components/GamePanel.vue';
import DebugPanel from './components/DebugPanel.vue';
import QuizModal from './components/QuizModal.vue';
import InfoPopup from './components/InfoPopup.vue';

import { useTimeStore } from './stores/time';

const { version: versionInfo } = useVersion();
const version = computed(() => versionInfo.value?.version || '0.0.0');

const timeStore = useTimeStore();

onMounted(() => {
  timeStore.startGame();
});
</script>

<style>
:root {
  --primary-color: #42b983;
  --primary-hover: #3aa876;
  --error-color: #e53935;
  --text-color: #2c3e50;
  --muted-text: #666;
  --border-color: #ddd;
  --bg-color: #f9f9f9;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

main {
  margin-bottom: 50px;
}

.debug-section {
  background-color: #fff3cd;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: left;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

footer {
  text-align: center;
  margin: 30px 0;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  color: var(--muted-text);
  font-size: 14px;
}

footer p {
  margin: 5px 0;
}

footer .build-time {
  font-size: 12px;
  opacity: 0.8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  #app {
    padding: 0 15px;
  }
}
</style>
