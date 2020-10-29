(function() {
    const Interface = function(player) {
            this.player = player;
            this.viewport;
            this.ctx = document.getElementById('canvas').getContext('2d')
        }
        //полоска жизни игрока
    Interface.prototype.statistics = function() {
            let playerHealth = this.player.health;
            if (playerHealth <= 0) playerHealth = 0;
            let stats = this.ctx;
            stats.strokeStyle = "#3A3A3A";
            if (playerHealth <= 100 && playerHealth > 70) stats.fillStyle = '#14F031';
            else if (playerHealth <= 70 && playerHealth > 30) stats.fillStyle = '#F5EE18';
            else if (playerHealth <= 30) stats.fillStyle = '#FF0004';
            stats.lineWidth = 4;
            // stats.font = "48px serif";
            stats.fillRect(20, canvas.height - 20, 20, -playerHealth * 2);
            stats.strokeRect(20, canvas.height - 20, 20, -100 * 2);
        }
        //полоска жизни врага
    Interface.prototype.enemyStatistics = function() {
        if (this.player.health <= 0) return;
        let playerHealth = this.player.health;
        let stats = this.ctx;
        stats.strokeStyle = "black";
        stats.fillStyle = 'rgb(255,51,0)';
        stats.lineWidth = 1;
        stats.fillRect(this.player.viewZone.offset[0] + this.player.playerX, this.player.viewZone.offset[1] + this.player.playerY - 32, (playerHealth / 100) * 64, 5);
        stats.strokeRect(this.player.viewZone.offset[0] + this.player.playerX, this.player.viewZone.offset[1] + this.player.playerY - 32, 64, 5);
    }

    Game.Interface = Interface;
})()