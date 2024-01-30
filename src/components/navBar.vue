<template>
	<nav class="navbar fixed-top navbar-expand-lg bg-info-subtle">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">LionTickets</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
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
													:to="{ name: 'Usuarios', params: { UserName: usuario?.UserName } }">
								Perfil
							</router-link>
						</li>
						<li>
							<router-link class="dropdown-item" 
													:to="{ name: 'Produtos', params: { productsName: 'acessorios' } }">
								Acessórios
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
  </nav>
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
  components: { RouterLink }
}
</script>