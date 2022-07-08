import BotClient from './botclient';
import startServer from './server';

const botClient = BotClient();
const context = startServer(botClient.client);
botClient.setContext(context);
