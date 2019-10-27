<template>
	<div class="container-fluid mt-4 filter-bar">
		<div>
			<v-toolbar dense short flat>
				<!-- <v-toolbar-title>My Movies</v-toolbar-title> -->
				<v-btn text @click="toggleFavorites()">Favorites</v-btn>
				<v-btn text @click="toggleWatched()">To Do</v-btn>
				<v-btn text>Add</v-btn>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-text-field
						class="filter-bar__search"
						outlined
						dense
						clearable
						label="Search"
						v-model="search"
						@keyup.native.enter="doSearch()"
						append-icon="mdi-magnify"
					></v-text-field>
				</v-toolbar-items>
			</v-toolbar>
		</div>
		<div class="text-center loader" v-bind:class="{ loading: isLoading }">
			<div v-if="isLoading">
				<v-progress-linear indeterminate color="cyan"></v-progress-linear>
			</div>
		</div>
	</div>
</template>
<script>
import moviesApi from '@/services/api/movies'

export default {
  data () {
    return {
      isLoading: false,
      isErrored: false,
      filterFavorites: false,
      filterWatched: false,
      errorMsg: 'No results :(',
      search: '',
      results: []
    }
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    // $route: 'refreshActiveUser',
  },
  methods: {
    doSearch () {
      this.isLoading = true
      console.log('>> Searching for ' + this.search)
      moviesApi
        .searchMovies(this.search)
        .then(results => {
          if (results.Error != null) {
            this.isErrored = true
          } else {
            this.results = results
          }
        })
        .catch(e => {
          /* eslint-disable no-console */
          console.log(e)
          this.isErrored = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    toggleFavorites () {
      this.filterFavorites = !this.filterFavorites
    },
    toggleWatched () {
      this.filterWatched = !this.filterWatched
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.filter-bar .v-toolbar {
  color: $alto;
	background-color: $tundora !important;
	.filter-bar__search {
		padding-top: 4px;
	}
}
</style>
