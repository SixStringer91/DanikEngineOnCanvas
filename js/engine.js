//переменные
(function() {
    const Engine = function() {
        this.run = this.gameEngine.bind(this)
        this.frame = 0;
        this.time;
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d');
        this.barreth = new Game.Character('images/hero5.png', 18, 33, 8, 4, 320, 170); //гг(countX=18)
        this.viewport = new Game.Viewport();
        this.mainMap = new Game.MapStack();
        this.mainMap.viewport = this.viewport;
        this.title = new Game.MainTitle();
        this.barreth.sword = new Game.LoadAudio(['audio/sword.mp3']);
        this.barreth.swordAttack = new Game.LoadAudio(['audio/sword-attack.mp3']);
        this.title.endingSound.dead = new Game.LoadAudio(['audio/died.mp3']);
        this.title.endingSound.won = new Game.LoadAudio(['audio/bell.mp3']);
        this.spearAttack = new Game.LoadAudio(['audio/spear.mp3']);
        this.barreth.collider = new Game.Collision(this.barreth, this.mainMap.map, this.mainMap.tileObjects);

        // this.viewport.screen = [canvas.width, canvas.height];
        this.barreth.interface = new Game.Interface(this.barreth);
        this.enemyArray = [];
        this.title.grain = new Game.Grain();
        this.title.particle = new Game.Particle();
        //цикл создания врагов
        this.enemyArray.push(new Game.Character('images/skeleton.png', 24, 33, 6, 4, 150, 850));
        this.enemyArray.push(new Game.Character('images/skeleton.png', 24, 33, 6, 4, 160, 850));
        this.enemyArray.push(new Game.Character('images/skeleton.png', 24, 33, 6, 4, 2170, 870));
        this.enemyArray.push(new Game.Character('images/skeleton.png', 24, 33, 6, 4, 2150, 870));
        this.enemyArray.push(new Game.Character('images/orc.png', 24, 33, 6, 4, 120, 2000));
        this.enemyArray.push(new Game.Character('images/orc.png', 24, 33, 6, 4, 220, 2000));
        this.enemyArray.push(new Game.Character('images/orc.png', 24, 33, 6, 4, 320, 2000));
        this.enemyArray.push(new Game.Character('images/skeleton2.png', 24, 33, 6, 4, 2000, 2000));
        this.enemyArray.push(new Game.Character('images/skeleton2.png', 24, 33, 6, 4, 2100, 2000));
        this.enemyArray.push(new Game.Character('images/skeleton2.png', 24, 33, 6, 4, 2200, 2000));
        this.enemyProperties();
        this.restartArray = this.enemyArray.map((obj) => {
            return object = {
                x: obj.playerX,
                y: obj.playerY,
                health: obj.health
            }
        })
        this.keys = new Game.Keys(this.barreth, this.enemyArray);

    }

    Engine.prototype.enemyProperties = function() {
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].viewZone.offset = this.viewport.offset
            this.enemyArray[i].viewZone.start = this.viewport.startTile;
            this.enemyArray[i].viewZone.end = this.viewport.endTile;
            this.enemyArray[i].npcMove = new Game.NpcMove(this.enemyArray[i], this.barreth);
            this.enemyArray[i].npcMove.map = [...this.mainMap.map];
            this.enemyArray[i].collider = new Game.Collision(this.enemyArray[i], this.mainMap.map, this.mainMap.tileObjects);
            this.enemyArray[i].interface = new Game.Interface(this.enemyArray[i]);
            this.enemyArray[i].interface.viewport = this.viewport.offset;
            this.enemyArray[i].spearAttack = new Game.LoadAudio(['audio/spear.mp3']);
        }
        this.enemyArray.push(this.barreth);
    }

    //////////////////////////////////////////////////////////////////////////////
    Engine.prototype.gameEngine = function() {
            this.mainMap.viewport = {
                offset: this.viewport.offset,
                startTile: this.viewport.startTile,
                endTile: this.viewport.endTile
            }

            //расчет времени анимации
            let now = new Date().getTime(),
                dt = (now - (this.time || now)) / 1000 * 18;
            this.time = now;
            if (dt > 1) {
                dt = 1
            }
            let fCount;
            if (dt <= 1 && dt > 0.65) fCount = 0;
            else if (dt <= 0.65 && dt > 0.1) fCount = 1;
            //console.log(dt,fCount);
            this.enemyArray.forEach(obj => {
                    obj.dt = dt;
                    obj.frame = this.frame;
                    obj.viewZone.offset = this.viewport.offset;
                    obj.interface.viewport = this.viewport.offset;
                })
                //this.ctx.clearRect(0, 0, canvas.width, canvas.height);

            //обновляем вьюпорт
            this.viewport.update(this.barreth.playerX + 64 / 2, this.barreth.playerY + 64 / 2);
            this.ctx.fillStyle = '#000000';
            this.ctx.fillRect(0, 0, this.viewport.screen[0], this.viewport.screen[1]);
            //отрисовка нижней карты тайлов
            this.mainMap.drawMapAll();
            //отрисовка юнитов и гг
            this.npcCircle();
            //отрисовка верхней карты тайлов

            this.mainMap.drawMapObjects(this.mainMap.tileObjectsUp, this.mainMap.mapUp, this.mainMap.img);
            //интерфейс
            //ctx.fillRect(barreth.playerX+16,barreth.playerY+16,32,32)//--->>>collision square;

            this.barreth.interface.statistics();
            //победа/поражение
            if (this.barreth.health <= 0) {
                this.title.frame = this.frame;
                this.title.dead();
                if (this.keys.isKeyDown('Space') && this.title.opacity >= 1) {
                    this.title.opacity = 0;
                    this.title.endingSound.dead.stop();
                    this.title.musicPlay = true;
                    for (let i = 0; i < this.enemyArray.length; i++) {

                        this.enemyArray[i].health = this.restartArray[i].health;
                        this.enemyArray[i].playerX = this.restartArray[i].x;
                        this.enemyArray[i].playerY = this.restartArray[i].y;
                        this.enemyArray[i].num = 0;
                        this.enemyArray[i].numAttack = 0;
                        this.enemyArray[i].numDeath = 0;
                        this.enemyArray[i].pathFindX = Math.floor(this.enemyArray[i].playerX / 64)
                        this.enemyArray[i].pathFindY = Math.floor(this.enemyArray[i].playerY / 64)
                    }
                }
            } else {
                this.title.frame = this.frame;
                let deadEnemies = this.enemyArray.filter((obj) => {
                    if (obj.health <= 0 && obj !== this.barreth) return obj
                })
                if (deadEnemies.length >= this.enemyArray.length - 1) {
                    this.title.win();

                }

            }
            this.frame = this.frame <= fCount ? ++this.frame : this.frame = 0;
            requestAnimationFrame(this.run);
        }
        //отриcовка цикла анимации
    Engine.prototype.npcCircle = function() {
        let exceptionArr = [this.barreth];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].viewZone.start = this.viewport.startTile;
            this.enemyArray[i].viewZone.end = this.viewport.endTile;
            this.enemyArray[i].collider.npcArray = this.enemyArray
                .filter((obj) => {
                    if (obj !== this.enemyArray[i] && obj.health > 0) return obj
                })
                .map(obj => [obj.playerY, obj.playerX])
            if (this.enemyArray[i] !== this.barreth) {
                for (let e = 0; e < exceptionArr.length; e++) {
                    if (this.enemyArray[i].health <= 0) {
                        this.enemyArray[i].npcMove.squareMove();
                    } else if (exceptionArr[e].playerY > this.enemyArray[i].playerY - 8 && this.enemyArray[i].health > 0) {
                        exceptionArr.unshift(this.enemyArray[i])
                        break
                    } else if (exceptionArr[e].playerY <= this.enemyArray[i].playerY - 8 && this.enemyArray[i].health > 0) {
                        exceptionArr.push(this.enemyArray[i])
                        break
                    }
                }
            }
        }
        if (this.barreth.health <= 0) this.keys.engine();
        for (let i = 0; i < exceptionArr.length; i++) {
            // let viewZone = (exceptionArr[i].pathFindX>=viewport.startTile[0]&&exceptionArr[i].pathFindX<=viewport.endTile[0]&&exceptionArr[i].pathFindY>=viewport.startTile[1]&&exceptionArr[i].pathFindY<=viewport.endTile[1]);
            if (exceptionArr[i] === this.barreth && this.barreth.health >= 0) {
                this.keys.engine();
            } else if (exceptionArr[i] !== this.barreth) {
                exceptionArr[i].npcMove.squareMove()
                this.ctx.fillStyle = 'blue';
            }
        }
    }
    Engine.prototype.runGame = function() {
        let promise = new Promise((resolve) => {
            document.getElementById('tv').onload =
                this.title.textAnimation()

            let interdalID = setInterval(() => {
                if (this.title.loaded) {
                    delete this.title.grain;
                    if (this.keys.isKeyDown('Space') && this.title.animationEnd) {
                        delete this.title.particle;
                        this.title.gamePlay = true;
                        cancelAnimationFrame(this.title.requestID);
                        this.title.opacity = 0;
                        clearInterval(interdalID);
                        resolve();
                    }
                }
            }, 1000 / 30);
        });
        promise.then(() => {
            this.gameEngine();

        })
        window.onkeydown = (function(event) {
            this.keys.setKey(event.keyCode, this.barreth)
        }).bind(this)
        window.onkeyup = (function(event) {
            this.keys.clearKey(event.keyCode)
        }).bind(this);
    }



    //события клавиш


    Game.Engine = Engine
})()