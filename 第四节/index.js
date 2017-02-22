/**
 * Created by yishan on 17/2/22.
 */
/**
 *
 * @param arr 图片数组
 * @param container 容器id
 */
function box(arr, container) {
    this.init(arr, container)
}
;
box.prototype = {
    init: function (arr, container) {
        this.arr = arr;
        this.container = container;
    },
    //创建box并添加到main标签容器中
    creatBox: function () {
        var main = document.getElementById(this.container);
        //模板
        for (var i = 0; i < this.arr.length; i++) {
            var str = '<img src="' + this.arr[i] + '" class="pic">';
            var div = document.createElement('div');
            div.setAttribute('class', 'box');
            div.innerHTML = str;
            main.append(div);
        }

    },//再去请求数据时候创建图片加入main容器
    addBox: function (newArr) {
        var main = document.getElementById(this.container);
        //模板
        for (var i = 0; i < newArr.length; i++) {
            var str = '<img src="' + this.arr[i] + '" class="pic">';
            var div = document.createElement('div');
            div.setAttribute('class', 'box');
            div.innerHTML = str;
            main.append(div);
        }
    },


}


/**
 * 计算并设置图片box的宽度 并设置box的宽度
 * col 列数
 * id 容器的id
 * return box 宽度
 */
function computedCol(col, id) {
    this.col = col || 6
    var boxW;//图片box的宽度
    //1.图片等宽不等高  先计算列数
    var clienW = document.documentElement.clientWidth;
    //2.计算图片的宽度
    picW = Math.floor(clienW / this.col) - 22;
    //3.设置图片的宽度
    var box = document.getElementsByClassName('box');

    for (var i = 0; i < box.length; i++) {
        box[i].getElementsByTagName('img')[0].style.width = picW + 'px';

    }
    boxW = box[0].offsetWidth;
    //设置容器的宽度-main的宽度
    if (id) {
        document.getElementById(id).style.width = boxW * this.col + 'px';
    }


}


//根据每一列的高度设置下一张图片出现的位置
function setPic() {
    var arrH = new Array();
    //1.取得第一行的图片高度
    //1.1获取box元素
    var imgBox = document.getElementsByClassName('box');
    for (var i = 0; i < imgBox.length; i++) {
        if (i < 6) {
            //将第一列盒子的高度加入数组
            arrH.push(imgBox[i].offsetHeight);
        } else {
            //获得最小高度的索引
            var minIndex = getMinIndex(arrH);
            //获得最小高度的值
            var minH = getMinH(arrH);
            //根据索引设置imgbox的偏移
            imgBox[i].style.position = 'absolute';
            imgBox[i].style.top = minH + 'px';
            imgBox[i].style.left = imgBox[minIndex].offsetLeft + 'px';
            //更改高度数组里面列高度
            arrH[minIndex] += imgBox[i].offsetHeight;


        }


    }


}

/**
 * 获取最小高度的索引
 * @param arr //图片box数组
 */
function getMinIndex(arr) {
    var minH = Math.min.apply(null, arr);
    var minIndex;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == minH) {
            minIndex = i;
        }
    }
    return minIndex;
}
/**
 * 获得最小的图片高度
 * arr 图片高度数组
 * @returns {number}
 */
function getMinH(arr) {
    var minH = Math.min.apply(null, arr);
    return minH;
}
/**
 * 判断滚动距离是否需要加载新内容
 * 滚动距离+屏幕高度>屏幕显示的最后一个box高度/2+距离顶部的高度  ---加载新图片
 */
function checkScroll() {
    "use strict";
    var isAdd;
    var clienH = document.documentElement.clientHeight;//这个高度是根据页面的高度 如果开启控制台那么还的减去控制台遮盖的高度
    //获取最后一个box
    var boxs = document.getElementsByClassName('box');
    var lastPic = boxs[boxs.length-1];
    //滚动距离+屏幕高度
    var clienScroll = document.documentElement.scrollTop || document.body.scrollTop;
    clienScroll += clienH;
    //屏幕高度+最后一个盒子的高度一半
    var boxScroll = lastPic.offsetTop + lastPic.offsetHeight;
    //滚动距离+屏幕高度>屏幕显示的最后一个box高度/2+距离顶部的高度  ---加载新图片
    if (clienScroll > boxScroll) {
        isAdd = true;
    } else {
        isAdd = false;
    }
    return isAdd;


}