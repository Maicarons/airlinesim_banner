# 部署指南

## Vercel 部署步骤

### 1. 准备项目

确保项目已推送到 GitHub 仓库。

### 2. 在 Vercel 中导入项目

1. 访问 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Import"

### 3. 配置项目设置

在 Vercel 项目设置中：

**Framework Preset**: 选择 "Vite" 或 "Other"

**Build Command**: `bun run build`

**Output Directory**: `dist`

**Install Command**: `bun install`

### 4. 配置环境变量

在 Vercel 项目设置 > Environment Variables 中添加：

#### 豆包生图（如果使用）
- **Name**: `DOUBAO_API_KEY`
- **Value**: 你的豆包API密钥
- **Environment**: Production, Preview, Development（根据需要选择）

可选配置：
- **Name**: `DOUBAO_API_ENDPOINT`
- **Value**: 自定义API端点（如果需要）
- **Name**: `DOUBAO_MODEL_ID`
- **Value**: 你的模型ID

#### 通义生图（如果使用）
- **Name**: `TONGYI_API_KEY`
- **Value**: 你的通义API密钥
- **Environment**: Production, Preview, Development（根据需要选择）

可选配置：
- **Name**: `TONGYI_MODEL`
- **Value**: 模型名称（默认：wanx-v1）

### 5. 部署

点击 "Deploy" 按钮，等待部署完成。

### 6. 验证部署

部署完成后，访问提供的URL，测试功能是否正常。

## 获取API密钥

### 豆包生图API密钥

1. 访问 [火山引擎控制台](https://console.volcengine.com/)
2. 创建或登录账号
3. 进入 ARK 服务
4. 创建应用并获取 API Key

### 通义生图API密钥

1. 访问 [阿里云DashScope控制台](https://dashscope.console.aliyun.com/)
2. 创建或登录账号
3. 在API密钥管理中创建新的API Key

## 注意事项

1. **API密钥安全**: 不要将API密钥提交到代码仓库，使用环境变量管理
2. **函数超时**: Vercel免费版函数执行时间限制为10秒，Pro版为60秒
3. **图片大小**: 生成的图片以base64格式返回，大图片可能导致响应较大
4. **成本控制**: 注意AI生图API的调用成本，合理设置使用限制

## 故障排查

### 问题：API调用失败

- 检查环境变量是否正确配置
- 检查API密钥是否有效
- 查看Vercel函数日志

### 问题：图片生成超时

- 检查网络连接
- 考虑增加超时时间（Pro版）
- 优化提示词长度

### 问题：图片无法显示

- 检查返回的图片格式
- 确认base64编码正确
- 检查浏览器控制台错误


