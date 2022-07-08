import { Message } from 'discord.js';
import EVENT from '../constants/event';
import Executions from '../executions';
import { CustomClient } from '../types';

const EXECUTION_PREFIX = '!m';

export default (client: CustomClient): void => {
  client.on(EVENT.MESSAGE_CREATE, async (message: Message) => {
    const [prefix, cmd] = message.content.split(' ');
    if (prefix && prefix.toLowerCase() === EXECUTION_PREFIX) {
      if (cmd) {
        const execution = Executions.find(({ commandList }) => commandList.includes(cmd));
        if (execution) {
          execution.execute(client, message);
        }
      }
    }
  });
};
