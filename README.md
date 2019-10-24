# movie-picker

 Stores a to-do list of movies that you want to and have already watched.

 This vital, relationship-saving software also includes a random movie selector to cut down on the amount of time discussing what movie you should watch tonight. 

## Build Setup

``` bash
# install dependencies
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Lints and fixes files
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Okta Auth
Protected by [Okta OpenId authentication](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node) to keep your guilty pleasures a secret.

Reference the injected AuthClient with `this.$auth` anywhere in the Vue instance

To protect a page, add the `requiresAuth` attribute to its route in `router/index`

## App Design

### Movies
A list of all movies in the collection. Filterable by:
* watched
* rating
* genre

### Movie entity
* movie data -- pulled from google api?
* watched flag
* rating
* category -- user assigned or pulled from data?

### User operations
* search for movies using api database
* add movies to collection
* add rating to a movie in the collection
* set watched flag for movies in collection
* 


## TO DO
* add [uNoGS](https://rapidapi.com/unogs/api/unogs) to query whether or not a movie is available on netflix
* typescript yo -- do some processing on movies


## DONE
* refactor to use a centralized request mgr for cleaner code -- let components just be components
* re-write to use vuetify instead of bootstrap
