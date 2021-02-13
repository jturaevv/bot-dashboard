import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    infos: [],
  },
  mutations: {
    SET_INFO(state, payload) {
      state.infos.push(payload);
    },
    EDIT_INFO(state, payload) {
      state.infos = state.infos.map((bot) =>
        bot.id === payload.id ? payload : bot
      );
    },
    DELETE_INFO(state, payload) {
      state.infos.splice(payload, 1);
    },
  },
});
