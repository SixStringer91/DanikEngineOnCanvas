(function() {
    const Character = function(path, countX, countY, speed, frameCount, playerX = 640, playerY = 640) {
        this.ctx = document.getElementById('canvas').getContext('2d');
        this.enemyCollision = false;
        this.diff = 16;
        this.dt = 0;
        this.frame;
        this.health = 100;
        this.width = 0;
        this.height = 0;
        this.countX = countX;
        this.countY = countY;
        this.loaded = false;
        this.playerX = playerX;
        this.playerY = playerY + 32;
        this.pathFindX = Math.floor(this.playerX / 64);
        this.pathFindY = Math.floor(this.playerY / 64);
        this.speed = speed;
        this.num = 0;
        this.numDeath = 0;
        this.numAttack = 0;
        this.frameWidth;
        this.frameHeight;
        this.keyNumb = 83;
        this.direction = "bottom";
        this.loadImage(path);
        this.frameCount = frameCount;
        this.collisionBlock = {
            x: 0,
            y: 0
        };
        this.collisionDirection = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
        this.attack = false;
        this.interface;
        this.viewZone = {
            start: [],
            end: [],
            offset: []
        };
    }
    Character.prototype.viewZoneCheck = function() {
        return (this.pathFindX >= this.viewZone.start[0] && this.pathFindX <= this.viewZone.end[0] && this.pathFindY >= this.viewZone.start[1] && this.pathFindY <= this.viewZone.end[1]);
    }
    Character.prototype.loadImage = function(path) {
            this.img = new Image();
            this.img.src = path;
            this.img.addEventListener('load', (function() {
                this.width = this.img.width / this.countX;
                this.height = this.img.height / this.countY;
                this.frameWidth = this.img.width / this.countX;
                this.frameHeight = this.img.height / this.countY;
                this.loaded = true
            }).bind(this));
            // if (this.loaded) {
            //   this.ctx.fillStyle = "red"
            // }

        }
        //moves
        //top
    Character.prototype.drawImageTop = function() {
            this.direction = 'top';
            this.collider.isCollision();
            this.collisionDirection.bottom = false
            this.collisionDirection.left = false
            this.collisionDirection.right = false
            this.width = this.frameWidth;
            this.height = this.frameHeight * (0 + 8);

            if (this.playerY <= this.collisionBlock.y && this.collisionDirection.top) {
                this.playerY = this.collisionBlock.y - this.diff
                this.pathFindY = Math.floor((this.collisionBlock.y + 32) / 64)
                this.pathFindY = this.pathFindY < 0 ? this.pathFindY = 0 : this.pathFindY > 39 ? this.pathFindY = 39 : this.pathFindY = Math.floor((this.collisionBlock.y + 32) / 64);
                this.collisionBlock.y = NaN;

            } else {
                this.pathFindY = Math.floor((this.playerY + 32) / 64);
                this.pathFindY = this.pathFindY < 0 ? this.pathFindY = 0 : this.pathFindY > 39 ? this.pathFindY = 39 : this.pathFindY = Math.floor((this.playerY + 32) / 64);
            }
            if (this.playerY <= 0 + this.diff) {
                this.playerY = 0 + this.diff;
            }
            if (!this.frame) {
                if (this.frameCount !== undefined) {
                    this.num = this.num < this.frameCount - 1 ? this.num += 1 : this.num = 0;
                } else {
                    this.num = this.num < this.countX - 1 ? this.num += 1 : this.num = 0;
                }
            }
            this.ctx.fillStyle = "red";
            if (this.viewZoneCheck()) {
                this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
            }
            this.numAttack = 0;
        }
        //bottom
    Character.prototype.drawImageBottom = function() {
            this.direction = 'bottom';
            this.collider.isCollision();
            this.collisionDirection.top = false;
            this.collisionDirection.left = false;
            this.collisionDirection.right = false;
            this.width = this.frameWidth;
            this.height = this.frameHeight * (2 + 8);

            if (this.playerY >= this.collisionBlock.y && this.collisionDirection.bottom) {
                this.playerY = this.collisionBlock.y + this.diff;
                this.pathFindY = Math.floor((this.collisionBlock.y + this.diff) / 64);
                this.pathFindY = this.pathFindY < 0 ? this.pathFindY = 0 : this.pathFindY > 39 ? this.pathFindY = 39 : this.pathFindY = Math.floor((this.collisionBlock.y + this.diff) / 64);
                this.collisionBlock.y = NaN;
            } else {
                this.pathFindY = Math.floor((this.playerY + this.diff) / 64);
                this.pathFindY = this.pathFindY < 0 ? this.pathFindY = 0 : this.pathFindY > 39 ? this.pathFindY = 39 : this.pathFindY = Math.floor((this.playerY + this.diff) / 64);
            }
            if (this.playerY >= 2560 - this.frameHeight / 2) {
                this.playerY = 2560 - this.frameHeight / 2;
            }
            if (!this.frame) {
                if (this.frameCount !== undefined) {
                    this.num = this.num < this.frameCount - 1 ? this.num += 1 : this.num = 0;
                } else {
                    this.num = this.num < this.countX - 1 ? this.num += 1 : this.num = 0;
                }
            }
            this.ctx.fillStyle = "red";
            if (this.viewZoneCheck()) {
                this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
            }
            this.collisionDirection.top = false;
            this.numAttack = 0;
        }
        //left
    Character.prototype.drawImageLeft = function() {
            this.direction = 'left';
            this.collider.isCollision();
            this.collisionDirection.right = false;
            this.collisionDirection.top = false;
            this.collisionDirection.bottom = false;
            this.width = this.frameWidth;
            this.height = this.frameHeight * (1 + 8);

            if (this.playerX <= this.collisionBlock.x && this.collisionDirection.left) {
                this.playerX = this.collisionBlock.x - this.diff;
                this.pathFindX = Math.floor((this.collisionBlock.x + 32) / 64);
                this.pathFindX = this.pathFindX < 0 ? this.pathFindX = 0 : this.pathFindX > 39 ? this.pathFindX = 39 : this.pathFindX = Math.floor((this.collisionBlock.x + 32) / 64);
                this.collisionBlock.x = NaN;

            } else {
                this.pathFindX = Math.floor((this.playerX + 32) / 64);
                this.pathFindX = this.pathFindX < 0 ? this.pathFindX = 0 : this.pathFindX > 39 ? this.pathFindX = 39 : this.pathFindX = Math.floor((this.playerX + 32) / 64);
            }
            if (this.playerX <= 0) {
                this.playerX = 0;
            }
            if (!this.frame) {
                if (this.frameCount !== undefined) {
                    this.num = this.num < this.frameCount - 1 ? this.num += 1 : this.num = 0;
                } else {
                    this.num = this.num < this.countX - 1 ? this.num += 1 : this.num = 0;
                }
            }
            this.ctx.fillStyle = "red";
            if (this.viewZoneCheck()) {
                this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
                this.collisionDirection.right = false;
            }
            this.numAttack = 0;
        }
        //right
    Character.prototype.drawImageRight = function() {
            this.direction = 'right';
            this.collider.isCollision();
            this.collisionDirection.left = false
            this.collisionDirection.top = false
            this.collisionDirection.bottom = false
            this.width = this.frameWidth;
            this.height = this.frameHeight * (3 + 8);

            if (this.playerX >= this.collisionBlock.x && this.collisionDirection.right) {

                this.playerX = this.collisionBlock.x + this.diff
                this.pathFindX = Math.floor((this.collisionBlock.x) / 64);
                this.pathFindX = this.pathFindX < 0 ? this.pathFindX = 0 : this.pathFindX > 39 ? this.pathFindX = 39 : this.pathFindX = Math.floor((this.collisionBlock.x) / 64);
                this.collisionBlock.x = NaN;
            } else {
                this.pathFindX = Math.floor((this.playerX + this.diff) / 64);
                this.pathFindX = this.pathFindX < 0 ? this.pathFindX = 0 : this.pathFindX > 39 ? this.pathFindX = 39 : this.pathFindX = Math.floor((this.playerX + this.diff) / 64);
            }
            if (this.playerX >= 2560 - this.frameHeight) {
                this.playerX = 2560 - this.frameHeight;
            }
            if (!this.frame) {
                if (this.frameCount !== undefined) {
                    this.num = this.num < this.frameCount - 1 ? this.num += 1 : this.num = 0;
                } else {
                    this.num = this.num < this.countX - 1 ? this.num += 1 : this.num = 0;
                }
            }
            this.ctx.fillStyle = "red";
            if (this.viewZoneCheck()) {
                this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
            }
            this.collisionDirection.left = false
            this.numAttack = 0;
        }
        //stand
    Character.prototype.drawImageRightStand = function() {
        if (this.num === 0 && this.health !== 100 && !this.frame) this.health++
            this.width = this.frameWidth;
        this.height = this.health < 100 ? this.frameHeight * 3 : this.frameHeight * 7;
        if (!this.frame) this.num = this.num < 6 ? this.num += 1 : this.num = 0;
        if (this.viewZoneCheck()) {
            this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
        }
        this.numAttack = 0;
    }
    Character.prototype.drawImageLeftStand = function() {
        if (this.num === 0 && this.health !== 100 && !this.frame) this.health++
            this.width = this.frameWidth;
        this.height = this.health < 100 ? this.frameHeight * 1 : this.frameHeight * 5;
        if (!this.frame) this.num = this.num < 6 ? this.num += 1 : this.num = 0;
        if (this.viewZoneCheck()) {
            this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
        }
        this.numAttack = 0;
    }

    Character.prototype.drawImageTopStand = function() {
        if (this.num === 0 && this.health !== 100 && !this.frame) this.health++

            this.width = this.frameWidth;
        this.height = this.health < 100 ? this.frameHeight * 0 : this.frameHeight * 4;
        if (!this.frame) this.num = this.num < 6 ? this.num += 1 : this.num = 0;
        if (this.viewZoneCheck()) {
            this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
        }
        this.numAttack = 0;
    }
    Character.prototype.drawImageBottomStand = function() {
            if (this.num === 0 && this.health !== 100 && !this.frame) this.health++
                this.width = this.frameWidth;
            this.height = this.health < 100 ? this.frameHeight * 2 : this.frameHeight * 6;
            if (!this.frame) this.num = this.num < 6 ? this.num += 1 : this.num = 0;
            if (this.viewZoneCheck()) {
                this.ctx.drawImage(this.img, this.width * this.num, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight);
            }
            this.numAttack = 0;
        }
        //attack
    Character.prototype.drawAttackBottom = function() {
        this.width = this.frameWidth * 3;
        this.height = ((this.frameHeight * 3) * 9) + ((this.frameHeight * 2) - this.frameHeight);

        if (!this.frame) this.numAttack = this.numAttack < 5 ? this.numAttack += 1 : this.numAttack = 0;
        if (this.viewZoneCheck()) {
            this.ctx.drawImage(this.img, (this.width * this.numAttack), this.height, this.width, this.frameHeight * 3, this.viewZone.offset[0] + (this.playerX - this.frameWidth), this.viewZone.offset[1] + ((this.playerY - this.frameHeight / 2)), this.width, this.frameHeight * 3);
        }
        this.num = 0
    }
    Character.prototype.drawAttackTop = function() {
        this.width = this.frameWidth * 3;
        this.height = ((this.frameHeight * 3) * 7) + ((this.frameHeight * 2) - this.frameHeight * 2)
        if (!this.frame) this.numAttack = this.numAttack < 5 ? this.numAttack += 1 : this.numAttack = 0;
        if (this.viewZoneCheck()) {
            this.ctx.drawImage(this.img, (this.width * this.numAttack), this.height, this.width, this.frameHeight * 3, this.viewZone.offset[0] + (this.playerX - this.frameWidth), this.viewZone.offset[1] + ((this.playerY - this.frameHeight / 2) - this.frameHeight), this.width, this.frameHeight * 3);
        }
        this.num = 0
    }
    Character.prototype.drawAttackRight = function() {
        this.width = this.frameWidth * 3;
        this.height = ((this.frameHeight * 3) * 10) + ((this.frameHeight * 2) - this.frameHeight);
        if (!this.frame) this.numAttack = this.numAttack < 5 ? this.numAttack += 1 : this.numAttack = 0;
        if (this.viewZoneCheck()) {
            this.ctx.drawImage(this.img, (this.width * this.numAttack), this.height, this.width, this.frameHeight * 3, this.viewZone.offset[0] + (this.playerX - this.frameWidth), this.viewZone.offset[1] + ((this.playerY - this.frameHeight / 2)), this.width, this.frameHeight * 3);
        }
        this.num = 0
    }
    Character.prototype.drawAttackLeft = function() {
        this.width = this.frameWidth * 3;
        this.height = ((this.frameHeight * 3) * 8) + ((this.frameHeight * 2) - this.frameHeight);
        if (!this.frame) this.numAttack = this.numAttack < 5 ? this.numAttack += 1 : this.numAttack = 0;
        if (this.viewZoneCheck()) {
            this.ctx.drawImage(this.img, (this.width * this.numAttack), this.height, this.width, this.frameHeight * 3, this.viewZone.offset[0] + (this.playerX - this.frameWidth), this.viewZone.offset[1] + ((this.playerY - this.frameHeight / 2)), this.width, this.frameHeight * 3);
        }
        this.num = 0
    }

    Character.prototype.drawDeath = function() {

        // this.dead = true;
        this.width = this.frameWidth;
        this.height = (this.frameHeight * 20)
        if (!this.frame) this.numDeath = this.numDeath !== 5 ? ++this.numDeath : this.numDeath = 5;
        // if(this.viewZoneCheck()){
        this.ctx.drawImage(this.img, this.width * this.numDeath, this.height, this.width, this.frameHeight, this.viewZone.offset[0] + this.playerX, this.viewZone.offset[1] + this.playerY - 32, this.width, this.frameHeight); //}
        this.numAttack = 0
    }

    Game.Character = Character;
})()