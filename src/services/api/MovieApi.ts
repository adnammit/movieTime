import axios from 'axios'
import Movie from '@/models/movie'
import { Collection, Genre } from '@/models/interfaces'

const config = require("@/config.json");
const url: string = config.movieDbUrl
const key: string = config.movieDbKey_v4

/// maybe this sets the baseURL for every call? so maybe don't if we want to use multiple apis
// axios.defaults.baseURL = apiUrl
axios.defaults.headers.common['Authorization'] = 'Bearer ' + key;

class MovieApi {

    public searchMovies(search: string) {
        return axios.get(url + 'search/multi/?query=' + search)
            .then(res => {
                let data = res.data.results
                let movies: Movie[] = []
                data.forEach((d: any) => {
                    movies.push(this.parseMovie(d))
                })
                return movies
            })
    }

    public async getMovie(id: string) {
        return axios.get(url + 'movie/' + id)
            .then(res => {
                return this.parseMovie(res.data)
            })
    }

    public async getMovies(collection: Collection) {
        let ids = collection.Items.map(c => c.Id)
        let movies = []

        for (var id of ids) {
            let movie: Movie = await this.getMovie(id);
            let item = collection.Items.find(c => c.Id == movie.Id);

            if(item != null) {
                movie.Watched = item.Watched === 'true' ? true : false;
                movie.Favorite = item.Favorite === 'true' ? true : false;
                movies.push(movie)
            }
        }
        return movies
    }

    private parseMovie(res: any): Movie {
        let genres: Genre[] = res.genres.map((g: any) => <Genre>{
            Id: g.id,
            Name: g.name
        })

        // let known = [];
        // let unaccounted = genres.map((g) => {
        //     g.Name
        // });
        // if(unaccounted.length > 0) {
        //     console.log('>>> genres unaccounted for')
        //     console.log();
        // }

        let movie: Movie = {
            Title: res.title,
            ReleaseDate: res.release_date,
            Id: res.id,
            ImdbId: res.imdb_id,
            Genres: genres,
            Rating: res.vote_average,
            Poster: res.poster_path,
            UserRating: 5,
            Watched: false,
            Favorite: false
        }
        return movie
    }
}

export default new MovieApi();