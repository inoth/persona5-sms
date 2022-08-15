<style scoped>
#chatboxbg {
    background-image: url("src/assets/images/bgimgs/chatbox.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-width: 800px;
    min-height: 800px;
    max-width: 1080px;
    max-height: 1000px;
    height: auto;
    padding-left: 35%;
    padding-right: 17%;
    padding-top: 15%;
}

#chatbox {
    width: auto;
    max-width: 1080px;
    height: 800px;
    overflow-y: scroll;
}

#chatbox::-webkit-scrollbar {
    display: none;
}
</style>

<template>
    <div id="chatboxbg">
        <div id="chatbox">
            <MessageBox v-for="msg of messageList" :remote="msg.sourceId != user.id" :name="msg.sourceName"
                :icon="msg.icon" :message="msg.msg" v-on:msgBoxHight="getBoxHight" />
        </div>
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
            msgBoxHight: 0,
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
                },
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
                },
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
                },
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
                },
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
                },
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
                },
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
                },
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
                },
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
                },
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
                },
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
                },
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
                    msg: "12321312312321321",
                },
            ] as MessageBody[]
        };
    },
    methods: {
        getBoxHight(val: number) {
            this.msgBoxHight = val
        },
        setMessage() {
            if (!this.message) {
                return
            }
            let r = Math.floor((Math.random() * 10) + 1)
            let msg = {
                icon: "src/assets/images/icon/cbimage.png",
                sourceId: r >= 5 ? this.user.id : '123',
                sourceName: this.user.name,
                msg: this.message,
            } as MessageBody
            this.messageList.push(msg)
            this.message = ''
            let chatbox = document.getElementById('chatbox') as HTMLElement
            if (chatbox as HTMLElement) {
                let scrollTop = (chatbox?.scrollHeight as number - this.msgBoxHight)
                // console.log('应该的高度为: ' + scrollTop)
                chatbox.scrollTop = scrollTop
                console.log('现在高度为: ' + chatbox.scrollTop)
            }
        }
    },
    watch: {}
})

</script>

