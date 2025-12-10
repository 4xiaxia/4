import axios from 'axios';

// AI服务配置接口
interface AiServiceConfig {
  apiUrl: string;
  apiKey: string;
  model: string;
}

// 从环境变量中读取AI服务的配置
const siliconFlowConfig: AiServiceConfig = {
  apiUrl: import.meta.env.VITE_SILICONFLOW_API_URL,
  apiKey: import.meta.env.VITE_SILICONFLOW_API_KEY,
  model: import.meta.env.VITE_SILICONFLOW_MODEL,
};

const bigModelConfig: AiServiceConfig = {
  apiUrl: import.meta.env.VITE_BIGMODEL_API_URL,
  apiKey: import.meta.env.VITE_BIGMODEL_API_KEY_1, // 默认使用第一个密钥
  model: import.meta.env.VITE_BIGMODEL_MODEL,
};

const minimaxConfig = {
  apiUrl: 'https://api.minimax.chat/v1/text/chatcompletion_v2', // Minimax API URL
  groupId: import.meta.env.VITE_MINIMAX_GROUP_ID,
  apiKey: import.meta.env.VITE_MINIMAX_API_KEY,
};

// 创建一个通用的AI服务客户端
const createAiClient = (config: AiServiceConfig) => {
  const client = axios.create({
    baseURL: config.apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
  });
  return client;
};

const siliconFlowClient = createAiClient(siliconFlowConfig);
const bigModelClient = createAiClient(bigModelConfig);

/**
 * 通用的文本聊天函数
 * @param provider - AI服务提供商 ('siliconflow' or 'bigmodel')
 * @param messages - 对话消息历史
 * @returns AI模型的响应
 */
export const generateText = async (provider: 'siliconflow' | 'bigmodel', messages: { role: string; content: string }[]) => {
  try {
    let response;
    if (provider === 'siliconflow') {
      response = await siliconFlowClient.post('/chat/completions', {
        model: siliconFlowConfig.model,
        messages,
      });
    } else {
      response = await bigModelClient.post('chat/completions', { // BigModel的URL路径可能不同，需要确认
        model: bigModelConfig.model,
        messages,
      });
    }
    return response.data;
  } catch (error) {
    console.error(`Error with ${provider} API:`, error);
    throw error;
  }
};

/**
 * 文本转语音 (TTS) 函数 - 使用Minimax
 * @param text - 要转换为语音的文本
 * @returns 包含音频数据的响应
 */
export const textToSpeech = async (text: string) => {
  try {
    const response = await axios.post(
      minimaxConfig.apiUrl,
      {
        model: 'speech-01', // 示例模型，需要根据Minimax文档确认
        text,
        voice_id: 'male-01', // 示例音色
      },
      {
        headers: {
          'Authorization': `Bearer ${minimaxConfig.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error with Minimax TTS API:', error);
    throw error;
  }
};

/**
 * 语音转文本 (STT) 函数 - 使用智谱AI
 * @param audioData - Base64编码的音频数据
 * @param format - 音频格式 (e.g., 'wav')
 * @returns 识别出的文本
 */
export const speechToText = async (audioData: string, format: string) => {
  try {
    const response = await bigModelClient.post('asr', { // ASR端点需要根据智谱文档确认
      model: 'asr-model', // 示例模型
      audio: {
        data: audioData,
        format,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error with BigModel STT API:', error);
    throw error;
  }
};
