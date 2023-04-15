<template>
    <div>
        <div v-for="room in rooms" >
            {{ room}}
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'SideBar',
    data() {
        return {
            rooms: []
        }
    },
}
</script>
