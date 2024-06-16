import GameObject from './GameObject.js';


function LimitNumberBetweenValues(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

class Bird extends GameObject {
    constructor(canvasWidth, canvasHeight) {
        super(canvasWidth / 10, 0, 102, 72, 0, 0);
        this.flapPower = -13;
        this.fallRotation = 90;

        this.image = new Image();
        this.image.src = "./resources/images/bird.png";
    }

    Flap() {
        this.velocityY = this.flapPower;
    }

    Step(gravity, minY, maxY) {
        this.velocityY += gravity;
        this.velocityY = LimitNumberBetweenValues(this.velocityY, -25, 25);

        this.y += this.velocityY;
        this.y = LimitNumberBetweenValues(this.y, minY, maxY);
    }

    Render(context) {
        if (this.image === null) {
            context.fillStyle = "red";
            context.fillRect(this.x, this.y, this.width + 3, this.height + 3);
            context.fillStyle = "white";
            context.fillRect(this.x, this.y, 10, 10);
        }
        else {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            // // move the origin to the bird's center
            // // translate(this.x + this.width / 2, this.y + this.height / 2);

            // // determine rotation based on velocity
            // if (this.velocityY < 15) {
            //     this.fallRotation = -Math.PI / 6; // upward angle
            // } else if (this.velocityY <= 25) {
            //     this.fallRotation += Math.PI / 16; // downward angle
            //     this.fallRotation = LimitNumberBetweenValues(this.fallRotation, -Math.PI / 6, Math.PI / 6);
            // } else {
            //     this.fallRotation = Math.PI / 6; // maximum downward angle
            // }

            // context.save();
            // // move to the middle of where we want to draw our image
            // context.translate(this.x, this.y);
            // // rotate around that point, converting our 
            // // angle from degrees to radians 
            // context.rotate(this.fallRotation);
            // // draw it up and to the left by half the width
            // // and height of the image 
            // context.drawImage(this.image, -(this.width / 2), -(this.height / 2));
            // // and restore the co-ords to how they were when we began
            // context.restore();

            // // draw the bird image, centered on the translated origin
        }
    }
}

export { Bird };