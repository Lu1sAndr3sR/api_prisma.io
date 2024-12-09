import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/api/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/api/users', async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.json(user);
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json(user);
});
