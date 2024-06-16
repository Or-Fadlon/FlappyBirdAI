function Sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class NetworkNode {
    constructor(name) {
        this.name = name;       // Name of the node
        this.input = 0;        // Output of the node after activation
        this.bias = 0; // Bias term initialized randomly
        this.activationFunction = Sigmoid;
        this.output = 0;       // Output of the node after activation
    }

    // Activation function
    Calculate(inputs, weights) {
        if (inputs.length !== weights.length)
            throw new Error("Invalid input size");

        this.input = 0;
        for (let i = 0; i < inputs.length; i++)
            this.input += inputs[i] * weights[i];
        this.output = this.activationFunction(this.input + this.bias);
        return this.output;
    }
}

export { NetworkNode };