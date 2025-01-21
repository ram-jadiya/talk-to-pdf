import { openai } from '../configs/openAi.config';

/**
 * @method generateEmbedding
 * @param {string} text - input text tobe embedding
 * @returns vector array of text
 * @description convert text to vector
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}
