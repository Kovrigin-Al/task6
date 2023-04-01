require("dotenv").config();
import { Users, Messages } from './models/models';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { UserController } from './controllers/UserController';
import { MessageController } from './controllers/MessageController';
import { sequelize } from './db';
import cors from 'cors';
import { IReceivedMessage } from './types/databaseTypes';
import { messageSchema, userSchema } from './controllers/Validator';

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(
  httpServer, {
  cors: {
    origin: '*',
  },
});
app.use(cors())
app.use(express.json())

io.on('connection', async (socket) => {
  try {
    const { error, value } = userSchema.validate(socket.handshake.auth as { name: string })
    if (error) throw new Error(error.message)
    const initialData = await UserController.handleUserConnection(value.name);
    socket.join(value.name)
    socket.emit('connected', initialData)
  } catch (e) {
    console.log('ERROR', e)
    socket.emit('connectError', e)
    socket.disconnect()
  }

  socket.on("sendMessage", async ({ content, to }) => {
    try {
      const { error, value } = messageSchema.validate({ content, to })
      if (error) throw new Error(error.message)
      const message = {
        title: value.content.title,
        messageBody: value.content.message,
        sender: socket.handshake.auth.name,
        recipient: value.to,
      };
      const savedMessage = await MessageController.saveMessage(message as IReceivedMessage);
      io.to(to).emit("sendMessage", savedMessage);
    } catch (e) {
      console.log('ERROR', e)
      socket.emit('connectError', e)
      socket.disconnect()
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    await Users.sync(process.env.NODE_ENV === 'development' ? { alter: true } : undefined);
    await Messages.sync(process.env.NODE_ENV === 'development' ? { alter: true } : undefined);
    console.log("All models were synchronized successfully.");
    httpServer.listen(PORT, () => {
      console.log(`Server has been started on ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};

start();