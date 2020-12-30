import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 容器的状态只是实现数据的共享，但是没有持久化的功能
  state: {
    user: JSON.parse(window.localStorage.getItem("user") || "null") // 当前登录用户状态
  },
  mutations: {
    // 修改容器数据必须用mutation 函数
    setUser(state, payload) {
      state.user = JSON.parse(payload);

      // 为了防止页面刷新数据丢失，把 user 持久化
      window.localStorage.setItem("user", payload);
    }
  },
  actions: {},
  modules: {}
});
