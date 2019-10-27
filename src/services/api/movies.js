import axios from 'axios'
import config from '@/config.json'

const omdbUrl = config.omdbUrl
const key = config.omdbKey

/// maybe this sets the baseURL for every call? so maybe don't if we want to use multiple apis
// axios.defaults.baseURL = apiUrl

export default {

  searchMovies (search) {
    return axios.get(omdbUrl + '?s=' + search + '&' + key)
      .then(res => {
        // console.log(res.data)
        let data = res.data.Search
        let movies = []
        data.forEach(d => {
          movies.push(this.parseMovie(d))
        })
        return movies
      })
  },

  async getMovie (id) {
    return axios.get(omdbUrl + '?i=' + id + '&plot=full&' + key)
      .then(res => {
        /* eslint-disable no-console */
        // console.log(res.data)
        return this.parseMovie(res.data)
      })
  },

  // async getMovies (ids) {
  //   let movies = []
  //   for (var id of ids) {
  //     let movie = await this.getMovie(id)
  //     movies.push(movie)
  //   }
  //   return movies
  // },

  async getMovies (collection) {
    let ids = collection.map(c => c.id)
    let movies = []

    for (var id of ids) {
      let movie = await this.getMovie(id)
      let item = collection.find(c => c.id === movie.Id)
      movie.Watched = (item.watched === 'true')
      movie.Favorite = (item.favorite === 'true')
      movies.push(movie)
    }
    return movies
  },

  parseMovie (res) {
    let genres = res.Genre ? res.Genre.split(',')
      .map((genre) => {
        return genre.trim()
      }) : null

    let movie = {
      Title: res.Title,
      Year: res.Year,
      Id: res.imdbID,
      Rated: res.Rated,
      Genres: genres,
      Runtime: res.Runtime,
      Rating: res.imdbRating,
      Poster: res.Poster,
      // user props
      UserRating: 5,
      Watched: false,
      Favorite: false,
      Shelves: null
    }
    return movie
  }

}
