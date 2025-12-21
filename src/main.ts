import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'flag-icon-css/css/flag-icons.min.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import fr from 'element-plus/es/locale/lang/fr';
import de from 'element-plus/es/locale/lang/de';
import es from 'element-plus/es/locale/lang/es';
import ja from 'element-plus/es/locale/lang/ja';
import ko from 'element-plus/es/locale/lang/ko';
import './style.css';
import App from './App.vue';
import i18n from './i18n';

const app = createApp(App);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Element Plus 语言映射
const elementPlusLocaleMap: Record<string, any> = {
  'zh-CN': zhCn,
  'en-US': en,
  'fr-FR': fr,
  'de-DE': de,
  'es-ES': es,
  'ja-JP': ja,
  'ko-KR': ko,
};

// 获取当前Element Plus语言包
const getElementPlusLocale = () => {
  const currentLocale = i18n.global.locale.value as string;
  return elementPlusLocaleMap[currentLocale] || en;
};

app.use(ElementPlus, {
  locale: getElementPlusLocale(),
});

app.use(i18n);
app.mount('#app');

