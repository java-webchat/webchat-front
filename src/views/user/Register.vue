<template>
    <b-container fluid>

        <b-alert :show="dismissCountDown"
                 dismissible
                 variant="warning"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
            {{errMsg}}
        </b-alert>

        <b-form  @reset="onReset" v-if="show">

            <b-form-group id="exampleInputGroup2"
                          label="帐号:"
                          label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="输入帐号(6-14位字母或数字)">
                </b-form-input>
            </b-form-group>

            <b-form-group id="exampleInputGroup2"
                          label="昵称:"
                          label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="text"
                              v-model="form.nickName"
                              required
                              placeholder="输入昵称(你酷酷的名字哦)">
                </b-form-input>
            </b-form-group>

            <b-form-group id="exampleInputGroup2"
                          label="密码:"
                          label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="password"
                              v-model="form.pwd"
                              required
                              placeholder="输入密码(6-14位字母或数字)">
                </b-form-input>
            </b-form-group>


            <b-button @click="register" variant="primary">注册</b-button>

            <b-button type="reset" variant="danger">重置</b-button>

            <b-button @click="goLogin"  variant="link">登录</b-button>

        </b-form>
    </b-container>
</template>

<script>

    import * as util from '../../util/util'
    import Api from '../../components/axios/api'
    export default {
        data () {
            return {
                form: {
                    pwd: '',
                    name: '',
                    nickName:'',
                },
                show: true,
                dismissSecs: 5,
                dismissCountDown: 0,
                errMsg:'',
            }
        },
        methods: {
            onReset (evt) {
                evt.preventDefault();
                this.form.name = '';
                this.form.nickName = '';
                this.form.pwd = '';
                this.show = false;
                this.$nextTick(() => { this.show = true });
            },
            goLogin(){
                let  _this = this;
                _this.$router.push('/index');
            },
            register(){
                let  _this = this;
                //step1 校验
                let name = _this.form.name;
                let pwd = _this.form.pwd;
                let nickName = _this.form.nickName;

                if(!util.validateNumAndLetters(name)){

                    _this.$vux.alert.show({
                        content: "请输入正确的帐号",
                    })
                    return;
                }
                if(!util.validateNumAndLetters(pwd)){
                    _this.$vux.alert.show({
                        content: "请输入正确的密码",
                    })
                    return;
                }
                console.log(nickName)
                if(nickName.trim().length <= 0){
                    _this.$vux.alert.show({
                        content: "请输入正确的昵称",
                    })
                    return;
                }
                //step2 注册
                Api.register({
                    loginCount: name,
                    pwd: pwd,
                    nickName:nickName,
                }).then(res =>{

                    if(!res.status){
                        _this.$vux.alert.show({
                            content: res.msg,
                        })
                    }else{
                        _this.$vux.alert.show({
                            content: res.msg,
                        });
                        _this.$router.push('/index');
                    }

                });

            },
            countDownChanged (dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
        }
    }
</script>