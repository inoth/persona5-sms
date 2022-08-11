<style scoped>
#chatbox {
    background: #cc0000;
    width: 500px;
    height: 500px;
    max-width: 100%;
    max-height: 100%;
}
</style>

<template>
    <div id="chatbox">
        <MessageBox name="inoth" msg="12312312" />
        <MessageBox name="inoth" msg="3213213" />
        <MessageBox name="inoth" msg="0192732" />
    </div>
    <div>
        <input type="text" v-model="message">
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginResp from '../types/login';
import MessageBox from './MessageBox.vue'

// let user: LoginResp = {
//     id: '123',
//     name: '321',
// }

export default defineComponent({
    name: "add-login",
    components: {
        MessageBox
    },
    data() {
        return {
            user: {
                id: '123',
                name: '321',
            } as LoginResp,
            message: '',
            messageList:[]            
        };
    },
    methods: {},
    watch: {}
})

</script>

