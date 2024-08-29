import usuarioServices from '@/services/UsuarioServices'

export class Usuario {
  constructor() {
    this.Id = null,
    this.Email = null,
    this.Telefone = null,
    this.Genero = null,
    this.BirthdayDate = null,
    this.UrlImagemPerfil = null,
    this.RoleName = null
  }

  AddData(userData) {
    Object.assign(this, userData);
    if (this.Id == null) delete this['Id'];
  }
  clearData() {
    Object.assign(this, null);
  }

  async post() {
    return await usuarioServices.register(this);
  }

  async updated() {
    return await usuarioServices.updated(this);
  }
}