<style scoped>
#chatbox {
    background: #cc0000;
    width: 500px;
    /* height: 500px; */
    max-width: 100%;
    max-height: 100%;
}
</style>

<template>
    <div id="chatbox">
        <!-- <MessageBox name="inoth" message="12312312" remote />
        <MessageBox name="inoth" message="3213213" />
        <MessageBox name="inoth" message="0192732" remote /> -->
        <MessageBox v-for="msg of messageList" :remote="msg.sourceId != user.id" :name="msg.sourceName"
            :icon="msg.icon" :message="msg.msg" />
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
                    icon: "src/assets/images/1660538997007.jpg",
                    sourceId: "abc112",
                    sourceName: "inoth1",
                    msg: "test",
                },
                {
                    icon: "src/assets/images/1660535970309.png",
                    sourceId: "abc123",
                    sourceName: "inoth2",
                    msg: "test",
                },
                {
                    icon: "src/assets/images/1660535994384.jpg",
                    sourceId: "abc113",
                    sourceName: "inoth3",
                    msg: "wangbro，到底应该如何实现。 既然如此， wangbro，到底应该如何实现。 现在，解决wangbro的问题，是非常非常重要的。 所以， 罗曼·罗兰曾经说过，只有把抱怨环境的心情，化为上进的力量，才是成功的保证。这句话把我们带到了一个新的维度去思考这个问题: 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 一般来说。",
                },
                {
                    icon: "src/assets/images/1660536014391.jpg",
                    sourceId: "abc143",
                    sourceName: "inoth4",
                    msg: "那么， 经过上述讨论， 经过上述讨论， 问题的关键究竟为何？ 这样看来， 塞涅卡曾经提到过，真正的人生，只有在经过艰难卓绝的斗争之后才能实现。",
                },
                {
                    icon: "src/assets/images/images.jpeg",
                    sourceId: "abc114",
                    sourceName: "inoth5",
                    msg: "既然如此， 了解清楚机器人到底是一种怎么样的存在，是解决一切问题的关键。 要想清楚，机器人，到底是一种怎么样的存在。 对我个人而言，机器人不仅仅是一个重大的事件，还可能会改变我的人生。 富兰克林在不经意间这样说过，读书是易事，思索是难事，但两者缺一，便全无用处。我希望诸位也能好好地体会这句话。",
                },
                {
                    icon: "src/assets/images/1660535970309.png",
                    sourceId: "abc123",
                    sourceName: "inoth3",
                    msg: "打工因何而发生？ 米歇潘在不经意间这样说过，生命是一条艰险的峡谷，只有勇敢的人才能通过。这句话看似简单，但其中的阴郁不禁让人深思。",
                }
            ] as MessageBody[]
        };
    },
    methods: {
        setMessage() {
            let msg = {
                icon: "src/assets/images/cbimage.png",
                sourceId: this.user.id,
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

