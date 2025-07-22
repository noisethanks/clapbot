import { Message } from 'discord.js';
import { moderate } from '../moderation/moderate';
import { logViolation } from '../utils/logger';

export async function handleMessage(message: Message): Promise<void> {
  if (message.author.bot || !message.guild) return;
  if (message.channel.id === process.env.MODERATED_GATE_CHANNEL_ID) {
    if (!message.interactionMetadata) {
      await message.author
        .send({
          content: `🚫 Please use the /post command to submit content.`,
        })
        .catch((err) => console.error('Failed to notify user:', err));

      await message.delete();
    }
    return;
  }

  const result = await moderate(message.content);

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
