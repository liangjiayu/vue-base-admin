import storage from '../../plugins/storage';

const state = {
  userInfo: storage.get('userInfo', null),
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    storage.set('userInfo', userInfo);
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
