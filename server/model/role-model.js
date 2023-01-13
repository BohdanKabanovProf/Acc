import { DataTypes } from 'sequelize'
import sequelize from '../database/connect.js'
import User from './user-model.js'

const Role = sequelize.define(
  'Role',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      foreignKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  },
)

await Role.sync()
// await Role.create({
//   name: 'Ученик',
// })

// await Role.drop()

export default Role
