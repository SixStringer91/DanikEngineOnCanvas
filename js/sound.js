(function() {
    const LoadAudio = function(arr) {
        this.dom = this.load(arr)
        this.state = 'stop';
    }
    LoadAudio.prototype.load = function(arr) {
        let audio = document.createElement('audio');
        for (let i = 0; i < arr.length; i++) {
            let source = document.createElement('source')
            source.src = arr[i]
            audio.appendChild(source)
        }
        return audio
    }
    LoadAudio.prototype.play = function() {
        this.dom.currentTime = 0;
        this.dom.play();
        this.state = 'play'
    }
    LoadAudio.prototype.pause = function() {
        this.dom.pause();
        this.state = 'pause'
    }
    LoadAudio.prototype.stop = function() {
        this.dom.pause();
        this.dom.currentTime = 0;
        this.state = 'stop'
    }

    Game.LoadAudio = LoadAudio
})()