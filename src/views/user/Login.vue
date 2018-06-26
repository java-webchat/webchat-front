<template>
    <div>

        <divider>登录</divider>
        <x-input title="账户" name="loginCount" placeholder="请输入帐号" v-model="loginCount" required ></x-input>

        <x-input title="密码" name="pwd" type="password" placeholder="请输入密码(6-14位)" required v-model="pwd" :min="6" :max="14" @on-change="change"></x-input>

        <flexbox>
            <flexbox-item>
                <x-button type="primary"  @click.native="register" >注册</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button type="primary" @click.native="login" >登录</x-button>
            </flexbox-item>
        </flexbox>

        <divider>我是有底线的</divider>
    </div>
</template>

<script>
    import { Flexbox,FlexboxItem,Divider,XInput, Group, XButton, Cell } from 'vux'
    import Api from '../../components/axios/api.js'

    export default {
        components: {
            XInput,
            XButton,
            Group,
            Cell,
            Divider,
            FlexboxItem,
            Flexbox
        },
        data () {
            return {
                loginCount:'',
                pwd:'',
            }
        },
        methods: {

            change (val) {
                console.log('on change', val)
            },
            login(){
                let  _this = this;



                Api.login({
                    loginCount: _this.loginCount,
                    pwd: _this.pwd
                }).then(res =>{

                    if(!res.status){
                        _this.$vux.alert.show({
                            content: res.msg,
                        })
                    }else{

                        _this.$router.push('/home');
                    }

                });

            },
            register(){
                let  _this = this;
                _this.$router.push('/register');
            },


        }
    }
</script>
<style scoped>
    .red {
        color: red;
    }
    .green {
        color: green;
    }
</style>