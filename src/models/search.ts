import { Genre } from '@/models/interfaces'

export class SearchResult {
    public Title: string = '';
    public ReleaseDate: Date = new Date();
    public Id: number = 0;
    // public ImdbId: string = '';
    public Genres: Genre[] = [];
    public Rating: number | null = null;
    public Poster: string = '';
    public Summary?: string = '';
    // public UserRating?: number;
    // public Watched: boolean = false;
    // public Favorite: boolean = false;
}


// RawResults map directly with what comes from the api
export type RawResult = MovieResult | TvResult ;

export class MovieResult {
    public title: string = '';
    public release_date: Date = new Date();
    public id: number = 0;
    // public media_type: string = 'movie';
    public genre_ids: number[] = [];
    public overview: string = '';
}

export class TvResult {
    public name: string = '';
    public first_air_date: Date = new Date();
    public id: number = 0;
    // public media_type: string = 'tv';
    public genre_ids: number[] = [];
    public overview: string = '';
}

// export interface SearchResult {
//     id: number;
//     media_type: string;
//     overview: string; //?
//     genre_ids: number[];
// }

