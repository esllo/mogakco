import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import ShortUniqueId from 'short-unique-id';
import { CustomClient, RoleStorage } from '../types';
import rateLimit from 'express-rate-limit';

const base58chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.split(
  '',
);
const uuid = new ShortUniqueId({ length: 7, dictionary: base58chars });

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

function startServer(client: CustomClient) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(limiter);

  const roleStorage: RoleStorage = {};

  app.post('/api/grant/generate', (req: Request, res: Response) => {
    try {
      const { guild, roles } = req.body;
      const code = uuid();
      roleStorage[code] = {
        guild,
        roles,
        date: new Date().getTime(),
      };

      setTimeout(() => {
        res.json({
          code,
        });
      }, 1000);
    } catch (e) {
      res.status(500).json({});
    }
  });

  app.get('/api/grant/:guild', (req: Request, res: Response) => {
    if (req.params.guild) {
      const guild = client.guilds
        .valueOf()
        .find((guild) => guild.id === req.params.guild);

      if (guild) {
        const roles = guild.roles
          .valueOf()
          .filter(({ managed, rawPosition }) => !managed && rawPosition > 0)
          .map(({ id, color, name }) => ({ id, color, name }));
        res.json({
          roles,
        });
        return;
      }

      res.status(404).json({});
    }
  });

  http.createServer(app).listen(5124);
  return {
    app,
    roleStorage,
  };
}

export default startServer;
