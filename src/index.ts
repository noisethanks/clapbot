import { Client, GatewayIntentBits, REST, Routes, Collection, Interaction } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

import { handleMessage } from './handlers/messageHandler.js';
import { handleInteraction } from './handlers/slashCommands.js';
import { postCommand } from './commands/post.js';
import type { Command } from './types/Command.js';

import type { ExtendedClient } from './types/ExtendedClient.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as ExtendedClient;

client.commands = new Collection<string, Command>();
client.commands.set(postCommand.data.name, postCommand);

client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', handleMessage);
client.on('interactionCreate', (interaction: Interaction) =>
  handleInteraction(interaction, client),
);

client.login(process.env.DISCORD_TOKEN);

if (process.env.REGISTER_COMMANDS === 'true') {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
  rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: [postCommand.data.toJSON()],
    })
    .then(() => console.log('✅ Slash command registered'))
    .catch(console.error);
}
