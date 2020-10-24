import { Genre } from '@/models/interfaces'

export default class Movie {
    public Title: string = '';
    public ReleaseDate: Date = new Date();
    public Id: number = 0;
    public ImdbId: string = '';
    public Genres: Genre[] = [];
    public Rating: number | null = null;
    public Poster: string = '';
    public Summary?: string = '';
    public UserRating?: number;
    public Watched: boolean = false;
    public Favorite: boolean = false;
}