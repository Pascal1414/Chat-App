<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SocketHandler from './SocketHandler'
import RoomSelection from './components/RoomSelection.vue';

export default {
  name: "App",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    createRoom(name: string) {
      SocketHandler.createRoom(name);
    },
    sendMessage(message: string) {
      SocketHandler.sendMessage(message);
    }
  },
  components: { RoomSelection }
}
</script>

<template>
  <div class="split">
    <div>
      <RoomSelection />
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.split {
  display: grid;
  grid-template-columns: 250px 1fr;
}
</style>