let goodsTitle = document.getElementById('goods-title');
let search = document.getElementById('search');
var timer = null;
var str1 = decodeURI(location.search).slice(1).split('=')[1];
if (str1) {
    goodsTitle.innerHTML = str1;
} else {
    goodsTitle.innerHTML = '';
}

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
//回到顶部
let gotop = document.getElementById('gotop');
window.onscroll = function () {
    var scrollTop = window.scrollY;
    if (scrollTop >= 100) {
        gotop.style.display = 'block';
    } else {
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
//渲染列表页
let goodslistList = document.getElementsByClassName('goodslist-list')[0];
let ipage = 1;
let num = 16;
let paixu = '';
var min = 0;
var max = 0;
var neirong = '';
let pagePrve = document.getElementById('page-prve');
let pageNext = document.getElementById('page-next');
let iPage = document.querySelectorAll('.paixu-pages b')[0];
let psum = document.getElementById('psum');

function init() {
    ajax({
        type: 'get',
        url: '../api/goodslist1.php',
        data: {
            ipage,
            num,
            paixu,
            min,
            max,
            neirong
        },
        success: str => {
            // console.log(str);
            creat(str);
            // let arr = JSON.parse(str);
            // console.log(arr);
        }
    });
}
init();

function creat(str) {
    let arr = JSON.parse(str);
    console.log(arr);
    let html = arr.list.map(item => {
        let diqu = item.diqu.split('&');
        let h = '';
        for (var i = 0; i < diqu.length; i++) {
            h += `<span>${diqu[i]}</span>`
        }
        return `<dl data-id="${item.gid}">
                        <div class="goods-show">
                            <dt>
                                <img src="${item.url}" alt="">
                            </dt>
                            <dd class="dl_tips">
                                ${h}
                                <i class="fr">人气：${item.renqi}</i>
                                <i class="fr">销量：${item.xiaoliang}</i>
                            </dd>
                            <dd class="dl_name">
                                <a href="###" title="${item.title}">${item.title}</a>
                            </dd>
                            <dd class="dl_price clearfix">
                                <span class="goods-price">
                                    ${item.price}
                                </span>
                                <span id="dl_sc" class="fr">
                                    <i class="fa fa-heart-o"></i>
                                    收藏
                                </span>
                            </dd>
                        </div>
                    </dl>`
    }).join('');
    goodslistList.innerHTML = html;
    iPage.innerHTML = ipage;
    let sum = Math.ceil(arr.total / num);
    // console.log(sum);
    psum.innerHTML = sum;
    if (ipage == sum) {
        pageNext.style.cursor = 'not-allowed';
        pageNext.style.color = '#bfbfbf';
        pagePrve.style.cursor = 'pointer';
        pagePrve.style.color = '#333333';
    } else if (ipage == 1) {
        pagePrve.style.cursor = 'not-allowed';
        pagePrve.style.color = '#bfbfbf';
        pageNext.style.cursor = 'pointer';
        pageNext.style.color = '#333333';
    } else {
        pagePrve.style.cursor = 'pointer';
        pagePrve.style.color = '#333333';
        pageNext.style.cursor = 'pointer';
        pageNext.style.color = '#333333';
    }
    pageNext.onclick = function () {
        if (ipage < sum) {
            ipage++;
            init();
        }
    }
    pagePrve.onclick = function () {
        if (ipage > 1) {
            ipage--;
            init();
        }
    }
    //列表页跳详情页
    let adls = goodslistList.getElementsByTagName('dl');
    for (var i = 0; i < adls.length; i++) {
        adls[i].index = i;
        adls[i].onclick = function () {
            let gid = arr.list[this.index].gid;
            zuji(gid);
            location.href = '../html/introduce.html?' + gid;

        }
    }

}
//排序
let paixuType = document.getElementsByClassName('paixu-type')[0];
let zonghe = document.getElementById('zonghe');
let renqi = document.getElementById('renqi');
let xiaoliang = document.getElementById('xiaoliang');
let jiage = document.getElementById('jiage');
let btn = document.getElementById('btn');
let mohuSearch = document.getElementById('mohu-search');
let mohuBtn = document.getElementById('mohu-btn');
let pmin = document.getElementById('min');
let pmax = document.getElementById('max');

// console.log(paixuType.children.length);

function paita() {
    for (let i = 0; i < paixuType.children.length; i++) {
        paixuType.children[i].className = '';
    }
}
zonghe.onclick = () => {
    min = pmin.value;
    max = pmax.value;
    paita();
    ipage = 1;
    paixu = '';
    zonghe.className = 'active';
    init();
    paixu = '';
}
renqi.onclick = () => {
    paita();
    ipage = 1;
    paixu = 'renqi';
    renqi.className = 'active';
    init();
    paixu = '';
}
xiaoliang.onclick = () => {
    paita();
    ipage = 1;
    paixu = 'xiaoliang';
    xiaoliang.className = 'active';
    init();
    paixu = '';
}
jiage.onclick = () => {
    paita();
    ipage = 1;
    paixu = 'price1';
    jiage.className = 'active';
    init();
    paixu = '';
}
btn.onclick = () => {
    min = pmin.value;
    max = pmax.value;
    if (min.trim() && max.trim()) {
        ipage = 1;
        init();
    }
}
mohuBtn.onclick = () => {
    neirong = mohuSearch.value;
    if (neirong.trim()) {
        ipage = 1;
        init();
    }
}

let goodsPinpai = document.getElementsByClassName('goods-pinpai')[0];
let goodsFenlei = document.getElementsByClassName('goods-fenlei')[0];
//列表页之间跳转
let titles = document.getElementsByClassName('nav-title');
for (let i = 0; i < titles.length; i++) {
    titles[i].onclick = () => {
        location.href = 'goodslist.html?title=' + titles[i].innerHTML;

    }
}
ajax({
    type: 'get',
    url: '../api/goodslistnav.php',
    data: {
        title: goodsTitle.innerHTML
    },
    success: str => {
        if (str == 'no') {
            goodsTitle.innerHtml = '';
        } else {
            creatnav(str);
        }

    }
});

function creatnav(str) {
    // console.log(str);
    let arr = JSON.parse(str);
    let pinpai = arr[0].brand.split('&');
    let fenlei = arr[0].type.split('&');
    let html = pinpai.map(item => {
        return `<a href="###">${item}</a>`;
    }).join('');
    goodsPinpai.children[1].innerHTML = html;
    let html1 = fenlei.map(item => {
        return `<a href="###">${item}</a>`
    }).join('');
    goodsFenlei.children[1].innerHTML = html1;


}
//足迹
function zuji(id) {
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