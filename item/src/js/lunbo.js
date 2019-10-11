function imgbanner(obj) {
    var obj1 = {
        iw: 520,
        ih: 280,
        time: 2,
        btnType: true
    }

    Object.assign(obj1, obj);
    var banner = document.getElementById(obj1.id);
    var ul = banner.getElementsByTagName('ul')[0];
    banner.style.width = obj1.iw + 'px';
    banner.style.height = obj1.ih + 'px';

    var strList = obj1.imglist.map(function (item) {
        return `<li><img src="${item}" alt=""></li>`;
    }).join('');
    ul.innerHTML = strList;

    var imglist = banner.getElementsByTagName('li');
    var point = banner.getElementsByClassName('point')[0];
    var leftBtn = banner.getElementsByClassName('left')[0];
    var rightBtn = banner.getElementsByClassName('right')[0];
    var iW = imglist[0].offsetWidth;
    var timer = null;
    var now = 0; //可视区图片的下标
    var html = ''; //准备渲染小圆
    for (var i = 0; i < imglist.length; i++) {
        imglist[i].style.left = iW + 'px';
        html += '<span></span>'; //有几个大图就对应生成几个小圆
    }
    point.innerHTML = html;
    point.children[0].className = 'active'; //第一个小圆高亮
    imglist[0].style.left = 0; //第一张图片显示
    function pointMove() {
        for (var i = 0; i < point.children.length; i++) {
            point.children[i].className = '';
        }
        point.children[now].className = 'active';
    }
    //自动轮播
    function next() {
        startMove(imglist[now], {
            'left': -iW
        });
        now++;
        if (now > imglist.length - 1) {
            now = 0;
        }
        imglist[now].style.left = iW + 'px';
        startMove(imglist[now], {
            'left': 0
        });
        pointMove();
    }

    function prev() {
        startMove(imglist[now], {
            'left': iW
        });
        now--;
        if (now < 0) {
            now = imglist.length - 1;
        }
        imglist[now].style.left = -iW + 'px';
        startMove(imglist[now], {
            'left': 0
        });
        pointMove();
    }
    timer = setInterval(next, obj1.time * 1000);
    banner.onmouseover = function () {
        clearInterval(timer);
        if (!obj1.btnType) {
            leftBtn.style.display = 'block';
            rightBtn.style.display = 'block';
        }
    }

    banner.onmouseout = function () {
        clearInterval(timer);
        if (!obj1.btnType) {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';
        }
        timer = setInterval(next, obj1.time * 1000); //每隔两秒切换一个图片
    }
    if (obj1.btnType) {
        //true
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
    } else {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }
    leftBtn.onclick = function () {
        prev();
    }
    rightBtn.onclick = function () {
        next();
    }

    var spans = point.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
        spans[i].index = i;
        spans[i].onclick = function () {
            var x = this.index;
            // console.log(this.index);
            if (x > now) {
                startMove(imglist[now], {
                    'left': -iW
                });
                imglist[x].style.left = iW + 'px';
                startMove(imglist[x], {
                    'left': 0
                });
            }
            if (x < now) {
                startMove(imglist[now], {
                    'left': iW
                });
                imglist[x].style.left = -iW + 'px';
                startMove(imglist[x], {
                    'left': 0
                });
            }
            now = x;
            pointMove();
        }
    }
}