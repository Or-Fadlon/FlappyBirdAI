class NetworkConnection {
    constructor(inputSize, outputSize) {
        this.weights = {};
        for (let i = 0; i < inputSize; i++) {
            for (let j = 0; j < outputSize; j++) {
                this.weights[`${i}->${j}`] = Math.random() * 2 - 1;
            }
        }
    }

    GetWeight(from, to) {
        return this.weights[`${from}->${to}`];
    }
}

export { NetworkConnection };