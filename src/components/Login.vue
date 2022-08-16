<style scoped>
@import url("../assets/css/normalize.min.css");
</style>
<template>
    <div>
        <p>YOUR NAME</p>
        <input id="user-name" required name="description" v-model="userName" />
        <button v-on:click="setToLogin()">login</button>
    </div>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 90">
            <polygon points="126,16 266,16 235,71 115,66" class="" style="fill: white;"></polygon>
            <polygon points="130,20 251,20 231,67 120,62" class="" style="fill: black;"></polygon>
            <text y="25.25" style="font-size: 14px; text-align:center;">
                <tspan x="165" dy="1.5em" style="fill: white;">
                    Send
                </tspan>
            </text>
        </svg>
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

