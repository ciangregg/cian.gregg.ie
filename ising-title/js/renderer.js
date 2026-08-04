import { anneal } from "./simulation.js";

export function draw(ctx, sim) {

    const cell = sim.cellSize;

    ctx.clearRect(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
    );

    for (let y = 0; y < sim.ny; y++) {

        for (let x = 0; x < sim.nx; x++) {

            const s = sim.spins[y * sim.nx + x];

            ctx.fillStyle =
                s === 1 ? "#ffffff" : "#202020";

            ctx.fillRect(
                x * cell,
                y * cell,
                cell,
                cell
            );
        }
    }
}


export function startRenderer(canvas, sim) {

    const ctx = canvas.getContext("2d");


    function animate() {

        anneal();

        draw(ctx, sim);

        requestAnimationFrame(animate);

    }


    animate();

}