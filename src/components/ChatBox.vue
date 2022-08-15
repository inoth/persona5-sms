<style scoped>
#chatbox {
    background-image: url("src/assets/images/bgimgs/chatbox.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 1920px;
    min-height: 800px;
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    padding-left: 35%;
    padding-right: 35%;
    padding-top: 15%;
}
</style>

<template>
    <div id="chatbox">
        <MessageBox v-for="msg of messageList" :remote="msg.sourceId != user.id" :name="msg.sourceName" :icon="msg.icon"
            :message="msg.msg" />
    </div>
    <div>
        <input type="text" v-model="message"><button v-on:click="setMessage()">send</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginResp from '../types/login';
import MessageBox from './MessageBox.vue'
import MessageBody from "../types/message";

export default defineComponent({
    name: "add-login",
    components: {
        MessageBox
    },
    data() {
        return {
            user: {
                id: 'abc123',
                name: 'inoth',
            } as LoginResp,
            message: '',
            messageList: [
                {
                    icon: "src/assets/images/icon/cbimage.png",
                    sourceId: "abc112",
                    sourceName: "inoth1",
                    msg: "test",
                },
                {
                    icon: "src/assets/images/icon/1660535970309.png",
                    sourceId: "abc123",
                    sourceName: "inoth2",
                    msg: "test",
                }
            ] as MessageBody[]
        };
    },
    methods: {
        setMessage() {
            let r = Math.floor((Math.random() * 10) + 1)
            let msg = {
                icon: "src/assets/images/icon/cbimage.png",
                sourceId: r >= 5 ? this.user.id : '123',
                sourceName: this.user.name,
                msg: this.message,
            } as MessageBody
            this.messageList.push(msg)
            this.message = ''
        }
    },
    watch: {}
})

</script>

