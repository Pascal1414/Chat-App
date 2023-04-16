<template>
    <h1> Room selection</h1>
    <div>
        <div v-for="room in rooms">
            <router-link :to="{ name: 'Room', params: { name: room.name } }">
                {{ room.name }}
            </router-link>
        </div>
    </div>
    <form @submit.prevent="createRoom(roomName)">
        <input type="text" v-model="roomName">
        <input type="submit" value="Create">
    </form>
</template>
<script lang="ts">
import SocketHandler from '../SocketHandler'
import HttpHandler from '../HttpHandler'
export default {
    name: 'RoomSelection',
    data() {
        return {
            rooms: [] as Array<{ name: string }>,
            roomName: ''
        }
    },
    created() {
        this.fetchRooms();

        SocketHandler.onRoomCreated((roomName: string) => {
            this.rooms.push({ name: roomName });
        })
    },
    methods: {
        createRoom(name: string) {
            SocketHandler.createRoom(name);
        },
        joinRoom(name: string) {
            SocketHandler.joinRoom(name);
        },
        async fetchRooms() {
            const rooms = await HttpHandler.fetchRooms();
            this.rooms = rooms;
        },
    }
}
</script>