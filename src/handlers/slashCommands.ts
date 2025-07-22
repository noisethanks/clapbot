import { Interaction, ChatInputCommandInteraction, Client } from 'discord.js';
import type { Command } from '../types/Command';
import type { ExtendedClient } from '../types/ExtendedClient';

export async function handleInteraction(
  interaction: Interaction,
  client: ExtendedClient,
): Promise<void> {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands?.get(interaction.commandName) as Command | undefined;
  if (!command) {
    await interaction.reply({ content: '⚠️ Unknown command.', ephemeral: true });
    return;
  }

  try {
    await command.execute(interaction as ChatInputCommandInteraction, client);
  } catch (err) {
    console.error(`Error executing command ${interaction.commandName}:`, err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: '❌ There was an error executing that command.',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: '❌ There was an error executing that command.',
        ephemeral: true,
      });
    }
  }
}
