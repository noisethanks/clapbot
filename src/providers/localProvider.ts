import type { ModerationProvider, ModerationResult } from '../types/ModerationProvider.js';

const LOCAL_API_URL = process.env.LOCAL_MODERATION_URL || 'http://localhost:8000/moderate';

export const localProvider: ModerationProvider = {
  async moderate(text: string): Promise<ModerationResult> {
    try {
      const res = await fetch(LOCAL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        console.error('[LocalProvider] Request failed:', await res.text());
        return { ok: true }; // Fail-open
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error('[LocalProvider] Error:', err);
      return { ok: true }; // Fail-open
    }
  },
};
