<!-- <style scoped>
@import url("../assets/css/normalize.min.css");

#chatboxbg {
    background-image: url("src/assets/images/bgimgs/chatbox.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 70rem;
    /* max-width: 1300px;
    min-width: 1300px; */
    min-height: 50rem;
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
            <MessageBox v-for="msg of messageList" :remote="msg.sourceId != user.Id" :name="msg.sourceName"
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import LoginResp from '../types/login';
import MessageBox from './MessageBox.vue'
import MessageBody from "../types/message";
import { wsUrl } from "../request";

const iconBeas = "src/assets/images/icon/"

var user = {} as LoginResp

const messageList = [
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

var instance: WebSocket;
var connected = false
const roomId = "05e32454"
let message = ref("")

function getSocketData() {
    let userInfo = localStorage.getItem("UserInfo")
    if (userInfo == '' || userInfo == null) {
        console.error("无效用户信息")
        return
    }
    user = JSON.parse(userInfo)
    let token = localStorage.getItem('Authorization');
    if (token === null || token === '') {
        console.log(`token失效: [${token}]`)
        return
    }
    try {
        if (connected === false) {
            var wsInstance = new WebSocket(`${wsUrl + roomId}?token=${token}`);
            wsInstance.onopen = onOpen
            wsInstance.onclose = onClose
            wsInstance.onerror = (err) => {
                console.error(err)
            }
            wsInstance.onmessage = onMessage
            instance = wsInstance;
        } else {
            instance.close(1000, 'Active closure of the user')
        }
    } catch (err) {
        console.warn(err)
    }
}

function onOpen(ev: any) {
    console.log(ev)
    connected = true
    // let msg = {
    //   icon: iconBeas + user.Icon,
    //     sourceId: user.Id,
    //     sourceName: user.Name,
    //     msg: "join to room",
    //     msgType: 'user',
    // } as MessageBody
    // instance.send(JSON.stringify(msg))
}

function onMessage(msg: MessageEvent<any>) {
    console.log("返回消息:", msg.data)
    console.log("返回消息:", typeof (msg.data))
    messageList.push(JSON.parse(msg.data))
}

function onClose(ev: any) {
    console.warn(ev)
    connected = false;
}

function setMessage() {
    if (message.value == "") {
        return
    }
    let msg: MessageBody = {
        icon: iconBeas + user.Icon,
        sourceId: user.Id,
        sourceName: user.Name,
        msg: message.value,
        msgType: 'user',
    }
    // this.messageList.push(msg)
    message.value = ''
    instance.send(JSON.stringify(msg))
    scrollToBot()
}

function scrollToBot() {
    setTimeout(() => {
        let chatbox = document.getElementById('chatbox') as HTMLElement
        if (chatbox as HTMLElement) {
            chatbox.scrollTop = chatbox.scrollHeight
        }
    }, 50);
}

onMounted(() => {
    getSocketData()
})

onUnmounted(() => {
    instance.close()
})
</script>
 -->
