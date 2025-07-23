import { Message } from 'discord.js';
import { channelModerationMap, CHANNEL_IDS } from '../config.js';
import { logViolation } from '../utils/logger.js';

export async function handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !message.guild) return;

    const provider = channelModerationMap[message.channel.id];

    // 🛑 Block any direct posts to gated channels (must use /post)
    const isGatedChannel =
        message.channel.id === CHANNEL_IDS.LOCAL_GATED ||
        message.channel.id === CHANNEL_IDS.PERSPECTIVE_GATED;

    if (isGatedChannel) {
        if (!message.interaction && !message.webhookId && !message.interactionMetadata) {
            await message.author
                .send({
                    content: `🚫 Please use the /post command to submit content.`,
                })
                .catch((err) => console.error('Failed to notify user:', err));
            await message.delete().catch((err) => console.error('Failed to delete message:', err));
            return;
        }
    }

    // If there's no provider (e.g. channel isn't mapped), skip
    if (!provider) return;

    // 🧼 Screen message content
    const result = await provider.moderate(message.content);

    if (!result.ok) {
        try {
            await message.delete();
            logViolation(message, result.reason ?? 'unspecified');
            await message.author.send(
                `🚫 Your message was removed for violating rules: ${result.reason}`,
            );
        } catch (err) {
            console.error('Failed to delete or DM user:', err);
        }
    }
}
