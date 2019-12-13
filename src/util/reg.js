//注册用户名
var usernameReg = /^[a-zA-Z]\w{4,8}/
//注册密码
var passwordReg = /[a-zA-Z0-9]{6,15}/
//注册手机
var telReg = /^1[35789]\d{9}$/
//数字
var  numReg = /^\d+$/


export default {
    usernameReg,
    passwordReg,
    telReg,
    numReg
}