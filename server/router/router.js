import express from 'express'
import UserController from '../controller/user-controller.js'

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

router.post('/registration', UserController.registration)

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

export default router
