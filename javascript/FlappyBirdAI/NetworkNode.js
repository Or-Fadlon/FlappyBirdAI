function Sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class NetworkNode {
    constructor(name, activationFunction = Sigmoid) {
        this.name = name;       // Name of the node
        this.input = 0;        // Output of the node after activation
        this.bias = 0; // Bias term initialized randomly
        this.activationFunction = activationFunction;
        this.output = 0;       // Output of the node after activation

        this.bias = Math.random() * 2 - 1;
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

    Clone() {
        let node = new NetworkNode(this.name, this.activationFunction);
        node.bias = this.bias;
        return node;
    }
}

export { NetworkNode };