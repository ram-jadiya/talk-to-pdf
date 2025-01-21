import { Pinecone } from '@pinecone-database/pinecone';
import { env } from './env.config';

// Initialize and export Pinecone client
const pc = new Pinecone({
  apiKey: env.PINECONE_API_KEY,
});

const pcIndex = pc.index('querypdf', env.PINECONE_URL);

export { pc, pcIndex };
