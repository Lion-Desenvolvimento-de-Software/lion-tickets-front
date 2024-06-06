<template>
	<header class="navbar fixed-top navbar-expand-sm custom-navbar">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">LionTickets</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-center">
					<li class="nav-item">
						<router-link class="nav-link" aria-current="page" to="/eventos">Eventos</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Sobre nós</a>
					</li>
					<li class="nav-item dropdown">
						<button class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							Produtos
						</button>
						<ul class="dropdown-menu">
							<li>
								<router-link class="dropdown-item" 
														:to="{ name: 'Produtos', params: { productsName: 'roupas' } }">
									Roupas
								</router-link>
							</li>
							<li>
								<router-link class="dropdown-item" 
														:to="{ name: 'Produtos', params: { productsName: 'acessorios' } }">
									Acessórios
								</router-link>
							</li>
						</ul>
					</li>
				</ul>
				<div v-if="!usuario?.Id" class="d-flex justify-content-end">
					<!--<RouterLink to="/login">-->
						<button class="btn btn-success mx-1" @click="login">Entrar</button>
					<!--</RouterLink>-->
				</div>
				<div v-else class="dropstart">
					<img class="btn p-0 custom-imagem-perfil"
						@click="$emit('openCollapse')"
						aria-expanded="false" 
						:src="getImagemPerfil"
						alt="Imagem do Perfil"
						height="40" 
						width="40"
						v-if="$route.params.Id != usuario.Id" />
				</div>
			</div>
		</div>
  </header>
</template>

<script>
import { Usuario } from '@/assets/classes/Usuario';
import { RouterLink } from 'vue-router';
import userManager from '@/services/userManager';

export default {
	name: 'navBar',
	props: {
		usuario: {
			type: Usuario,
			default: null
		}
	},
	emits: ['openCollapse'],
  components: { RouterLink },
	data() {
		return {
			BGHader: 'bg-transparent'
		}
	},
	mounted() {
		window.addEventListener("scroll", this.onScroll)
	},
	computed: {
		getImagemPerfil() {
			return !this.usuario?.UrlImagemPerfil ? require("@/assets/images/R.png") : this.usuario?.UrlImagemPerfil;
		}
	},
	methods: {
		onScroll() {
			this.BGHader = window.top.scrollY < 50 ? 'bg-transparent' : 'bg-info-subtle'
		},
		login() {
			console.log("Iniciando processo de login...");
      userManager.signinRedirect().then(() => {
        console.log("Redirecionamento concluído.");
      }).catch(error => {
        console.error("Erro durante o redirecionamento:", error);
      });
		}
	}
}
</script>

<style scoped>
.custom-navbar {
	background-color: orange;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .7);
}

li a, li button {
	display: block;
	width: 100%;
	height: 100%;
	cursor: pointer;
}
li {
  display: inline-block;
  position: relative;
	height: 30px;
  margin-bottom: 3px;
  margin-right: 10px;
}

li::after {
  content: '';
  display: block;
  margin: auto;
  height: 3px;
  width: 0;
  background: transparent;
  transition: width .5s ease, background-color .5s ease;
}
li:hover::after {
  width: 100%;
  background: blue;
}

.custom-imagem-perfil {
	border-radius: 50%;
}
</style>