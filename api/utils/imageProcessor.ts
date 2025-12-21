/**
 * 图片处理工具函数
 * 由于Vercel serverless环境限制，这里提供基础实现
 * 生产环境建议使用专业的图片处理服务
 */

export async function resizeImageFromUrl(
  imageUrl: string,
  width: number,
  height: number
): Promise<string> {
  try {
    // 获取图片
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('无法获取图片');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 在Node.js环境中，可以使用sharp库进行图片处理
    // 但由于Vercel的限制，这里提供一个基础实现
    // 实际使用时建议：
    // 1. 使用外部图片处理服务（如Cloudinary、ImageKit）
    // 2. 或者使用Vercel的图片优化功能
    // 3. 或者在前端使用Canvas API处理

    // 临时方案：返回base64编码（不推荐用于大图片）
    const mimeType = response.headers.get('content-type') || 'image/png';
    const base64 = buffer.toString('base64');
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('图片处理失败:', error);
    throw error;
  }
}

/**
 * 使用Canvas API在浏览器端调整图片尺寸
 * 这个函数可以在前端使用
 */
export function resizeImageWithCanvas(
  imageUrl: string,
  width: number,
  height: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('无法创建Canvas上下文'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    };

    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };

    img.src = imageUrl;
  });
}


