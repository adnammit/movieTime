import Vue from 'vue';
import Vuex from 'vuex';
import { FilterState } from './modules/filter';

Vue.use(Vuex);

export interface RootState {
  filter: FilterState;
}

export default new Vuex.Store<RootState>({});
