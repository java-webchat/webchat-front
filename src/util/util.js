//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};


export function format(template, args) {
    var result = template;
    var reg;
    if (typeof(args) == "object") {
        for (var key in args) {
            reg = new RegExp("({" + key + "})", "g");
            result = result.replace(reg, args[key]);
        }
    } else {
        for (var i = 0; i < args.length; i++) {
            reg = new RegExp("({[" + i + "]})", "g");
            result = result.replace(reg, arguments[i]);
        }
    }
    return result;
}

export function validateNumAndLetters(args) {

    var regu = "^[0-9a-zA-Z]{6,12}$";
    var re = new RegExp(regu);
    if (re.test(args)) {
        return true;
    }else{
        return false;
    }
    return false;

}