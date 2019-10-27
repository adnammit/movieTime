<template>
	<div class="container-fluid mt-4">
		<FilterBar />
		<div class="text-center movie-table">
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-center"></th>
							<th class="text-center">Movie</th>
							<th class="text-center">Genre</th>
							<th class="text-center">Year</th>
							<th class="text-center">Rating</th>
							<th class="text-center">Watched</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="movie in movies" :key="movie.Title">
							<!-- Favorite -->
							<td @click="toggleFavorite(movie)">
								<v-icon v-if="movie.Favorite" class="favorite">mdi-star-circle</v-icon>
								<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
							</td>
							<!-- Title -->
							<td>{{ movie.Title }}</td>
							<!-- Genre Icons -->
							<td>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Horror')" v-on="on">mdi-skull</v-icon>
									</template>
									<span>Horror</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Sci-Fi')" v-on="on">mdi-death-star-variant</v-icon>
									</template>
									<span>Sci-Fi</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Action')" v-on="on">mdi-karate</v-icon>
									</template>
									<span>Action</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Comedy')" v-on="on">mdi-emoticon-excited</v-icon>
									</template>
									<span>Comedy</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Drama')" v-on="on">mdi-drama</v-icon>
									</template>
									<span>Drama</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Romance')" v-on="on">mdi-heart-multiple</v-icon>
									</template>
									<span>Romance</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Animation')" v-on="on">mdi-brush</v-icon>
									</template>
									<span>Animation</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Western')" v-on="on">mdi-cactus</v-icon>
									</template>
									<span>Western</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Documentary')" v-on="on">mdi-video-vintage</v-icon>
									</template>
									<span>Documentary</span>
								</v-tooltip>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon v-if="getGenreMatch (movie, 'Family')" v-on="on">mdi-account-child</v-icon>
									</template>
									<span>Kids</span>
								</v-tooltip>
							</td>
							<!-- Year -->
							<td>{{ movie.Year }}</td>
							<!-- Rating -->
							<td>{{ movie.Rating }}</td>
							<!-- Watched -->
							<td @click="toggleWatched(movie)">
								<v-icon v-if="movie.Watched" class="complete">mdi-check-bold</v-icon>
								<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
	</div>
</template>
<script>
import moviesApi from '@/services/api/movies'
import FilterBar from '@/components/FilterBar'

export default {
  components: {
    FilterBar
  },
  data () {
    return {
      isLoading: true,
      movies: []
    }
  },
  async created () {
    let collection = this.getCollection()
    moviesApi
      .getMovies(collection)
      .then(movies => {
        this.movies = movies
      })
    /* eslint-disable no-console */
      .catch(e => console.log(e))
      .finally(() => {
        this.isLoading = false
      })
  },
  methods: {
    toggleFavorite (movie) {
      movie.Favorite = !movie.Favorite
    },
    toggleWatched (movie) {
      movie.Watched = !movie.Watched
    },
    getGenreMatch (movie, genre) {
      if (movie.Genres) {
        return movie.Genres.includes(genre)
      }
      return false
    },
    getCollection () {
      var json = require('@/data.json')
      let userData = json.data.find(d => d.username === 'amandaryman@gmail.com')
      let collection = (userData != null) ? userData.collection : null
      return collection
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.movie-table {
	height: 90vh;
	padding: 0;
	align-items: center;
	justify-content: center;
	text-align: center;
	.loading {
		padding-top: 23px;
	}
	thead {
		background-color: $tundora-shaft;
		text-transform: uppercase;
		tr th {
			letter-spacing: 2px;
			font-weight: 600;
		}
	}
	td {
		letter-spacing: 1px;
		color: $alto;
	}
}
.v-icon {
	color: $silver;
}
.icon--deselected {
	color: $dove-gray;
}
.favorite {
	color: $turmeric;
}
.complete {
	color: $goblin;
}
</style>
