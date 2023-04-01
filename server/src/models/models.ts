import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '../db';
import { IMessage, IUser } from '../types/databaseTypes';

export type UserCreationAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export const Users: ModelDefined<IUser, UserCreationAttributes> = sequelize.define('ChatUsers', {
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
      model: 'Users',
      key: 'id'
    }
  },

  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
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
Users.hasMany(Messages, { foreignKey: 'recipientId', as: 'receivedMessages' });
Users.hasMany(Messages, { foreignKey: 'senderId', as: 'sentMessages' });
Messages.belongsTo(Users, { as: 'recipient', foreignKey: 'recipientId' });
Messages.belongsTo(Users, { as: 'sender', foreignKey: 'senderId' });