// const apiUrl = 'https://movie-database-imdb-alternative.p.rapidapi.com/'

// axios.defaults.baseURL = apiUrl
// axios.defaults.headers.common['x-rapidapi-host'] = 'movie-database-imdb-alternative.p.rapidapi.com'
// axios.defaults.headers.common['x-rapidapi-key'] = 'ff6dd224ebmsh1fdc2365f747204p11f9e2jsncaf8931a51fc'
// axios.defaults.baseURL = apiUrl
// export default {
//   getMovies(search) {
//     return axios.get(omdbUrl + '?t=' + search + '&plot=full&' + key)
//       .then(res => {
//         // mock up rating and watched props
//         let movies = res.data.Search
//         let i = 1
//         movies.forEach(m => {
//           m.Rating = 5
//           m.Watched = false
//           if (i / 2 === 1) { m.Watched = true }
//           i++
//         })
//         return movies
//       })
//   }
// }
