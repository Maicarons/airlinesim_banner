import { createI18n } from 'vue-i18n';
import zhCN from '../locales/zh-CN';
import enUS from '../locales/en-US';
import frFR from '../locales/fr-FR';
import deDE from '../locales/de-DE';
import esES from '../locales/es-ES';
import jaJP from '../locales/ja-JP';
import koKR from '../locales/ko-KR';

export type SupportedLocale = 'zh-CN' | 'en-US' | 'fr-FR' | 'de-DE' | 'es-ES' | 'ja-JP' | 'ko-KR';

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'fr-FR': frFR,
  'de-DE': deDE,
  'es-ES': esES,
  'ja-JP': jaJP,
  'ko-KR': koKR,
};

// 从localStorage获取保存的语言，如果没有则使用浏览器语言
const getDefaultLocale = (): SupportedLocale => {
  const saved = localStorage.getItem('locale') as SupportedLocale;
  if (saved && messages[saved]) {
    return saved;
  }
  
  // 根据浏览器语言选择
  const browserLang = navigator.language;
  if (browserLang.startsWith('zh')) return 'zh-CN';
  if (browserLang.startsWith('en')) return 'en-US';
  if (browserLang.startsWith('fr')) return 'fr-FR';
  if (browserLang.startsWith('de')) return 'de-DE';
  if (browserLang.startsWith('es')) return 'es-ES';
  if (browserLang.startsWith('ja')) return 'ja-JP';
  if (browserLang.startsWith('ko')) return 'ko-KR';
  
  return 'zh-CN'; // 默认中文
};

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages,
});

export default i18n;

