import axios from "axios"
import * as util from "../../util/util"
var instance = axios.create({
    baseURL: '/chatapi',
    timeout: 5000
});

/*请求注册
instance.interceptors.request.use(function(config) {
    config = {
        ...config,
        _v: Date.now()
    }
    return config
}, function(error) {
    return Promise.reject(error);
})
*/

//响应处理
// Add a response interceptor
instance.interceptors.response.use(function(response) {


    if (response && response.data) {
        return response.data.data
    }
    let error = new Error('服务器异常，请稍后再试!')
    error.code = response.data.status
    error.data = response.data.statusText
    error.requrl = response.config.url
    throw error
}, function(error) {
    let err = new Error()
    // handle timeout
    if (error.config.method == 'get' && error.message.indexOf('timeout') == 0) {
        let retry = error.config['retry'] || 1
        if (retry >= 3) {
            err.code = 400
            err.message = '网络异常，请稍后再试!'
        } else {
            // 解决base url的问题
            error.config.url = error.config.url.replace(/\/api/g, '')
            error.config['retry'] = retry + 1
            return instance.request(error.config)
        }
    } else {
        // handle other error
        err.code = 500
        err.message = '服务器异常，请稍后再试!'
        if (error && error.response) {
            if (error.response.data) {
                let data = error.response.data
                err.code = data.code || 500
                err.message = data.message || '服务器异常，请稍后再试!'
            } else if (error.response.status !== 500) {
                err.code = 400
                err.message = '网络异常，请稍后再试!'
            }
        }
    }
    return Promise.reject(err)
})


// ----  接口定义开始-----
let defines = {
    login: (params) => {
        let url = util.format('/user/login?loginCount={loginCount}&pwd={pwd}', params)
        return instance.post(url)
    },
    register: (params) => {
        let url = util.format('/user/register?loginCount={loginCount}&pwd={pwd}&nickName={nickName}', params)
        return instance.post(url)
    },
    loginInfo: (params) => {
        return instance.get('user/loginInfo',params);
    },

    chatroomlist: (params) => {
        return instance.post('chat/chatroomlist',params);
    },


}

let apis = {}
Object.keys(defines).forEach((name) => {
    apis[name] = function(params) {
        var req = defines[name](params)
        return req;
    };
});
export default apis
