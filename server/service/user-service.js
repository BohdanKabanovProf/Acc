import User from '../model/user-model.js'
import UserModel from '../model/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import mailService from './mail-service.js'
import tokenService from './token-service.js'
import { UserDto } from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'

class UserService {
  async registration(email, first_name, last_name, patronymic, role, password) {
    try {
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        throw new ApiError.BedRequest(
          `Пользователь с почтовым адрессом ${email} уже существует`,
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
        activationLink,
      })

      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`,
      )

      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({ ...userDto })

      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {
        ...tokens,
        user: userDto,
      }
    } catch (err) {
      console.log(err)
    }
  }
  async login(email, password) {
    try {
      // todo
    } catch (err) {
      console.log(err)
    }
  }
  async logout(email, password) {
    try {
      // todo
    } catch (err) {
      console.log(err)
    }
  }

  async activate(activationLink) {
    const user = await User.findOne({
      where: {
        activationLink,
      },
    })

    if (!user) {
      throw new ApiError.BedRequest('Неккоректная ссылка активации')
    }

    user.isActivated = true
    await user.save()
  }
}

export default new UserService()
