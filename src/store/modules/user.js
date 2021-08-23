import Cookies from 'js-cookie';
const userStore = {
  namespaced: true,
  state: {
    token: Cookies.get('token'),
  },
  mutations: {
    SET_USER_TOKEN(state, token) {
      state.token = token;
      Cookies.set('token', token);
    },
  },
};


export default userStore
