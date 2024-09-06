import { NeuralNetwork } from "./NeuralNetwork.js";

// N.E.A.T - Neuroevolution of Augmenting Topologies
class NeatNetwork {
    constructor(populationSize, inputLen, hiddenLayerLenArray, outputLen) {
        this.populationSize = populationSize;
        this.inputLen = inputLen;
        this.hiddenLayerLenArray = hiddenLayerLenArray;
        this.outputLen = outputLen;

        this.generation = 1;
        this.population = [];
        for (let i = 0; i < populationSize; i++) {
            let agent = this.InitAIAgent();
            this.population.push(agent);
        }
        this.fitnesses = [];
    }

    InitAIAgent() {
        // create a neural network
        let flappyNetwork = new NeuralNetwork(this.inputLen, this.hiddenLayerLenArray, this.outputLen);
        // flappyNetwork.Visualize();
        return flappyNetwork;
    }

    Crossover(networkIndex1, networkIndex2) {
        let network1 = this.population[networkIndex1];
        let network2 = this.population[networkIndex2];
        let child = network1.Clone();
        // crossover the weights
        for (let i = 0; i < child.connections.length; i++) {
            let connection1 = network1.connections[i];
            let connection2 = network2.connections[i];
            for (let j = 0; j < connection1.inputSize; j++) {
                for (let k = 0; k < connection1.outputSize; k++) {
                    let weight1 = connection1.GetWeight(j, k);
                    let weight2 = connection2.GetWeight(j, k);
                    let weight = (weight1 + weight2) / 2;
                    child.connections[i].SetWeight(j, k, weight);
                }
            }
        }
        // crossover the biases
        for (let i = 0; i < child.layers.length; i++) {
            for (let j = 0; j < child.layers[i].nodes.length; j++) {
                let bias1 = network1.layers[i].nodes[j].bias;
                let bias2 = network2.layers[i].nodes[j].bias;
                let newBias = (bias1 + bias2) / 2;
                child.layers[i].nodes[j].bias = newBias;
            }
        }
        return child;
    }

    Mutate(network) {
        // mutate the weights
        for (let i = 0; i < network.connections.length; i++) {
            let connection = network.connections[i];
            for (let j = 0; j < connection.inputSize; j++) {
                for (let k = 0; k < connection.outputSize; k++) {
                    let weight = connection.GetWeight(j, k);
                    let mutation = Math.random() * 2 - 1;
                    if (Math.random() < 0.3) { // 10% chance of mutation
                        weight = mutation;
                        // weight += mutation;
                        // if (weight > 1) weight = 1;
                        // if (weight < -1) weight = -1;
                    }
                    connection.SetWeight(j, k, weight);
                }
            }
        }
        // mutate the biases
        for (let i = 0; i < network.layers.length; i++) {
            for (let j = 0; j < network.layers[i].nodes.length; j++) {
                let bias = network.layers[i].nodes[j].bias;
                let mutation = Math.random() * 2 - 1;
                if (Math.random() < 0.3) { // 10% chance of mutation
                    bias = mutation;
                    // bias += mutation;
                    // if (bias > 1) bias = 1;
                    // if (bias < -1) bias = -1;
                }
                network.layers[i].nodes[j].bias = bias;
            }
        }
    }

    Breed(networkIndex1, networkIndex2) {
        let child = this.Crossover(networkIndex1, networkIndex2);
        this.Mutate(child);
        return child;
    }

    Evolve() {
        let newPopulation = [];
        let bestNetworkIndex = 0;
        let secondBestNetworkIndex = 1;
        for (let i = 1; i < this.populationSize; i++) {
            if (this.fitnesses[i] > this.fitnesses[bestNetworkIndex]) {
                secondBestNetworkIndex = bestNetworkIndex;
                bestNetworkIndex = i;
            } else if (this.fitnesses[i] > this.fitnesses[secondBestNetworkIndex]) {
                secondBestNetworkIndex = i;
            }
        }
        console.log(`Best fitness: ${this.fitnesses[bestNetworkIndex]}`);
        console.log(`Second best fitness: ${this.fitnesses[secondBestNetworkIndex]}`);

        for (let i = 0; i < this.populationSize; i++) {
            let child = this.Breed(bestNetworkIndex, secondBestNetworkIndex);
            newPopulation.push(child);
        }
        this.population = newPopulation;
        this.fitnesses = [];
        this.generation++;
    }
}

export { NeatNetwork };