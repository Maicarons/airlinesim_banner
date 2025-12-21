# 航空公司横幅生成器

一个用于生成虚拟航空公司横幅的小工具，支持豆包生图和通义生图两种AI生图方案。

## 功能特性

- 🎨 根据航空公司名称和自定义提示词生成横幅
- 📐 自动生成两种尺寸的横幅：
  - 300×100 像素的公司横幅
  - 120×23 像素的小横幅
- 🎯 支持Logo位置选择（左侧/右侧/无Logo）
- 🤖 支持两种AI生图方案：
  - 豆包生图（字节跳动）
  - 通义生图（阿里云）
- 📥 一键下载生成的横幅图片
- 🌍 多语言支持：中文、英语、法语、德语、西班牙语、日语、韩语

## 技术栈

- **前端**: Vue 3 + Element Plus + Vue I18n + TypeScript
- **后端**: Bun + TypeScript
- **部署**: Vercel Serverless Functions
- **图片处理**: Sharp
- **国际化**: vue-i18n（支持7种语言）

## 快速开始

### 安装依赖

```bash
bun install
```

### 环境变量配置

在项目根目录创建 `.env.local` 文件，配置AI生图API密钥：

```env
# 豆包生图API密钥（可选，如果使用豆包生图）
DOUBAO_API_KEY=your_doubao_api_key

# 通义生图API密钥（可选，如果使用通义生图）
TONGYI_API_KEY=your_tongyi_api_key
```

### 本地开发

#### 方式一：使用 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI（如果还没有安装）
npm i -g vercel

# 启动本地开发服务器（会自动处理 API 路由）
vercel dev
```

#### 方式二：使用 Vite 开发服务器

```bash
# 启动前端开发服务器
bun run dev
```

**注意**：如果使用方式二，API 路由在本地开发时不会工作。你需要：
- 使用 `vercel dev` 来运行完整的应用（包括 API）
- 或者部署到 Vercel 预览环境进行测试

访问 http://localhost:5173 查看应用。

### 构建

```bash
# 构建前端
bun run build
```

## 部署到Vercel

1. 将项目推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量：
   - `DOUBAO_API_KEY`: 豆包API密钥（如果使用）
   - `TONGYI_API_KEY`: 通义API密钥（如果使用）
4. 部署

### Vercel环境变量配置

在Vercel项目设置中添加以下环境变量：

- `DOUBAO_API_KEY`: 你的豆包生图API密钥
- `TONGYI_API_KEY`: 你的通义生图API密钥

## API说明

### 生成横幅

**端点**: `POST /api/generate`

**请求体**:
```json
{
  "airlineName": "航空公司名称",
  "prompt": "可选的自定义提示词",
  "logoPosition": "left" | "right" | "none",
  "aiProvider": "doubao" | "tongyi"
}
```

**响应**:
```json
{
  "banner300x100": "data:image/png;base64,...",
  "banner120x23": "data:image/png;base64,..."
}
```

## 使用说明

1. **选择语言**：点击右上角的语言切换器，选择你偏好的语言（支持中文、英语、法语、德语、西班牙语、日语、韩语）
2. 输入航空公司名称（必填）
3. 可选：输入自定义提示词，描述你想要的横幅风格
4. 选择Logo位置：左侧、右侧或无Logo
5. 选择AI生图方案：豆包生图或通义生图
6. 点击"生成横幅"按钮
7. 等待生成完成后，可以预览和下载生成的横幅

### 多语言功能

应用支持7种语言：
- 🇨🇳 中文（简体）
- 🇺🇸 English
- 🇫🇷 Français
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇯🇵 日本語
- 🇰🇷 한국어

语言选择会保存在浏览器本地存储中，下次访问时会自动使用上次选择的语言。如果浏览器语言匹配支持的语言，会自动设置为浏览器语言。

## 提示词建议

如果不填写自定义提示词，系统会自动使用以下默认提示词：
- 航空元素
- 飞机
- 蓝天
- 专业设计

你可以添加更具体的描述，例如：
- "蓝色主题，现代风格，简约设计"
- "红色和金色，传统风格，华丽装饰"
- "绿色环保主题，自然元素"

## 注意事项

1. 需要配置至少一个AI生图API密钥才能使用
2. 图片生成可能需要几秒钟时间，请耐心等待
3. 生成的图片会以base64格式返回，可以直接下载
4. 建议在生产环境中使用专业的图片CDN服务存储生成的图片

## 许可证

MIT


