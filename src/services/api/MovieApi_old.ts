// import axios from 'axios'
// import Movie from '@/models/movie'
// import { Collection } from '@/models/interfaces'

// const config = require("@/config.json");
// const omdbUrl: string = config.omdbUrl
// const key: string = config.omdbKey

// /// maybe this sets the baseURL for every call? so maybe don't if we want to use multiple apis
// // axios.defaults.baseURL = apiUrl

// class MovieApi {

//     public searchMovies(search: string) {
//         return axios.get(omdbUrl + '?s=' + search + '&' + key)
//             .then(res => {
//                 // console.log(res.data)
//                 let data = res.data.Search
//                 let movies: Movie[] = []
//                 data.forEach((d: any) => {
//                     movies.push(this.parseMovie(d))
//                 })
//                 return movies
//             })
//     }

//     public async getMovie(id: string) {
//         return axios.get(omdbUrl + '?i=' + id + '&plot=full&' + key)
//             .then(res => {
//                 /* eslint-disable no-console */
//                 // console.log(res.data)
//                 return this.parseMovie(res.data)
//             })
//     }

//     public async getMovies(collection: Collection) {
//         let ids = collection.Items.map(c => c.Id)
//         let movies = []

//         for (var id of ids) {
//             let movie: Movie = await this.getMovie(id);
//             let item = collection.Items.find(c => c.Id === movie.Id);

//             if(item != null) {
//                 movie.Watched = item.Watched === 'true' ? true : false;
//                 movie.Favorite = item.Favorite === 'true' ? true : false;
//                 movies.push(movie)
//             }
//         }
//         return movies
//     }

//     private parseMovie(res: any): Movie {
//         let genres = res.Genre ? res.Genre.split(',')
//             .map((genre: string) => {
//                 return genre.trim()
//             }) : null

//         let movie: Movie = {
//             Title: res.Title,
//             Year: res.Year,
//             Id: res.imdbID,
//             Rated: res.Rated,
//             Genres: genres,
//             Runtime: res.Runtime,
//             Rating: res.imdbRating,
//             Poster: res.Poster,
//             UserRating: 5,
//             Watched: false,
//             Favorite: false
//         }
//         return movie
//     }
// }

// export default new MovieApi();