var imgData = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg'];
window.onload = function() {
    creat();
    scoreFn();
    formIn()
}

function creat() {
    var picList = id('picList');
    var str = '';
    for (var i = 0; i < imgData.length; i++) {
        str += '<li><img src="' + imgData[i] + '"></li>';
    }
    picList.innerHTML = str;
}
/*bind(document, 'touchmove', function(ev) {
    ev.preventDefault();
})*/
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
            iNow = iNow % aNav.length;
            tab();
        }, 2000);
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
        oList.style.WebkitTransform = 'translate(' + iX + 'px)';
        oList.style.transform = 'translate(' + iX + 'px)';
    }

    function endFn(ev) {
        iNow = -Math.round(iX / iW);
        if (iNow < 0) {
            iNow = 0;
        }
        if (iNow > aNav.length - 1) {
            iNow = aNav.length - 1;
        }
        tab();
        auto();
    }

    function tab() {
        iX = -iNow * iW;
        oList.style.transition = 'all 0.5s ease-out';
        oList.style.WebkitTransform = 'translate(' + iX + 'px)';
        oList.style.transform = 'translate(' + iX + 'px)';
        for (var i = 0; i < aNav.length; i++) {
            removeClass(aNav[i], 'active');
        }
        addClass(aNav[iNow], 'active');
    }
}

function loadFn() {
    var iTime = new Date().getTime();
    var oW = id('welcome');
    var arr = [];
    var bImgLoad = false;
    var bTime = false;
    var oTimer = null;
    bind(oW, 'WebkitTransitionEnd', end);
    bind(oW, 'transitionend', end);
    oTimer = setInterval(function() {
        if (new Date().getTime() - iTime >= 5000) {
            bTime = true;
            //模拟图片都加载完了
            bImgLoad = true;
        }
        if (bImgLoad && bTime) {
            clearInterval(oTimer);
            oW.style.opacity = 0;
        }
    }, 1000);

    function end() {
        removeClass(oW, 'pageShow');
        tabFn();
    }
};

function scoreFn() {
    var oScore = id('score');
    var aLi = oScore.getElementsByTagName('li');
    for (var i = 0; i < aLi.length; i++) {
        fn(aLi[i]);
    }

    function fn(oLi) {
        var aNav = oLi.getElementsByTagName('a');
        var oInput = oLi.getElementsByTagName('input')[0];
        for (var i = 0; i < aNav.length; i++) {
            aNav[i].index = i;
            bind(aNav[i], 'touchstart', function() {
                for (var i = 0; i < aNav.length; i++) {
                    if (i <= this.index) {
                        addClass(aNav[i], 'active')
                    } else {
                        removeClass(aNav[i], 'active')
                    }
                }
                oInput.value = this.index + 1;
            })
        }
    }
    indexFn();
}

function infoFn(obj, text) {
    obj.innerHTML = text;
    obj.style.WebkitTransform = 'scale(1)';
    obj.style.transform = 'scale(1)';
    obj.style.opacity = 1;
    setTimeout(function() {
        obj.style.WebkitTransform = 'scale(0)';
        obj.style.tTransform = 'scale(0)';
        obj.style.opacity = 0;
    }, 1000)
}

function indexFn() {
    var oIndex = id('index');
    var oBtn = oIndex.getElementsByClassName('btn')[0];
    var oInfo = oIndex.getElementsByClassName('info')[0];
    bind(oBtn, 'touchend', endFn);

    function endFn() {
        if (scoreCheckedFn()) {
            if (tagsCheckedFn()) {
                indexOutFn();
            } else {
                infoFn(oInfo, '请给景区添加标签');
            }
        } else {
            infoFn(oInfo, '请给景区评分');
        }
    }

    function scoreCheckedFn() {
        var oScore = id('score');
        var aInput = oScore.getElementsByTagName('input');
        for (var i = 0; i < aInput.length; i++) {
            if (aInput[i].value == 0) {
                return false;
            }
        }
        return true;
    };

    function tagsCheckedFn() {
        var oTags = id('tags');
        var aInput = oTags.getElementsByTagName('input');
        for (var i = 0; i < aInput.length; i++) {
            if (aInput[i].checked) {
                return true;
            }
        }
        return false;
    }
}

function indexOutFn() {
    var oMask = id('mask');
    var oIndex = id('index');
    var oNews = id('news');
    addClass(oMask, ' pageShow');
    addClass(oNews, ' pageShow');
    newsFn();
    setTimeout(function() {
        oMask.style.opacity = 1;
        oIndex.style.filter = 'blur(10px)';
        oIndex.style.WebkitFilter = 'blur(10px)';
    }, 20);
    setTimeout(function() {
        oMask.style.opacity = 0;
        oNews.style.transition = '0.5s';
        oIndex.style.filter = 'blur(0px)';
        oIndex.style.WebkitFilter = 'blur(0px)';
        oNews.style.opacity = 1;
    }, 3000);
};

function newsFn() {
    var oNews = id('news');
    var oInfo = oNews.getElementsByClassName('info')[0];
    var aInput = oNews.getElementsByTagName('input');
    aInput[0].onchange = function() {
        if (this.files[0].type.split('/')[0] === 'video') {
            newsOutFn();
        } else {
            infoFn(oInfo, '请上传视频');
        }
    }
    aInput[1].onchange = function() {
        if (this.files[0].type.split('/')[0] === 'image') {
            newsOutFn();
        } else {
            infoFn(oInfo, '请上传图片');
        }
    }
};

function newsOutFn() {
    var oNews = id('news');
    var oForm = id('form');
    addClass(oForm, 'pageShow');
    oNews.style.cssText = '';
    removeClass(oNews, 'pageShow');
    formIn();
}

function formIn() {
    var oForm = id('form');
    var oOver = id('over');
    var aFormTags = id('form').getElementsByTagName('label');
    var oBtn = oForm.getElementsByClassName('btn')[0];
    var isOff = false;
    for (var i = 0; i < aFormTags.length; i++) {
        bind(aFormTags[i], 'touchend', function() {
            isOff = true;
            addClass(oBtn, 'submit');
        })
    }
    bind(oBtn, 'touchend', function() {
        if (isOff) {
            addClass(oOver, 'pageShow');
            removeClass(oForm, 'pageShow');
            over();
        }
    })
}

function over() {
    var oOver = id('over');
    var oBtn = oOver.getElementsByClassName('btn')[0];
    bind(oBtn, 'touchend', function() {
        removeClass(oOver, 'pageShow');
    })
}
