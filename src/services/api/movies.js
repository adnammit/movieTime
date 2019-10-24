import axios from 'axios'

const apiUrl = 'https://movie-database-imdb-alternative.p.rapidapi.com/'

axios.defaults.baseURL = apiUrl
axios.defaults.headers.common['x-rapidapi-host'] = 'movie-database-imdb-alternative.p.rapidapi.com'
axios.defaults.headers.common['x-rapidapi-key'] = 'ff6dd224ebmsh1fdc2365f747204p11f9e2jsncaf8931a51fc'

export default {
  getMovies () {
    return axios.get('/?page=1&r=json&s=Avengers%20Endgame')
      .then(res => {
        let movies = res.data.Search
        movies.forEach(m => {
          m.Rating = 5
          m.watched = true
        })
        return movies
      })
  }
}
