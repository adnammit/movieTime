import axios from 'axios'
import Movie from '@/models/movie'
import { Collection } from '@/models/interfaces'

const config = require("@/config.json");

class AccountService {

    public getCollection(): Collection {
        var json = require('@/data.json')
        let userData: Collection = json.data.find((d: any) => d.Email === 'amandaryman@gmail.com')
        return userData
    }

    public saveCollection(movies: Movie[]) {
        var json = require('@/data.json')
        let collection = movies.map(m => ({
            Id: m.Id,
            Favorite: m.Favorite,
            Watched: m.Watched
        }))
        json.data.find((d: any) => d.Email === 'amandaryman@gmail.com')['collection'] = collection

        var fs = require('fs')
        fs.writeFile('@/data.json', json, 'utf8', function (err: any) {
            if (err) {
                console.log(err)
            }
        })
    }
}

export default new AccountService();