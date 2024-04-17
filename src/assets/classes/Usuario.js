import usuarioServices from '@/assets/services/UsuarioServices'

export class Usuario {
  constructor() {
    this.Id = null,
    this.UserName = null,
    this.Email = null,
    this.PhoneNumber = null,
    this.PasswordHash = null,
    this.Genero = null,
    this.DataAniversario = null
  }

  AddData(userData) {
    Object.assign(this, userData);
    if (this.Id == null) delete this['Id'];
  }

  async post() {
    return await usuarioServices.register(this)
  }
}