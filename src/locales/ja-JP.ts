export default {
  app: {
    title: '航空会社バナー生成器',
    subtitle: '仮想航空会社のためのプロフェッショナルなバナーを生成',
  },
  form: {
    bannerConfig: 'バナー設定',
    airlineName: '航空会社名',
    airlineNamePlaceholder: '航空会社名を入力してください',
    prompt: 'プロンプト（オプション）',
    promptPlaceholder: '例：青いテーマ、モダンスタイル、航空機要素（自動生成の場合は空白のまま）',
    logoPosition: 'ロゴの位置',
    logoLeft: '左',
    logoRight: '右',
    logoNone: 'ロゴなし（テキストのみ）',
    aiProvider: 'AI画像生成',
    doubao: '豆包画像生成',
    tongyi: '通義画像生成',
    generate: 'バナーを生成',
    generating: '生成中...',
  },
  results: {
    title: '生成結果',
    banner300x100: '会社バナー (300x100)',
    banner120x23: '小バナー (120x23)',
    download: '画像をダウンロード',
  },
  messages: {
    success: 'バナーが正常に生成されました！',
    error: '生成に失敗しました。後でもう一度お試しください',
    downloadError: 'ダウンロードに失敗しました。後でもう一度お試しください',
    apiKeyMissing: 'APIキーが設定されていません',
  },
  validation: {
    airlineNameRequired: '航空会社名を入力してください',
  },
};

