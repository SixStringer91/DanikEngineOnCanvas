(function() {
    const MainTitle = function() {
        this.frame;
        this.endingSound = {};
        this.ctx = document.getElementById('canvas').getContext('2d');
        this.frameCounter = 0;
        this.particle;
        this.grain;
        this.gamePlay = false;
        this.loaded = false;
        this.musicPlay = true
        this.opacity = 0;
        this.requestID;
        this.allCount = 0;
        this.loadCount = 0;
        this.listPng = [
            'images/hero5.png',
            'images/skeleton.png',
            'images/tileSet5.png',
            'images/orc.png',
            'images/skeleton2.png'
        ];
        this.listAudio = [
            'audio/died.mp3',
            'audio/sword.mp3',
            'audio/sword-attack.mp3',
            'audio/spear.mp3',
            'audio/bell.mp3'
        ];
        this.listFonts = [
            { name: 'DigitalICG', url: 'url(fonts/DigitalICG.woff)' },
            { name: 'DigitalICG', url: 'url(fonts/DigitalICG.woff2)' },
            { name: 'PerfectDOSVGA437', url: 'url(fonts/PerfectDOSVGA437.woff)' },
            { name: 'PerfectDOSVGA437', url: 'url(fonts/PerfectDOSVGA437.woff2)' }

        ];
        this.animationEnd === false;
    }


    MainTitle.prototype.textAnimation = function(requestID = this.requestID, opacity = this.opacity, gamePlay = this.gamePlay) {
        let counter = 0;
        let logoArr = ('Danik Engine Demo').split('');
        let logoView = ''
        let titleFirst = canvas.getContext('2d');


        this.check()
        let textAnimationInner = () => {
            this.frameCounter = this.frameCounter < 2 ? this.frameCounter += 1 : this.frameCounter = 0;
            //titleFirst.clearRect(0, 0, 1280, 1280);
            if (this.allCount !== this.loadCount) {
                if (this.grain) this.grain.init();
                titleFirst.textAlign = "center"
                titleFirst.font = "40px serif";
                titleFirst.fillStyle = 'rgba(0,0,0,0.6)';
                titleFirst.fillText(`Loading files: ${Math.floor((this.loadCount/this.allCount)*100)} %`, canvas.width / 2, canvas.height / 2);


            }
            if (this.allCount === this.loadCount)
                this.loaded = true;
            if (this.loaded) {
                if (this.particle) {
                    this.shadowBlur(titleFirst, 0, 0, 0, 0);
                    this.particle.init();
                }
                if (logoView.length < logoArr.length && this.frameCounter === 0) {

                    logoView += logoArr[counter];
                    counter++;
                }

                titleFirst.fillStyle = `rgba(255,250,250,0)`;
                titleFirst.fillRect(0, 0, canvas.width, canvas.height);
                titleFirst.font = "70px DigitalICG";
                titleFirst.textAlign = "center";
                titleFirst.fillStyle = "rgba(193,84,193,1)";
                this.shadowBlur(titleFirst, 3, -1, 4, 'red');
                titleFirst.fillText(logoView, canvas.width / 2, canvas.height / 2);
                titleFirst.fillStyle = `rgba(255,165,0,${0+opacity})`;
                titleFirst.font = "32px PerfectDOSVGA437";
                this.shadowBlur(titleFirst, 3, -1, 4, "rgba(193,84,193,1)");
                titleFirst.fillText('Controls:WASD,Space', canvas.width / 2, canvas.height / 2 + canvas.height / 12);
                opacity += 0.05
            }
            if ((logoView.length === logoArr.length) && this.allCount === this.loadCount) {
                this.animationEnd = true
                this.shadowBlur(titleFirst, 3, -1, 4, "rgba(193,84,193,1)");
                titleFirst.fillText('press "space" to play', canvas.width / 2, (canvas.height / 2 + canvas.height / 8));
                this.shadowBlur(titleFirst, 0, 0, 0, 0);
            }
            if (!gamePlay) {
                requestID = requestAnimationFrame(textAnimationInner)
            }
        }
        textAnimationInner()

    }

    MainTitle.prototype.shadowBlur = function(context, x, y, blur, color) {
        context.shadowOffsetX = x;
        context.shadowOffsetY = -y;
        context.shadowBlur = blur;
        context.shadowColor = color;
    }


    MainTitle.prototype.dead = function() {
        if (this.musicPlay) {
            this.endingSound.dead.play();
            this.musicPlay = false
            this.opacity = 0;
        };
        let titleScnd = canvas.getContext('2d');
        titleScnd.lineWidth = 7;
        titleScnd.font = "100px serif";
        titleScnd.strokeStyle = `rgba(0,0,0,${0+this.opacity})`;
        titleScnd.fillStyle = `rgba(185,0,0,${0+this.opacity})`;

        titleScnd.strokeText('you died', canvas.width / 2, canvas.height / 2);
        titleScnd.fillText('you died', canvas.width / 2, canvas.height / 2);
        if (this.opacity === 1) {
            titleScnd.font = "20px serif";
            titleScnd.fillStyle = "white";
            titleScnd.strokeText('press "space" to restart', canvas.width / 2, canvas.height / 2 + 50);
            titleScnd.fillText('press "space" to restart', canvas.width / 2, canvas.height / 2 + 50);
        }
        if (!this.frame) this.opacity = this.opacity < 1 ? this.opacity += 0.02 : this.opacity = 1

    }

    MainTitle.prototype.win = function() {
        if (this.musicPlay) {
            this.opacity = 0;
            this.endingSound.won.play();
            this.musicPlay = false;
        }

        let titleScnd = canvas.getContext('2d');
        titleScnd.lineWidth = 7;
        titleScnd.font = "100px serif";
        titleScnd.strokeStyle = `rgba(0,0,0,${0+this.opacity})`;
        titleScnd.fillStyle = `rgba(255,165,0,${0+this.opacity})`;

        titleScnd.strokeText('you won', canvas.width / 2, canvas.height / 2);
        titleScnd.fillText('you won', canvas.width / 2, canvas.height / 2);
        if (!this.frame) this.opacity = this.opacity < 1 ? this.opacity += 0.02 : this.opacity = 1

    }

    MainTitle.prototype.check = function() {
        this.loadAudio();
        this.loadImg();
        this.loadFonts();
        if (this.allCount === this.loadCount) return this.loaded === true
    }




    MainTitle.prototype.loadImg = function() {
        for (let i = 0; i < this.listPng.length; i++) {
            this.allCount++
                let img = document.createElement('img')
            img.src = this.listPng[i]
            img.onload = (function() {
                this.loadCount++
                    img.remove();
            }).bind(this);
        }
    };

    MainTitle.prototype.loadAudio = function() {

        for (let i = 0; i < this.listAudio.length; i++) {
            this.allCount++
                let audio = document.createElement('audio')
            audio.src = this.listAudio[i];
            audio.oncanplaythrough = (function() {
                this.loadCount++
                    audio.remove();
            }).bind(this)

        }
    }
    MainTitle.prototype.loadFonts = function() {

        for (let i = 0; i < this.listFonts.length; i++) {
            this.allCount++
                let font = new FontFace(this.listFonts[i].name, this.listFonts[i].url);
            font.load();
            document.fonts.add(font);
            this.loadCount++

        }
    }


    Game.MainTitle = MainTitle
})()