function Tabmove(id) { //构造函数：放属性
    //var this = new Object();
    //加工
    this.oBox = document.getElementById(id); //t1 == Object
    this.aInputs = this.oBox.getElementsByTagName('li'); //通过标签名查找元素
    this.aDivs = this.oBox.getElementsByClassName('right-inf'); //通过类名查找元素
    this.init();
}

//方法的添加
Tabmove.prototype.init = function () { //t1 == Object
    for (var i = 0; i < 4; i++) {
        this.aInputs[i].index = i; //添加索引，做一个标识，点击的时候就可以知道我点的是第几个了
        let _this = this;
        this.aInputs[i].onclick = function () {
            //排他:清空
            _this.tab(this); //this指向按钮:第一个this本来想指向Object，但是现在出错，需要修正指向
        }; //.bind(this) 修正指向，但是该案例里面需要两种this，不能简单粗暴修改指向，对了一个又错了一个
    }
}

Tabmove.prototype.tab = function (now) {
    for (var i = 0; i < 4; i++) {
        this.aInputs[i].className = '';
        this.aDivs[i].style.display = 'none';
    }
    now.className = 'active'; //添加类名 this本来指向按钮，但是封装后，指向window
    this.aDivs[now.index].style.display = 'block';
}