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

    ZeroBiases() {
        this.nodes.forEach((node) => {
            node.bias = 0;
        });
    }

    Clone() {
        let layer = new NetworkLayer(this.GetNumberOfNodes());
        for (let i = 0; i < this.GetNumberOfNodes(); i++) {
            layer.nodes[i] = this.nodes[i].Clone();
        }
        return layer;
    }
}

export { NetworkLayer }