import { Client, Collection } from 'discord.js';
import type { Command } from './Command.js';

export interface ExtendedClient extends Client {
  commands: Collection<string, Command>;
}
