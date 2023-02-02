import { DataTypes } from 'sequelize'
import sequelize from '../database/connect.js'
import User from './user-model.js'

const Lesson = sequelize.define(
  'Lesson',
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
      unique: true,
      required: true,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)


export default Lesson
