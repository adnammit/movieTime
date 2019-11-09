import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface FilterState {
    isErrored: boolean;
    isLoading: boolean;
}

@Module({ dynamic: true, namespaced: true, store, name: 'FilterState' })
class Filter extends VuexModule implements FilterState {
    public isErrored: boolean = false;
    public isLoading: boolean = false;

    @Action
    async setIsLoading(val: boolean){
        this.context.commit('SET_IS_LOADING', val);
    }

    @Action
    async setIsErrored(val: boolean) {
        this.context.commit('SET_IS_ERRORED', val);
    }

    @Mutation
    SET_IS_LOADING(val: boolean) {
        this.isLoading = val;
    }
    
    @Mutation
    SET_IS_ERRORED(val: boolean) {
        this.isErrored = val;
    }
}

export const FilterModule = getModule(Filter);