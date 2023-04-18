<template>
    <div>
        <div v-for="message in messages">
            {{ message }}
        </div>
    </div>
    <form @submit.prevent="sendMessage()">
        <input type="text" v-model="formMessage">
        <input type="submit" value="Send">
    </form>
</template>
<script lang="ts">
import SocketHandler from '../SocketHandler'
import { useRoute } from 'vue-router';
export default {
    name: 'Room',
    data() {
        return {
            messages: [] as Array<string>,
            name: '',
            formMessage: ''
        }
    },
    created() {

        const route = useRoute();
        this.name = route.params.name as string;

        console.log("Join room: " + this.name);

        SocketHandler.joinRoom(this.name);

        SocketHandler.onMessage((message: string) => {
            console.log(message);
            this.messages.push(message);
        })

        SocketHandler.onMessages((messages: Array<string>) => {
            this.messages = messages;
        })
    },
    methods: {
        sendMessage() {
            SocketHandler.sendMessage(this.formMessage);
            this.formMessage = '';
        }
    }
}
</script>