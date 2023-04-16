<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SocketHandler from './SocketHandler'

export default {
  name: 'App',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    createRoom(name: string) {
      SocketHandler.createRoom(name);
    },
    
    sendMessage(message: string) {
      SocketHandler.sendMessage(message);
    }
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>