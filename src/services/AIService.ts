import axios from 'axios';

enum ModelType {
  DEEPSEEK = 'DEEPSEEK',
  QWEN = 'QWEN',
  GPT = 'GPT'
}

interface ModelEndpoints {
  [key: string]: string;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIPayload {
  model: string;
  messages: Message[];
}

const MODEL_ENDPOINTS: ModelEndpoints = {
  DEEPSEEK: 'https://api.deepseek.com/v1/chat/completions',
  QWEN: 'https://api.qwen.com/v1/completions',
  GPT: 'https://api.openai.com/v1/chat/completions'
};

export class AIService {
  static async generateQuestion(category: string, modelType: ModelType = ModelType.DEEPSEEK): Promise<any> {
    const promptVersion = await this._getPromptVersion();
    const payload: AIPayload = {
      model: this._getModelRouter(modelType),
      messages: [{
        role: 'system',
        content: this._buildSystemPrompt(category, promptVersion)
      }]
    };

    try {
      const response = await axios.post(MODEL_ENDPOINTS[modelType], payload, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return this._processResponse(response.data);
    } catch (error) {
      console.error('Error generating question:', error);
      throw error;
    }
  }

  private static async _getPromptVersion(): Promise<string> {
    // TODO: Implement version control for prompts
    return '1.0';
  }

  private static _getModelRouter(modelType: ModelType): string {
    const modelMap: { [key in ModelType]: string } = {
      [ModelType.DEEPSEEK]: 'deepseek-chat',
      [ModelType.QWEN]: 'qwen-14b-chat',
      [ModelType.GPT]: 'gpt-4'
    };
    return modelMap[modelType];
  }

  private static _buildSystemPrompt(category: string, version: string): string {
    return `You are an AI assistant specialized in generating questions about ${category}. Prompt version: ${version}`;
  }

  private static _processResponse(data: any): any {
    // TODO: Implement response processing
    return data;
  }
}
