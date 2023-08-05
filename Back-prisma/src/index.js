const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/healthcheck', (_, res) => {
  res.status(200).json('Server OK');
});

app.get('/api/users', async (_, res) => {
  const users = await prisma.user.findMany()

  return res.status(200).json(users);
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id }
});
  return res.status(200).send(user);
})

app.post('/api/users', async (req, res) => {
  const data = req.body

  const createUser = await prisma.user.create({
    data: {
      ...data
    }
  })

  return res.status(200).json(createUser)
})

app.put('/api/users/:id', async (req, res) => {
  const data = req.body
  const { id } = req.params

  const updateUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })
  return res.status(200).json(updateUser)
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  const deleteUser = await prisma.user.delete({
    where: {
      id
    }
  })

  return res.status(200).json(deleteUser)
})

app.listen(port, () => {
  console.log(`Listen port ${port}`);
});