const state = {
  author: {
    name: 'liangjiayu',
    age: 18,
  },
  device: 'desktop',
};

const mutations = {
  CHANGE_AUTHOR: (state, payload) => {
    state.author = payload;
  },
};

const actions = {
  changeAuthor({ commit }, payload) {
    commit('CHANGE_AUTHOR', payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
