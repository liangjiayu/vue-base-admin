const state = {
  userInfo: window._Storage.get('userInfo', null),
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    window._Storage.set('userInfo', userInfo);
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
