import { createStore } from 'vuex';
import userStore from './modules/user';

const store = createStore({
  modules: {
    userStore,
  },
});

export default store;
