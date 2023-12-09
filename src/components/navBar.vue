<template>
	<nav class="navbar navbar-expand-lg bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Navbar</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="/">Eventos</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Sobre nós</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Produtos
						</a>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="#">Roupas</a></li>
							<li><a class="dropdown-item" href="#">Acessórios</a></li>
						</ul>
					</li>
				</ul>
				<form class="d-flex" role="search">
					<RouterLink to="/">
						<button class="btn btn-outline-success mx-1">Cadastro</button>
					</RouterLink>
					<RouterLink to="/login">
						<button class="btn btn-success mx-1">Entrar</button>
					</RouterLink>
				</form>
			</div>
		</div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'navBar',
  components: { RouterLink }
}
</script>