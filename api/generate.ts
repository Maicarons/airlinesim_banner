import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GenerateRequest {
  airlineName: string;
  prompt?: string;
  logoPosition: 'left' | 'right' | 'none';
  aiProvider: 'doubao' | 'tongyi';
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { airlineName, prompt, logoPosition, aiProvider } =
      req.body as GenerateRequest;

    if (!airlineName) {
      return res.status(400).json({ message: '航空公司名称不能为空' });
    }

    // 构建提示词
    const fullPrompt = buildPrompt(airlineName, prompt, logoPosition);

    // 生成300x100的横幅
    const banner300x100 = await generateImage(fullPrompt, 300, 100, aiProvider);

    // 调整尺寸为120x23
    const banner120x23 = await resizeImage(banner300x100, 120, 23);

    // 返回结果
    res.status(200).json({
      banner300x100: banner300x100,
      banner120x23: banner120x23,
    });
  } catch (error: any) {
    console.error('生成横幅失败:', error);
    res.status(500).json({
      message: error.message || '生成失败，请稍后重试',
    });
  }
}

function buildPrompt(
  airlineName: string,
  userPrompt?: string,
  logoPosition: 'left' | 'right' | 'none' = 'left'
): string {
  let prompt = '';

  if (logoPosition === 'none') {
    prompt = `航空公司横幅，公司名称：${airlineName}，`;
  } else {
    const positionText = logoPosition === 'left' ? '左侧' : '右侧';
    prompt = `航空公司横幅，${positionText}有公司Logo，公司名称：${airlineName}，`;
  }

  if (userPrompt) {
    prompt += userPrompt + '，';
  } else {
    prompt += '航空元素，飞机，蓝天，专业设计，';
  }

  prompt += '尺寸300x100像素，横向横幅，高质量，清晰';

  return prompt;
}

async function generateImage(
  prompt: string,
  width: number,
  height: number,
  provider: 'doubao' | 'tongyi'
): Promise<string> {
  if (provider === 'doubao') {
    return await generateWithDoubao(prompt, width, height);
  } else {
    return await generateWithTongyi(prompt, width, height);
  }
}

async function generateWithDoubao(
  prompt: string,
  width: number,
  height: number
): Promise<string> {
  const apiKey = process.env.DOUBAO_API_KEY;
  if (!apiKey) {
    throw new Error('未配置豆包API密钥，请设置DOUBAO_API_KEY环境变量');
  }

  // 豆包生图API端点（根据实际API文档调整）
  // 注意：需要替换为实际的模型ID和端点
  const endpoint = process.env.DOUBAO_API_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
  const model = process.env.DOUBAO_MODEL_ID || 'Doubao-Seedream-4.0';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        width: width,
        height: height,
        n: 1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `豆包API调用失败 (${response.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error?.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // 处理不同的响应格式
    if (data.data && data.data[0]) {
      // 如果返回URL
      if (data.data[0].url) {
        return data.data[0].url;
      }
      // 如果返回base64
      if (data.data[0].b64_json) {
        return `data:image/png;base64,${data.data[0].b64_json}`;
      }
    }

    throw new Error('豆包API返回格式错误：未找到图片数据');
  } catch (error: any) {
    if (error.message) {
      throw error;
    }
    throw new Error(`豆包API调用异常: ${error.toString()}`);
  }
}

async function generateWithTongyi(
  prompt: string,
  width: number,
  height: number
): Promise<string> {
  const apiKey = process.env.TONGYI_API_KEY;
  if (!apiKey) {
    throw new Error('未配置通义API密钥，请设置TONGYI_API_KEY环境变量');
  }

  // 通义万相API端点
  const endpoint = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';
  const model = process.env.TONGYI_MODEL || 'wan2.2-t2i-flash';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        input: {
          prompt: prompt,
        },
        parameters: {
          size: `${width}*${height}`,
          n: 1,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `通义API调用失败 (${response.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error?.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // 处理通义万相的响应格式
    if (data.output && data.output.results && data.output.results[0]) {
      // 如果返回URL
      if (data.output.results[0].url) {
        return data.output.results[0].url;
      }
      // 如果返回base64
      if (data.output.results[0].image) {
        return data.output.results[0].image;
      }
    }

    throw new Error('通义API返回格式错误：未找到图片数据');
  } catch (error: any) {
    if (error.message) {
      throw error;
    }
    throw new Error(`通义API调用异常: ${error.toString()}`);
  }
}

async function resizeImage(
  imageUrl: string,
  width: number,
  height: number
): Promise<string> {
  try {
    // 动态导入sharp（避免在Vercel环境中出现问题）
    const sharp = (await import('sharp')).default;
    
    // 获取图片
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('无法获取图片');
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // 使用sharp调整图片尺寸
    const resizedBuffer = await sharp(imageBuffer)
      .resize(width, height, {
        fit: 'fill', // 填充整个尺寸
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // 白色背景
      })
      .png()
      .toBuffer();

    // 转换为base64数据URL
    const base64 = resizedBuffer.toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (error: any) {
    console.error('图片尺寸调整失败:', error);
    // 如果sharp不可用，返回原图URL（降级方案）
    return imageUrl;
  }
}

