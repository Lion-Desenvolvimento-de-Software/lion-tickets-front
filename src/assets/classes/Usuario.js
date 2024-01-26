import UsuarioServices from '@/assets/services/UsuarioServices';
import usuarioService from '@/assets/services/UsuarioServices'
import Validacoes from '@/assets/static/Validacoes'

export class Usuario {
  constructor() {
    this.Id = null,
    this.UserName = null,
    this.Email = null,
    this.PasswordHash = null,
    this.Genero = null,
    this.CPF_CNPJ = null,
    this.Telefone = null,
    this.Role = 0
  }

  AddData(userData) {
    Object.assign(this, userData);
    if (this.Id == null) delete this['Id']
  }

  checkForm() {
    let erros = []
    if(!this.UserName) erros.push("Nome é obrigatório!!");
    if(!this.Email) {
      erros.push("Email obrigatório!!")
    } else if (!Validacoes.validEmail(this.Email)) {
      erros.push("Email inválido!")
    }
    erros.push(...this.getErrorsPasswordNotIsStrong());
    if(!this.Genero) erros.push("Informe seu gênero!");
    if(!Validacoes.validarCPF(this.CPF_CNPJ)) erros.push("CPF invélido!");
    if(!Validacoes.telefoneValidation(this.Telefone)) erros.push('Telefone inválido!');
    return erros
  }

  hasUserName(userName) {
    return UsuarioServices.hasUserName(userName);
  }

  async post() {
    return await usuarioService.post(this)
  }

  getErrorsPasswordNotIsStrong() {
    if(!this.PasswordHash) return ['Senha é obrigatória!'];
    let erros = [];

    var numeros = /([0-9])/;
    var alfabeto = /([A-Z])/;
    var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    if(this.PasswordHash.length < 6) erros.push("Senha tem que ter mais de 6 digitos!!");
    if(!this.PasswordHash.match(numeros)) erros.push("A senha tem que ter no minimo um número!");
    if(!this.PasswordHash.match(alfabeto)) erros.push("A senha tem que ter no minimo uma letra maiúscula!");
    if(!this.PasswordHash.match(chEspeciais)) erros.push("A senha tem que ter pelomenos um caracter especial!");
  
    return erros;
  }
}