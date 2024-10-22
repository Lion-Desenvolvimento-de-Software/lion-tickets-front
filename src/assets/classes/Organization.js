export default class Organization {
  constructor() {
    this.Id = null;
    this.Nome = null;
    this.ImagemOrganizacao = null;
    this.Descricao = null;
  }

  AddData(dados) {
    Object.assign(this, dados);
  }
}