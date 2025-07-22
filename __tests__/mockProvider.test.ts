import { describe, it, expect } from 'vitest';
import { mockProvider } from '../src/providers/mockProvider.js';

describe('mockProvider.moderate()', () => {
  it('flags toxic message', async () => {
    const result = await mockProvider.moderate("You're an idiot.");
    expect(result.ok).toBe(false);
    expect(result.reason).toMatch(/toxic/i);
  });

  it('passes safe message', async () => {
    const result = await mockProvider.moderate("Have a nice day!");
    expect(result.ok).toBe(true);
    expect(result.reason).toBeUndefined();
  });
});
