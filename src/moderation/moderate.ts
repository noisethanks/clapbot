
import { getModerationProvider } from '../providers/index.js';


// src/moderation/moderate.ts

export async function moderate(content: string) {
  const provider = getModerationProvider();
  return provider.moderate(content);
}
