import { DataTypes } from 'sequelize'
import sequelize from '../database/connect.js'
import Role from './role-model.js'

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    last_name: {
      type: DataTypes.STRING,
      required: true,
    },
    patronymic: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: Role,
        key: 'id',
      },
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activationLink: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  },
)

await User.sync()

export default User
