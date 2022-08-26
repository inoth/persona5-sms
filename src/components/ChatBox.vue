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
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import LoginResp from '../types/login';
import MessageBox from './MessageBox.vue'
import MessageBody from "../types/message";
import newSocket from "../websocket";
import { wsUrl } from "../request";

export default defineComponent({
    name: "add-login",
    components: {
        MessageBox
    },
    props: {
        rid: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            roomId: "05e32454",
            wsUrl: wsUrl,
            socket: {} as WebSocket,
            user: {
                id: 'abc123',
                name: 'inoth',
                icon: 'src/assets/images/icon/001.png'
            } as LoginResp,
            message: '',
            messageList: [
                {
                    icon: "src/assets/images/icon/001.png",
                    sourceId: "abc112",
                    sourceName: "inoth1",
                    msg: "test",
                    msgType: "user"
                },
                {
                    icon: "src/assets/images/icon/001.png",
                    sourceId: "abc123",
                    sourceName: "inoth2",
                    msg: "test",
                    msgType: "user"
                }
            ] as MessageBody[]
        };
    },
    mounted() {
        let userInfo = localStorage.getItem("UserInfo")
        if (userInfo == '' || userInfo == null) {
            console.error("无效用户信息")
            return
        }
        this.user = JSON.parse(userInfo)
        this.getSocketData()
    },
    methods: {
        getSocketData() {
            // let token = localStorage.getItem('Authorization');
            // if (token === null || token === '') {
            //     console.log(`token失效: [${token}]`)
            //     return
            // }
            newSocket(this.wsUrl + this.roomId, '', this.initSocket, this.onMessage)
        },
        initSocket(ws: WebSocket) {
            if (this.socket == null) {
                this.socket = ws
            }
        },
        onMessage(msg: any) {
            console.log(msg)
            // this.messageList.push(msg)
        },
        setMessage() {
            if (!this.message) {
                return
            }
            let msg = {
                icon: this.user.icon,
                sourceId: this.user.id,
                sourceName: this.user.name,
                msg: this.message,
                msgType: 'user',
            } as MessageBody
            // this.messageList.push(msg)
            this.message = ''
            this.socket.send(JSON.stringify(msg))
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
    }
})

</script>

