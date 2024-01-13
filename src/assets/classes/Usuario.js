import UsuarioServices from '@/assets/services/UsuarioServices';
import usuarioService from '@/assets/services/UsuarioServices'
import Validacoes from '@/assets/static/Validacoes'

export class Usuario {
  constructor() {
    this.Id = null,
    this.UserName = null,
    this.Email = null,
    this.Password = null,
    this.Genero = null,
    this.Cpf = null,
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
    if(!this.Password) erros.push("Informe sua senha!");
    erros.push(...this.getErrorsPasswordNotIsStrong());
    if(!this.Genero) erros.push("Informe seu gênero!");
    if(!Validacoes.validarCPF(this.Cpf)) erros.push("CPF invélido!");
    if(!Validacoes.telefoneValidation(this.Telefone)) erros.push('Telefone inválido!');
    return erros
  }

  hasUserName(userName) {
    return UsuarioServices.hasUserName(userName);
  }

  async post() {
    usuarioService.post(this).then(res => {
      return res
    }).catch(err => {
      console.log('UsuarioPost: ', err)
    })
  }

  getErrorsPasswordNotIsStrong() {
    if(!this.Password) return ['Senha é obrigatória!'];
    let erros = [];

    var numeros = /([0-9])/;
    var alfabeto = /([A-Z])/;
    var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    if(this.Password.length < 6) erros.push("Senha tem que ter mais de 6 digitos!!");
    if(!this.Password.match(numeros)) erros.push("A senha tem que ter no minimo um número!");
    if(!this.Password.match(alfabeto)) erros.push("A senha tem que ter no minimo uma letra maiúscula!");
    if(!this.Password.match(chEspeciais)) erros.push("A senha tem que ter pelomenos um caracter especial!");
  
    return erros;
  }
}