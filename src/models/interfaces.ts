export interface CollectionItem {
    Id: number;
    Favorite: string;
    Watched: string;
}

export interface Collection {
    Email: string;
    Items: CollectionItem[];
}

export interface Genre {
    Id: number;
    Name: string;
}