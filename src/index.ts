//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { game } from "./game.js";

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const staticCanvas = document.getElementById("staticCanvas") as HTMLCanvasElement;
const valueCanvas = document.getElementById("valueCanvas") as HTMLCanvasElement;
const controlCanvas = document.getElementById("controlCanvas") as HTMLCanvasElement;
const controlMarkerCanvas = document.getElementById("controlMarkerCanvas") as HTMLCanvasElement;

(function () {
	document.addEventListener("DOMContentLoaded", () => {
		if (gameCanvas && staticCanvas && valueCanvas && controlCanvas && controlMarkerCanvas) {
			[gameCanvas, staticCanvas, valueCanvas, controlCanvas, controlMarkerCanvas].forEach((i) => {
				i.width = 1300;
				i.height = 700;
			});

			const gameCtx = gameCanvas.getContext("2d");
			const staticCtx = staticCanvas.getContext("2d");
			const valueCtx = valueCanvas.getContext("2d");
			const controlCtx = controlCanvas.getContext("2d");
			const controlMarkerCtx = controlMarkerCanvas.getContext("2d");

			if (gameCtx && staticCtx && valueCtx && controlCtx && controlMarkerCtx) {
				const d = new game({
					canvasMark: controlMarkerCanvas,

					ctx: gameCtx,
					guiCtx: staticCtx,
					ctlCtx: controlCtx,
					ctlMarkCtx: controlMarkerCtx,
					valCtx: valueCtx,

					canvas_width: gameCanvas.width,
					canvas_height: gameCanvas.height,
				});
				d.game_start();
			}
		} else console.error("gameCanvas not found");
	});
})();
