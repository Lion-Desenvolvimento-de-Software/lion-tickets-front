export default class Company {
  constructor() {
    this.Id = null;
    this.Nome = null;
    this.CNPJ = null;
    this.ImagemEmpresa = null;
    this.Descricao = null;
  }

  AddData(dados) {
    Object.assign(this, dados);
  }
}