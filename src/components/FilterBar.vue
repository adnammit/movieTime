<template>
    <div class="container-fluid mt-4 filter-bar">
        <div>
            <v-toolbar dense short flat>
                <!-- <v-toolbar-title>Filter</v-toolbar-title> -->
                <v-btn text @click="toggleFavorites()">Favorites</v-btn>
                <v-btn text @click="toggleWatched()">To Do</v-btn>
                <v-btn text>Add</v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-text-field
                        class="filter-bar__search"
                        outlined
                        dense
                        clearable
                        label="Search"
                        v-model="search"
                        @keyup.native.enter="doSearch()"
                        append-icon="mdi-magnify"
                    ></v-text-field>
                </v-toolbar-items>
            </v-toolbar>
        </div>
        <div class="text-center loader" v-bind:class="{ loading: isLoading }">
            <div v-if="isLoading">
                <v-progress-linear indeterminate color="cyan"></v-progress-linear>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import MovieApi from '@/services/api/MovieApi';
import { FilterModule } from '@/store/modules/filter';

@Component({})
export default class FilterBar extends Vue {
    private filterFavorites: boolean = false;
    private filterWatched: boolean = false;
    private search: string = '';
    private results: any = null;

    private get isLoading() {
        return FilterModule.isLoading;
    }

    private set isLoading(val: boolean) {
        FilterModule.setIsLoading(val);
    }

    private get isErrored() {
        return FilterModule.isErrored;
    }

    private set isErrored(val: boolean) {
        FilterModule.setIsErrored(val);
    }

    private doSearch(): void {
        this.isLoading = true;
        console.log('>> Searching for ' + this.search);
        MovieApi
            .searchMovies(this.search)
            .then((results: any) => {
                if (results.Error != null) {
                    this.isErrored = true;
                } else {
                    this.results = results;
                }
            })
            .catch((e: any) => {
                /* eslint-disable no-console */
                console.log(e);
                this.isErrored = true;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    private toggleFavorites(): void {
        this.filterFavorites = !this.filterFavorites;
    }

    private toggleWatched(): void {
        this.filterWatched = !this.filterWatched;
    }
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.filter-bar .v-toolbar {
    color: $alto;
    background-color: $tundora !important;
    .filter-bar__search {
        padding-top: 4px;
    }
}
</style>
