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
import MessageBox from './MessageBox.vue'
import MessageBody from "../types/message";

export default defineComponent({
    name: "add-login",
    components: {
        MessageBox
    },
    data() {
        return {
            message: '',
            messageList: [
                {
                    icon: 'string',
                    sourceId: 'string',
                    sourceName: 'string',
                    msgType: 'string',
                    msg: 'string',
                },
                {
                    icon: 'string',
                    sourceId: 'string',
                    sourceName: 'string',
                    msgType: 'string',
                    msg: 'string',
                }
            ] as MessageBody[]
        };
    },
    methods: {},
    watch: {}
})

</script>

