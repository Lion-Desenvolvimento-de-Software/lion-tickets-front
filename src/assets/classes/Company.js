export default class Company {
  constructor() {
    this.Id = null;
    this.Nome = null;
    this.CNPJ = null;
  }

  AddData(dados) {
    Object.assign(this, dados);
  }
}