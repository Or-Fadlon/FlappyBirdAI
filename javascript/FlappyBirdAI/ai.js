import { NeuralNetwork } from "./NeuralNetwork.js";

let AIRuntimeRequestID;
let flappyNetwork;
let velocityY;
let distanceFromPipeX;
let distanceFromTopPipeY;
let distanceFromBottomPipeY;
let distanceFromGroundY;

window.StartAI = function (canvas) { Main(canvas); };
window.StopAI = function () { Stop(); };

function GetGameStateByCanvasImage() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // look for objects inside the image

    // get the player velocityY
    velocityY;
    // get the player X distance from pipe
    distanceFromPipeX;
    // get the player Y distance from top pipe
    distanceFromTopPipeY;
    // get the player Y distance from bottom pipe
    distanceFromBottomPipeY;
    // get the player Y distance from ground
    distanceFromGroundY;
    // TODO: implement this function
}

function GetGameStateFromGlobalVariable() {
    // Use the global variable window.DataForAI
    if (!window.DataForAI) return;
    velocityY = window.DataForAI.velocityY; // player velocityY
    distanceFromPipeX = window.DataForAI.distanceFromPipeX; // player X distance from pipe
    distanceFromTopPipeY = window.DataForAI.distanceFromTopPipeY; // player Y distance from top pipe
    distanceFromBottomPipeY = window.DataForAI.distanceFromBottomPipeY; // player Y distance from bottom pipe
    distanceFromGroundY = window.DataForAI.distanceFromGroundY; // player Y distance from ground
}

function GetGameState() {
    // GetGameStateByCanvasImage(); // TODO: implement this function
    GetGameStateFromGlobalVariable();
}

function SimulateKeyEvent(keyCode, eventType) {
    // Create a new event
    var event = new KeyboardEvent(eventType, {
        keyCode: keyCode,        // Set the keyCode for the key
        bubbles: true,           // Event will bubble up through the DOM
        cancelable: true         // Event can be cancelled
    });
    window.dispatchEvent(event); // Dispatch the event on the window
}

function Jump() {
    // jump
    console.log("JUMP");
    const spaceKeyCode = 32;
    SimulateKeyEvent(spaceKeyCode, "keydown"); // Simulate keydown for Enter key
    // SimulateKeyEvent(spaceKeyCode, "keyup");   // Simulate keyup for Enter key
}

function AILoop() {
    GetGameState();
    // get the network output
    let inputs = [velocityY, distanceFromPipeX, distanceFromTopPipeY, distanceFromBottomPipeY, distanceFromGroundY];
    if (!(velocityY === undefined || distanceFromPipeX === undefined || distanceFromTopPipeY === undefined || distanceFromBottomPipeY === undefined || distanceFromGroundY === undefined)) {
        let output = flappyNetwork.CalculateOutput(inputs);
        console.log("Output: " + output);
        let decision =  output[0] > 0.5 ? "jump" : "no jump";
        // apply the output to the game
        if (decision === "jump") {
            Jump();
        }
    }
    // repeat
    AIRuntimeRequestID = window.requestAnimationFrame(AILoop);
}

function InitAIAgent() {
    // create a neural network
    let inputLen = 5;
    let hiddenLayerLenArray = [];
    let outputLen = 1;
    flappyNetwork = new NeuralNetwork(inputLen, hiddenLayerLenArray, outputLen);
    flappyNetwork.Visualize();
    // load the weights
    // TODO: add weights import export
}

function Start() {
    console.log("Starting AI...");
    InitAIAgent();
    // start the game loop
    // start the AI loop
    AIRuntimeRequestID = window.requestAnimationFrame(AILoop);
}


function jumpRepeatedly() {
    Jump();
    // setTimeout(jumpRepeatedly, 1000);
    AnimationRequestID = window.requestAnimationFrame(jumpRepeatedly)
}

function Main() {
    console.log("Starting AI...");
    // jumpRepeatedly();
    Start();
}