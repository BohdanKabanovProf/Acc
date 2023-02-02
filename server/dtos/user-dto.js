class UserDto {
  email
  first_name
  last_name
  id
  isActivated
  roles

  constructor(model) {
    this.email = model.email
    this.first_name = model.first_name
    this.last_name = model.last_name
    this.id = model.id
    this.isActivated = model.isActivated
    this.roles = model.roles
  }
}

export { UserDto }
