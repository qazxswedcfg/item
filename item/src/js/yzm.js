function verify(obj) {
    let obj1 = {
        num: 4
    }
    Object.assign(obj1, obj);
    var yzm = document.getElementById(obj1.id);


    function nnum(num) {
        var html = '';
        var str = 'qwertyuiopasdfghjklzxcvbnm0123456789QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
        for (let i = 0; i < num; i++) {
            var rnum = parseInt(Math.random() * str.length);
            h += str[rnum];
            html += `<span>${str[rnum]}</span>`;
        }
        yzm.innerHTML = html;
    }

    nnum(obj.num);

    function color() {
        var html = '';
        var str = '0123456789abcdef';
        for (let i = 0; i < 6; i++) {
            var rnum = parseInt(Math.random() * str.length);
            html += str[rnum];

        }
        html = '#' + html;
        return html;
    }
    color();

    function spanStyle() {
        let spans = yzm.getElementsByTagName('span');
        for (let i = 0; i < spans.length; i++) {
            let num = parseInt(Math.random() * 60 - 30);
            spans[i].style.color = color();
            spans[i].style.transform = 'rotate(' + num + 'deg)';
        }
    }
    spanStyle();
    yzm.onclick = () => {
        h = '';
        nnum(obj.num);
        color();
        spanStyle();
    }
}