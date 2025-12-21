<template>
  <div class="language-switcher">
    <el-dropdown @command="handleLanguageChange" trigger="click">
      <el-button link class="language-button">
        <i :class="`flag-icon flag-icon-${currentLanguageFlag}`" class="flag-icon-wrapper"></i>
        <span class="language-text">{{ currentLanguageName }}</span>
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="lang in languages"
            :key="lang.code"
            :command="lang.code"
            :class="{ 'is-active': currentLocale === lang.code }"
          >
            <i :class="`flag-icon flag-icon-${lang.flagCode}`" class="flag-icon-wrapper"></i>
            {{ lang.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Setting, ArrowDown } from '@element-plus/icons-vue';
import type { SupportedLocale } from '../i18n';

const { locale } = useI18n();

const languages = [
  { code: 'zh-CN' as SupportedLocale, name: '中文', flagCode: 'cn' },
  { code: 'en-US' as SupportedLocale, name: 'English', flagCode: 'us' },
  { code: 'fr-FR' as SupportedLocale, name: 'Français', flagCode: 'fr' },
  { code: 'de-DE' as SupportedLocale, name: 'Deutsch', flagCode: 'de' },
  { code: 'es-ES' as SupportedLocale, name: 'Español', flagCode: 'es' },
  { code: 'ja-JP' as SupportedLocale, name: '日本語', flagCode: 'jp' },
  { code: 'ko-KR' as SupportedLocale, name: '한국어', flagCode: 'kr' },
];

const currentLocale = computed(() => locale.value as SupportedLocale);

const currentLanguageName = computed(() => {
  const lang = languages.find((l) => l.code === currentLocale.value);
  return lang ? lang.name : '中文';
});

const currentLanguageFlag = computed(() => {
  const lang = languages.find((l) => l.code === currentLocale.value);
  return lang ? lang.flagCode : 'cn';
});

const handleLanguageChange = (langCode: SupportedLocale) => {
  locale.value = langCode;
  localStorage.setItem('locale', langCode);
  // 刷新页面以更新Element Plus语言
  window.location.reload();
};
</script>

<style scoped>
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.language-button {
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}

.language-button:hover {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.language-text {
  margin: 0 8px;
}

.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-dropdown-menu__item.is-active {
  color: var(--el-color-primary);
  font-weight: bold;
}

.flag-icon-wrapper {
  display: inline-block;
  width: 20px;
  height: 15px;
  margin-right: 8px;
  vertical-align: middle;
  flex-shrink: 0;
}

.flag-icon {
  width: 20px;
  height: 15px;
  border-radius: 2px;
  display: block;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .language-switcher {
    top: 10px;
    right: 10px;
  }
  
  .language-text {
    display: none;
  }
}
</style>

