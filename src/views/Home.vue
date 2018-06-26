<template>

    <div class="wrapper">

        <div class="header">

            <b-row>
                <b-col>
                    <img class="rounded-circle" v-bind:src="loginInfo.avator"  blank width="45" height="45" blank-color="#777" alt="img"  />
                </b-col>
                <b-col>
                    <b-nav pills>
                        <b-nav-item-dropdown id="nav7_ddown" text="导航" extra-toggle-classes="nav-link-custom" center>
                            <b-dropdown-item>导航一</b-dropdown-item>
                            <b-dropdown-item>导航二</b-dropdown-item>
                            <b-dropdown-item>导航三</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-nav>
                </b-col>
            </b-row>


        </div>

        <section class="section">
            <div class="content">
                <b-card no-body header="">
                    <b-card-body>
                       欢迎进入公屏聊天室，在这里你可以畅所欲言的聊天,每天都要嘤嘤嘤～
                    </b-card-body>
                    <b-list-group flush>

                        <!--<b-list-group-item href="#">Cras justo odio</b-list-group-item>-->

                        <div v-for="obj in list">

                            <b-list-group-item >
                                <b-row>
                                    <b-col>
                                        <img class="rounded-circle" v-bind:src='obj.src' width="45" height="45"  alt="img"  /> {{obj.name}} : &nbsp;&nbsp;{{obj.desc}}
                                    </b-col>

                                </b-row>


                            </b-list-group-item>
                        </div>

                    </b-list-group>
                    <b-card-body>
                        我是有底线的哦～
                    </b-card-body>

                </b-card>
                <!--<panel :list="list"></panel>-->
            </div>
        </section>

        <div class="footer">


            <b-row>
                <b-col cols="10">
                    <b-form-textarea id="textarea1"
                                         v-model.trim="text"
                                         placeholder="输入聊天内容"
                                         :rows="2"
                                         :max-rows="6"
                                        @input="inputTxt"
                    >
                    </b-form-textarea>
                </b-col>

                <b-col cols="2">
                    <div>
                        <b-button v-for="btn in buttons"  :variant="btn.variant" :key="btn.variant" @click="send">
                            发送
                        </b-button>
                        <!--<b-button  variant="secondary lg" class="sendBtn" @click="send"></b-button>-->
                    </div>
                </b-col>
            </b-row>




            <!--<group title="">-->
                <!--<x-input title="聊天内容：" class="weui-vcode" v-model="content">-->
                    <!--<x-button slot="right" type="primary" @click.native="send" mini>发送</x-button>-->
                <!--</x-input>-->
            <!--</group>-->

        </div>

    </div>
</template>


<script>

    import {  Panel,XInput, Group, XButton, Cell, CellBox,Flexbox, FlexboxItem, Divider } from 'vux'
    import SockJS from 'sockjs-client'
    import Stomp from 'webstomp-client'
    import Api from '../components/axios/api.js'
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
                list: [],
                msgList:[],
                text:'',
                buttons: [
                    { variant: 'secondary', caption: 'Toggle 1', state: true },
                ],
                loginInfo:{
                    avator:"",
                    userId:'',
                },

            }
        },
        mounted () {

            this.initLoginInfo();
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

                let _this = this;

                let content = _this.text;
                if(content.trim().length <= 0){

                    _this.$vux.alert.show({
                        content: "请输入内容",
                    })
                    return;
                }

                let contenObj = {
                    "sendId":_this.loginInfo.userId,
                    "content":content,

                };
                if (this.stompClient && this.stompClient.connected) {
                    this.stompClient.send("/chatroom",JSON.stringify(contenObj),{});
                }

                //发送消息内容清空
                _this.text = "";


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
                            name:content.nickName,
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
                            name:res[i].nickName,
                            //title:dateFormat(res[i].createDate, 'YYYY-MM-DD HH:mm:ss'),
                        };
                        msgList.push(obj);

                    }

                });

            },
            inputTxt(){
                console.log("input text");

                let _this = this;
                console.log(_this.text.length >=1);
                if(_this.text.length >= 1){
                    _this.buttons[0].variant = "success"
                }else{
                    _this.buttons[0].variant = "secondary"
                }
            },
            initLoginInfo(){
                let _this = this;
                Api.loginInfo().then(res =>{

                    _this.loginInfo = res;


                });

            }







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
    .content{
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
        width: 100%;

    }

    .flex-footer-btn{
        text-align: center;
        color: #fff;
        height: 2rem;
    }
    .rounded-circle{
        border-radius: 50%!important;
    }
    .sendBtn{
        position: fixed;
        bottom: 0.2rem;
        right: 0.2rem;
    }

</style>