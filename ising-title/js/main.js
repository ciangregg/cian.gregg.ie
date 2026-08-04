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

canvas.width = 960;
canvas.height = 480;




initialiseSimulation();
createField();

startRenderer(canvas, sim);

const resetButton =
    document.getElementById("resetButton");


resetButton.onclick = () => {

    resetAnnealing();

};