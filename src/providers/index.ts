// src/providers/index.ts
import { perspectiveProvider } from './perspectiveProvider.js';
import type { ModerationProvider } from '../types/ModerationProvider.js';

let currentProvider: ModerationProvider = perspectiveProvider;

export function setModerationProvider(provider: ModerationProvider) {
  currentProvider = provider;
}

export function getModerationProvider(): ModerationProvider {
  return currentProvider;
}
