import { Client, Intents } from 'discord.js';
import listeners from '../listeners';
import { CustomClient, ServerContext } from '../types';

function BotClient() {
  const BOT_TOKEN = process.env.MGC_BOT_TOKEN;

  const intents: Intents = new Intents(0b111111111111111);
  const client: Client = new Client({ intents });

  listeners(client);

  client.login(BOT_TOKEN);

  function setContext(context: ServerContext) {
    (client as CustomClient).context = context;
  }

  return {
    client,
    setContext,
  };
}

export default BotClient;
