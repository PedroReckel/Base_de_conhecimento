<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}"> <!-- Se o menu não estiver visivel ou se o usuário não estiver setado eu vou aplicar essa classe CSS -->
		<Header title="Upsilon - Base de Conhecimento" 
			:hideToggle="!user"
			:hideUserDropdown="!user"></Header>
		<Menu v-if="user"></Menu>
		<Loading v-if="validatingToken"></Loading> <!-- Se o token não estiver setado será carregado o camponente Loading -->
		<Content v-else ></Content>
		<Footer></Footer>
	</div>
</template>

<script>

import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from "vuex"
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from '@/components/template/Loading.vue'

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },
	computed: mapState(['isMenuVisible', 'user']),
	data: function() {
		return {
			validatingToken: true // Dizer se o ele está ou não validando o token
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey) // Pegando o usuário do localStorage
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return 
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) { // Se o token estiver valido
				this.$store.commit('setUser', userData)

				if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
			} else { // Se o token NÃO estiver valido
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false // Para que não fique validando o token a todo o momento
		}
	},
	mounted() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		--webkit-font-smoothing: antialiased;
		--moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
</style>