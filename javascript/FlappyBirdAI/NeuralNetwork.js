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

        this.visualizationOpacity = 1;
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

    Clone() {
        let network = new NeuralNetwork(1, [], 1);
        network.layers = [];
        network.connections = [];
        for (let i = 0; i < this.layers.length; i++) {
            network.layers.push(this.layers[i].Clone());
        }
        for (let i = 0; i < this.connections.length; i++) {
            network.connections.push(this.connections[i].Clone());
        }
        return network;
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


    // calculate the positions of all nodes in the neural network
    CalculateNodePositions(startX, startY, width, height) {
        let nodePositions = {};
        for (let i = 0; i < this.layers.length; i++) {
            let nodesInLayer = this.layers[i].nodes; // get all nodes in the layer
            let x = startX + ((i + 1.0) * width) / (this.layers.length + 1.0); // calculate x position
            for (let j = 0; j < nodesInLayer.length; j++) {
                let y = startY + ((j + 1.0) * height) / (nodesInLayer.length + 1.0); // calculate y position
                let nodeName = `L${i}-N${j}`;
                nodePositions[nodeName] = [x, y]; // store position using node number as index
            }
        }
        return nodePositions;
    }

    // Draw connections between nodes, adjusting opacity for disabled connections
    DrawConnections(context, nodePositions) {
        this.connections.forEach((connection, connectionNum) => {
            for (let inNodeNum = 0; inNodeNum < connection.inputSize; inNodeNum++) {
                let intNodeName = `L${connectionNum}-N${inNodeNum}`;
                for (let outNodeNum = 0; outNodeNum < connection.outputSize; outNodeNum++) {
                    let outNodeName = `L${connectionNum + 1}-N${outNodeNum}`;
                    let weight = connection.GetWeight(inNodeNum, outNodeNum);
                    let fromPos = nodePositions[intNodeName];
                    let toPos = nodePositions[outNodeName];
                    // Determine the base color based on the weight of the connection
                    let color = weight > 0 ? [255, 0, 0] : [0, 0, 255]; // Red for positive, blue for negative
                    context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${this.visualizationOpacity})`;
                    // Set the stroke weight based on the absolute value of the weight
                    context.lineWidth = Math.abs(weight) * 5;
                    // Draw the line representing the connection
                    context.beginPath();
                    context.moveTo(fromPos[0], fromPos[1]);
                    context.lineTo(toPos[0], toPos[1]);
                    context.stroke();
                }
            }
        });
    }

    // draw nodes at their calculated positions
    DrawNodes(context, nodePositions) {
        Object.values(nodePositions).forEach((pos, index) => {
            // draw nodes
            context.strokeStyle = `rgba(0, 0, 0, ${this.visualizationOpacity})`;
            context.lineWidth = 1;
            context.fillStyle = `rgba(255, 255, 255, ${this.visualizationOpacity})`;
            context.beginPath();
            context.arc(pos[0], pos[1], 20, 0, 2 * Math.PI);
            context.fill();
            context.stroke();

            // draw text in nodes
            context.fillStyle = `rgba(0, 0, 0, ${this.visualizationOpacity})`;
            context.font = 'bold 20px sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(index, pos[0], pos[1]);

        });
    }

    Render(context, startX, startY, width, height) {
        context.save();
        let nodePositions = this.CalculateNodePositions(startX, startY, width, height); // calculate and store positions of all nodes
        this.DrawConnections(context, nodePositions); // draw all connections between nodes
        this.DrawNodes(context, nodePositions); // draw nodes on top of connections
        context.restore();
    }
}

export { NeuralNetwork };