import { NetworkNode } from "./NetworkNode.js";

class NetworkLayer {
    constructor(numberOfNodes) {
        this.nodes = [];
        this.bias = Math.random() * 2 - 1; // Bias term initialized randomly

        for (let i = 0; i < numberOfNodes; i++) {
            this.nodes.push(new NetworkNode(i));
        }
    }

    GetNumberOfNodes() {
        return this.nodes.length;
    }
}

export { NetworkLayer }