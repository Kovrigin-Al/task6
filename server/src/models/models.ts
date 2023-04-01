import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '../db';
import { IMessage, IUser } from '../types/databaseTypes';

export type UserCreationAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export const ChatUsers: ModelDefined<IUser, UserCreationAttributes> = sequelize.define('ChatUsers', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});


export type MessageCreationAttributes = Optional<IMessage,
  'id' | "title" | "messageBody" | 'recipientId' | 'senderId' | 'createdAt' | 'updatedAt'>;

export const Messages: ModelDefined<IMessage, MessageCreationAttributes> = sequelize.define('Messages', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ChatUsers',
      key: 'id'
    }
  },

  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ChatUsers',
      key: 'id'
    }
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  messageBody: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
ChatUsers.hasMany(Messages, { foreignKey: 'recipientId', as: 'receivedMessages' });
ChatUsers.hasMany(Messages, { foreignKey: 'senderId', as: 'sentMessages' });
Messages.belongsTo(ChatUsers, { as: 'recipient', foreignKey: 'recipientId' });
Messages.belongsTo(ChatUsers, { as: 'sender', foreignKey: 'senderId' });