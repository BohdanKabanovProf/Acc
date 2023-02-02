import { DataTypes } from 'sequelize'
import sequelize from '../database/connect.js'
import User from './user-model.js'

const Token = sequelize.define(
  'Token',
  {
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    // Other model options go here
  },
)

export default Token
