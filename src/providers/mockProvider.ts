import type { ModerationProvider, ModerationResult } from '../types/ModerationProvider.js';

export const mockProvider: ModerationProvider = {
  async moderate(text: string): Promise<ModerationResult> {
    const isToxic = /idiot|hate|stupid/i.test(text);
    return isToxic ? { ok: false, reason: 'Mocked: toxic language' } : { ok: true };
  },
};
