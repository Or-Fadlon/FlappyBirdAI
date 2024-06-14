import GameObject from './GameObject.js';

class HUD extends GameObject {
    constructor(canvasWidth, canvasHeight) {
        super(0, 0, canvasWidth, canvasHeight * 0.05, 0, 0);
        this.oldTimeStamp = 0;
    }

    Step() {
        // Abstract method to be implemented by subclasses
    }

    Render(context, score, life, timeStamp) {
        let hub_width = this.width;
        let hub_height = this.height;
        let center = {};
        center.x = this.x * this.width + 0.5 * hub_width;
        center.y = this.y * this.height + 0.5 * hub_height;
        // context.beginPath();
        // context.rect(center.x - 0.5 * hub_width, center.y - 0.5 * hub_height, hub_width, hub_height);
        // context.fillStyle = "black"; //color
        // context.fill();

        context.save();
        context.font = "40px 'flappyFont'";
        context.fillStyle = "white"; //color
        context.strokeStyle = "black"; //color
        context.lineWidth = 3;

        context.textAlign = "start";
        context.fillText("Score: " + score, 15, center.y + 5);
        context.strokeText("Score: " + score, 15, center.y + 5);
        context.textAlign = "center";
        let lifeStr = "❤";
        context.fillText(lifeStr.repeat(life), center.x, center.y + 5);
        context.strokeText(lifeStr.repeat(life), center.x, center.y + 5);
        context.textAlign = "end";

        // Calculate the number of seconds passed since the last frame
        let secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
        // Calculate fps
        let fps = Math.round(1 / secondsPassed);
        context.fillText("FPS:    ", hub_width - 15, center.y + 5);
        context.strokeText("FPS:    ", hub_width - 15, center.y + 5);
        context.fillText(fps, hub_width - 15, center.y + 5);
        context.strokeText(fps, hub_width - 15, center.y + 5);
        context.restore();
    }
}

export { HUD };