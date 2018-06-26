<template>
    <b-container fluid>

        <b-form  @reset="onReset">

            <b-form-group id="exampleInputGroup2"
                          label="帐号:"
                          label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="输入登录帐号(6-14位字母或数字)">
                </b-form-input>
            </b-form-group>

            <b-form-group id="exampleInputGroup2"
                          label="密码:"
                          label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="password"
                              v-model="form.pwd"
                              required
                              placeholder="输入密码(6-16位字母或数字)">
                </b-form-input>
            </b-form-group>


            <b-button @click="login" variant="primary">登录</b-button>

            <b-button type="reset" variant="danger">重置</b-button>

            <b-button @click="goRegister" variant="link">注册</b-button>

        </b-form>
    </b-container>
</template>

<script>

    import * as util from '../util/util'
    import Api from '../components/axios/api'
    export default {
        data () {
            return {
                form: {
                    pwd: '',
                    name: '',
                },
                show: true
            }
        },
        methods: {
            onReset (evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.pwd = '';
                this.form.name = '';
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => { this.show = true });
            },
            goRegister(){
                let  _this = this;
                _this.$router.push('/register');
            },
            login(){

                let  _this = this;
                //step1 校验
                let name = _this.form.name;
                let pwd = _this.form.pwd;

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
                //step2 登录
                Api.login({
                    loginCount: name,
                    pwd: pwd
                }).then(res =>{

                    if(!res.status){
                        _this.$vux.alert.show({
                            content: res.msg,
                        })
                    }else{

                        //写cookie
                        _this.$vux.alert.show({
                            content: res.msg,
                        });
                        util.setCookie("ACCESS_TOKEN",res.access_token,1);
                        _this.$router.push('/home');
                    }

                });


            }
        }
    }
</script>