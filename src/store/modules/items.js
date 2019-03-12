import { getList } from '@/api';
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    updateList(state, data) {
      state.list = data;
    }
  },
  actions: {
    getList({ commit }, para) {
      return getList(para).then((res) => {
        commit('updateList', res.data);
      });
    }
  },
  getters: {

  }
};
