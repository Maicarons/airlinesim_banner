<template>
  <div class="app-container">
    <LanguageSwitcher />
    <div class="content-wrapper">
      <header class="app-header">
        <h1>{{ $t('app.title') }}</h1>
        <p class="subtitle">{{ $t('app.subtitle') }}</p>
      </header>
      <main class="app-main">
        <BannerGenerator />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import BannerGenerator from './components/BannerGenerator.vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 40px 20px;
  width: 100%;
  box-sizing: border-box;
}

.app-header h1 {
  margin: 0;
  font-size: 2.5em;
  font-weight: bold;
}

.subtitle {
  margin: 10px 0 0 0;
  font-size: 1.1em;
  opacity: 0.9;
}

.app-main {
  padding: 40px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}
</style>


