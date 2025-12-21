<template>
  <div class="banner-generator">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('form.bannerConfig') }}</span>
        </div>
      </template>

      <el-form :model="form" :label-width="labelWidth" :rules="rules" ref="formRef">
        <el-form-item :label="$t('form.airlineName')" prop="airlineName">
          <el-input v-model="form.airlineName" :placeholder="$t('form.airlineNamePlaceholder')" clearable />
        </el-form-item>

        <el-form-item :label="$t('form.prompt')" prop="prompt">
          <el-input v-model="form.prompt" type="textarea" :rows="3" :placeholder="$t('form.promptPlaceholder')" />
        </el-form-item>

        <el-form-item :label="$t('form.logoPosition')" prop="logoPosition">
          <el-radio-group v-model="form.logoPosition">
            <el-radio value="left">{{ $t('form.logoLeft') }}</el-radio>
            <el-radio value="right">{{ $t('form.logoRight') }}</el-radio>
            <el-radio value="none">{{ $t('form.logoNone') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('form.aiProvider')" prop="aiProvider">
          <el-radio-group v-model="form.aiProvider">
            <el-radio value="doubao">{{ $t('form.doubao') }}</el-radio>
            <el-radio value="tongyi">{{ $t('form.tongyi') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="generateBanner" size="large">
            <el-icon>
              <MagicStick />
            </el-icon>
            {{ $t('form.generate') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="results.length > 0" class="results-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t('results.title') }}</span>
        </div>
      </template>

      <div class="results">
        <div v-for="(result, index) in results" :key="index" class="result-item">
          <h3>{{ result.name }}</h3>
          <div class="image-container">
            <img :src="result.url" :alt="result.name" />
          </div>
          <el-button type="primary" @click="downloadImage(result.url, result.name)" :icon="Download">
            {{ $t('results.download') }}
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { MagicStick, Download } from '@element-plus/icons-vue';

const { t } = useI18n();

interface FormData {
  airlineName: string;
  prompt: string;
  logoPosition: 'left' | 'right' | 'none';
  aiProvider: 'doubao' | 'tongyi';
}

interface Result {
  name: string;
  url: string;
}

const formRef = ref<FormInstance>();
const loading = ref(false);
const results = ref<Result[]>([]);

const form = reactive<FormData>({
  airlineName: '',
  prompt: '',
  logoPosition: 'left',
  aiProvider: 'doubao',
});

const { locale } = useI18n();

const labelWidth = computed(() => {
  // 根据语言调整标签宽度
  if (locale.value.startsWith('zh') || locale.value.startsWith('ja') || locale.value.startsWith('ko')) {
    return '120px';
  }
  return '150px';
});

const rules: FormRules = {
  airlineName: [
    { required: true, message: t('validation.airlineNameRequired'), trigger: 'blur' },
  ],
};

const generateBanner = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (!valid) return;

    loading.value = true;
    results.value = [];

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          airlineName: form.airlineName,
          prompt: form.prompt,
          logoPosition: form.logoPosition,
          aiProvider: form.aiProvider,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '生成失败');
      }

      const data = await response.json();
      results.value = [
        {
          name: `${form.airlineName} - ${t('results.banner300x100')}`,
          url: data.banner300x100,
        },
        {
          name: `${form.airlineName} - ${t('results.banner120x23')}`,
          url: data.banner120x23,
        },
      ];

      ElMessage.success(t('messages.success'));
    } catch (error: any) {
      ElMessage.error(error.message || t('messages.error'));
    } finally {
      loading.value = false;
    }
  });
};

const downloadImage = (url: string, filename: string) => {
  try {
    // 如果是base64数据URL，直接下载
    if (url.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // 如果是普通URL，先获取再下载
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error('下载失败:', error);
        ElMessage.error(t('messages.downloadError'));
      });
  } catch (error) {
    console.error('下载失败:', error);
    ElMessage.error(t('messages.downloadError'));
  }
};
</script>

<style scoped>
.banner-generator {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 20px;
}

.card-header {
  font-size: 1.2em;
  font-weight: bold;
}

.results-card {
  margin-top: 30px;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.result-item {
  text-align: center;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #f5f7fa;
}

.result-item h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.image-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .results {
    gap: 20px;
  }
}
</style>
