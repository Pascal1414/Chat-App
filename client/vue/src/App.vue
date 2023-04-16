<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import SocketHandler from './SocketHandler'

export default {
  name: 'App',
  data() {
    return {
      message: ''
    }
  },
  components: {
    SideBar,
  },
  created() {
    SocketHandler.onMessage((data: any) => {
      console.log(data);
    })
  },
  methods: {
    createRoom(name: string) {
      SocketHandler.createRoom(name);
    },
    joinRoom(name: string) {
      SocketHandler.joinRoom(name);
    },
    sendMessage(message: string) {
      SocketHandler.sendMessage(message);
    }
  }
}
</script>

<template>
  <SideBar></SideBar>
  <RouterView />
  <button @click.prevent="createRoom('test')">Create Room</button>
  <button @click.prevent="joinRoom('test')">Join Room</button>

  <form @submit.prevent="sendMessage(message)">
    <input type="text" v-model="message">
  </form>
</template>

<style scoped></style>
