import axios from 'axios'
import Movie from '@/models/movie'
import { Collection, Genre } from '@/models/interfaces'

const config = require("@/config.json");
const url: string = config.movieDbUrl
const token: string = config.movieDbToken
// const key: string = config.movieDbKey

let requestMgr = axios.create({
    baseURL: url,
    headers: {
        common: {
            'Authorization': 'Bearer ' + token
        }
    }
})

class MovieApi {

    public async search(search: string) {
        return requestMgr.get('search/multi?query=' + search)
            .then(res => {
                let data = res.data.results
                let movies: Movie[] = []
                data.forEach((d: any) => {
                    if (d.media_type == 'movie' || d.media_type == 'tv')
                        movies.push(this.parseMovie(d))
                    else
                        console.log('>> non-movie search result: ' + JSON.stringify(d));
                })
                return movies
            })
    }

    public async getMovie(id: number) {
        return requestMgr.get('movie/' + id)
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
        let genres: Genre[] = []
        if (res.genres) {
            genres = res.genres.map((g: any) => <Genre>{
                Id: g.id,
                Name: g.name
            })
        }

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
            Summary: res.overview,
            UserRating: 5,
            Watched: false,
            Favorite: false
        }
        return movie
    }
}

export default new MovieApi();