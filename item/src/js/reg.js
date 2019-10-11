let username = document.getElementById('username');
let password = document.getElementById('password');
let password1 = document.getElementById('password1');
let userTip = document.getElementById('userTip');
let pswTip = document.getElementById('pswTip');
let psw1Tip = document.getElementById('psw1Tip');
let readtk = document.getElementById('readtk');
let regsubmit = document.getElementById('regsubmit');
let cha = document.getElementById('reg-cha');
let btn = document.getElementById('reg-btn');
let mask = document.getElementById('reg-mask');
let tc = document.getElementById('reg-tc');
let regtime = document.getElementById('reg-time');
var num = 5;
//用户名验证
username.onfocus = () => {
    username.style.border = '1px solid rgb(255, 173, 119)';
    username.style.boxShadow = '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)';
    userTip.innerHTML = '请输入手机号或邮箱';
    userTip.style.color = '#666';
}
username.onblur = () => {
    if (username.value.trim()) {
        if (checkReg.email(username.value) || checkReg.tel(username.value)) {
            ajax({
                type: 'post',
                url: '../api/checkname.php',
                data: {
                    name: username.value
                },
                success: str => {
                    // console.log(str);
                    if (str == 'yes') {
                        username.style.border = '1px solid #dedede';
                        username.style.boxShadow = '';
                        userTip.style.color = 'green';
                        userTip.innerHTML = '该用户名可以使用';
                    } else {
                        username.style.border = '1px solid red';
                        userTip.style.color = 'red';
                        userTip.innerHTML = '该用户名已被注册';
                        username.style.boxShadow = '';
                    }
                }
            });
        } else {
            username.style.border = '1px solid red';
            userTip.style.color = 'red';
            userTip.innerHTML = '用户名不符合规范';
            username.style.boxShadow = '';
        }
    } else {
        username.style.border = '1px solid red';
        userTip.style.color = 'red';
        userTip.innerHTML = '请输入正确的手机号或者邮箱';
        username.style.boxShadow = '';
    }
    regSubmit();
}
//密码验证
password.onfocus = () => {
    password.style.border = '1px solid rgb(255, 173, 119)';
    password.style.boxShadow = '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)';
    pswTip.style.color = '#666';
    pswTip.innerHTML = '密码长度为6-25位';
}
password.onblur = () => {
    if (password.value.trim()) {
        if (password.value.length >= 6 && password.value.length <= 25) {
            password.style.border = '1px solid #dedede';
            password.style.boxShadow = '';
            pswTip.style.color = 'green';
            pswTip.innerHTML = '√';
        } else {
            password.style.border = '1px solid red';
            pswTip.style.color = 'red';
            pswTip.innerHTML = '密码的长度只能在6-25位之间！';
            password.style.boxShadow = '';
        }
    } else {
        password.style.border = '1px solid red';
        pswTip.style.color = 'red';
        pswTip.innerHTML = '请输入密码！';
        password.style.boxShadow = '';
    }
    regSubmit();
}
//确认密码验证
password1.onfocus = () => {
    password1.style.border = '1px solid rgb(255, 173, 119)';
    password1.style.boxShadow = '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)';
    psw1Tip.style.color = '#666';
    psw1Tip.innerHTML = '请再输入一次密码';
}
password1.onblur = () => {
    if (password1.value.trim()) {
        if (password.value == password1.value) {
            password1.style.border = '1px solid #dedede';
            password1.style.boxShadow = '';
            psw1Tip.style.color = 'green';
            psw1Tip.innerHTML = '√';
        } else {
            password1.style.border = '1px solid red';
            psw1Tip.style.color = 'red';
            psw1Tip.innerHTML = '两次密码输入不一致，请重新输入';
            password1.style.boxShadow = '';
        }
    } else {
        password1.style.border = '1px solid red';
        psw1Tip.style.color = 'red';
        psw1Tip.innerHTML = '请再次确认密码！';
        password1.style.boxShadow = '';
    }
    regSubmit();
}
//阅读条款验证
readtk.onclick = () => {
    regSubmit();
}
//立即注册按钮验证
function regSubmit() {
    if (userTip.innerHTML == '该用户名可以使用' && psw1Tip.innerHTML == '√' && pswTip.innerHTML == '√' && readtk.checked) {
        regsubmit.style.backgroundColor = '#f19108';
        regsubmit.style.cursor = 'pointer';
        regsubmit.onclick = () => {
            ajax({
                type: 'post',
                url: '../api/reg.php',
                data: {
                    name: username.value,
                    password: password.value
                },
                success: str => {
                    // console.log(str);
                    if (str == 'yes') {
                        mask.style.display = 'block';
                        tc.style.display = 'flex';
                        let timer = setInterval(() => {
                            num--;
                            regtime.innerHTML = num;
                            if (num == 0) {
                                clearInterval(timer);
                                location.href = 'log.html?username=' + username.value;
                            }
                        }, 1000);
                        //弹窗
                        cha.onclick = () => {
                            clearInterval(timer);
                            mask.style.display = 'none';
                            tc.style.display = 'none';
                        }
                        btn.onclick = () => {
                            location.href = 'log.html?username=' + username.value;
                        }
                        mask.onclick = () => {
                            clearInterval(timer);
                            mask.style.display = 'none';
                            tc.style.display = 'none';
                        }
                    }
                }
            })
        }
    } else {
        regsubmit.style.backgroundColor = '#999';
        regsubmit.style.cursor = 'no-drop';
    }
}