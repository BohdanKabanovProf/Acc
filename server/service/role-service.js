import Role from '../model/role-model.js'
import User from '../model/user-model.js'
import UserDetails from '../model/user_deteils-model.js'

class RoleService {
  async getRoles(id) {
    UserDetails.hasMany(Role, {
      foreignKey: 'id',
    })
    Role.belongsTo(UserDetails, {
      foreignKey: 'role',
    })

    const roles = await UserDetails.findAll({
      raw: true,
      include: {
        raw: true,
        model: Role,
      },
      where: {
        user: 1,
      },
    })

    return roles.map((e) => e.role)
  }
}

export default new RoleService()
