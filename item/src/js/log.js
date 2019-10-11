    //二维码变小
    let ewmbox = document.querySelector('#ewmbox .ewmbox1');
    ewmbox.onmouseover = () => {
        ewmbox.children[0].style = 'left:-70px;width:136px';
        ewmbox.children[1].style.opacity = 1;
    }
    ewmbox.onmouseout = () => {
        ewmbox.children[0].style = 'left:0px;width:192px';
        ewmbox.children[1].style.opacity = 0;
    }
    //选项卡-登录方式
    let dlType = document.getElementsByClassName('login-type')[0];
    let dlCont = document.getElementsByClassName('login-inf')[0];
    for (let i = 0; i < dlType.children.length; i++) {
        dlType.children[i].onclick = () => {
            for (let j = 0; j < dlType.children.length; j++) {
                dlType.children[j].className = '';
                dlCont.children[j + 1].style.display = 'none';
            }
            dlType.children[i].className = 'active';
            dlCont.children[i + 1].style.display = 'block';
        }
    }
    //密码登录界面
    let username = document.getElementsByClassName('log-uname')[0];
    let password = document.getElementsByClassName('log-psw')[0];
    let checkCode = document.getElementById('checkCode');
    let zhanghao = document.getElementById('username');
    let mima = document.getElementById('password');
    let errorts = document.getElementsByClassName('errorts')[0];
    let remenberBtn = document.getElementById('remenberBtn');
    var str1 = decodeURI(location.search).slice(1).split('=')[1];
    if (str1) {
        username.children[1].value = str1;
    }
    if (username.children[1].value) {
        username.children[0].style.display = 'none';
    }
    username.onclick = ev => {
        username.children[0].style.display = 'none';
        username.children[1].focus();
        username.children[1].style.border = '1px solid rgb(255, 173, 119)';
        username.children[1].style.boxShadow = '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)';
        username.children[2].style.color = '#f19108';
        ev.stopPropagation();
    }
    username.children[1].onblur = () => {
        if (username.children[1].value) {
            username.children[1].style.border = '1px solid rgb(222, 222, 222)';
            username.children[1].style.boxShadow = '';
            username.children[2].style.color = '#ccc';
        } else {
            username.children[0].style.display = 'inline-block';
            username.children[1].style.border = '1px solid rgb(222, 222, 222)';
            username.children[1].style.boxShadow = '';
            username.children[2].style.color = '#ccc';
        }

    }
    password.onclick = ev => {
        password.children[0].style.display = 'none';
        password.children[1].focus();
        password.children[1].style.border = '1px solid rgb(255, 173, 119)';
        password.children[1].style.boxShadow = '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)';
        password.children[2].style.color = '#f19108';
        ev.stopPropagation();
    }
    password.children[1].onblur = () => {
        if (password.children[1].value) {
            password.children[1].style.border = '1px solid rgb(222, 222, 222)';
            password.children[1].style.boxShadow = '';
            password.children[2].style.color = '#ccc';
        } else {
            password.children[0].style.display = 'inline-block';
            password.children[1].style.border = '1px solid rgb(222, 222, 222)';
            password.children[1].style.boxShadow = '';
            password.children[2].style.color = '#ccc';
        }

    }
    document.onclick = () => {
        if (username.children[1].value) {
            username.children[1].style.border = '1px solid rgb(222, 222, 222)';
            username.children[1].style.boxShadow = '';
            username.children[2].style.color = '#ccc';
        } else if (password.children[1].value) {
            password.children[1].style.border = '1px solid rgb(222, 222, 222)';
            password.children[1].style.boxShadow = '';
            password.children[2].style.color = '#ccc';
        } else {
            username.children[0].style.display = 'inline-block';
            username.children[1].style.border = '1px solid rgb(222, 222, 222)';
            username.children[1].style.boxShadow = '';
            username.children[2].style.color = '#ccc';
            password.children[0].style.display = 'inline-block';
            password.children[1].style.border = '1px solid rgb(222, 222, 222)';
            password.children[1].style.boxShadow = '';
            password.children[2].style.color = '#ccc';
        }
    }
    //验证码
    checkCode.onclick = () => {
        checkCode.style.border = '1px solid rgb(255, 173, 119)';
        checkCode.style.boxShadow = '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)';
    }
    checkCode.onblur = () => {
        checkCode.style.border = '1px solid rgb(222, 222, 222)';
        checkCode.style.boxShadow = '';
        if (checkCode.value == h.toLowerCase() || checkCode.value == h.toUpperCase()) {
            res.innerHTML = '验证成功';
            res.style.color = 'green';
        } else {
            res.innerHTML = '验证码不正确';
            res.style.color = 'red';
        }
    }
    let h = '';
    verify({
        id: 'yzm',
        num: 4
    });

    //登录验证
    loginBtn.onclick = () => {
        if (zhanghao.value.trim() && res.innerHTML == '验证成功' && mima.value.trim()) {
            //用户密码验证
            ajax({
                type: 'post',
                url: '../api/login.php',
                data: {
                    name: zhanghao.value,
                    password: mima.value
                },
                success: str => {
                    if (str == 'yes') {
                        //记住账号
                        if (remenberBtn.checked) {
                            setcookie('username', zhanghao.value.trim(), 7);
                        } else {
                            setcookie('username', zhanghao.value.trim(), 1);
                        }
                        alert('登录成功');
                        let url = getcookie('url');
                        if (url) {
                            location.href = url;
                        } else {
                            location.href = '../index1.html';
                        }
                    } else {
                        errorts.style.display = 'block';
                        errorts.innerHTML = '用户名或密码错误';
                    }
                }
            })
        } else if (zhanghao.value.trim() && mima.value.trim()) {
            errorts.style.display = 'block';
            errorts.innerHTML = '请输入正确的验证码';
        } else if (zhanghao.value.trim() && checkCode.value.trim()) {
            errorts.style.display = 'block';
            errorts.innerHTML = '请输入密码';
        } else if (mima.value.trim() && checkCode.value.trim()) {
            errorts.style.display = 'block';
            errorts.innerHTML = '请输入用户名';
        } else if (zhanghao.value.trim()) {
            errorts.style.display = 'block';
            errorts.innerHTML = '请输入密码';
        } else {
            errorts.style.display = 'block';
            errorts.innerHTML = '请输入用户名';
        }
    }