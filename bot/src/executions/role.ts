import { Collection, MessageActionRow, MessageButton, Role } from 'discord.js';
import { Execution } from '../types';
import { tokenize } from '../utils/tokenize';

const RoleExecution: Execution = {
  commandList: ['role', '역할'],
  async execute(client, message) {
    const [, , id] = tokenize(message.content, 3);
    if (id && message.member) {
      // apply role
      if (!client.context) {
        message.reply({
          content: '서버가 동작하지 않고 있습니다.',
        });
        return;
      }

      if (
        !client.context.roleStorage[id] ||
        client.context.roleStorage[id]?.guild !== message.guildId
      ) {
        message.reply({
          content:
            `[${id}] 만료되었거나 잘못된 코드입니다.` +
            `\n${JSON.stringify(client.context.roleStorage[id], null, 2)}`,
        });
        return;
      }

      const guildRoles = message.member.guild.roles.cache;

      const { roles: newRoles } = client.context.roleStorage[id];
      const roles = [...message.member.roles.valueOf()]
        .filter(([, { rawPosition, managed }]) => !managed && rawPosition > 0)
        .map(([id]) => id);

      const removeRoleIds = roles.filter((id) => newRoles.indexOf(id) === -1);
      const addRoleIds = newRoles.filter((id) => roles.indexOf(id) === -1);

      const removeRoles = guildRoles.filter(({ id }) => removeRoleIds.includes(id));
      const addRoles = guildRoles.filter(({ id }) => addRoleIds.includes(id));

      message.member.roles
        .remove(removeRoles)
        .then(() => {
          message.member?.roles.add(addRoles).then(console.log).catch(console.error);
        })
        .catch(console.error);

      const mention = (arr: (string | number)[]) => arr.map((item) => `<@&${item}>`);

      message.reply({
        content:
          `신규 : ${mention(addRoleIds).join(' ')}` +
          `\n제거 : ${mention(removeRoleIds).join(' ')}`,
      });
    } else {
      // show button
      const button = new MessageButton()
        .setLabel('역할 코드 받으러가기')
        .setStyle('LINK')
        .setURL('http://localhost:3000/grant/' + message.guildId);

      const row = new MessageActionRow().addComponents(button);
      message.reply({
        content: '역할 코드를 받고 `!m role [코드]`를 입력하세요',
        components: [row],
      });
    }
  },
};

export default RoleExecution;
