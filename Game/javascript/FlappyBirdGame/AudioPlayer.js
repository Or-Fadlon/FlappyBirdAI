class AudioPlayer {
    constructor() {
        this.dict = {
            flap: "./Resources/Sound/flap-sound.mp3",
            point: "./Resources/Sound/point-sound.mp3",
            hit: "./Resources/Sound/hit-sound.wav",
            fail: "./Resources/Sound/fail-sound.mp3",
        };
        this.single = [];
        this.loopers = [];
        this.mute = false;
    }

    async Play(soundName, volume = 1, loop = false) {
        if (!this.dict[soundName]) {
            console.log("Sound not found: " + soundName);
            return;
        }

        if (!this.mute) {
            let audio = new Audio(this.dict[soundName]);
            if (loop) {
                this.loopers.push(audio);
            } else {
                this.single.push(audio);
            }
            audio.loop = loop;
            audio.volume = volume;
            await audio.play();
        }
    }

    Stop() {
        this.single.forEach(element => {
            element.pause();
            element.currentTime = 0;
        });
        this.single = [];
        this.loopers.forEach(element => {
            element.pause();
            element.currentTime = 0;
        });
        this.loopers = [];
    }

    MuteToggle() {
        this.mute = !this.mute;
        if (this.mute) {
            this.Stop();
        }
    }
}

export {AudioPlayer};