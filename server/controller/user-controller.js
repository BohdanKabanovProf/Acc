import userService from '../service/user-service.js'

class UserController {
  async registration(req, res) {
    try {
      const {
        email,
        first_name,
        last_name,
        patronymic,
        role,
        password,
      } = req.body
      const userData = await userService.registration(
        email,
        first_name,
        last_name,
        patronymic,
        role,
        password,
      )

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      next(err)
    }
  }
  async login() {
    try {
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
