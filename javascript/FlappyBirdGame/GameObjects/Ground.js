import GameObject from './GameObject.js';

class Ground extends GameObject {
    constructor(canvasWidth, canvasHeight) {
        super(0, canvasHeight * 0.9, 2000, 160, 5, 0);
        this.image = new Image();
        this.image.src = "./resources/images/ground.png";
    }

    IsCollide(other) {
        let otherOnLeft = other.x + other.width <= this.x;
        let otherOnRight = other.x >= this.x + this.width;
        let otherOnTop = other.y + other.height <= this.y;
        let otherOnBottom = other.y >= this.y + this.height;

        return !(otherOnLeft || otherOnRight || otherOnTop || otherOnBottom);
    }

    Step() {
        this.x -= this.velocityX;
        if (this.x <= -1000) {
            this.x = 0;
        }
    }

    Render(context) {
        // Abstract method to be implemented by subclasses
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export { Ground };