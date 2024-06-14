import GameObject from './GameObject.js';

class Background extends GameObject {
    constructor(canvasWidth, canvasHeight) {
        super(0, 0, canvasWidth, canvasHeight, 0, 0);
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./resources/images/bg.png";
    }

    Step() {
        // Abstract method to be implemented by subclasses
    }

    Render(context) {
        // Abstract method to be implemented by subclasses
        context.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
    }
}

export { Background };