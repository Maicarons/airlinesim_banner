# 项目结构说明

```
airlinesim_banner/
├── api/                          # Vercel Serverless Functions
│   ├── generate.ts              # 主要的图片生成API端点
│   └── utils/
│       └── imageProcessor.ts    # 图片处理工具函数
├── src/                         # 前端源代码
│   ├── components/
│   │   └── BannerGenerator.vue  # 横幅生成器组件
│   ├── App.vue                  # 根组件
│   ├── main.ts                  # 应用入口
│   ├── style.css                # 全局样式
│   └── vite-env.d.ts            # Vite类型定义
├── index.html                   # HTML入口文件
├── package.json                 # 项目依赖配置
├── tsconfig.json                # TypeScript配置
├── vite.config.ts               # Vite构建配置
├── vercel.json                  # Vercel部署配置
├── .gitignore                   # Git忽略文件
├── README.md                    # 项目说明文档
├── DEPLOY.md                    # 部署指南
└── PROJECT_STRUCTURE.md         # 本文件
```

## 核心文件说明

### API 路由

- **api/generate.ts**: 处理图片生成请求
  - 接收航空公司名称、提示词、Logo位置和AI提供商
  - 调用豆包或通义生图API生成300x100的横幅
  - 使用Sharp调整图片尺寸为120x23
  - 返回两个图片的base64数据URL

### 前端组件

- **src/components/BannerGenerator.vue**: 主要的横幅生成器组件
  - 表单输入：航空公司名称、提示词、Logo位置、AI提供商
  - 图片预览和下载功能
  - 错误处理和加载状态

### 配置文件

- **vercel.json**: Vercel部署配置
  - 指定API路由
  - 配置Serverless Functions运行时

- **vite.config.ts**: Vite构建配置
  - Vue插件配置
  - 路径别名配置

## 工作流程

1. 用户在表单中输入航空公司名称和可选提示词
2. 选择Logo位置（左/右/无）和AI生图方案
3. 前端发送POST请求到 `/api/generate`
4. 后端构建完整的提示词（包含Logo位置信息）
5. 调用选择的AI生图API生成300x100图片
6. 使用Sharp调整图片尺寸为120x23
7. 返回两个图片的base64数据URL
8. 前端显示图片并提供下载功能

## 技术要点

- **图片处理**: 使用Sharp库在服务端调整图片尺寸
- **API集成**: 支持豆包和通义两种AI生图方案
- **响应格式**: 返回base64数据URL，便于前端直接使用
- **错误处理**: 完善的错误处理和用户提示


