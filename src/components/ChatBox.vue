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
        <!-- <MessageBox name="inoth" message="12312312" remote />
        <MessageBox name="inoth" message="3213213" />
        <MessageBox name="inoth" message="0192732" remote /> -->
        <MessageBox v-for="msg of messageList" :remote="msg.sourceId != currentUser" :name="msg.sourceName"
            :message="msg.msg" />
    </div>
    <div>
        <input type="text" v-model="message">
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginResp from '../types/login';
import MessageBox from './MessageBox.vue'
import MessageBody from "../types/message";

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
            currentUser: 'abc123',
            message: '',
            messageList: [
                {
                    sourceId: "abc112",
                    sourceName: "inoth1",
                    msg: "test",
                },
                {
                    sourceId: "abc123",
                    sourceName: "inoth2",
                    msg: "test",
                },
                {
                    sourceId: "abc113",
                    sourceName: "inoth3",
                    msg: "wangbro，到底应该如何实现。 既然如此， wangbro，到底应该如何实现。 现在，解决wangbro的问题，是非常非常重要的。 所以， 罗曼·罗兰曾经说过，只有把抱怨环境的心情，化为上进的力量，才是成功的保证。这句话把我们带到了一个新的维度去思考这个问题: 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 一般来说。",
                }
            ] as MessageBody[]
        };
    },
    methods: {},
    watch: {}
})

</script>

