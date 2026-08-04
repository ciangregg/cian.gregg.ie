import {
    sim,
    initialiseSimulation,
    createField,
    resetAnnealing
} from "./simulation.js";

import {
    startRenderer
} from "./renderer.js";


const canvas = document.getElementById("isingCanvas");

canvas.width = 1600;
canvas.height = 800;




initialiseSimulation();
createField();

startRenderer(canvas, sim);

const resetButton =
    document.getElementById("resetButton");


resetButton.onclick = () => {

    resetAnnealing();

};