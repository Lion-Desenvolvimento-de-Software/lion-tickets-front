<template>
	<header class="navbar fixed-top navbar-expand-lg" :class="BGHader">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">LionTickets</router-link>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link active" aria-current="page" to="/eventos">Eventos</router-link>
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
				<div v-if="!usuario?.Id" class="d-flex">
					<RouterLink to="/login">
						<button class="btn btn-success mx-1">Entrar</button>
					</RouterLink>
				</div>
				<div v-else class="dropstart">
					<img class="nav-link dropdown-toggle btn"
						data-bs-toggle="dropdown" 
						aria-expanded="false" 
						src="../assets/images/R.png" 
						height="30" 
						width="30" />

					<ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
						<li>
							<router-link class="dropdown-item"
													:to="{ name: 'Usuarios', params: { Id: usuario?.Id } }">
								Perfil
							</router-link>
						</li>
						<li>
							<hr class="dropdown-divider" />
						</li>
						<li>
							<a class="btn dropdown-item" @click="$emit('logof')">Logof</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
	name: 'navBar',
	props: {
		usuario: {
			type: Object,
			default: null
		}
	},
  components: { RouterLink },
	data() {
		return {
			BGHader: 'bg-transparent'
		}
	},
	mounted() {
		window.addEventListener("scroll", this.onScroll)
	},
	methods: {
		onScroll() {
			this.BGHader = window.top.scrollY < 50 ? 'bg-transparent' : 'bg-info-subtle'
		}
	}
}
</script>