import express from "express"
import UserController from "../controller/user-controller.js";

const router = express.Router();

/**
 * TODO: функция регистрациии пользователя
 * @param {
 * email,
 * phone,
 * password,
 * last_name,
 * first_name,
 * patronymic,
 * age,
 * }
 */

router.post('/registration', UserController.registration)

export default router;