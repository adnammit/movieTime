<template>
    <div class="text-center search-table">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <!-- checkbox: add -->
                        <th class="text-center">Title</th>
                        <!-- type -->
                        <!-- date -->
                        <!-- rating -->
                        <!-- genres -->
                        <!-- mark as watched -->
                        <!-- mark as favorite -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in results" :key="item.Id">
                        <!-- TITLE -->
                        <td>{{ item.Title }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <!-- <div class="my-2">
				<v-btn small color="primary" @click="saveCollection()">Save</v-btn>
        </div>-->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { SearchResult } from '@/models/search';
import { FilterModule } from '@/store/modules/filter';

@Component({})
export default class MoviesView extends Vue {
    
    private get results(): SearchResult[] {
        return FilterModule.SearchResults;
    }

    // private toggleFavorite(movie: SearchResult): void {
    //     movie.Favorite = !movie.Favorite;
    // }

    // private toggleWatched(movie: SearchResult): void {
    //     movie.Watched = !movie.Watched;
    // }

    // private getGenreMatch(movie: SearchResult, genre: string) {
    //     if (movie.Genres) {
    //         return movie.Genres.some(g => g.Name == genre);
    //     }
    //     return false;
    // }

    public mounted() {
        // FilterModule.LoadMovieList();
    }
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.movie-table {
    height: 90vh;
    padding: 0;
    align-items: center;
    justify-content: center;
    text-align: center;
    .loading {
        padding-top: 23px;
    }
    thead {
        background-color: $tundora-shaft;
        text-transform: uppercase;
        tr th {
            letter-spacing: 2px;
            font-weight: 600;
        }
    }
    td {
        letter-spacing: 1px;
        color: $alto;
    }
}
.v-icon {
    color: $silver;
}
.icon--deselected {
    color: $dove-gray;
}
.favorite {
    color: $turmeric;
}
.complete {
    color: $goblin;
}
</style>
