import { getList } from '@/api'
export default {
  namespaced: true,
  state: {
    list: [],
    fList: []
  },
  mutations: {
    updateList (state, data) {
      state.list = data
    }
  },
  actions: {
    getMenu ({ commit }) {
      return getList('/app/data/menu.json?id=quickNav').then((res) => {
        commit('updateList', res)
      })
    }
  },
  getters: {
    filterData: (state) => {
      let arrTmp = []
      state.list.forEach((item, index) => {
        arrTmp.push({
          name: item.name,
          items: (function () {
            let tmp = []
            item.child.forEach(rs => {
              rs.child.forEach(rb => {
                if (rb.flag && rb.flag.indexOf('home') !== -1) {
                  tmp.push(rb)
                }
              })
            })
            return tmp
          })()
        })
      })
      return arrTmp
    },
    filterDataHot: (state) => {
      let arrTmp = []
      state.list.forEach((item, index) => {
        item.child.forEach(rs => {
          rs.child.forEach(rb => {
            if (rb.flag && rb.flag.indexOf('hot') !== -1) {
              arrTmp.push(rb)
            }
          })
        })
      })
      return arrTmp
    }
  }
}
