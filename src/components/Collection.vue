<template>
	<div class="container-fluid mt-4">
		<FilterBar />
        <Errored v-if="isErrored" />
        <Search v-else-if="showSearch" />
        <Movies v-else/>
        <!-- TODO: error -->
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { FilterModule } from '@/store/modules/filter';
import FilterBar from '@/components/FilterBar.vue'
import Movies from '@/components/Movies.vue'
import Search from '@/components/Search.vue'

@Component({
    components: {
        FilterBar,
        Movies,
        Search
    }
})
export default class MoviesView extends Vue {

    private get isErrored() {
        return FilterModule.isErrored;
    }

    // private get isLoading() {
    //     return FilterModule.isLoading;
    // }

    // private set isLoading(val: boolean) {
    //     FilterModule.setIsLoading(val);
    // }

    private get showSearch() {
        return FilterModule.showSearch;
    }

    // private set isLoading(val: boolean) {
    //     FilterModule.setIsLoading(val);
    // }

    async mounted () {
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
