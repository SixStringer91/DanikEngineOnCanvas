(function () {
	const Engine = function () {
		this.run = this.gameEngine.bind(this);
		this.frame = 0;
		this.time;
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.barreth = new Game.Character(
			"images/hero5.png",18,33,8,4,320,170); //player(countX=18)
		this.viewport = new Game.Viewport();
		this.mainMap;
		this.title = new Game.MainTitle();
		this.barreth.sword = new Game.LoadAudio(["audio/sword.mp3"]);
		this.barreth.swordAttack = new Game.LoadAudio(["audio/sword-attack.mp3"]);
		this.title.endingSound.dead = new Game.LoadAudio(["audio/died.mp3"]);
		this.title.endingSound.won = new Game.LoadAudio(["audio/bell.mp3"]);
		this.spearAttack = new Game.LoadAudio(["audio/spear.mp3"]);
		this.barreth.interface = new Game.Interface(this.barreth);
		this.enemyArray = [];
		this.restartArray = [];
		this.keys;
		this.title.grain = new Game.Grain();
		this.title.particle = new Game.Particle();
		this.dBCheck();
	};

Engine.prototype.dBCheck = function(){
	this.getData(`./db/tilesmap.json`).then(function(data){
		const {path,tileObjects,map,tileObjectsUp,mapUp} = data; 
		this.mainMap = new Game.MapStack(path,tileObjects,map,tileObjectsUp,mapUp);
		this.mainMap.viewport = this.viewport;
		this.barreth.collider = new Game.Collision(
			this.barreth,
			this.mainMap.map,
			this.mainMap.tileObjects
		);
		this.getData(`./db/enemies.json`).then(
			function (data) {
				this.enemyProperties(data);
			}.bind(this)
		);
	}.bind(this));


	
}

	Engine.prototype.enemyProperties = function (data) {
		data.forEach(function (obj) {
			this.enemyArray.push(
				new Game.Character(obj.src, 24, 33, 6, 4, obj.coords[0], obj.coords[1])
			);
		}, this);

		this.enemyArray.forEach(function (obj) {
			obj.viewZone.offset = this.viewport.offset;
			obj.viewZone.start = this.viewport.startTile;
			obj.viewZone.end = this.viewport.endTile;
			obj.npcMove = new Game.NpcMove(obj, this.barreth);
			obj.npcMove.map = [...this.mainMap.map];
			obj.collider = new Game.Collision(
				obj,
				this.mainMap.map,
				this.mainMap.tileObjects
			);
			obj.interface = new Game.Interface(obj);
			obj.interface.viewport = this.viewport.offset;
			obj.spearAttack = new Game.LoadAudio(["audio/spear.mp3"]);
		}, this);

		this.enemyArray.push(this.barreth);

		this.restartArray = this.enemyArray.map(function (obj) {
			return (object = {
				x: obj.playerX,
				y: obj.playerY,
				health: obj.health,
			});
		});
		this.keys = new Game.Keys(this.barreth, this.enemyArray);
	};

	//////////////////////////////////////////////////////////////////////////////
	Engine.prototype.getData = async function (url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(
				`Ошибка по адресу ${url}, статус ошибки ${response.status}!`
			);
		}
		return await response.json();
	};

	Engine.prototype.gameEngine = function () {
		this.mainMap.viewport = {
			offset: this.viewport.offset,
			startTile: this.viewport.startTile,
			endTile: this.viewport.endTile,
		};

		//расчет времени анимации
		let now = new Date().getTime(),
			dt = ((now - (this.time || now)) / 1000) * 18;
		this.time = now;
		if (dt > 1) {
			dt = 1;
		}
		let fCount;
		if (dt <= 1 && dt > 0.65) fCount = 0;
		else if (dt <= 0.65 && dt > 0.1) fCount = 1;
		this.enemyArray.forEach(function (obj) {
			obj.dt = dt;
			obj.frame = this.frame;
			obj.viewZone.offset = this.viewport.offset;
			obj.interface.viewport = this.viewport.offset;
		}, this);


		//declare viewport
		this.viewport.update(
			this.barreth.playerX + 64 / 2,
			this.barreth.playerY + 64 / 2
		);
	//drawing animation circle
		this.ctx.clearRect(0, 0, this.viewport.screen[0], this.viewport.screen[1]);
		// this.ctx.fillStyle = "#000000";
		// this.ctx.fillRect(0, 0, this.viewport.screen[0], this.viewport.screen[1]);
		//drawing low lvl tileMap
		this.mainMap.drawMapAll();
		//drawing player and enemies
		this.npcCircle();
		//drawind hight lvl tilemap

		this.mainMap.drawMapObjects
		(
			this.mainMap.tileObjectsUp,
			this.mainMap.mapUp,
			this.mainMap.img
		);
		//interface

		//this.ctx.fillRect(this.barreth.playerX+16,this.barreth.playerY+16,32,32)//--->>>collision square;

		this.barreth.interface.statistics();
		//win/loose
		if (this.barreth.health <= 0) {
			this.title.frame = this.frame;
			this.title.dead();
			if (this.keys.isKeyDown("Space") && this.title.opacity >= 1) {
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
					this.enemyArray[i].pathFindX = Math.floor(
						this.enemyArray[i].playerX / 64
					);
					this.enemyArray[i].pathFindY = Math.floor(
						this.enemyArray[i].playerY / 64
					);
				}
			}
		} else {
			this.title.frame = this.frame;
			let deadEnemies = this.enemyArray.filter(function (obj) {
				if (obj.health <= 0 && obj !== this.barreth) return obj;
			}, this);
			if (deadEnemies.length >= this.enemyArray.length - 1) {
				this.title.win();
			}
		}
		this.frame = this.frame <= fCount ? ++this.frame : (this.frame = 0);
		requestAnimationFrame(this.run);
	};

	Engine.prototype.npcCircle = function () {

		let exceptionArr = [this.barreth];
		for (let i = 0; i < this.enemyArray.length; i++) {
			this.enemyArray[i].viewZone.start = this.viewport.startTile;
			this.enemyArray[i].viewZone.end = this.viewport.endTile;
			this.enemyArray[i].collider.npcArray = this.enemyArray
				.filter(function (obj) {
					if (obj !== this.enemyArray[i] && obj.health > 0) return obj;
				}, this)
				.map(function (obj) {
					return [obj.playerY, obj.playerX];
				}, this);
			if (this.enemyArray[i] !== this.barreth) {
				for (let e = 0; e < exceptionArr.length; e++) {
					if (this.enemyArray[i].health <= 0) {
						this.enemyArray[i].npcMove.squareMove();
					} else if (
						exceptionArr[e].playerY > this.enemyArray[i].playerY - 8 &&
						this.enemyArray[i].health > 0
					) {
						exceptionArr.unshift(this.enemyArray[i]);
						break;
					} else if (
						exceptionArr[e].playerY <= this.enemyArray[i].playerY - 8 &&
						this.enemyArray[i].health > 0
					) {
						exceptionArr.push(this.enemyArray[i]);
						break;
					}
				}
			}
		}
		if (this.barreth.health <= 0) this.keys.engine();
		for (let i = 0; i < exceptionArr.length; i++) {
			if (exceptionArr[i] === this.barreth && this.barreth.health >= 0) {
				this.keys.engine();
			} else if (exceptionArr[i] !== this.barreth) {
				exceptionArr[i].npcMove.squareMove();
				this.ctx.fillStyle = "blue";
			}
		}
	};

	Engine.prototype.runGame = function () {
		const promise = new Promise(
			function (resolve) {
				document.getElementById("tv").onload = this.title.textAnimation();

				const interdalID = setInterval(
					function () {
						if (this.title.loaded) {
							delete this.title.grain;
							if (this.keys.isKeyDown("Space") && this.title.animationEnd) {
								delete this.title.particle;
								this.title.gamePlay = true;
								cancelAnimationFrame(this.title.requestID);
								this.title.opacity = 0;
								clearInterval(interdalID);
								resolve();
							}
						}
					}.bind(this),
					1000 / 30
				);
			}.bind(this)
		);
		promise.then(
			function () {
				this.gameEngine();
			}.bind(this)
		);
		window.onkeydown = function (event) {
			this.keys.setKey(event.keyCode, this.barreth);
		}.bind(this);
		window.onkeyup = function (event) {
			this.keys.clearKey(event.keyCode);
		}.bind(this);
	};

	//keyboard events

	Game.Engine = Engine;
})();
