import GameObject from './GameObject.js';

class Pipe extends GameObject {
    constructor(canvasWidth, canvasHeight, gapCenter) {
        super(canvasWidth, 0, 140, canvasHeight, 5, 0);

        this.spacing = 250; // total gap between top and bottom pipe
        this.gapCenter = gapCenter; // the center of the gap between top and bottom pipe
        this.topImage = new Image();
        this.topImage.src = "./resources/images/pipedown.png";
        this.bottomImage = new Image();
        this.bottomImage.src = "./resources/images/pipeup.png";
        
        this.scored = false;
    }

    IsCollide(other) {
        let topPipeY = this.gapCenter - this.spacing / 2;
        let bottomPipeY = this.gapCenter + this.spacing / 2;

        let otherOnLeft = other.x + other.width <= this.x;
        let otherOnRight = other.x >= this.x + this.width;
        let otherInBetween = other.y + other.height <= bottomPipeY && other.y >= topPipeY;

        return !(otherOnLeft || otherOnRight || otherInBetween);
    }


    IsPlayerCollectedPipeScore(player) {
        let playerOnRight = player.x >= this.x + this.width;
        if (playerOnRight && !this.scored) {
            this.scored = true;
            return true;
        }
        return false;
    }

    OutOfScreen() {
        return this.x + this.width < 0;
    }

    Step() {
        this.x -= this.velocityX; // move the pipe to the left
    }

    Render(context) {
        let topPipeY = this.gapCenter - this.spacing / 2 - this.height;
        let bottomPipeY = this.gapCenter + this.spacing / 2;


        if (this.topImage === null || this.bottomImage === null) {
            context.fillStyle = "red";
            context.fillRect(this.x, topPipeY, this.width + 3, this.height + 3);
            context.fillRect(this.x, bottomPipeY, this.width + 3, this.height + 3);
            context.fillStyle = "blue";
            context.fillRect(this.x, this.gapCenter - this.spacing / 2, 10, 10);
            context.fillStyle = "green";
            context.fillRect(this.x, bottomPipeY, 10, 10);
        }
        else {
            context.drawImage(this.topImage, this.x, topPipeY, this.width, this.height);
            context.drawImage(this.bottomImage, this.x, bottomPipeY, this.width, this.height);
        }
    }
}

export { Pipe };