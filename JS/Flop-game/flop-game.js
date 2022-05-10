let flopGame = {
    el: '', // 父元素
    level: 0, // 当前游戏难度
    blocks: 0, // 牌的总数
    gameWidth: 600, // 游戏区域宽度，单位px
    gameHeight: 600, // 游戏区高度，单位px
    dataArr: [], // 数据数组，用来存放牌的信息
    judgeArr: [], // 判断数组，用来判断被翻转的牌的信息
    turnNum: 0, // 记录已经翻转的总数
    picNum: 0, // 牌的总数
    maxLevel: 3, // 游戏最高难度设定为3
    init: function(option) {
        this.initData(option);
        this.render();
        this.handle();
    },
    initData: function(option) {
        this.option = option;
        this.el = el;
        this.level = option.level > this.maxLevel ? maxLevel : option.level;
        this.blocks = (this.level * 2) * (this.level * 2);
        this.getdataArr();
    },
    getdataArr: function() {
        // 获取数据数组
        // 利用Array.sort()乱序
        let randomArr = this.randomArr(); // 获取随机数组
        let halfBlocks = this.blocks / 2; // 得到一半的牌数
        let dataArr = [];

        for (let i = 0; i < halfBlocks; i++) {
            let num = randomArr[i];
            let info = {
                url: './css' + num + '.png',
                id: num
            }
            dataArr.push(info, info);
        }
        this.dataArr = this.shuffle(dataArr);
    },
    randomArr: function() {
        // 返回随机数组
        // 数组中每一项为0到count的数字
        let picNum = this.picNum;
        let arr = [];
        for (let i = 0; i < picNum; i++) {
            arr.push(i + 1);
        }
        return this.shuffle(arr);
    },
    shuffle: function(arr) {
        // 打乱牌序
        // 使用Array.sort()
        return arr.sort(function() {
            return 0.5 - Math.random();
        })
    },
    render: function() {
        // 渲染元素
        let blocks = this.blocks;
        let gameWidth = this.gameHeight;
        let gameHeight = this.gameHeight;
        let level = this.level;
        let blockWidth = gameWidth / (level * 2);
        let blocksHeight = gameHeight / (level * 2);

        // DOM操作
        for (let i = 0; i < blocks; i++) {
            let info = dataArr[i];
            let oBlock = document.createElement('div');
            let oPic = document.createElement('div');
            oPic.style.backgroundImage = 'url(' + info.url + ')';
            oBlock.style.width = blockWidth + 'px';
            oBlock.style.height = blocksHeight + 'px';
            oBlock.picid = info.id;
            oPic.setAttribute('class', 'pic');
            oPic.setAttribute('class', 'block');
            oBlock.appendChild(oPic);
            this.el.appendChild(oBlock);
        }
    },
    handle: function() {
        /**
         * 监听父元素的点击事件
         * 通过时间委托判断点击
         */
        let self = this;
        this.el.onclick = function(e) {
            let dom = e.target;
            let isBlock = dom.classList.contains('block');
            if (isBlock) {
                self.handleBlock(dom);
            }
        }
    },
    handleBlock: function(dom) {
        /**
         * 点击未翻转成功的牌时
         * 如果点击了两张牌，则判断是否是一张牌
         */
        let picId = dom.picId;
        let judgeArr = this.judgeArr;
        let judgeLength = judgeArr.push({
            id: picId,
            dom: dom
        });
        dom.classList.add('on');

        if (judgeLength === 2) {
            this.judgePic();
        }
    },
    judgePic: function() {
        /**
         * 判断被翻转的牌是不是同一个
         * 若两个牌的id相同，则是翻转成功
         * 否则翻转失败，将牌翻回去
         */

        let judgeArr = this.judgeArr;
        let isSamePic = judgeArr[0].id === judgeArr[1].id;

        if (isSamePic) {
            this.turnNum += 2;
        } else {
            let picDom1 = judgeArr[0].dom;
            let picDom2 = judgeArr[1].dom;
            setTimeout(function() {
                picDom1.classList.remove('on');
                picDom2.classList.remove('on');
            }, 800)
        }
        judgeArr.length = 0;
    },
    judgeWin: function() {
        /**
         * 判断游戏是否胜利
         * 如果翻转成功的个数等于牌的总个数，则成功
         */
        if (this.turnNum === this.blocks) {
            setTimeout(function() {
                alert('胜利');
            }, 300)
        }
    }
}

// 游戏启动
flopGame.init({
    el: document.getElementById('game'),
    level: 2
})