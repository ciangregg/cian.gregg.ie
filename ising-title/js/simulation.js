// parameters for the simulation
export const sim = {

    nx: 120,
    ny: 60,

    cellSize: 8,

    J: 1.0,

    T: 70.0,
    finalT: 0.1,
    cooling: 0.99,
    h: null,

    spins: null

};

// main simulation functions
export function initialiseSimulation() {

    sim.spins = new Int8Array(sim.nx * sim.ny);

    for (let i = 0; i < sim.spins.length; i++) {

        sim.spins[i] = Math.random() < 0.5 ? -1 : 1;

    }

}

function idx(x, y) {

    x = (x + sim.nx) % sim.nx;
    y = (y + sim.ny) % sim.ny;

    return y * sim.nx + x;

}

function deltaEnergy(x, y) {

    const i = idx(x,y);

    const s = sim.spins[idx(x, y)];

    const nn =
        sim.spins[idx(x+1, y)] +
        sim.spins[idx(x-1, y)] +
        sim.spins[idx(x, y+1)] +
        sim.spins[idx(x, y-1)];

    return 2*s*(
        sim.J*nn +
        sim.h[i]
    );

}

export function metropolisSweep() {

    const N = sim.nx * sim.ny;

    for (let k = 0; k < N; k++) {

        const x = Math.floor(Math.random() * sim.nx);
        const y = Math.floor(Math.random() * sim.ny);

        const dE = deltaEnergy(x, y);

        if (dE <= 0 || Math.random() < Math.exp(-dE / sim.T)) {

            sim.spins[idx(x, y)] *= -1;

        }

    }

}


// annealing functions
export function anneal() {

    // do several sweeps per frame
    for (let i = 0; i < 5; i++) {
        metropolisSweep();
    }


    // exponential cooling
    sim.T *= sim.cooling;


    // don't go below final temperature
    if (sim.T < sim.finalT) {
        sim.T = sim.finalT;
    }

}

export function resetAnnealing() {

    sim.T = 9.0;

    for (let i = 0; i < sim.spins.length; i++) {

        sim.spins[i] =
            Math.random() < 0.5 ? -1 : 1;

    }

}


// create a field of external magnetic field values for name rendering

export function createField() {

    sim.h = new Float32Array(sim.nx * sim.ny);

    const canvas = document.createElement("canvas");

    canvas.width = sim.nx;
    canvas.height = sim.ny;

    const ctx = canvas.getContext("2d");


    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    ctx.fillStyle = "white";
    ctx.font = "bold 45px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "Cian",
        sim.nx/2,
        sim.ny/2
    );


    const pixels = ctx.getImageData(
        0,
        0,
        sim.nx,
        sim.ny
    ).data;


    for(let i=0;i<sim.nx*sim.ny;i++){

        const brightness = pixels[4*i];

        if(brightness > 100)
            sim.h[i] = 4.0;
        else
            sim.h[i] = -4.0;

    }

}