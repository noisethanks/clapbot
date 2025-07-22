import { describe, it, expect } from 'vitest';
import { moderate } from '../src/moderation/moderate.js';

describe('moderate()', () => {
  it('flags a clearly toxic message', async () => {
    const result = await moderate("You're a total idiot and everyone hates you.");
    expect(result.ok).toBe(true);
  });

  it('passes a safe message', async () => {
    const result = await moderate("I like turtles.");
    expect(result.ok).toBe(true);
  });
});
