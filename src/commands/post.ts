import { SlashCommandBuilder, ChatInputCommandInteraction, Client, TextChannel } from 'discord.js';
import type { Command } from '../types/Command';
import { moderate } from '../moderation/moderate';

export const postCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('post')
    .setDescription('Submit a message through the moderation service')
    .addStringOption((opt) =>
      opt.setName('message').setDescription('The message you want to post').setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction, client: Client) {
    const message = interaction.options.getString('message', true);
    const userTag = interaction.user.tag;

    const result = await moderate(message);

    if (!result.ok) {
      await interaction.reply({
        content: `🚫 Rejected: ${result.reason}`,
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: '✅ Your message passed moderation and has been posted.',
      ephemeral: true,
    });
    const targetChannel = interaction.channel as TextChannel;
    await targetChannel.send(`**[Moderated Post from ${userTag}]**\n${message}`);
  },
};
