
var imgData = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg'];
window.onload = function() {
    creat();
    tabFn();
    scoreFn();
}

function creat() {
    var picList = id('picList');
    var str = '';
    for (var i = 0; i < imgData.length; i++) {
        str += '<li><img src="'+imgData[i]+'"></li>';
    }
    picList.innerHTML = str;
}
bind(document, 'touchmove', function(ev) {
    ev.preventDefault();
})
function tabFn() {
    var oTab = id('tabPic');
    var oList = id('picList');
    var aNav = oTab.getElementsByTagName('nav')[0].children;
    var iNow = 0;
    var iX = 0;
    var iW = view().w;
    var oTimer = null;
    var iStartTouchX = 0;
    var iStartX = 0;
    auto();
    function auto() {
        oTimer = setInterval(function() {
            iNow++;
            iNow = iNow%aNav.length;
            tab();
        },2000);
    }

    bind(oTab, 'touchstart', startFn);
    bind(oTab, 'touchmove', moveFn);
    bind(oTab, 'touchend', endFn);

    function startFn(ev) {
        oList.style.transition = 'none';
        ev = ev.changedTouches[0];
        iStartTouchX = ev.pageX;
        iStartX = iX;
        clearInterval(oTimer);
    }
    function moveFn(ev) {
        ev = ev.changedTouches[0];
        var iDis = ev.pageX - iStartTouchX;
        iX = iStartX + iDis;
        oList.style.WebkitTransform = 'translate('+iX+'px)';
        oList.style.transform = 'translate('+iX+'px)';
    }
    function endFn(ev) {
       iNow = -Math.round(iX/iW);
       if (iNow < 0) {
        iNow = 0;
       }
       if (iNow > aNav.length-1){
        iNow = aNav.length-1;
       }
       tab();
       auto();
    }
    function tab() {
        iX = -iNow * iW;
        oList.style.transition = 'all 0.5s ease-out';
        oList.style.WebkitTransform = 'translate('+iX+'px)';
        oList.style.transform = 'translate('+iX+'px)';
        for(var i = 0; i < aNav.length; i++) {
            removeClass(aNav[i], 'active');
        }
         addClass(aNav[iNow], 'active');
    }
}
function load() {
    var iTime = new Date().getTime();
    var oW = id('welcome');
    var arr = [];
    var bImgLoad = false;
    var bTime = false;
    var oTimer = null;
    bind(oW, 'webKitTransitionEnd', end);
    bind(oW, 'transitionend',  end);
    oTimer = setInterval(function() {
        if (new Date().getTime() - iTime >=5000) {
            bTime = true;
            //模拟图片都加载完了
            bImgLoad = true;
        }
        if (bImgLoad && bTime) {
            clearInterval(oTimer);
            oW.style.opacity = 0;
        }
    },1000);
    function end() {
        removeClass(oW, 'pageShow');
    }
};

function scoreFn() {
    var oScore = id('score');
    var aLi = oScore.getElementsByTagName('li');
    for(var i = 0;i < aLi.length; i++) {
        fn(aLi[i]);
    }

    function fn(oLi) {
        var aNav = oLi.getElementsByTagName('a');
        var oInput = oLi.getElementsByTagName('input')[0];
        for (var i = 0; i<aNav.length;i++) {
            aNav[i].index = i;
            bind(aNav[i],'touchstart', function() {
                for(var i = 0; i< aNav.length; i++) {
                    if(i<=this.index){
                        addClass(aNav[i], 'active')
                    } else {
                        removeClass(aNav[i], 'active')
                    }
                }
                oInput.value = this.index+1;
            })
        }
    }
}
