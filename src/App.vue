<template>
  <div id="app">
    <div v-if='false'>
      <div class='operating'>
        <button @click='add'>add</button>
        <button @click='remove'>remove</button>
        <button @click='change'>like</button>
        <button @click='allLike = false'>all</button>
        <button @click='allLike = true'>allLike</button>
      </div>
      <div class='notes-list'>
        <ul v-if='!allLike'>
          <li v-for='(item,index) in notes' :key="item.id" @click='chooseNote(item)'>ID:{{item.id}}------内容：{{item.content}}-------ifLike:{{item.ifLike}}</li>
        </ul>
        <ul v-else>
          <li v-for='(item,index) in likes' :key="item.id" @click='chooseNote(item)'>ID:{{item.id}}------内容：{{item.content}}-------ifLike:{{item.ifLike}}</li>
        </ul>
      </div>
      <div class='node-content'>
        <input v-if='nowNote' v-model='nowNote.content'>
      </div>
    </div>
    <pop-start v-else></pop-start>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import popStart from './components/popStart.vue'
  export default {
    name: 'app',
    data() {
      return {
        allLike: false
      }
    },
    components: {
      popStart
    },
    computed: {
      ...mapState({
        notes: state => state.NOTES,
        nowNote: state => state.nowNote
      }),
      ...mapGetters({
        likes: 'allLikes'
      })
    },
    methods: {
      ...mapMutations({
        add: 'addNotes',
        change: 'changeLike',
        chooseNote: 'chooseNote',
        remove: 'deleteNote',
      })
    }
  }
</script>

<style>
  li {
    list-style: none;
  }

  * {
    margin: 0px;
    padding: 0px;
  }

  html,
  body,
  #app {
    height: 100%;
    width: 100%;
  }
</style>