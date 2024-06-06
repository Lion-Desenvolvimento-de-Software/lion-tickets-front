import usuarioServices from '@/services/UsuarioServices'

export class Usuario {
  constructor() {
    this.Id = null,
    this.UserName = null,
    this.Email = null,
    this.PhoneNumber = null,
    this.Genero = null,
    this.DataAniversario = null,
    this.UrlImagemPerfil = null
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