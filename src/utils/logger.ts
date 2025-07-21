import { Message } from 'discord.js';

export function logViolation(message: Message, reason: string): void {
  console.log(`🚫 [${reason}] ${message.author.tag}: ${message.content}`);
}
