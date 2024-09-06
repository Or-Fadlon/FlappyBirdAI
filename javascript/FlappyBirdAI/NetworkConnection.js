class NetworkConnection {
    constructor(fromSize, toSize) {
        this.inputSize = fromSize;
        this.outputSize = toSize;
        this.weights = {};
        for (let i = 0; i < fromSize; i++) {
            for (let j = 0; j < toSize; j++) {
                this.weights[`${i}->${j}`] = Math.random() * 2 - 1;
            }
        }
    }

    GetWeight(from, to) {
        return this.weights[`${from}->${to}`];
    }

    SetWeight(from, to, weight) {
        this.weights[`${from}->${to}`] = weight;
    }

    Clone() {
        let connection = new NetworkConnection(this.inputSize, this.outputSize);
        for (let i = 0; i < this.inputSize; i++) {
            for (let j = 0; j < this.outputSize; j++) {
                connection.weights[`${i}->${j}`] = this.weights[`${i}->${j}`];
            }
        }
        return connection;
    }
}

export { NetworkConnection };