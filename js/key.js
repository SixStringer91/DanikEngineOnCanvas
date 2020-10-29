//controls

(function() {
    const Keys = function(obj, enemy) {
        this.obj = obj;
        this.dt = this.obj.dt;
        this.enemy = enemy;
        //object with keys
        this.keys = {
            'W': 87,
            'S': 83,
            'A': 65,
            'D': 68,
            'Space': 32
        };
        this.swordAttack;
        this.sword;
        this.keyDown = {}
    }


    //проверка на близость к врагу (меньше 48пикселей)
    Keys.prototype.isEnemyNear = function(enemy = this.enemy, obj = this.obj) {
        destination = () => {
            let diffX = obj.playerX - enemy.playerX
            let diffY = obj.playerY - enemy.playerY
            return Math.floor(Math.sqrt(diffX * diffX + diffY * diffY))
        }
        if (destination() <= 56) {
            return true
        } else
            return false
    }



    //clear key in object
    Keys.prototype.clearKey = function(keyCode) {
        this.keyDown[keyCode] = false;
    }

    Keys.prototype.setKey = function(keyCode, obj = this.obj) {
        obj.keyNumb = keyCode
        this.keyDown[keyCode] = true;

    }

    //checking the pressed key
    Keys.prototype.isKeyDown = function(keyName) {
        return this.keyDown[this.keys[keyName]] === true;
    }


    //assign keys to control the character and drawing
    Keys.prototype.engine = function(obj = this.obj, enemy = this.enemy) {
        this.dt = obj.dt;
        if (obj.health <= 0) {
            obj.drawDeath();
        } else {
            if (this.isKeyDown('S')) {
                if (this.isKeyDown('S') && this.isKeyDown('A') && obj.keyNumb === 65) {
                    obj.playerX -= obj.speed * this.dt;
                    obj.drawImageLeft();
                } else if (this.isKeyDown('S') && this.isKeyDown('D') && obj.keyNumb === 68) {
                    obj.playerX += obj.speed * this.dt;
                    obj.drawImageRight();
                } else {
                    obj.playerY += obj.speed * this.dt;
                    obj.drawImageBottom();
                }
            } else if (this.isKeyDown('W')) {
                if (this.isKeyDown('W') && this.isKeyDown('A') && obj.keyNumb === 65) {
                    obj.playerX -= obj.speed * this.dt;

                    obj.drawImageLeft();
                } else if (this.isKeyDown('W') && this.isKeyDown('D') && obj.keyNumb === 68) {
                    obj.playerX += obj.speed * this.dt;
                    obj.drawImageRight();
                } else {
                    obj.playerY -= obj.speed * this.dt;
                    obj.drawImageTop();
                }
            } else if (this.isKeyDown('D')) {
                if (this.isKeyDown('D') && this.isKeyDown('S') && obj.keyNumb === 83) {
                    obj.playerY += obj.speed * this.dt;
                    obj.drawImageBottom();
                } else if (this.isKeyDown('D') && this.isKeyDown('W') && obj.keyNumb === 87) {
                    obj.playerY -= obj.speed * this.dt;
                    obj.drawImageTop();
                } else {
                    obj.playerX += obj.speed * this.dt;
                    obj.drawImageRight();
                }
            } else if (this.isKeyDown('A')) {
                if (this.isKeyDown('A') && this.isKeyDown('S') && obj.keyNumb === 83) {
                    obj.playerY += obj.speed * this.dt;
                    obj.drawImageBottom();
                } else if (this.isKeyDown('A') && this.isKeyDown('W') && obj.keyNumb === 87) {
                    obj.playerY -= obj.speed * this.dt;
                    obj.drawImageTop();
                } else {
                    obj.playerX -= obj.speed * this.dt;
                    obj.drawImageLeft();
                }

            } //fighting
            else if (this.isKeyDown('Space') || obj.attack) {
                obj.attack = true;
                if (obj.direction === 'bottom')
                    obj.drawAttackBottom();
                else if (obj.direction === 'top')
                    obj.drawAttackTop();
                else if (obj.direction === 'right')
                    obj.drawAttackRight();
                else if (obj.direction === 'left')
                    obj.drawAttackLeft();
                for (let i = 0; i < enemy.length; i++) {
                    if (obj.numAttack === 1 && !this.isEnemyNear(enemy[i]))
                        obj.sword.play()
                    else if (obj.numAttack === 4)
                        obj.attack = false
                    if (obj.numAttack === 1 && this.isEnemyNear(enemy[i]) && (enemy[i] !== obj &&
                            (obj.playerX < enemy[i].playerX && obj.direction === 'right') || (obj.playerX > enemy[i].playerX && obj.direction === 'left') || (obj.playerY < enemy[i].playerY && obj.direction === 'bottom') || (obj.playerY > enemy[i].playerY && obj.direction === 'top'))) {
                        obj.swordAttack.play();
                        if (!obj.frame)
                            enemy[i].health -= 20
                    }
                }
            } else {
                if (obj.direction === "left") {
                    obj.drawImageLeftStand()
                } else if (obj.direction === "right") {
                    obj.drawImageRightStand()
                } else if (obj.direction === "bottom") {
                    obj.drawImageBottomStand()
                } else if (obj.direction === "top") {
                    obj.drawImageTopStand()
                }
            }
        }
    }


    Game.Keys = Keys;
})()