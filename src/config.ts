import dotenv from 'dotenv';
dotenv.config();
import { localProvider } from './providers/localProvider.js';
import { perspectiveProvider } from './providers/perspectiveProvider.js';
import type { ModerationProvider } from './types/ModerationProvider.js';

export const CHANNEL_IDS = {
    LOCAL_GATED: process.env.CHANNEL_ID_LOCAL_GATED!,
    PERSPECTIVE_GATED: process.env.CHANNEL_ID_PERSPECTIVE_GATED!,
    LOCAL_FREE_CHAT: process.env.CHANNEL_ID_LOCAL_FREE_CHAT!,
    PERSPECTIVE_FREE_CHAT: process.env.CHANNEL_ID_PERSPECTIVE_FREE_CHAT!,
};

export const channelModerationMap: Record<string, ModerationProvider> = {
    [CHANNEL_IDS.LOCAL_GATED]: localProvider,
    [CHANNEL_IDS.LOCAL_FREE_CHAT]: localProvider,
    [CHANNEL_IDS.PERSPECTIVE_GATED]: perspectiveProvider,
    [CHANNEL_IDS.PERSPECTIVE_FREE_CHAT]: perspectiveProvider,
};
