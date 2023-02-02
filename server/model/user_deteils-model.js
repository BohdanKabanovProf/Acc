import { DataTypes } from 'sequelize'
import sequelize from '../database/connect.js'
import Role from './role-model.js'
import User from './user-model.js'

const UserDetails = sequelize.define(
  'UserDetails',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      foreignKey: true,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    role: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: Role,
        key: 'id',
        unique: true,
      },
    },
  },
  {
    freezeTableName: true,
  },
)

export default UserDetails
