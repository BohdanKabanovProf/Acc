import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import router from './router/router.js'
import sequelize from './database/connect.js'
import errorMiddleware from './middleware/error-middleware.js'
import UserInfo from './model/user_deteils-model.js'
import testModel from './model/test-model.js'

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
)

testModel.test()

app.use('/api', router)
app.use(errorMiddleware)

const start = async function () {
  try {
    await sequelize.authenticate()

    app.listen(PORT, () => {
      console.log(`Сервер заупщен на порту: ` + PORT)
    })
  } catch (err) {
    console.error(err)
  }
}

start()
