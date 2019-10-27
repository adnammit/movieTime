<template>
	<v-app>
    <NavBar />
		<v-content class="content">
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'app',
  props: {
    source: String
  },
  components: {
    NavBar
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
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.content {
  padding: 0;
  padding-top: 35px !important;
}
</style>
