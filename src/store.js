import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    NOTES:[],
    nowNote:null
  },
  mutations: {
    addNotes (state) {
      let id = state.NOTES.length > 0 ? state.NOTES[state.NOTES.length -1]['id'] + 1 : 1;
      state.NOTES.push({ id: id, content: 'NOTE', ifLike: false });
    },
    chooseNote (state,note) {
      state.nowNote = state.NOTES[state.NOTES.indexOf(note)];
    },
    changeLike (state) {
      if (state.nowNote == null) {
        alert("请选择note");
        return;
      }
      state.nowNote.ifLike = !state.nowNote.ifLike;
    },
    deleteNote (state) {
      if (state.nowNote == null) {
        alert("请选择note");
        return;
      }
      state.NOTES.splice(state.NOTES.indexOf(state.nowNote),1);
    }
  },
  getters:{
    allLikes (state) {
      return state.NOTES.filter(note => note.ifLike)
    }
  },
  actions: {

  },
  modules:{

  }
})
