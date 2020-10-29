(function() {
    const Viewport = function(wWidth = 2560, wHeight = 2560, blockWidth = 64, blockHeight = 64) {
        this.canvas = document.getElementById('canvas');
        this.screen = [this.canvas.width, this.canvas.height]; //canvas window width
        this.startTile = [0, 0];
        this.endTile = [0, 0];
        this.offset = [0, 0];
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;
        this.worldSize = [wWidth / blockWidth, wHeight / blockHeight]
    }
    Viewport.prototype.update = function(playerX, playerY, blockHeight = this.blockHeight, blockWidth = this.blockWidth) {
        this.offset[0] = Math.floor((this.screen[0] / 2) - playerX);
        this.offset[1] = Math.floor((this.screen[1] / 2) - playerY)
        let tile = [
            Math.floor(playerX / blockWidth),
            Math.floor(playerY / blockHeight)
        ];
        this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / blockWidth);
        this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / blockHeight);
        if (this.startTile[0] <= 0) {
            this.startTile[0] = 0;
        }
        if (this.startTile[1] <= 0) {
            this.startTile[1] = 0;
        }

        this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / blockWidth);
        this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[0] / 2) / blockHeight);
        if (this.endTile[0] >= this.worldSize[0]) {
            this.endTile[0] = this.worldSize[0];
        }
        if (this.endTile[1] >= this.worldSize[1]) {
            this.endTile[1] = this.worldSize[1];
        }

        //worldmap limits :
        if (this.startTile[0] <= 0 && this.offset[0] >= 0) {
            this.offset[0] = 0;
            this.endTile[0] = Math.ceil(this.screen[0] / blockWidth);
        }
        if (this.endTile[0] >= this.worldSize[0] && (this.worldSize[0] * blockWidth) - ((this.worldSize[0] * blockWidth) - playerX) >= (this.worldSize[0] * blockWidth) - (this.screen[0] / 2)) {
            this.offset[0] = -(this.worldSize[0] * blockWidth) + (this.screen[0]);
            this.startTile[0] = Math.floor(this.endTile[0] - (this.screen[0] / blockWidth));
        }
        if (this.startTile[1] <= 0 && this.offset[1] >= 0) {
            this.offset[1] = 0;
            this.endTile[1] = Math.ceil(this.screen[1] / blockHeight);
        }
        if (this.endTile[1] >= this.worldSize[1] &&
            (this.worldSize[1] * blockHeight) - ((this.worldSize[1] * blockHeight) - playerY) >= (this.worldSize[1] * blockHeight) - (this.screen[1] / 2)) {
            this.offset[1] = -(this.worldSize[1] * blockHeight) + (this.screen[1]);
            this.startTile[1] = Math.floor(this.endTile[1] - (this.screen[1] / blockHeight));
        } //pizdec...
    }
    Game.Viewport = Viewport;
})()