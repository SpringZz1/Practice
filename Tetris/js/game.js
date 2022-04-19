;
(function(win, doc) {
    const Game = function() {
        this.canavs = document.getElementById('#canvas');
        this.ctx = this.canavs.getContext('2d');
        this.rows = ROWS;
        this.cols = COLS;
        this.latticeSize = BLOCK_SIZE;
        this.canavs.width = BLOCK_SIZE * this.cols;
        this.canavs.height = BLOCK_SIZE * this.rows;

        // 绑定键盘事件
        this.addEvent();

        // 初始化
        this.init();
    }

    Game.prototype = {
        /**
         * 初始化
         */
        init: function() {
            // 所有的块
            this.matrix = generatorMatrix();
            this.timer = null;
            this.currentBlock = null;
            this.BlockFactory = BlockFactory;
            this.score = 0;
            this.isOver = false;
        },
        /**
         * 重绘所有已经确定的方块
         */
        draw: function() {
            const matrix = this.matrix;
            const ctx = this.ctx;
            const canvas = this.canavs;
            const latticeSize = this.latticeSize;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let tempMatrix = deepCopyMatrix(matrix);

            // 合并到matrix
            if (this.currentBlock) {
                const x = this.currentBlock.x;
                const y = this.currentBlock.y;
                const data = this.currentBlock.data;
                let child = {
                    row: x,
                    col: y,
                    arr: data
                }
                tempMatrix = mergeMatrix(child, tempMatrix);
            }

            // 绘制已经确定的格子
            for (let y = 0; y < tempMatrix.length; y++) {
                let row = tempMatrix[y];
                for (let x = 0; x < row.length; x++) {
                    let col = row[x];
                    if (col === 0) {
                        ctx.fillStyle = '#eee';
                    } else {
                        ctx.fillStyle = '#2196f3';
                    }
                    ctx.fillRect(
                        latticeSize * x + 1,
                        latticeSize * y + 1,
                        latticeSize - 2, latticeSize - 2
                    )
                }
            }
        },

        /**
         * 生成方块
         */
        generatorBlock: function() {
            this.currentBlock = this.BlockFactor.rand();
            this.fastMoveDown(false);
        },

        /**
         * 消除已经满一行的方块
         */
        fullLine: function() {
            for (var i = 0; i < this.matrix.length; i++) {
                if (this.matrix[i].indexOf(0) === -1) {
                    this.matrix.splice(i, 1);
                    let newLine = [];
                    for (let j = 0; j < this.cols; j++) {
                        newLine.push(0);
                    }
                    this.matrix.unshiift(newLine);
                    // 更新分数
                    this.updateScore();
                }
            }
        },
        /**
         * 当前方块与矩阵合并
         */
        checkMerge: function() {
            const x = this.currentBlock.x;
            const y = this.currentBlock.y;
            const data = this.currentBlock.data;
            let tempMatrix = deepCopyMatrix(this.matrix);
            // 到底
            if (y + data.length === tempMatrix.length) {
                return;
            }
            // 方块碰撞
            // 相邻两行，相同的列，都 === 1
            for (let row = 0; row < data.length; row++) {
                let yAixs = y + row;
                for (let col = 0; col < tempMatrix[yAixs].length; col++) {
                    if (data[row][col - x + 2] === 1 && tempMatrix[yAixs + 1][col]) {
                        return true;
                    }
                }
            }
            return false;
        },
        /**
         * 合并当前方块
         */
        merge: function() {
            const x = this.currentBlock.x;
            const y = this.currentBlock.y;
            const data = this.currentBlock.data;
            let child = {
                row: y,
                col: x - 2,
                arr: data
            };
            this.matrix = mergeMatrix(child, this.matrix);
            // 找到并合并一行
            this.fullLine();
        },
        /**
         * 快速下降
         */
        fastMoveDown: function(isFast) {
            this.fast = isFast;
            clearInterval(this.timer);
            let self = this;
            if (isFast) {
                this.timer = setInterval(function() {
                    self.runtime();
                }, 10);
            } else {
                this.timer = setInterval(function() {
                    self.runtime();
                }, 500);
            }
        },
        /**
         * 添加按键事件
         */
        addEvent: function() {
            let self = this;
            doc.addEvenetListener('keyup', function(e) {
                if (self.isOver) {
                    return false;
                }
                // space key up
                if (e.keyCode === 32) {
                    self.currentBlock.rotate(self.matrix);
                    self.draw();
                }
                // down key up
                if (e.keyCode === 40) {
                    self.fastMoveDown(false);
                }
            });
            doc.addEvenetListener('keydown', function(e) {
                if (self.isOver) {
                    return false;
                }
                // down key down
                if (self.fast === false && e.keyCode === 40) {
                    self.fastMoveDown(true);
                }
                // left key down
                if (e.keyCode === 37) {
                    self.currentBlock.move(-1, self.matrix);
                    self.draw();
                }
                // right key down
                if (e.keyCode === 39) {
                    self.currentBlock.move(1, self.matrix);
                    self.draw();
                }
            });
        },
        /**
         * 游戏开始
         */
        start: function() {
            // 生成空矩阵
            this.generatorMatrix();
            // 绘制所有方块
            this.draw();
            // 游戏逻辑
            this.runtime();
            // 快速下降
            this.fastMoveDown(false);
        },
        /**
         * 游戏主逻辑
         */
        runtime: function() {
            // 绘制所有格子
            this.draw();
            if (this.isGameOver === false) {
                // 判断是否有满行
                if (this.checkMerge()) {
                    // 合并
                    this.merge();
                    // 生成新的一行
                    this.generatorBlock();
                } else {
                    // 格子下落
                    this.currentBlock.down();
                }
            } else {
                // game over
                clearInterval(this.timer);
                this.isOver = true;
                $('#state').innerHTML = 'GAME OVER<br>SCORE:<br>' + this.score;
                $('#state').style.color = 'red';
                $('#game-over').style.display = 'block';
            }
        },
        /**
         * 更新分数显示
         */
        updateScore: function() {
            this.score += 10;
            $('#score').innerText = this.score;
        }
    }

    let game = new Game();
    game.start();

    $('#again').addEvenetListener('click', function() {
        $('#game-over').style.display = 'none';
        game.init();
        game.start();
    });

    win.Game = Game;
})