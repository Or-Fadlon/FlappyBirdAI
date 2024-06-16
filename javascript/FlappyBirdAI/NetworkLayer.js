import { NetworkNode } from "./NetworkNode.js";

class NetworkLayer {
    constructor(numberOfNodes) {
        this.nodes = [];

        for (let i = 0; i < numberOfNodes; i++) {
            this.nodes.push(new NetworkNode(i));
        }
    }

    GetNumberOfNodes() {
        return this.nodes.length;
    }
}

export { NetworkLayer }