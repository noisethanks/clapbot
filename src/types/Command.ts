import {ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
import { ExtendedClient } from './ExtendedClient';

export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder |SlashCommandOptionsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction, client: ExtendedClient) => Promise<void>;
}
