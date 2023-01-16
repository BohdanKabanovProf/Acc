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
      const user = await UserModel.findOne({ where: { email: email } })
      if (!user) {
        throw ApiError.BedRequest('Пользователь с таким email не найден')
      }
      const isPassEquals = await bcrypt.compare(password, user.password)
      if (!isPassEquals) {
        throw ApiError.BedRequest('Не верный пороль')
      }
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
  async logout(refreshToken) {
    try {
      const token = await tokenService.removeToken(refreshToken)
      return token
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

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData && !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findOne({ where: { id: userData.id } })
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    const users = await UserModel.findAll()
    return users
  }
}

export default new UserService()
