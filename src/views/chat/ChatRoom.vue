<template>

    <div class="wrapper">

        <div class="header">

            <flexbox>
                <flexbox-item><div class="flex-footer-btn" @click="home">首页</div></flexbox-item>
            </flexbox>

        </div>

        <section class="section">
            <div>
                <panel :list="list"></panel>
            </div>
        </section>

        <div class="footer">
            <group title="">
                <x-input title="聊天内容：" class="weui-vcode" v-model="content">
                    <x-button slot="right" type="primary" @click.native="send" mini>发送</x-button>
                </x-input>
            </group>

        </div>

    </div>
</template>


<script>

    import {  Panel,XInput, Group, XButton, Cell, CellBox,Flexbox, FlexboxItem, Divider } from 'vux'
    import SockJS from 'sockjs-client'
    import Stomp from 'webstomp-client'
    import Api from '../../components/axios/api.js'
    import { dateFormat } from 'vux'
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
            Panel
        },
        data(){
            return{
                content:'',
                list: [],
                msgList:[],

            }
        },
        mounted () {
            this.initData();
            this.connect()
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
            },

            send(){

                var contenObj = {
                    "sendId":1,
                    "content":this.content,
                };

                //_this.list.push(contenObj);
                if (this.stompClient && this.stompClient.connected) {
                    this.stompClient.send("/chatroom",JSON.stringify(contenObj),{});
                }


            },

            connect () {
                this.socket = new SockJS('/chatapi/ws/endpointChat');
                this.stompClient = Stomp.over(this.socket);

                var msgList = this.list;
                //连接
                this.stompClient.connect({}, (frame) => {

                    //接收消息
                    this.stompClient.subscribe('/topic/chatroom/', function (msg) {

                        let content = JSON.parse(msg.body);
                        var appendObj = {
                            src:content.sendAvatar,
                            desc:content.content,
                            //title:dateFormat(content.createDate, 'YYYY-MM-DD HH:mm:ss'),
                        };
                        msgList.push(appendObj);

                    });



                }, (error) => {
                    console.log(error)
                })
            },
            //初始化数据
            initData(){

                var msgList = this.list;
                Api.chatroomlist().then(res =>{

                   for(let i =0;i<res.length;i++){
                       let obj = {
                           src:res[i].sendAvatar,
                           desc:res[i].content,
                           //title:dateFormat(res[i].createDate, 'YYYY-MM-DD HH:mm:ss'),
                       };
                       msgList.push(obj);

                    }

                });

            },







        },

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
        position: fixed;
        bottom: 2rem;
        text-align: center;
        height: 2rem;

    }

    .flex-footer-btn{
        text-align: center;
        color: #fff;
        height: 2rem;
    }

</style>