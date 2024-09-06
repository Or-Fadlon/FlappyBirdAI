import { NeatNetwork } from "./NeatNetwork.js";

class FlappyNeatNetwork extends NeatNetwork {
    constructor() {
        let populationSize = 20;
        let inputLen = 5;
        let hiddenLayerLenArray = [];
        let outputLen = 1;
        super(populationSize, inputLen, hiddenLayerLenArray, outputLen);

        this.populationRunningIndex = 0;
    }

    GetRunningNetwork() {
        return this.population[this.populationRunningIndex];
    }

    MoveToNextNetwork(fitness) {
        console.log(`Gen${this.generation} Net${this.populationRunningIndex} finish with ${fitness} fitness`);
        this.fitnesses.push(fitness);
        this.populationRunningIndex++;
        if (this.populationRunningIndex >= this.populationSize) {
            this.Evolve();
            this.populationRunningIndex = 0;
        }
    }

    Render(context) {
        let startX = 0; // starting x-coordinate for the visualization
        let startY = 0; // starting y-coordinate for the visualization
        let width = canvas.width; // width of the visualization area
        let height = canvas.height; // height of the visualization area
        let network = this.population[this.populationRunningIndex];
        network.Render(context, startX, startY, width, height);
    }
}
export { FlappyNeatNetwork };