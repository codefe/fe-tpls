import { getAll } from '@/api';
export default {
  namespaced: true,
  state: {
      lista: [],
      listb: [],
    para: ''
  },
  mutations: {
    updateList(state, data) {
          state.lista = data[0].data.data;
          state.listb = data[1].data.data;
    },
    updatepara(state, data) {
        state.para = data;
    }
  },
  actions: {
    getListData({ commit, state }) {
      return getAll(state.para[0],state.para[1]).then((rs) => {
          commit('updateList', rs);
      });
    }
  },
  getters: {

  }
};
