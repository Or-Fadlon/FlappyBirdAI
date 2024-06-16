import { NetworkLayer } from './NetworkLayer.js';
import { NetworkConnection } from './NetworkConnection.js';

class NeuralNetwork {
    constructor(inputLen, hiddenLayerLenArray, outputLen) {
        if (inputLen < 1 || outputLen < 1)
            throw new Error("Invalid number of inputs/outputs");
        this.layers = [];
        this.connections = [];

        // Create input, hidden and output layers
        let inputLayer = new NetworkLayer(inputLen);
        this.layers.push(inputLayer);
        for (let i = 0; i < hiddenLayerLenArray.length; i++) {
            let hiddenLayer = new NetworkLayer(hiddenLayerLenArray[i]);
            this.layers.push(hiddenLayer);
        }
        let outputLayer = new NetworkLayer(outputLen);
        this.layers.push(outputLayer);

        for (let i = 0; i < this.layers.length - 1; i++) {
            let connection = new NetworkConnection(this.layers[i].GetNumberOfNodes(), this.layers[i + 1].GetNumberOfNodes());
            this.connections.push(connection);
        }
    }

    Visualize() {
        let network = [];
        for (let i = 0; i < this.layers.length; i++) {
            let layer = [];
            for (let j = 0; j < this.layers[i].GetNumberOfNodes(); j++) {
                let node = {
                    index: j,
                    bias: this.layers[i].nodes[j].bias,
                    connections: []
                };
                if (i > 0) {
                    for (let k = 0; k < this.layers[i - 1].GetNumberOfNodes(); k++) {
                        let weight = this.connections[i - 1].weights[`${k}-${j}`];
                        node.connections.push({ from: k, weight: weight });
                    }
                }
                layer.push(node);
            }
            network.push(layer);
        }
        console.log(network);
    }

    Calculate(inputArray) {
        if (inputArray.length !== this.layers[0].GetNumberOfNodes())
            throw new Error("Invalid input size");

        let inputs = [];
        let nextInputs = [];
        let weightsArray = [];
        for (let layerNum = 0; layerNum < this.layers.length; layerNum++) {
            for (let nodeNum = 0; nodeNum < this.layers[layerNum].GetNumberOfNodes(); nodeNum++) {
                if (layerNum === 0) {
                    // Input layer
                    inputs = [inputArray[nodeNum]];
                    weightsArray = [1];
                } else {
                    // Hidden and output layers
                    inputs = nextInputs;
                    nextInputs = [];
                    weightsArray = [];
                    // Get weights from previous layer
                    for (let k = 0; k < this.layers[layerNum - 1].GetNumberOfNodes(); k++) {
                        let weight = this.connections[layerNum - 1].GetWeight(k, nodeNum); // weight of: node_k => node_j
                        weightsArray.push(weight);
                    }
                }
                let node = this.layers[layerNum].nodes[nodeNum];
                let output = node.Calculate(inputs, weightsArray);
                nextInputs.push(output);
            }
        }
        return nextInputs;
    }

    CalculateOutput(input) {
        let output = this.Calculate(input);
        return output;
    }
}

export { NeuralNetwork };