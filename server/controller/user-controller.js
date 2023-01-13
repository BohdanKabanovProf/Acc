import userService from '../service/user-service.js'

class UserController {
  async registration (req, res) {
    try {
      const { email, first_name, last_name, patronymic, role, password } =
        req.body
      const userData = await userService.registration(
        email,
        first_name,
        last_name,
        patronymic,
        role,
        password
      )

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (err) {
      console.error(err)
    }
  }
}

export default new UserController()
