<template>
	<nav class="custom-navbar" :class="isExpand ? 'expand' : ''">
		<h3>Lion Tickets</h3>
		<div class="custom-items-nav" :class="isExpand ? 'view-flex' : 'view-none'">
			<a href="">Eventos</a>
			<a href="">Ingressos</a>
			<a href="">Produtos</a>
		</div>
		<div class="custom-actions">
			<span @click="isExpand = !isExpand" class="btn">
				<font-awesome-icon :icon="['fas', 'bars']" />
			</span>
			<div class="custom-profile" v-if="usuario?.Id">
				<span class="quantity-items" :class="CartQuantity > 0 ? 'visible' : 'invisible'">{{ CartQuantity }}</span>
				<button @click="enterViewCart()" class="button-cart">
					<font-awesome-icon :icon="['fas', 'cart-shopping']" />
				</button>
				<font-awesome-icon :icon="['fas', 'user']" />
			</div>
			<div v-else>
				<button class="btn btn-success" @click="login">Entrar</button>
			</div>
		</div>
	</nav>
</template>

<script>
import { Usuario } from '@/assets/classes/Usuario';
import userManager from '@/services/userManager';

export default {
	name: 'navBar',
	props: {
		usuario: {
			type: Usuario,
			default: null
		},
		CartQuantity: Number
	},
	emits: ['openCollapse'],
	data() {
		return {
			BGHader: 'bg-transparent',
			isExpand: false
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
		},
		enterViewCart() {
			this.$router.push("/cart");
		}
	}
}
</script>

<style scoped>
.custom-navbar {
	position: fixed;
	width: 100%;
	height: 50px;
	background-color: orange;
	padding: 5px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	border-radius: 3px;
	box-shadow: 0 2px 8px 5px rgba(0, 0, 0, 0.4);
	z-index: 255;
}

.custom-navbar h3 {
	display: flex;
	width: 100%;
	justify-content: start;
	font-size: 24px;
	font-family:Arial, Helvetica, sans-serif;
	height: 100%;
  align-items: center;
}

.custom-items-nav {
	position: relative;
	display: flex;
	width: 100%;
	justify-content: center;
	gap: 15px;
	height: 100%;
  align-items: center;
}

.custom-items-nav a {
	text-decoration: none;
	text-align: center
}

.custom-items-nav a::after {
	transition: all ease-in-out .2s;
  background: none repeat scroll 0 0 blue;
	content: "";
	display: block;
  height: 2px;
  width: 0
}

.custom-items-nav a:hover::after {
	width: 100%;
}

.custom-actions {
	display: flex;
	flex-direction: row-reverse;
	font-size: 24px;
	gap: 25px;
}

.custom-actions span {
	border: 1px solid black;
	width: 45px;
	display: none;
}

.custom-actions .custom-profile {
	position: relative;
	display: flex;
	width: 100%;
	justify-content: end;
	gap: 25px;
	height: 100%;
  align-items: center;
}

.quantity-items {
	position: absolute;
	display: block !important;
	width: 17px !important;
	height: 17px;
	background: rgb(255, 0, 0);
	border: 0 !important;
	outline: none;
	border-radius: 50px;
	top: -2px;
	right: 38px;
	font-size: 11px;
	padding: 0 3px;
	color: black;
}

.button-cart {
	background: none;
	border: 0;
	outline: none;
	padding: 0;
}

@media(max-width: 570px) {
	.custom-navbar {
		grid-template-columns: 1fr 1fr 90px;
	}
}

@media(max-width: 490px) {
	.custom-navbar {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		overflow-y: hidden;
		transition: ease .2s;
	}

	.custom-items-nav {
		position: absolute;
		height: 80%;
		bottom: 0;
		flex-direction: column;
		align-items: center;
	}

	.custom-items-nav a {
		width: calc(100% - 350px);
	}

	.custom-actions span {
		display: block;
	}

	.view-flex {
		display: flexblock;
	}

	.view-none {
		display: none;
	}

	.expand {
		height: 250px;
	}
}
</style>