class GameObject {
    constructor(x, y, width, height, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    IsCollide(other) {
        // Abstract method to be implemented by subclasses
        alert("IsCollide method is not implemented");
        return false;
    }

    Step() {
        // Abstract method to be implemented by subclasses
        alert("Step method is not implemented");
    }

    Render(context) {
        // Abstract method to be implemented by subclasses
        alert("Render method is not implemented");
    }
}

export default GameObject;