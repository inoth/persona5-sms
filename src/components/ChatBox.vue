<style scoped>
@import url("../assets/css/normalize.min.css");

#mainbox{
    background-image: url("/images/bgimgs/persona5.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

#chatboxbg {
    background-image: url("/images/bgimgs/chatbox.png");
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
    <div id="mainbox">
        <div id="chatboxbg">
            <div id="chatbox">
                <MessageBox v-for="msg of messageList" :remote="msg.sourceId != user.id" :name="msg.sourceName"
                    :icon="msg.sourceIcon" :message="msg.msgBody" />
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginResp from '../types/login';
import MessageBox from './MessageBox.vue'
import { MessageBody } from "../types/message";
import { wsUrl } from "../request";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "add-login",
    components: {
        MessageBox
    },
    data() {
        return {
            iconBeas: "./icon/",
            router: useRouter(),
            roomId: "05e32454",
            connected: false,
            wsUrl: wsUrl,
            instance: {} as WebSocket,
            user: {} as LoginResp,
            message: '',
            messageList: [] as MessageBody[]
        };
    },
    unmounted() {
        this.instance.close()
    },
    mounted() {
        let userInfo = localStorage.getItem("UserInfo")
        if (userInfo == '' || userInfo == null) {
            console.error("无效用户信息")
            return
        }
        this.user = JSON.parse(userInfo)
        console.log(this.user)
        this.getSocketData()
    },
    methods: {
        getSocketData() {
            let token = localStorage.getItem('Authorization');
            if (token === null || token === '') {
                console.log(`token失效: [${token}]`)
                return
            }
            // this.socket = new WebSocket(this.wsUrl + this.roomId, token);
            // this.socket.onopen = this.onOpen
            // this.socket.onmessage = this.onMessage
            // this.socket.onclose = this.onClose
            // this.socket.onerror = function (err) {
            //     console.error('Socket 发生了错误,请刷新页面');
            // };
            try {
                if (this.connected === false) {
                    var wsInstance = new WebSocket(`${wsUrl + this.roomId}?token=${token}`);
                    wsInstance.onopen = this.onOpen

                    wsInstance.onclose = this.onClose

                    wsInstance.onerror = (err) => {
                        console.error(err)
                    }
                    wsInstance.onmessage = this.onMessage
                    console.log("ws对象：", wsInstance)
                    this.instance = wsInstance;
                } else {
                    this.instance.close(0, 'Active closure of the user')
                }
            } catch (err) {
                console.warn(err)
            }
        },
        onOpen(ev: any) {
            console.warn(ev)
            this.connected = true
            // let msg = {
            //    sourceIcon: this.iconBeas + this.user.Icon,
            //     sourceId: this.user.Id,
            //     sourceName: this.user.Name,
            //     msgBody: this.message,
            //     msgType: 'user',
            // } as MessageBody
            // this.instance.send(JSON.stringify(msg))
        },
        onClose(ev: any) {
            console.warn(ev)
            this.connected = false;
            this.router.push("/")
        },
        onMessage(msg: MessageEvent<any>) {
            console.log("服务返回消息:", msg.data)
            let msgBody = JSON.parse(msg.data) as MessageBody
            if (msgBody.msgType == "system") {
                msgBody.sourceIcon = "./icon/system.png"
            }
            this.messageList.push(msgBody)
            this.scrollToBot()
        },
        setMessage() {
            if (!this.message) {
                return
            }
            if (!this.connected) {
                console.log("连接已断开");
                this.router.push("/")
                return
            }
            let msg = {
                sourceIcon: this.iconBeas + this.user.icon,
                sourceId: this.user.id,
                sourceName: this.user.name,
                msgBody: this.message,
                msgType: 'user',
            } as MessageBody
            // this.messageList.push(msg)
            this.message = ''
            this.instance.send(JSON.stringify(msg))
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

