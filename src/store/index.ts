import {createStore} from 'vuex';
import mutations from './mutations';
import state from './state';
import getters from './getters';
import actions from './actions';

const store = createStore({
    state: () => ({
        ...state
    }),
    mutations: {
        ...mutations
    },
    getters: {
        ...getters
    },
    actions: {
        ...actions
    },
})

export default store;