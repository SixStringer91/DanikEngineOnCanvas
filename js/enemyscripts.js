(function () {
	const NpcMove = function (obj, player) {
		this.obj = obj;
		this.dt = this.obj.dt;
		this.objStartLoc = {
			pathFindX: obj.pathFindX,
			pathFindY: obj.pathFindY,
		};
		this.player = player;
		this.counter = 5;
		this.map;
		this.finalPath;
		this.indexPath = 0;
		this.pathFinderDirections = {
			right: false,
			left: false,
			top: false,
			bottom: false,
		};
		this.pathEnd = {
			x: 0,
			y: 0,
		};
		this.spearAttack;
		this.massive;
		this.randomDirection = function () {
			let dirArr = ["top", "left", "bottom", "right"];
			return dirArr[Math.floor(Math.random() * dirArr.length)];
		};
	};

	NpcMove.prototype.destination = function (
		obj = this.obj,
		player = this.player
	) {
		let diffX = obj.playerX - player.playerX;
		let diffY = obj.playerY - player.playerY;
		return Math.floor(Math.sqrt(diffX * diffX + diffY * diffY));
	};

	NpcMove.prototype.spotted = function (square, tile) {
		if (this.destination() <= square * tile) {
			return true;
		} else return false;
	};

	NpcMove.prototype.squareMove = function (
		obj = this.obj,
		player = this.player
	) {
		this.dt = this.obj.dt;
		const returnTo =
			obj.pathFindX <= this.objStartLoc.pathFindX - 5 ||
			obj.pathFindX >= this.objStartLoc.pathFindX + 5 ||
			obj.pathFindY <= this.objStartLoc.pathFindY - 5 ||
			obj.pathFindY >= this.objStartLoc.pathFindY + 5;
		const objStatic =
			this.objStartLoc.pathFindX !== this.pathEnd.x ||
			this.objStartLoc.pathFindY !== this.pathEnd.y;
		const playerStatic =
			player.pathFindX !== this.pathEnd.x ||
			player.pathFindY !== this.pathEnd.y;

		if (obj.health <= 0) {
			obj.drawDeath();
		} else {
			if (
				(!this.spotted(64, 7) && !this.spotted(64, 1)) ||
				player.health <= 0
			) {
				if (returnTo) {
					if (
						objStatic
						// ||obj.enemyCollision
					) {
						this.pathfinder(this.objStartLoc);
						//this.indexPath = 1;
					}
					this.pathFinderMover();
					obj.enemyCollision = false;
				} else if (obj.viewZoneCheck()) this.randomWalker();
			}
			//spotted
			else if (this.spotted(64, 1) && player.health > 0) {
				obj.interface.enemyStatistics();
				this.enemyAttack();
			} else if (this.spotted(64, 7) && player.health > 0) {
				obj.interface.enemyStatistics();

				if (
					playerStatic &&
					!this.spotted(64, 1)
					//  ||obj.enemyCollision
				) {
					this.pathfinder(this.player, this.obj, this.map, this.obj.viewZone);
					//this.pathArray();
					// obj.enemyCollision=false;
				}
				this.pathFinderMover();
			}
			//console.log(this.indexPath,this.objStartLoc);
		}
	};
	//реализация движения по массиву pathfinder'а
	NpcMove.prototype.pathFinderMover = function (
		obj = this.obj,
		player = this.player
	) {
		if (this.indexPath >= this.finalPath.x.length) {
			this.indexPath = this.finalPath.x.length - 1;
			// this.enemyAttack();
		} else {
			//obj.direction = ''
			//Y
			if (
				obj.pathFindY !== this.finalPath.y[this.indexPath] &&
				(obj.pathFindX === this.finalPath.x[this.indexPath] ||
					this.indexPath === 0)
			) {
				//top
				if (obj.pathFindY > this.finalPath.y[this.indexPath]) {
					obj.playerY -= obj.speed * this.dt;
					obj.collider.isCollision();
					if (
						obj.collisionDirection.top &&
						(this.finalPath.x[this.indexPath - 2] ||
							this.finalPath.x[this.indexPath - 1] ||
							this.finalPath.x[this.indexPath]) >= obj.pathFindX
					) {
						obj.playerY += obj.speed * this.dt;
						obj.playerX -= obj.speed * this.dt;
						obj.drawImageLeft();
					} else if (
						obj.collisionDirection.top &&
						(this.finalPath.x[this.indexPath - 2] > obj.pathFindX ||
							this.finalPath.x[this.indexPath - 1] < obj.pathFindX ||
							this.finalPath.x[this.indexPath] <= obj.pathFindX)
					) {
						obj.playerY += obj.speed * this.dt;
						obj.playerX += obj.speed * this.dt;
						obj.drawImageRight();
					} else {
						obj.drawImageTop();
						obj.direction = "top";
					}
					if (obj.pathFindY <= this.finalPath.y[this.indexPath]) {
						this.indexPath++;
					}
				}
				//bottom
				else if (obj.pathFindY < this.finalPath.y[this.indexPath]) {
					obj.playerY += obj.speed * this.dt;
					obj.collider.isCollision();
					if (
						obj.collisionDirection.bottom &&
						(this.finalPath.x[this.indexPath - 2] < obj.pathFindX ||
							this.finalPath.x[this.indexPath - 1] < obj.pathFindX ||
							this.finalPath.x[this.indexPath] <= obj.pathFindX)
					) {
						obj.playerY -= obj.speed * this.dt;
						obj.playerX += obj.speed * this.dt;
						obj.drawImageRight();
					} else if (
						obj.collisionDirection.bottom &&
						(this.finalPath.x[this.indexPath - 2] > obj.pathFindX ||
							this.finalPath.x[this.indexPath - 1] > obj.pathFindX ||
							this.finalPath.x[this.indexPath] >= obj.pathFindX)
					) {
						obj.playerY -= obj.speed * this.dt;
						obj.playerX -= obj.speed * this.dt;
						obj.drawImageLeft();
					} else {
						obj.drawImageBottom();
						obj.direction = "bottom";
					}
					if (obj.pathFindY >= this.finalPath.y[this.indexPath]) {
						this.indexPath++;
					}
				}
			}
			//X
			else if (
				obj.pathFindX !== this.finalPath.x[this.indexPath] &&
				(obj.pathFindY === this.finalPath.y[this.indexPath] ||
					this.indexPath === 0)
			) {
				//left
				if (obj.pathFindX > this.finalPath.x[this.indexPath]) {
					obj.playerX -= obj.speed * this.dt;
					obj.collider.isCollision();
					if (
						obj.collisionDirection.left &&
						(this.finalPath.y[this.indexPath - 2] ||
							this.finalPath.y[this.indexPath - 1] ||
							this.finalPath.y[this.indexPath]) >= obj.pathFindY
					) {
						obj.playerX += obj.speed * this.dt;
						obj.playerY -= obj.speed * this.dt;
						obj.drawImageTop();
					} else if (
						obj.collisionDirection.left &&
						(this.finalPath.y[this.indexPath - 2] > obj.pathFindY ||
							this.finalPath.x[this.indexPath - 1] < obj.pathFindY ||
							this.finalPath.y[this.indexPath] <= obj.pathFindY)
					) {
						obj.playerX += obj.speed * this.dt;
						obj.playerY += obj.speed * this.dt;
						obj.drawImageBottom();
					} else obj.drawImageLeft();
					obj.direction = "left";
					if (obj.pathFindX <= this.finalPath.x[this.indexPath]) {
						this.indexPath++;
					}
				}
				//right
				else if (obj.pathFindX < this.finalPath.x[this.indexPath]) {
					obj.playerX += obj.speed * this.dt;
					obj.collider.isCollision();
					if (
						obj.collisionDirection.right &&
						(this.finalPath.y[this.indexPath - 2] ||
							this.finalPath.y[this.indexPath - 1] ||
							this.finalPath.y[this.indexPath]) >= obj.pathFindY
					) {
						obj.playerX -= obj.speed * this.dt;
						obj.playerY -= obj.speed * this.dt;
						obj.drawImageTop();
					} else if (
						obj.collisionDirection.right &&
						(this.finalPath.y[this.indexPath - 2] > obj.pathFindY ||
							this.finalPath.x[this.indexPath - 1] < obj.pathFindY ||
							this.finalPath.y[this.indexPath] <= obj.pathFindY)
					) {
						obj.playerX -= obj.speed * this.dt;
						obj.playerY += obj.speed * this.dt;
						obj.drawImageBottom();
					} else obj.drawImageRight();
					obj.direction = "right";
					if (obj.pathFindX >= this.finalPath.x[this.indexPath]) {
						this.indexPath++;
					}
				}
			} else {
				obj.drawImageBottomStand();
				if (player.dead) {
					this.pathfinder((player = this.objStartLoc));
				} else if (!player.dead) this.pathfinder();
			}
		}
	};

	NpcMove.prototype.randomWalker = function (obj = this.obj) {
		if (this.counter >= 20) {
			obj.direction = this.randomDirection();
			this.counter = 0;
		}
		if (obj.direction === "") {
			obj.direction = "bottom";
		}

		//top
		if (obj.direction === "top") {
			obj.playerY -= obj.speed * this.dt;
			obj.collider.isCollision();
			if (
				(obj.playerY <= obj.collisionBlock.y && obj.collisionDirection.top) ||
				obj.playerY <= 0 + 16
			) {
				obj.direction = "bottom";
				if (!(obj.playerY <= 16)) obj.playerY = obj.collisionBlock.y;
				obj.collisionBlock.y = NaN;
				obj.drawImageBottom();
			} else {
				obj.drawImageTop();
				this.counter++;
			}
		}
		//bottom
		else if (obj.direction === "bottom") {
			obj.playerY += obj.speed * this.dt;
			obj.collider.isCollision();
			if (
				(obj.playerY >= obj.collisionBlock.y &&
					obj.collisionDirection.bottom) ||
				obj.playerY >= 2560 - obj.frameHeight / 2
			) {
				obj.direction = "top";
				if (!(obj.playerY >= 2560 - obj.frameHeight / 2))
					obj.playerY = obj.collisionBlock.y;
				obj.collisionBlock.y = NaN;
				obj.drawImageTop();
			} else {
				obj.drawImageBottom();
				this.counter++;
			}
		}
		//right
		else if (obj.direction === "right") {
			obj.playerX += obj.speed * this.dt;
			obj.collider.isCollision();
			if (
				(obj.playerX >= obj.collisionBlock.x && obj.collisionDirection.right) ||
				obj.playerX >= 2560 - obj.frameHeight
			) {
				obj.direction = "left";
				if (!(obj.playerX >= 2560 - obj.frameHeight))
					obj.playerX = obj.collisionBlock.x;
				obj.collisionBlock.x = NaN;
				obj.drawImageLeft();
			} else {
				obj.drawImageRight();
				this.counter++;
			}
		}
		//left
		else if (obj.direction === "left") {
			obj.playerX -= obj.speed * this.dt;
			obj.collider.isCollision();
			if (
				(obj.playerX <= obj.collisionBlock.x && obj.collisionDirection.left) ||
				obj.playerX <= 0
			) {
				obj.direction = "right";
				if (!(obj.playerX <= 0)) obj.playerX = obj.collisionBlock.x;
				obj.collisionBlock.x = NaN;
				obj.drawImageRight();
			} else {
				obj.drawImageLeft();
				this.counter++;
			}
		}
	};

	//алгоритм поиска пути
	NpcMove.prototype.pathfinder = function (
		player = this.player,
		obj = this.obj,
		map = this.map,
		viewport
	) {
		//алгоритм поиска пути

		this.indexPath = 0;

		const xStart = obj.pathFindX;
		const yStart = obj.pathFindY;
		const xEnd = player.pathFindX;
		const yEnd = player.pathFindY;
		let i, q, iEnds, qEnds;
		this.pathEnd.x = xEnd;
		this.pathEnd.y = yEnd;
		function iterUpdater() {
			if (viewport) {
				i = viewport.start[1];
				iEnds = viewport.end[1];
				q = viewport.start[0];
				qEnds = viewport.end[0];
			} else {
				i = 0;
				iEnds = map.length;
				q = 0;
				qEnds = map[i].length;
			}
		}
		iterUpdater();
		const mapBarrier = (function () {
			let enemyCoords = obj.collider.npcArray.map(function (enemy) {
				return [Math.floor(enemy[0] / 64), Math.floor(enemy[1] / 64)];
			});
			let array = [...Array(map.length)].map(function (value, index) {
				return Array(map[index].length);
			});
			for (i; i < iEnds; i++) {
				q = viewport ? (q = viewport.start[0]) : (q = 0);
				for (q; q < qEnds; q++) {
					array[i][q] = 1;
					enemyCoords.forEach(function (tile) {
						if (map[i][q] === tile) {
							array[i][q] = 0;
						}
					});
					obj.collider.unwalkable.forEach(function (tile) {
						if (map[i][q] === tile) {
							array[i][q] = 0;
						}
					});
				}
			}
			iterUpdater();
			return array;
		})();

		if (
			mapBarrier[obj.pathFindY][obj.pathFindX] === 0 ||
			mapBarrier[player.pathFindY][player.pathFindX] === 0
		) {
			return false;
		}

		const mapPath = (function () {
			//карта пути
			const array = [...Array(map.length)].map(function (value, index) {
				return Array(map[index].length);
			});
			for (i; i < iEnds; i++) {
				q = viewport ? (q = viewport.start[0]) : (q = 0);
				for (q; q < qEnds; q++) {
					array[i][q] = 0;
				}
			}
			iterUpdater();
			return array;
		})();
		const mShX = [0];
		const mShY = [0];
		const mShN = [0];
		const mDX = [0, 1, 0, -1];
		const mDY = [-1, 0, 1, 0];
		const finalPath = {};
		let xCur = xStart;
		let yCur = yStart;
		let lastStep = 0;
		let curStep = 0;

		function pathBuilder() {
			//алгоритм построения оптимального пути от конечной точки
			const pathX = [0];
			const pathY = [0];
			let bPath = 0;
			let xCurRet = xEnd;
			let yCurRet = yEnd;
			let NumbPath = mapPath[yCurRet][xCurRet];
			let NumbReturn;

			while (!(xCurRet === xStart && yCurRet === yStart)) {
				bPath++;
				pathX[bPath - 1] = xCurRet;
				pathY[bPath - 1] = yCurRet;
				NumbReturn = (FNumbReturn = function () {
					if (NumbPath === 1) return 2;
					else if (NumbPath === 2) return 3;
					else if (NumbPath === 3) return 0;
					else if (NumbPath === 4) return 1;
				})();
				const dXRet = mDX[NumbReturn];
				const dYRet = mDY[NumbReturn];
				xCurRet += dXRet;
				yCurRet += dYRet;
				NumbPath = mapPath[yCurRet][xCurRet];
				if (bPath > 80) {
					console.log("невозможно построить путь");
					break;
				}
			}

			finalPath.x = pathX.reverse();
			finalPath.y = pathY.reverse();
		}
		function circle() {
			//цикл поиска конечного объекта на карте
			for (let p = 0; p < 4; p++) {
				const dX = mDX[p];
				const dY = mDY[p];
				let newX = xCur + dX;
				let newY = yCur + dY;
				if (newX <= 0) {
					newX = 0;
				} else if (newX >= qEnds - 1) {
					newX = qEnds - 1;
				}
				if (newY <= 0) {
					newY = 0;
				} else if (newY >= iEnds - 1) {
					newY = iEnds - 1;
				}

				if (mapBarrier[newY][newX] === 1 && mapPath[newY][newX] === 0) {
					//проверка на препятствие
					lastStep++;
					mShX[lastStep] = newX;
					mShY[lastStep] = newY;
					mShN[lastStep] = p;
					mapPath[newY][newX] = p + 1;
					if (newX === xEnd && newY === yEnd) {
						pathBuilder();
						return true;
					}
				} else if (
					mapBarrier[newY][newX] === 0 &&
					xEnd === newX &&
					yEnd === newY
				) {
					console.log("хуяк");
					return true;
				}
			}
		}
		while (!circle()) {
			if (curStep < lastStep) {
				//console.log(lastStep);
				if (lastStep >= 1300) {
					console.log(mapPath);
					console.log("не найден путь");

					break;
				}
				curStep++;
				xCur = mShX[curStep];
				yCur = mShY[curStep];
			}
		}

		return (this.finalPath = finalPath);
	};

	//построение пути в массиве(чисто посмотреть какой путь построил враг в массиве карты)
	NpcMove.prototype.pathArray = function (
		map = this.map,
		array = this.finalPath
	) {
		let path = [];

		for (let e = 0; e < this.finalPath.x.length; e++) {
			path.push([this.finalPath.x[e], this.finalPath.y[e]]);
		}

		this.massive = [...Array(40)].map(function (value) {
			Array(40);
		});
		for (let yMap = 0; yMap < this.massive.length; yMap++) {
			for (let xMap = 0; xMap < this.massive[yMap].length; xMap++) {
				this.massive[yMap][xMap] = 0;
				for (let e = 0; e < path.length; e++) {
					if (path[e][0] === xMap && path[e][1] === yMap) {
						this.massive[yMap][xMap] = 1;
					}
				}
			}
		}
	};
	NpcMove.prototype.enemyAttack = function (
		obj = this.obj,
		player = this.player
	) {
		if (obj.direction === "left") obj.drawAttackLeft();
		else if (obj.direction === "right") obj.drawAttackRight();
		else if (obj.direction === "top") obj.drawAttackTop();
		else if (obj.direction === "bottom") obj.drawAttackBottom();

		if (obj.numAttack === 0) {
			if (!obj.frame) player.health -= 5;
			obj.spearAttack.play();
		}
	};

	Game.NpcMove = NpcMove;
})();
