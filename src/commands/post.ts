import { SlashCommandBuilder, ChatInputCommandInteraction, TextChannel } from 'discord.js';
import type { Command } from '../types/Command.js';
import { channelModerationMap } from '../config.js';

export const postCommand: Command = {
    data: new SlashCommandBuilder()
        .setName('post')
        .setDescription('Submit a message through the moderation service')
        .addStringOption((opt) =>
            opt.setName('message').setDescription('The message you want to post').setRequired(true),
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const message = interaction.options.getString('message', true);
        const userTag = interaction.user.tag;
        const channelId = interaction.channel?.id;

        const provider = channelId ? channelModerationMap[channelId] : undefined;

        if (!provider) {
            await interaction.reply({
                content: '⚠️ No moderation provider configured for this channel.',
                ephemeral: true,
            });
            return;
        }

        const result = await provider.moderate(message);

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
