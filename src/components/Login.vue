<style scoped>
/* @import url("/css/normalize.min.css"); */

.join {
    margin-top: 20rem;
    color: rgb(255, 0, 0);
}
</style>
<template>
    <div class="join">
        <p>YOUR NAME</p>
        <input id="user-name" required name="description" v-model="userName" />
        <button v-on:click="setToLogin()">join room</button>
    </div>
    <!-- <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 90">
            <polygon points="126,16 266,16 235,71 115,66" class="" style="fill: white;"></polygon>
            <polygon points="130,20 251,20 231,67 120,62" class="" style="fill: black;"></polygon>
            <text y="25.25" style="font-size: 14px; text-align:center;">
                <tspan x="165" dy="1.5em" style="fill: white;">
                    Send
                </tspan>
            </text>
        </svg>
    </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginService from '../service/login'
import { useRouter } from "vue-router";


export default defineComponent({
    name: "loginComponent",
    data() {
        return {
            userName: '' as string,
            router: useRouter()
        };
    },
    methods: {
        setToLogin() {
            LoginService.login(this.userName)
                .then(resp => {
                    console.log(resp)
                    // 跳转到 chatbox
                    if (resp.status == 200) {
                        if (resp.data.code == 200) {
                            let token = resp.headers["authorization"]
                            console.log(token)
                            localStorage.setItem("Authorization", token ? token : "")
                            console.log(resp.data.data)
                            localStorage.setItem("UserInfo", JSON.stringify(resp.data.data))
                            this.router.push("/chat")
                        }
                    }
                }).catch(err => {
                    console.error(err)
                })
        }
    }
})

</script>

