//轮播图
imgbanner({
    id: 'lunbo',
    imglist: ['images/index/bg1.jpg', 'images/index/banner1_1.jpg', 'images/index/banner1_2.jpg',
        'images/index/banner1_3.jpg'
    ],
    iw: 1200,
    ih: 630,
    time: 2.5,
    btnType: false
});
//搜索框效果
let search = document.getElementById('search');
var timer = null;
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
//渲染列表页数据
ajax({
    type: 'get',
    url: 'api/indexlist.php',
    success: str => {
        // console.log(str);
        creat(str);
    }
});
let goodlist = document.getElementById('goodlist');

function creat(str) {
    let arr = JSON.parse(str);
    // console.log(arr);
    let html = arr.map(item => {
        return `<li>
                <div class="list-img">
                    <img src="${item.url}" alt="">
                </div>
                <div class="list-inf">
                    <p class="g-name">${item.title}</p>
                    <p class="g-jieshao">${item.price}</p>
                    <div class="line"></div>
                    <p class="g-price">${item.feature}</p>
                </div>
                <div class="gold"></div>
                </li>`
    }).join('');
    goodlist.innerHTML = html;
}
//列表页左右翻页
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let x = 0;
prevBtn.onclick = () => {
    if (x >= 0) {
        x = -12000;
        x += 1200;
        goodlist.style.left = x + 'px';
    } else {
        x += 1200;
        goodlist.style.left = x + 'px';
    }
}
nextBtn.onclick = () => {
    if (x <= -12000) {
        x = 0
        x -= 1200;
        goodlist.style.left = x + 'px';
    } else {
        x -= 1200;
        goodlist.style.left = x + 'px';
    }
}
//视频
let shipin = document.getElementById('shipin');
shipin.onclick = () => {
    shipin.children[0].style.display = 'none';
    shipin.children[1].style.display = 'none';
    shipin.children[2].style.display = 'block';
    shipin.children[3].style.display = 'none';
}
//验证登录状态
let dl = document.getElementById('dl');
let zc = document.getElementById('zc');
let gwc = document.getElementById('gwc');
let dlcheck = getcookie('username');
if (dlcheck) {
    dl.href = '###';
    zc.href = 'index1.html';
    gwc.href = 'html/shopcar.html';
    zc.onclick = () => {
        removeCookie('username');
    }
    dl.innerHTML = dlcheck;
    zc.innerHTML = '退出';
}
//渲染二级导航
let lis1 = document.getElementsByClassName('li1');
let lis2 = document.getElementsByClassName('li2');

ajax({
    type: 'post',
    url: 'api/index1.php',
    success: str => {
        // console.log(str);
        creat1(str);
    }
});

function creat1(str) {
    let arr = JSON.parse(str);
    console.log(arr);
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
//首页跳转列表页
let titles = document.getElementsByClassName('nav-title');

for (let i = 0; i < titles.length; i++) {
    titles[i].onclick = () => {
        location.href = 'html/goodslist.html?title=' + titles[i].innerHTML;
    }
}