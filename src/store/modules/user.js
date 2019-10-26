const state = {
  userInfo: {
    name: 'liangjiayu',
    role: 'member',
  },
};

const mutations = {
  UPDATE_USER_INFO: (state, payload) => {
    state.userInfo = payload;
  },
};

const actions = {
  updateUserInfo({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
