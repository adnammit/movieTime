<template>
	<div class="container-fluid mt-4">
		<div>
			<v-toolbar>
				<v-toolbar-title>Movies</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-toolbar-items>
					<v-btn text>Search</v-btn>
					<v-btn text>Favorites</v-btn>
					<v-btn text>Add</v-btn>
				</v-toolbar-items>
			</v-toolbar>
		</div>
		<div class="text-center loader" v-bind:class="{ loading: isLoading}">
			<div v-if="isLoading">
				<v-progress-linear indeterminate color="cyan"></v-progress-linear>
			</div>
		</div>
		<div class="text-center content">
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-center">Movie</th>
							<th class="text-center">Year</th>
							<th class="text-center">Rating</th>
							<th class="text-center">Watched</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="movie in movies" :key="movie.Title">
							<td>{{ movie.Title }}</td>
							<td>{{ movie.Year }}</td>
							<td>{{ movie.Rating }} / 10</td>
							<td><span v-if="movie.Watched">x</span></td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
	</div>
</template>
<script>
import moviesApi from '@/services/api/movies'

export default {
  data () {
    return {
      isLoading: true,
      movies: []
    }
  },
  async created () {
    moviesApi
      .getMovies()
      .then(movies => {
        this.movies = movies

        /* eslint-disable no-console */
        console.log('>> MOVIES')
        console.log(this.movies)
      })
    /* eslint-disable no-console */
      .catch(e => console.log(e))
      .finally(() => {
        this.isLoading = false
      })
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    // $route: 'refreshActiveUser',
  },
  methods: {
    async search () {}
  }
}
</script>

<style scoped lang="scss">
.content {
	height: 90vh;
	padding: 20px;
	// display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	.loading {
		padding-top: 23px;
	}
}
</style>
