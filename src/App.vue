<template>
	<v-app>
		<v-app-bar app>
			<v-toolbar-title class="headline text-uppercase">
				<span>Movie Picker</span>
				<!-- <span class="font-weight-light">Movies</span> -->
			</v-toolbar-title>
      <v-btn text href="/movies">
				<span class="font-weight-light">My Movies</span>
			</v-btn>
			<v-spacer></v-spacer>

			<v-btn text href="#" @click.prevent="login" v-if="!activeUser">
				<span class="mr-2">Log In</span>
			</v-btn>
      <v-btn text href="#" @click.prevent="logout" v-else>
				<span class="mr-2">Log Out</span>
			</v-btn>
		</v-app-bar>

		<v-content>
			<router-view/>
			<!-- <Hello /> -->
		</v-content>
	</v-app>
</template>

<script>
export default {
  name: 'app',
  props: {
    source: String
  },
  data () {
    return {
      activeUser: null
    }
  },
  async created () {
    await this.refreshActiveUser()
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    $route: 'refreshActiveUser'
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
    },
    async logout () {
      await this.$auth.logout()
      await this.refreshActiveUser()
      this.$router.push('/')
    }
  }
}
</script>
