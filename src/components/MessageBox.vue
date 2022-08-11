<style scoped>
@import url("../assets/css/normalize.min.css");

.flipX {
    transform: scaleX(-1);
    transform-origin: center;
}

#ChatBox {
    width: 100%;
    height: 100px;
    font-size: 14px;
    fill: #fff;
}

.UserName {
    font-size: 12px;
}

</style>
<template>
    <div id="ChatBox">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 90" style="opacity: 1;">
            <text visibility="hidden">Hello world!</text>
            <polygon points="-10,-5 62,5 70,55 5,63" transform="translate(30,16)" style="fill: black;"></polygon>
            <polygon points="0,0 60,10 70,50 10,60" transform="translate(30,16)" style="fill: white;"></polygon>
            <clipPath id="avatarClipPath">
                <polygon points="2,-10 62,-10 100,42 10,58"></polygon>
            </clipPath>
            <image clip-path="url(#avatarClipPath)" x="-10" y="-10" xlink:href="../assets/images/cbimage.png"
                transform="translate(30,16)" width="80px"></image>
            <text y="90" x="35" class="UserName">
                <tspan>{{ name }}</tspan>
            </text>
            <polygon points="126,16 266,16 235,71 115,66" class="" style="fill: white;"></polygon>
            <polygon points="90,53 115,25 118,31 130,26 130,51 110,56 106,51" class="" style="fill: white;"></polygon>
            <polygon points="97,49 113,31 118,37 130,31 130,46 112,51 108,46" class="" style="fill: black;"></polygon>
            <polygon points="130,20 251,20 231,67 120,62" class="" style="fill: black;"></polygon>
            <text y="25.25">
                <tspan x="145" dy="1.5em">
                    {{ msg }}
                </tspan>
            </text>
        </svg>
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

defineProps<{ name: string, msg: string, remote: boolean }>()

// export default defineComponent({
//     name: "messageBox",
//     props: { name: string, msg: string, remote: boolean }
// })

</script>

