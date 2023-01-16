import express from 'express'
import UserController from '../controller/user-controller.js'
import { body } from 'express-validator'
import userController from '../controller/user-controller.js'

const router = express.Router()

/**
 * TODO: функция регистрациии пользователя
 * @param {
 * email,
 * password,
 * last_name,
 * first_name,
 * patronymic,
 * age,
 * }
 */

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration,
)

/**
 * TODO: функция авторизации пользователя
 * @param {
 * email,
 * password
 * }
 */

router.get('/activate/:link', UserController.activate)

/**
 * TODO: функция активации пользователя
 */

router.post('/login', UserController.login)

/**
 * TODO: выход из аккаунта
 */

router.post('/logout', UserController.logout)

/**
 * TODO: обновление токинов
 */

router.get('/refresh', userController.refresh)

export default router
