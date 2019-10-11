function magniglass(obj) {
    var obj1 = {
        scal: 2,
        speed: 1
    }
    Object.assign(obj1, obj);
    var wrap = document.getElementById(obj1.id);
    var main = wrap.getElementsByClassName('main')[0];
    var biger = wrap.getElementsByClassName('biger')[0];
    var smaller = wrap.getElementsByClassName('smaller')[0];
    //渲染大图
    var html = `<img src="${obj1.imglist[0]}" alt="">`;
    var html1 = html + `<div class="mask" id="mask"></div>`;
    biger.innerHTML = html;
    main.innerHTML = html1;
    //设置放大倍数
    biger.children[0].style.width = main.children[0].offsetWidth * obj1.scal + 'px';
    biger.children[0].style.height = main.children[0].offsetHeight * obj1.scal + 'px';
    //渲染小图
    var html2 = obj1.imglist.map(function (item) {
        return `<li><img src="${item}" alt=""></li>`
    }).join('');
    smaller.innerHTML = html2;
    smaller.children[0].className = 'active';
    // smaller.lastElementChild.style.marginRight = 0;
    smaller.style.width = 82 * smaller.children.length - 10 + 'px';
    var mask = wrap.getElementsByClassName('mask')[0];
    main.onmouseover = function () {
        mask.style.display = 'block';
        biger.style.display = 'block';
    }
    main.onmouseout = function () {
        mask.style.display = 'none';
        biger.style.display = 'none';
    }
    var bimg = biger.getElementsByTagName('img')[0];
    main.onmousemove = function (ev) {
        var left = ev.pageX - wrap.offsetLeft - mask.offsetWidth / 2;
        var top = ev.pageY - wrap.offsetTop - mask.offsetHeight / 2;
        if (left <= 0) {
            left = 0;
        } else if (left > main.offsetWidth - mask.offsetWidth) {
            left = main.offsetWidth - mask.offsetWidth
        }
        if (top <= 0) {
            top = 0;
        } else if (top > main.offsetHeight - mask.offsetHeight) {
            top = main.offsetHeight - mask.offsetHeight
        }
        mask.style.left = left + 'px';
        mask.style.top = top + 'px';
        var bx = left / (main.offsetWidth - mask.offsetWidth);
        var by = top / (main.offsetHeight - mask.offsetHeight);
        bimg.style.left = (biger.offsetWidth - bimg.offsetWidth) * bx + 'px';
        bimg.style.top = (biger.offsetHeight - bimg.offsetHeight) * by + 'px';
    }

    smaller.onmouseover = function (ev) {
        if (ev.target.tagName == 'IMG') {
            for (var i = 0; i < smaller.children.length; i++) {
                smaller.children[i].className = '';
            }
            ev.target.parentNode.className = 'active';
            main.children[0].src = ev.target.src;
            biger.children[0].src = ev.target.src;
        }
    }

    // var box = wrap.getElementsByClassName('box')[0];
    // var prev = wrap.getElementsByClassName('prev')[0];
    // var next = wrap.getElementsByClassName('next')[0];

    // var moveW = (smaller.children[0].offsetWidth + 10) * obj1.speed;
    // prev.onclick = function () {
    //     move(moveW);

    // }
    // next.onclick = function () {
    //     move(-moveW);
    // }

    // function move(speed) {
    //     var left = smaller.offsetLeft + speed;
    //     if (left >= 0) {
    //         left = 0;
    //         prev.style.background = '#ccc';
    //         next.style.background = '#777';
    //     } else if (left <= box.offsetWidth - smaller.offsetWidth + 10) {
    //         left = box.offsetWidth - smaller.offsetWidth;
    //         prev.style.background = '#777';
    //         next.style.background = '#ccc';
    //     }
    //     smaller.style.left = left + 'px';
    // }
}