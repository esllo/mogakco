import { AudioPlayer, AudioResource, VoiceConnection } from '@discordjs/voice';
import { DiscordTogether } from 'discord-together';
import {
  BaseCommandInteraction,
  ButtonInteraction,
  ChatInputApplicationCommandData,
  Client,
  InternalDiscordGatewayAdapterCreator,
  Message,
} from 'discord.js';

export type Nullable<T> = T | null;
export type Nullish<T> = T | null | undefined;

interface RoleStorage {
  [key: string]: {
    guild: string;
    roles: string[];
    date: number;
  };
}

interface ServerContext {
  app: Express;
  roleStorage: RoleStorage;
}

export interface CustomClient extends Client {
  context?: ServerContext;
}

export interface Command extends ChatInputApplicationCommandData {
  customIds?: string[];
  execute: (
    client: CustomClient,
    interaction: BaseCommandInteraction,
  ) => Promise<CommandResult>;
}

export interface ButtonCommand extends Command {
  interaction: (
    client: CustomClient,
    interaction: ButtonInteraction,
  ) => Promise<CommandResult>;
}

export type CommandResult = string | boolean | undefined | void;

export interface Translation {
  [key: string]: any;
}

export interface Execution {
  commandList: string[];
  execute: (client: CustomClient, message: Message) => Promise<CommandResult>;
}
