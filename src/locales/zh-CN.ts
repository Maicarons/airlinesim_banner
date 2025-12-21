export default {
  app: {
    title: '航空公司横幅生成器',
    subtitle: '为您的虚拟航空公司生成专业横幅',
  },
  form: {
    bannerConfig: '横幅配置',
    airlineName: '航空公司名称',
    airlineNamePlaceholder: '请输入航空公司名称',
    prompt: '提示词（可选）',
    promptPlaceholder: '例如：蓝色主题，现代风格，飞机元素（留空则自动生成）',
    logoPosition: 'Logo位置',
    logoLeft: '左侧',
    logoRight: '右侧',
    logoNone: '无Logo（仅文字）',
    aiProvider: 'AI生图方案',
    doubao: '豆包生图',
    tongyi: '通义生图',
    generate: '生成横幅',
    generating: '生成中...',
  },
  results: {
    title: '生成结果',
    banner300x100: '公司横幅 (300x100)',
    banner120x23: '小横幅 (120x23)',
    download: '下载图片',
  },
  messages: {
    success: '横幅生成成功！',
    error: '生成失败，请稍后重试',
    downloadError: '下载失败，请稍后重试',
    apiKeyMissing: '未配置API密钥',
  },
  validation: {
    airlineNameRequired: '请输入航空公司名称',
  },
};

