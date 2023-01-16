import jwt from 'jsonwebtoken'
import { where } from 'sequelize'
import tokenModel from '../model/token-model.js'
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
      return userData
    } catch (err) {
      return null
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
      return userData
    } catch (err) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { user: userId } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await tokenModel.create({
      user: userId,
      refreshToken,
    })

    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.destroy({
      where: { refreshToken: refreshToken },
    })
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({
      where: { refreshToken: refreshToken },
    })
    return tokenData
  }
}

export default new TokenService()
