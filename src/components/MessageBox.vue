<style scoped>
@import url("../assets/css/normalize.min.css");

.flipX {
    transform: scaleX(-1);
    transform-origin: center;
}

#ChatBox {
    width: 100%;
    /* height: 100px; */
    font-size: 14px;
    fill: #fff;
}

.UserName {
    font-size: 12px;
}
</style>
<template>
    <div id="ChatBox">
        <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 500 ${viewBoxHeight}`">

            <text ref="hackText" visibility="hidden" :style="{ fontSize: fontSize + 'px' }">{{ hackText }}</text>

            <!-- Buddy Avatar -->
            <polygon v-if="remote" points="-10,-5 62,5 70,55 5,63"
                :transform="`translate(30,${containerHeight / 2 + messageBox.origin.y - 25})`" style="fill: black" />

            <polygon v-if="remote" points="0,0 60,10 70,50 10,60"
                :transform="`translate(30,${containerHeight / 2 + messageBox.origin.y - 25})`" style="fill: white" />

            <clipPath id="avatarClipPath">
                <polygon points="2,-10 62,-10 100,42 10,58" />
            </clipPath>

            <image clip-path="url(#avatarClipPath)" v-if="remote" x="-10" y="-10" :xlink:href="icon"
                :transform="`translate(30,${containerHeight / 2 + messageBox.origin.y - 25})`" width="80px" />
            <text v-if="remote" :transform="`translate(33,${containerHeight / 2 + messageBox.origin.y + 50})`"
                style="font-size: 12px;fill: #fff;">
                <tspan>{{ name }}</tspan>
            </text>
            <!-- Message Text Container Border -->
            <polygon :points="containerBorderPoints" :style="{ fill: primaryColor }" :class="{ flipX: !remote }" />

            <!-- Message Text Container Tail Border -->
            <polygon :points="containerTailBorderPoints" :style="{ fill: primaryColor }" :class="{ flipX: !remote }" />

            <!-- Message Text Container Tail -->
            <polygon :points="containerTailPoints" :style="{ fill: secondaryColor }" :class="{ flipX: !remote }" />

            <!-- Message Text Container -->
            <polygon :points="containerPoints" :style="{ fill: secondaryColor }" :class="{ flipX: !remote }" />

            <!-- Message Text -->
            <text :y="textOffset.y" :width="messageBox.centerWidth" :style="{ fontSize: fontSize + 'px' }">
                <tspan v-for="line of wrappedMessage()"
                    :x="remote ? messageBox.origin.x + textOffset.x : 500 - messageBox.origin.x - messageBox.centerWidth"
                    :dy="`${lineHeight}em`" :style="{ fill: primaryColor }">
                    {{ line.text }}
                </tspan>
            </text>
        </svg>
    </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { propsToAttrMap } from "@vue/shared";
import { defineComponent } from "vue";
import { MsgBox } from "../types/message";

export default defineComponent({
    name: "messageBox",
    props: {
        icon: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true
        },
        remote: {
            // Does the message originate
            // from a remote source?
            type: Boolean,
            default: false
        },
        fontSize: {
            type: Number,
            default: 14
        },
        lineHeight: {
            type: Number,
            default: 1.5 // em
        }
    },
    data() {
        return {
            // BoxHeight: 0 as number,
            enfontSize: .5,
            cnfontSize: 1.1,
            hackText: '' as string,
        };
    },
    computed: {
        // ------------------------------------------
        //         Message Box (remote: true)
        // ------------------------------------------
        //
        //   origin                            x - right width
        //       \ [ ---- center width ---- ]  |
        //         x----------------------- x --- x
        //       / |     <message text>     |   /
        //     /   |                        | /
        //   x --- x ---------------------- x
        //      |
        //      + - left width
        //
        messageBox() {
            return {
                origin: {
                    x: this.remote ? 130 : 60,
                    y: 20
                },
                centerWidth: 300,
                leftWidth: 10,
                rightWidth: 20,
                slantHeight: 5,
                border: {
                    normal: 4,
                    left: 15,
                    right: 35
                }
            };
        },
        textOffset() {
            return {
                // Left padding.
                x: 15,
                // Adjust for top/bottom padding.
                y: this.messageBox.origin.y + this.fontSize * this.lineHeight / 4
            };

        },
        containerPoints() {
            return [
                {
                    x: this.messageBox.origin.x,
                    y: this.messageBox.origin.y
                },
                {
                    x: this.messageBox.origin.x + this.messageBox.centerWidth + this.messageBox.rightWidth,
                    y: this.messageBox.origin.y
                },
                {
                    x: this.messageBox.origin.x + this.messageBox.centerWidth,
                    y: this.messageBox.origin.y + this.containerHeight + this.messageBox.slantHeight
                },
                {
                    x: this.messageBox.origin.x - this.messageBox.leftWidth,
                    y: this.messageBox.origin.y + this.containerHeight
                }].map(p => `${p.x},${p.y}`).join(' ');
        },
        containerBorderPoints() {
            return [
                {
                    x: this.messageBox.origin.x - this.messageBox.border.normal,
                    y: this.messageBox.origin.y - this.messageBox.border.normal
                },
                {
                    x: this.messageBox.origin.x + this.messageBox.centerWidth + this.messageBox.border.right,
                    y: this.messageBox.origin.y - this.messageBox.border.normal
                },
                {
                    x: this.messageBox.origin.x + this.messageBox.centerWidth + this.messageBox.border.normal,
                    y: this.messageBox.origin.y + this.containerHeight + this.messageBox.border.normal + this.messageBox.slantHeight
                },
                {
                    x: this.messageBox.origin.x - this.messageBox.border.left,
                    y: this.messageBox.origin.y + this.containerHeight + this.messageBox.border.normal
                }].map(p => `${p.x},${p.y}`).join(' ');
        },
        containerTailPoints() {
            return [
                {
                    x: this.messageBox.origin.x - 33,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 8
                },
                {
                    x: this.messageBox.origin.x - 17,
                    y: this.messageBox.origin.y + this.containerHeight / 2 - 10
                },
                {
                    x: this.messageBox.origin.x - 12,
                    y: this.messageBox.origin.y + this.containerHeight / 2 - 4
                },
                {
                    x: this.messageBox.origin.x,
                    y: this.messageBox.origin.y + this.containerHeight / 2 - 10
                },
                {
                    x: this.messageBox.origin.x,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 5
                },
                {
                    x: this.messageBox.origin.x - 18,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 10
                },

                {
                    x: this.messageBox.origin.x - 22,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 5
                }].map(p => `${p.x},${p.y}`).join(' ');
        },
        containerTailBorderPoints() {
            return [
                {
                    x: this.messageBox.origin.x - 40,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 12
                },
                {
                    x: this.messageBox.origin.x - 15,
                    y: this.messageBox.origin.y + this.containerHeight / 2 - 16
                },
                {
                    x: this.messageBox.origin.x - 12,
                    y: this.messageBox.origin.y + this.containerHeight / 2 - 10
                },
                {
                    x: this.messageBox.origin.x,
                    y: this.messageBox.origin.y + this.containerHeight / 2 - 15
                },
                {
                    x: this.messageBox.origin.x,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 10
                },
                {
                    x: this.messageBox.origin.x - 20,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 15
                },
                {
                    x: this.messageBox.origin.x - 24,
                    y: this.messageBox.origin.y + this.containerHeight / 2 + 10
                }].map(p => `${p.x},${p.y}`).join(' ');
        },
        containerHeight() {
            // Compute how much vertical space the message text takes up by
            // multiplying the line height by the number of lines in the message.
            let height = this.fontSize * this.lineHeight * this.wrappedMessage().length;
            // let height = this.fontSize * this.lineHeight * this.wrappedMessage;
            // Now, we need to add some extra bottom padding otherwise the
            // descenders (the part of the characters beneath the baseline)
            // will get clipped. I don't know the exact height of the descender,
            // but I figure that 1/2 em should be fine. And then we'll add another
            // 1/4 em for top and bottom paddings (1/2 em in total).
            //
            //   ---
            //    |   top padding (1/4 em)
            //   ---
            //    |   text height (line height * # of lines)
            //   ---
            //    |   descender padding (1/2 em)
            //   ---
            // .  |   slanted bottom edge (this.messageBox.slantHeight)
            //   ---
            //    |   bottom padding (1/4 em)
            //   ---
            //
            return height + this.fontSize * this.lineHeight;
        },
        viewBoxHeight() {
            //
            //   ---
            //    |   border width
            //   ---
            //    |   container height
            //   ---
            //    |   border width
            //   ---
            //
            let boxHeight = this.containerHeight + this.messageBox.origin.y * 2 + 10;
            this.$emit('msgBoxHight', boxHeight)
            return boxHeight
        },
        primaryColor() {
            return this.remote ? 'white' : 'black';
        },
        secondaryColor() {
            return this.remote ? 'black' : 'white';
        }
    },
    methods: {
        CheckWitdh(item: string) {
            const regex = /\w+/gm;
            if (regex.exec(item) != null) {
                return this.enfontSize
            }
            return this.cnfontSize
        },
        SingleLineWidth(item: string): number {
            const pt = /\w/gm;
            let m = item.match(pt)
            if (m) {
                return m?.length
            } else {
                return 0
            }
        },
        wrappedMessage(): MsgBox[] {
            // Kind of a hacky way of implementing word wrapping
            // on SVG <text> elements. Not quite sure how to go
            // about determining the bounding box of some text,
            // without actually rendering it on the DOM.
            let lines: MsgBox[] = []
            if (this.message.length > 0) {
                this.hackText = this.message
                let enLen = this.SingleLineWidth(this.message)
                let en = enLen * this.enfontSize
                let cn = (this.message.length - enLen) * this.cnfontSize
                let allWidth = (en + cn) * this.fontSize
                if (allWidth > this.messageBox.centerWidth) {
                    // let lineHeight = Math.ceil(allWidth / this.messageBox.centerWidth)
                    let line = [];
                    let tmp_width = 0;
                    for (let index = 0; index < this.message.length; index++) {
                        let item = this.message[index];
                        line.push(item)
                        tmp_width += this.CheckWitdh(item)
                        if (Math.ceil(tmp_width * this.fontSize) > this.messageBox.centerWidth) {
                            lines.push({ text: line.join('') })
                            line = [];
                            tmp_width = 0;
                        }
                    }
                    lines.push({ text: line.join('') })
                    return lines
                } else {
                    this.messageBox.centerWidth = allWidth + this.textOffset.x * 2;
                    lines.push({ text: this.message })
                    return lines
                }
            } else {
                return lines
            }
        },
    },
})
</script>

