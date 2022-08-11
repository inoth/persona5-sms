<style scoped>
</style>
<template>
    <div>
        <p>YOUR NAME</p>
        <input id="user-name" required name="description" v-model="user.name" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginResp from '../types/login';

export default defineComponent({
    name: "add-login",
    data() {
        return {
            user: {
                id: '123',
                name: '321',
            } as LoginResp,
        };
    },
    methods: {},
    watch: {}
})

</script>

