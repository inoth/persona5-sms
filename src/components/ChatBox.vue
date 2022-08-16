<style scoped>
@import url("../assets/css/normalize.min.css");

#chatboxbg {
    background-image: url("src/assets/images/bgimgs/chatbox.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 1300px;
    /* max-width: 1300px;
    min-width: 1300px; */
    min-height: 900px;
    /* overflow:visible; */
    height: auto;
    padding: 1px;
}

#chatbox {
    overflow-x: hidden;
    overflow-y: scroll;
    max-width: 500px;
    height: 770px;
    margin-left: 17%;
    min-width: 500px;
    margin-top: 13%;
    border-bottom: #000 solid 2px;
}

#chatbox::-webkit-scrollbar {
    display: none;
}

#msg-input {
    background-color: #c30f00;
    width: 500px;
    margin-left: 17%;
    height: 36px;
}

#msg-input>input {
    width: 70%;
    height: 36px;
    border-bottom: #000 solid 2px;
    background-color: transparent;
    float: left;
}

#msg-input>button {
    background-color: #fff;
    border: #000 solid 1px;
}

#sendbtn {
    width: 30%;
    overflow: hidden;
    height: 36px;
}
</style>

<template>
    <div id="chatboxbg">
        <div id="chatbox">
            <MessageBox v-for="msg of messageList" :remote="msg.sourceId != user.id" :name="msg.sourceName"
                :icon="msg.icon" :message="msg.msg" />
        </div>
        <div id="msg-input">
            <input type="text" v-model="message" v-on:keydown.enter="setMessage">
            <div v-on:click="setMessage()" id="sendbtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 90" style="height: 3em;width: 360pt;">
                    <polygon points="126,16 266,16 235,71 115,66" class="" style="fill: white;"></polygon>
                    <polygon points="130,20 251,20 231,67 120,62" class="" style="fill: black;"></polygon>
                    <text y="25.25" style="font-size: 18px; text-align:center;">
                        <tspan x="165" dy="1.5em" style="fill: white;">
                            Send
                        </tspan>
                    </text>
                </svg>
            </div>
        </div>
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
            // msgBoxHight: 0,
            message: '',
            messageList: [
                {
                    icon: "src/assets/images/icon/cbimage.png",
                    sourceId: "abc112",
                    sourceName: "inoth1",
                    msg: "test",
                    msgType: "user"
                },
                {
                    icon: "src/assets/images/icon/1660535970309.png",
                    sourceId: "abc123",
                    sourceName: "inoth2",
                    msg: "test",
                    msgType: "user"
                }
            ] as MessageBody[]
        };
    },
    methods: {
        // getBoxHight(val: number) {
        //     this.msgBoxHight = val
        // },
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
                msgType: 'user',
            } as MessageBody
            this.messageList.push(msg)
            this.message = ''
            this.scrollToBot()
        },
        async scrollToBot() {
            setTimeout(() => {
                let chatbox = document.getElementById('chatbox') as HTMLElement
                if (chatbox as HTMLElement) {
                    chatbox.scrollTop = chatbox.scrollHeight
                }
            }, 50);
        }
    },
    watch: {}
})

</script>

