<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import SocketHandler from './SocketHandler'

export default {
  name: 'App',
    data() {
    return {
    }
  },
  components: {
    SideBar,
  },
  created() {
    
  },
  methods: {
    createRoom(name: string){
      SocketHandler.createRoom(name);
    },
    joinRoom(name: string){
      SocketHandler.joinRoom(name);
    }
  }
}
</script>

<template>
 <SideBar></SideBar> 
  <RouterView />
  <button @click.prevent="createRoom('test')">Create Room</button>
  <button @click.prevent="joinRoom('test')">Join Room</button>

</template>

<style scoped>


</style>
