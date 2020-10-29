(function() {
    const Collision = function(obj, array, tiles) {
        this.array = array;
        this.obj = obj;
        this.diff = 16;
        this.blockEdge = 64;
        this.blockXLeft;
        this.blockXRight;
        this.blockYTop;
        this.blockYBottom;
        this.bodyXLeft;
        this.bodyXRight;
        this.bodyYTop;
        this.bodyYBottom;
        this.collider;
        this.unwalkable = tiles.filter(obj => !obj.walkable).map(obj => obj.id)
        this.npcArray = 0;
    }
    Collision.prototype.isCollision = function() {

        for (let i = 0; i < this.array.length; i++) {

            for (let q = 0; q < this.array[i].length; q++) {
                this.unwalkable.forEach((tile) => {
                    if (this.array[i][q] === tile) {
                        this.walls(q, i, tile)
                    }
                })
                if (this.npcArray) {
                    this.npcArray.forEach((enem) => {
                        if (this.npcArray && (i === Math.floor(enem[0] / this.blockEdge) && q === Math.floor(enem[1] / this.blockEdge))) {

                            this.wallsEnemy(enem)
                        }
                    })
                }
            }
        }
    }

    Collision.prototype.wallsEnemy = function(tile) {
        let topCollision, bottomCollision, leftCollision, rightCollision
        this.diff = 16;
        this.blockXLeft = tile[1] + this.diff
        this.blockXRight = tile[1] + this.blockEdge - this.diff
        this.blockYTop = tile[0] + this.diff
        this.blockYBottom = tile[0] + this.blockEdge - this.diff
        this.bodyXLeft = this.obj.playerX + this.diff;
        this.bodyXRight = (this.obj.playerX + this.blockEdge) - this.diff;
        this.bodyYTop = this.obj.playerY + this.diff;
        this.bodyYBottom = (this.obj.playerY + this.blockEdge) - this.diff;
        topCollision = ((this.bodyXLeft === this.blockXLeft &&
                this.bodyXRight === this.blockXRight && this.bodyYTop < this.blockYBottom && this.bodyYTop > this.blockYTop) ||
            this.bodyYTop < this.blockYBottom &&
            this.bodyYTop > this.blockYTop &&
            this.bodyXLeft > this.blockXLeft &&
            this.bodyXLeft < this.blockXRight ||
            this.bodyYTop < this.blockYBottom &&
            this.bodyYTop > this.blockYTop &&
            this.bodyXRight > this.blockXLeft &&
            this.bodyXRight < this.blockXRight

        );
        bottomCollision = (
            (this.bodyXLeft === this.blockXLeft &&
                this.bodyYRight === this.blockYRight && this.bodyYBottom > this.blockYTop && this.bodyYBottom < this.blockYBottom) ||
            (this.bodyYBottom > this.blockYTop &&
                this.bodyYBottom < this.blockYBottom &&
                this.bodyXLeft > this.blockXLeft &&
                this.bodyXLeft < this.blockXRight) ||
            (this.bodyYBottom > this.blockYTop &&
                this.bodyYBottom < this.blockYBottom &&
                this.bodyXRight > this.blockXLeft &&
                this.bodyXRight < this.blockXRight)

        );
        leftCollision = (
            (this.bodyYTop === this.blockYTop &&
                this.bodyYBottom === this.blockYBottom && this.bodyXLeft < this.blockXRight && this.bodyXLeft > this.blockXLeft) ||
            (this.bodyYTop > this.blockYTop &&
                this.bodyYTop < this.blockYBottom &&
                this.bodyXLeft < this.blockXRight &&
                this.bodyXLeft > this.blockXLeft) ||
            (this.bodyYBottom < this.blockYBottom &&
                this.bodyYBottom > this.blockYTop &&
                this.bodyXLeft < this.blockXRight &&
                this.bodyXLeft > this.blockXLeft)

        );
        rightCollision = (
                (this.bodyYTop === this.blockYTop &&
                    this.bodyYBottom === this.blockYBottom && this.bodyXRight > this.blockXLeft && this.bodyXRight < this.blockXRight) ||
                (this.bodyYTop > this.blockYTop &&
                    this.bodyYTop < this.blockYBottom &&
                    this.bodyXRight > this.blockXLeft &&
                    this.bodyXRight < this.blockXRight) ||
                (this.bodyYBottom < this.blockYBottom &&
                    this.bodyYBottom > this.blockYTop &&
                    this.bodyXRight > this.blockXLeft &&
                    this.bodyXRight < this.blockXRight
                )
            )
            //top
        if (topCollision) {
            this.obj.collisionDirection.top = true;
            this.obj.enemyCollision = true;
            this.obj.collisionBlock.y = this.blockYBottom;

        }
        //bottom
        if (bottomCollision) {
            this.obj.collisionDirection.bottom = true;
            this.obj.enemyCollision = true;
            this.obj.collisionBlock.y = this.blockYTop - this.blockEdge;

        }
        //left
        if (leftCollision) {
            this.obj.collisionDirection.left = true;
            this.obj.enemyCollision = true;
            this.obj.collisionBlock.x = this.blockXRight;
        }

        //right
        if (rightCollision) {
            this.obj.collisionDirection.right = true;
            this.obj.enemyCollision = true;
            this.obj.collisionBlock.x = this.blockXLeft - this.blockEdge;
        }

    }




    Collision.prototype.walls = function(q, i, tile) {
        // if (this.array[i+1][q + 1] ===undefined) {
        //  // console.log(q + 1);
        // }
        let qDec, qInc, iDec, iInc, leftCollision, rightCollision, topCollision, bottomCollision;
        iDec = i - 1 < 0 ? iDec = i : iDec = i - 1;
        iInc = i + 1 > this.array.length - 1 ? iInc = i : iInc = i + 1;
        qDec = q - 1 < 0 ? qDec = q : qDec = q - 1;
        qInc = q + 1 > this.array[q].length - 1 ? qInc = q : qInc = q + 1;


        this.diff = 16;
        this.blockXLeft = q * this.obj.frameWidth;
        this.blockXRight = q * this.obj.frameWidth + this.obj.frameWidth;
        this.blockYTop = i * this.obj.frameHeight;
        this.blockYBottom = i * this.obj.frameHeight + this.obj.frameHeight;
        this.bodyXLeft = this.obj.playerX + this.diff;
        this.bodyXRight = (this.obj.playerX + this.obj.frameWidth) - this.diff;
        this.bodyYTop = this.obj.playerY + this.diff;
        this.bodyYBottom = (this.obj.playerY + this.obj.frameWidth) - this.diff;
        topCollision = (
            this.bodyYTop < this.blockYBottom &&
            this.bodyYTop > this.blockYTop &&
            this.bodyXLeft > this.blockXLeft &&
            this.bodyXLeft < this.blockXRight ||
            this.bodyYTop < this.blockYBottom &&
            this.bodyYTop > this.blockYTop &&
            this.bodyXRight > this.blockXLeft &&
            this.bodyXRight < this.blockXRight ||
            this.bodyXRight <= this.blockXRight && this.bodyXLeft >= this.blockXLeft &&
            (this.bodyYTop >= this.blockYTop && this.bodyYTop <= this.blockYBottom && ((this.array[iInc][qDec] === tile || this.array[i][qInc] === tile || this.array[i][qDec] === tile || this.array[iInc][q] === tile))));
        bottomCollision = (
            this.bodyYBottom > this.blockYTop &&
            this.bodyYBottom < this.blockYBottom &&
            this.bodyXLeft > this.blockXLeft &&
            this.bodyXLeft < this.blockXRight ||
            this.bodyYBottom > this.blockYTop &&
            this.bodyYBottom < this.blockYBottom &&
            this.bodyXRight > this.blockXLeft &&
            this.bodyXRight < this.blockXRight ||
            this.bodyXRight <= this.blockXRight && this.bodyXLeft >= this.blockXLeft &&
            (this.bodyYBottom <= this.blockYBottom && this.bodyYBottom >= this.blockYTop && (this.array[i][qInc] === tile || this.array[iInc][qInc] === tile || this.array[iInc][qDec] === tile || this.array[iDec][q] === tile)));
        leftCollision = (
            this.bodyYTop > this.blockYTop &&
            this.bodyYTop < this.blockYBottom &&
            this.bodyXLeft < this.blockXRight &&
            this.bodyXLeft > this.blockXLeft ||
            this.bodyYBottom < this.blockYBottom &&
            this.bodyYBottom > this.blockYTop &&
            this.bodyXLeft < this.blockXRight &&
            this.bodyXLeft > this.blockXLeft ||
            this.bodyYTop <= this.blockYTop &&
            this.bodyYBottom >= this.blockYBottom && (this.bodyXLeft <= this.blockXRight && this.bodyXLeft >= this.blockXLeft && (this.array[iDec][qInc] === tile || this.array[iInc][q] === tile || this.array[iDec][q] === tile)));
        rightCollision = (
            this.bodyYTop > this.blockYTop &&
            this.bodyYTop < this.blockYBottom &&
            this.bodyXRight > this.blockXLeft &&
            this.bodyXRight < this.blockXRight ||
            this.bodyYBottom < this.blockYBottom &&
            this.bodyYBottom > this.blockYTop &&
            this.bodyXRight > this.blockXLeft &&
            this.bodyXRight < this.blockXRight ||
            this.bodyYTop <= this.blockYTop &&
            this.bodyYBottom >= this.blockYBottom && (this.bodyXRight >= this.blockXLeft &&
                this.bodyXRight <= this.blockXRight &&
                (this.array[iDec][qDec] === tile || this.array[iInc][q] === tile || this.array[iDec][q] === tile)));

        //top
        if (topCollision) {
            this.obj.collisionDirection.top = true;
            this.obj.collisionBlock.y = this.blockYBottom;

        }
        //bottom
        if (bottomCollision) {
            this.obj.collisionDirection.bottom = true;
            this.obj.collisionBlock.y = this.blockYTop - this.blockEdge;
        }
        //left
        if (leftCollision) {
            this.obj.collisionDirection.left = true;
            this.obj.collisionBlock.x = this.blockXRight;
        }

        //right
        if (rightCollision) {
            this.obj.collisionDirection.right = true;
            this.obj.collisionBlock.x = this.blockXLeft - this.blockEdge;
        }
    }
    Game.Collision = Collision;
})()