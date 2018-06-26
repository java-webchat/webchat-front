<template>

    <div class="wrapper">

        <div class="header">

            <flexbox>
                <flexbox-item><div class="flex-footer-btn" @click="home">首页</div></flexbox-item>
            </flexbox>

        </div>

        <section class="section">
            <div>
               Robot
            </div>
        </section>

        <div class="footer">

            <group title="">
                <x-input title="聊天内容：" class="weui-vcode">
                    <x-button slot="right" type="primary" mini>发送</x-button>
                </x-input>
            </group>

        </div>

    </div>
</template>


<script>
    import {  XInput, Group, XButton, Cell, CellBox,Flexbox, FlexboxItem, Divider  } from 'vux'

    export default {
        components: {
            Flexbox,
            FlexboxItem,
            Divider,
            Group,
            Cell,
            CellBox,
            XInput,
            XButton,
        },
        methods: {

            home(){
                let _this = this;
                _this.$router.push('/home');
            },
            chatGroup () {
                let _this = this;
                _this.$router.push('/chatroom');
            },
            robot(){
                let _this = this;
                _this.$router.push('/robot');
            },
            goChatRoom(){
                let _this = this;
                _this.$router.push('/chatroom');


            }



        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/1px.less';
    html,body,#app{
        width:100%;
        height:100%;
    }

    .wrapper{
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        height: 100%;
    }
    .header {
        text-align: center;
        color: #fff;
        height: 3rem;
        line-height: 3rem;
    }

    .section{
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display:-webkit-flex ;
        width: 100%;

    }

    .flex-demo{

        text-align: center;
        color: #fff;
        border-radius: 4px;
        background-clip: padding-box;
    }

    .footer{
        text-align: center;
        height: 2rem;

    }

    .flex-footer-btn{
        text-align: center;
        color: #fff;
        height: 2rem;
    }

</style>