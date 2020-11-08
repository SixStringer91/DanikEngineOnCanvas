(function() {
    const Grain = function() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.imgData;
        this.pix;
        this.canvWidth = this.canvas.width;
        this.canvHeight = this.canvas.height;
        this.flickerInterval;
    }
    Grain.prototype.init = function() {
        this.ctx.fillRect(0, 0, this.canvWidth, this.canvHeight);
        this.ctx.fill();
        this.imgData = this.ctx.getImageData(0, 0, this.canvWidth, this.canvHeight);
        this.pix = this.imgData.data;
        this.flickering()
    };
    Grain.prototype.flickering = function() {
        const pixLength = this.pix.length;
        for (let i = 0; i < pixLength; i += 4) {
            const color = (Math.random() * 255) + 50;
            this.pix[i] = color;
            this.pix[i + 1] = color;
            this.pix[i + 2] = color;
        }
        this.ctx.putImageData(this.imgData, 0, 0);
    }

    Game.Grain = Grain

})()