(function () {
	const Particle = function () {
		this.canvas = document.getElementById("canvas");
		this.particles = [];
		this.properties = {
			bgColor: "rgba(255,250,250,1)",
			particleColor: "rgba(69,22,28,0.8)",
			particleRadius: 0,
			particleCount: 300,
			particleMaxVelocity: 0.3,
			lineLength: 100,
			particleLife: 6,
		};
		this.ctxBG = this.canvas.getContext("2d");
		this.w = this.canvas.width;
		this.h = this.canvas.height;
		this.x = Math.random() * this.w;
		this.y = Math.random() * this.h;
		this.velocityX =
			Math.random() * (this.properties.particleMaxVelocity * 2) -
			this.properties.particleMaxVelocity;
		this.velocityY =
			Math.random() * (this.properties.particleMaxVelocity * 2) -
			this.properties.particleMaxVelocity;
		this.life = Math.random() * this.properties.particleLife * 60;
	};

	Particle.prototype.resize = function () {
		window.onresize = function () {
			this.w = this.canvas.width;
			this.h = this.canvas.height;
		};
	};
	Particle.prototype.position = function () {
		(this.x + this.velocityX > this.w && this.velocityX > 0) ||
		(this.x + this.velocityX < 0 && this.velocityX < 0)
			? (this.velocityX *= -1)
			: this.velocityX;
		(this.y + this.velocityY > this.h && this.velocityY > 0) ||
		(this.y + this.velocityY < 0 && this.velocityY < 0)
			? (this.velocityY *= -1)
			: this.velocityY;
		this.x += this.velocityX;
		this.y += this.velocityY;
	};
	Particle.prototype.reDraw = function () {
		this.ctxBG.beginPath();
		this.ctxBG.arc(
			this.x,
			this.y,
			this.properties.particleRadius,
			0,
			Math.PI * 2
		);
		this.ctxBG.closePath();
		this.ctxBG.fillStyle = this.properties.particleColor;
		this.ctxBG.fill();
	};
	Particle.prototype.reCalculateLife = function () {
		if (this.life < 1) {
			this.x = Math.random() * this.w;
			this.y = Math.random() * this.h;
			this.velocityX =
				Math.random() * (this.properties.particleMaxVelocity * 2) -
				this.properties.particleMaxVelocity;
			this.velocityY =
				Math.random() * (this.properties.particleMaxVelocity * 2) -
				this.properties.particleMaxVelocity;
			this.life = Math.random() * this.properties.particleLife * 60;
		}
		this.life--;
	};
	Particle.prototype.reDrawBackground = function () {
		this.ctxBG.clearRect(0, 0, this.w, this.h);
		this.ctxBG.fillStyle = this.properties.bgColor;
		this.ctxBG.fillRect(0, 0, this.w, this.h);
	};
	Particle.prototype.drawLines = function () {
		let x1, y1, x2, y2, length, opacity;
		for (let i = 0; i < this.particles.length; i++) {
			for (let j = 0; j < this.particles.length; j++) {
				x1 = this.particles[i].x;
				y1 = this.particles[i].y;
				x2 = this.particles[j].x;
				y2 = this.particles[j].y;
				length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
				if (length < this.properties.lineLength) {
					opacity = 1 - length / this.properties.lineLength;
					this.ctxBG.lineWidth = "0,5";
					this.ctxBG.strokeStyle = `rgba(69,22,28,${opacity})`;
					this.ctxBG.beginPath();
					this.ctxBG.moveTo(x1, y1);
					this.ctxBG.lineTo(x2, y2);
					this.ctxBG.stroke();
				}
			}
		}
	};
	Particle.prototype.reDrawthis = function () {
		for (let i = 0; i < this.particles.length; i++) {
			//this.particles[i].reCalculateLife();
			this.particles[i].position();
			this.particles[i].reDraw();
		}
	};
	Particle.prototype.loop = function () {
		this.resize();
		this.position();
		this.reDrawBackground();
		this.reDrawthis();
		this.drawLines();
	};
	Particle.prototype.init = function () {
		for (let i = 0; i < this.properties.particleCount; i++) {
			if (this.particles.length !== this.properties.particleCount)
				this.particles.push(new Particle());
		}
		this.loop();
	};

	Game.Particle = Particle;
})();
