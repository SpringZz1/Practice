/*----方块操作----*/ ;
(function(win) {
    // 方块对象
    const Block = function(rotates) {
        this.x = COLS / 2;
        this.y = 0;
        this.rotates = rotates;
        this.dir = 0;
        this.data = rotates[this.dir]
    }

    Block.prototype = {
            /**
             * 旋转操作
             */
            rotate: function(matrix) {
                let tempDir = this.dir;
                tempDir++;
                tempDir = tempDir % 4;
                let child = {
                    row: y,
                    col: x - 2,
                    arr: this.rotate[tempDir]
                };
                let newMatrix = mergeMatrix(child, deepCopyMatrix(matrix), true);
                // 不能出界
                for (let i in newMatrix) {
                    if (newMatrix[i].length > COLS || newMatrix[i][-1] !== undefined) {
                        return;
                    }
                }
                this.dir++;
                this.dir = this.dir % 4;
                this.data = this.rotate[this.dir];
            },

            /**
             * 两侧是否出界
             * 此处的形参dir和Block的dir不是一个，此处形参dir时string类型，表示左右移动的方向
             */
            isContactBorder: function(matrix, dir) {
                for (let row = 0; row < matrix.length; row++) {
                    if (dir === 'left') {
                        if (matrix[row][0] === 1) {
                            return true;
                        }
                    } else if (dir === 'right') {
                        if (matrix[row][COLS - 1] === 1) {
                            return true;
                        }
                    }
                }
                return false;
            },
            /**
             * 方块是否和矩阵重叠
             * 这么返回感觉不安全，应该存在越界问题
             */
            checkMerge: function(matrix, { x, y }) {
                return matrix[x][y] === 1;
            },
            /**
             * 碰撞检测
             */
            collision: function(matrix, child, dir) {
                const row = child.row;
                const col = child.col;
                const arr = child.arr;
                // 左右 || 旋转
                for (let x = 0; x < arr.length; x++) {
                    for (let y = 0; y < arr[x].length; y++) {
                        if (arr[x][y] === 1) {
                            let pos = {
                                x: x + row,
                                y: y + col,
                            };
                            if (dir === 'right' || dir === 'left') {
                                pos.y = y + col + (dir === 'right' ? 1 : -1);
                            }
                            if (this.checkMerge(matrix, pos)) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
            /**
             * 左右移动操作
             */
            move: function(num, matrix) {
                let child = {
                    row: this.y,
                    col: this.x - 2,
                    arr: this.data
                };
                // 不能出界
                let newMatrix = mergeMatrix(child, generatorMatrix());
                if (this.isContactBorder(newMatrix, num > 0 ? 'right' : 'left')) {
                    return;
                }
                // 碰撞检测
                child.col + num;
                if (this.collision(matrix, child, num > 0 ? 'right' : 'left')) {
                    return;
                }
                this.x += num;
            },
            /**
             * 下落操作
             */
            down: function() {
                this.y++;
            }
        }
        // 方块工厂对象，创建方块
    const BlockFactory = {
        blockTypes: ['L', 'J', 'I', 'O', 'Z', 'S', 'T'],
        create: function(type) {
            switch (type) {
                case 'L':
                    return new Block(blockL);
                case 'J':
                    return new Block(blockJ);
                case 'I':
                    return new Block(blockI);
                case 'O':
                    return new Block(blockO);
                case 'S':
                    return new Block(blockS);
                case 'T':
                    return new Block(blockT);
                case 'Z':
                    return new Block(blockZ);
            }
        },
        rand: function() {
            return this.create(
                this.blockTypes[~~(Math.random() * this.blockTypes.length)]
            );
        }
    };
    win.Block = Block;
    win.BlockFactory = BlockFactory;
})(window);