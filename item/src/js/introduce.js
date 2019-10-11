let mask1 = document.getElementById('reg-mask');
let tc1 = document.getElementById('reg-tc');
let cha1 = document.getElementById('reg-cha');
let btn1 = document.getElementById('reg-btn');
let tc2 = document.getElementById('tc2');
let cha2 = document.getElementById('cha2');
let btn2 = document.getElementById('goshop');
let search = document.getElementById('search');
var timer = null;
let zuji = document.getElementById('zuji');
search.onclick = ev => {
    clearInterval(timer);
    search.style.borderBottom = '1px solid white';
    search.children[0].style.display = 'none';
    search.children[1].style.width = '200px';
    search.children[2].style.color = 'white';
    ev.stopPropagation();
}
document.onclick = () => {
    clearInterval(timer);
    search.style.borderBottom = '';
    search.children[1].style.width = '0';
    search.children[2].style.color = '#ffb81c';
    timer = setInterval(function () {
        search.children[0].style.display = 'inline';
    }, 450);
}
let lis1 = document.getElementsByClassName('li1');
let lis2 = document.getElementsByClassName('li2');

ajax({
    type: 'post',
    url: '../api/index1.php',
    success: str => {
        // console.log(str);
        creat1(str);
    }
});

function creat1(str) {
    let arr = JSON.parse(str);
    // console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        let html = '';
        let arr1 = arr[i].type.split('&');
        for (let j = 0; j < arr1.length; j++) {
            html += `<a href="###">${arr1[j]}</a>`;
        }
        lis1[i].innerHTML = '<h4>分类</h4> ' + html;
    }
    for (let i = 0; i < arr.length; i++) {
        let html = '';
        let arr1 = arr[i].brand.split('&');
        for (let j = 0; j < arr1.length; j++) {
            html += `<a href="###">${arr1[j]}</a>`;
        }
        lis2[i].innerHTML = '<h4>品牌</h4> ' + html;
    }
}
let dl = document.getElementById('dl');
let zc = document.getElementById('zc');
let dlcheck = getcookie('username');
if (dlcheck) {
    dl.href = '###';
    zc.href = '../index1.html';
    zc.onclick = () => {
        removeCookie('username');
    }

    dl.innerHTML = dlcheck;
    zc.innerHTML = '退出'
}
dl.onclick = () => {
    console.log(666);
    location.href = '../html/log.html';
    setcookie('url', location.href, 7);
}
var str1 = decodeURI(location.search).slice(1);
var navname = document.getElementById('goodname');
var goodcont = document.getElementsByClassName('goodcont')[0];

function init() {
    ajax({
        type: 'get',
        url: '../api/introduce.php',
        success: str => {
            creat(str);
        }
    });
}
init();

function creat(str) {
    let arr = JSON.parse(str);
    let h = '';
    // console.log(arr);
    var obj = {};
    for (var a in arr) {
        if (arr[a].gid == str1) {
            obj = arr[a];
            break;
        }
    }
    // console.log(obj);
    let smbgs = obj.smbg.split('&');
    // console.log(smbgs);
    magniglass({
        id: 'wrap',
        imglist: smbgs
    });
    zujishow(arr);



    for (let i = 0; i < smbgs.length; i++) {
        h += `<li><img src="${smbgs[i]}" alt=""></li>`
    }
    navname.innerHTML = obj.title;
    let html = `<div class="proName">
                        <h2>${obj.title}</h2>
                        <h3>库支票支付3期6期12期免息</h3>
                    </div>
                    <div class="proDetails">
                        <div class="proList clearfix">
                            <div class="pdt fl">
                                寺库价
                            </div>
                            <div class="pdd fl">
                                <span>￥</span>
                                <strong>${obj.price1}</strong>
                            </div>
                        </div>
                        <div class="proList clearfix">
                            <div class="yh">
                                <span style="margin-right: 50px;">有货</span>
                                <span>预计<i>5-10</i>个工作日内送达</span>
                            </div>
                        </div>
                        <div class="proList clearfix">
                            <div class="pdt fl">温馨提示</div>
                            <div class="pdd fl">本商品无质量问题不支持退换货</div>
                        </div>
                        <div class="proList clearfix">
                            <div class="pdt fl">商品信息</div>
                            <div class="pdd fl">自营</div>
                        </div>
                    </div>
                    <div class="proList_box">
                        <div class="psize clearfix">
                            <div class="pdt fl">
                                颜色
                            </div>
                            <div class="pdd fl">
                                <ul id="gcolor">
                                    ${h}
                                </ul>
                            </div>
                        </div>
                        <div class="psize clearfix">
                            <div class="pdt fl">
                                尺码
                            </div>
                            <div class="pdd fl">
                                <ul id="gsize">
                                    <li>S</li>
                                    <li>M</li>
                                    <li>L</li>
                                </ul>
                            </div>
                        </div>
                        <div class="pNum">
                            <div class="pdt fl">购买数量</div>
                            <div class="pdd fl">
                                <div class="kcbtn fl">
                                    <input type="button" id="subbtn" value="-">
                                    <input type="text" id="goodnum" value="1">
                                    <input type="button" id="addbtn" value="+">
                                </div>
                                <span>仅剩<i>${obj.kucun}</i>件，抓紧时间购买哦！</span>
                            </div>
                        </div>
                        <a class="buya a1" href="###">立即抢购</a>
                        <a class="buya a2" href="###">
                            <i class="fa fa-shopping-cart"> </i>
                            加入购物车</a>
                    </div>`
    goodcont.innerHTML = html;
    let gcolor = document.getElementById('gcolor');
    let gsize = document.getElementById('gsize');
    for (let i = 0; i < gcolor.children.length; i++) {
        gcolor.children[i].onclick = () => {
            for (let j = 0; j < gcolor.children.length; j++) {
                gcolor.children[j].className = '';
            }
            gcolor.children[i].className = 'active';
        }
    }
    for (let i = 0; i < gsize.children.length; i++) {
        gsize.children[i].onclick = () => {
            for (let j = 0; j < gsize.children.length; j++) {
                gsize.children[j].className = '';
            }
            gsize.children[i].className = 'active';
        }
    }
    //库存
    let addbtn = document.getElementById('addbtn');
    let goodnum = document.getElementById('goodnum');
    let subbtn = document.getElementById('subbtn');
    let max = obj.kucun;
    let num = goodnum.value;

    function shubiao() {
        if (goodnum.value == max) {
            addbtn.style.cursor = 'no-drop';
        } else if (goodnum.value == 1) {
            subbtn.style.cursor = 'no-drop';
        } else {
            addbtn.style.cursor = 'pointer';
            subbtn.style.cursor = 'pointer';
        }
    }
    addbtn.onclick = () => {
        if (goodnum.value < max)
            goodnum.value++;
        shubiao();
    }
    subbtn.onclick = () => {
        if (goodnum.value > 1)
            goodnum.value--;
        shubiao();
    }
    goodnum.oninput = () => {
        if (goodnum.value > max) {
            num = max;
        } else if (goodnum.value < 1) {
            num = 1;
        }
        goodnum.value = num;
    }
    let a1 = document.getElementsByClassName('a1')[0];
    let a2 = document.getElementsByClassName('a2')[0];
    let a3 = document.getElementsByClassName('addcar')[0];
    a1.onclick = () => {
        let num = goodnum.value;
        if (dlcheck) {
            ajax({
                type: 'post',
                url: '../api/addshop.php',
                data: {
                    gid: obj.gid,
                    url: obj.url,
                    title: obj.title,
                    diqu1: obj.diqu1,
                    price1: obj.price1,
                    kucun: obj.kucun,
                    num,
                    xiaoji: num * obj.price1
                },
                success: str => {
                    console.log(str);
                    if (str == 'yes') {
                        mask1.style.display = 'block';
                        tc2.style.display = 'flex';
                    } else {
                        alert('购物车已有该宝贝了！');
                        location.href = "../html/shopcar.html";
                    }
                }
            });
            location.href = "../html/shopcar.html";
        } else {
            mask1.style.display = 'block';
            tc1.style.display = 'flex';
        }
    }
    a2.onclick = a3.onclick = () => {
        if (dlcheck) {
            ajax({
                type: 'post',
                url: '../api/addshop.php',
                data: {
                    gid: obj.gid,
                    url: obj.url,
                    title: obj.title,
                    diqu1: obj.diqu1,
                    price1: obj.price1,
                    kucun: obj.kucun,
                    num,
                    xiaoji: num * obj.price1
                },
                success: str => {
                    console.log(str);
                    if (str == 'yes') {
                        mask1.style.display = 'block';
                        tc2.style.display = 'flex';
                    } else {
                        alert('购物车已有该宝贝了！');
                        location.href = "../html/shopcar.html";
                    }
                }
            });
        } else {
            mask1.style.display = 'block';
            tc1.style.display = 'flex';
        }
    }
    mask1.onclick = () => {
        mask1.style.display = 'none';
        tc1.style.display = 'none';
        tc2.style.display = 'none';
    }
    btn1.onclick = () => {
        setcookie('url', location.href, 7);
        location.href = "../html/log.html";
    }
    cha1.onclick = () => {
        mask1.style.display = 'none';
        tc1.style.display = 'none';
    }
    cha2.onclick = () => {
        mask1.style.display = 'none';
        tc2.style.display = 'none';
    }
}
//渲染足迹
function zujishow(arr) {
    let goodlist = localStorage.goodlist;
    // console.log(goodlist);
    let data = goodlist.split('&').reverse();
    // console.log(data);
    let str = '';
    // console.log(arr);
    for (let item of data) {
        for (let b of arr) {
            if (item == b.gid) {
                str += `<li class="clearfix" data-id="${b.gid}">
                                <div class="fl">
                                    <img src="${b.url}" alt="">
                                </div>
                                <div class="fr">
                                    <p>${b.title}</p>
                                    <span>￥<i>${b.price1}</i></span>
                                </div>
                            </li>`
            }
        }
    }
    // console.log(str);
    zuji.innerHTML = str;
    let zujis = zuji.getElementsByTagName('li');
    for (let i = 0; i < zujis.length; i++) {
        zujis[i].onclick = () => {
            console.log(zujis[i].dataset["id"]);
            let str = zujis[i].dataset["id"];
            // window.open('introduce.html?' + str);
            location.href = 'introduce.html?' + str;
            zujif(str);
        }
    }
}
//足迹
function zujif(id) {
    let goodlist = localStorage.goodlist;
    if (goodlist) {
        let arr = goodlist.split('&');
        let index = arr.indexOf(id);
        let str = '';
        if (index >= 0) {
            arr.splice(index, 1);
            arr.push(id);
            str = arr.join('&');
        } else {
            str = goodlist + '&' + id;
        }
        localStorage.goodlist = str;
    } else {
        localStorage.goodlist = id;
    }
}
//吸顶菜单、回到顶部
let gotop = document.getElementById('gotop');
let toplist = document.getElementsByClassName('right-list')[0];
var iTop = toplist.offsetTop;
// console.log(iTop);
window.onscroll = function () {
    let x = window.scrollY;
    // console.log(x);
    if (x >= iTop) {
        toplist.style.position = 'fixed';
        toplist.style.top = '0';
        gotop.style.display = 'block';
    } else {
        toplist.style.position = 'relative';
        gotop.style.display = 'none';
    }
}
gotop.onclick = function () {
    var scrollTop = window.scrollY;
    var timer = setInterval(function () {
        var speed = parseInt(scrollTop / 6);
        scrollTop -= speed;
        if (speed <= 0) {
            clearInterval(timer);
        }
        window.scrollTo(0, scrollTop);
    }, 30);
}
//选项卡
new Tabmove('showright'); //面向对象