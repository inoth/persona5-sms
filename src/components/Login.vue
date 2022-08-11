<style scoped>
</style>
<template>
    <div>
        <p>YOUR NAME</p>
        <input id="user-name" required name="description" v-model="userName" />
        <button v-on:click="setToLogin()"></button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginResp from '../types/login';
import LoginService from '../service/login'

export default defineComponent({
    name: "loginComponent",
    data() {
        return {
            userName: '' as string,
        };
    },
    methods: {
        setToLogin() {
            LoginService.login(this.$data.userName)
                .then(resp => {
                    console.log(resp)
                    // 跳转到 chatbox
                }).catch(err => {
                    console.error(err)
                })
        }
    }
})

</script>

