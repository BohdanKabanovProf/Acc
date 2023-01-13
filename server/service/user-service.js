import User from '../model/user-model.js'
import UserModel from '../model/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import mailService from './main-service.js'
import tokenService from './token-service.js'
import { UserDto } from '../dtos/user-dto.js'

class UserService {
  async registration (email, first_name, last_name, patronymic, role, password) {
    try {
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        throw new Error(
          `Пользователь с почтовым адрессом ${email} уже существует`
        )
      }

      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = uuidv4()

      const user = await UserModel.create({
        email,
        first_name,
        last_name,
        patronymic,
        role,
        password: hashPassword,
        activationLink
      })

      await mailService.sendActivationMail(email, activationLink)

      /**
       * @param {
       * id,
       * email,
       * isActivated
       * }
       */

      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({ ...userDto })

      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {
        ...tokens,
        user: {
          userDto
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  async login (email, password) {
    try {
      // todo
    } catch (err) {
      console.log(err)
    }
  }
  async logout (email, password) {
    try {
      // todo
    } catch (err) {
      console.log(err)
    }
  }
}

export default new UserService()
