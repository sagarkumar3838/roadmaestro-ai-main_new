// config.ts or helpers/env.ts

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export function getOpenaiApiKey(): string {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY not found in environment variables');
  }
  return openaiApiKey;
}
