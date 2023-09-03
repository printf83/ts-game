//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { game } from "./game.js";
const DEBUG = true;
const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const guiCanvas = document.getElementById("guiCanvas") as HTMLCanvasElement;
const valueCanvas = document.getElementById("valueCanvas") as HTMLCanvasElement;
const controlCanvas = document.getElementById("controlCanvas") as HTMLCanvasElement;
const pointerCanvas = document.getElementById("pointerCanvas") as HTMLCanvasElement;
const markerCanvas = document.getElementById("markerCanvas") as HTMLCanvasElement;

(function () {
	document.addEventListener("DOMContentLoaded", () => {
		if (gameCanvas && guiCanvas && valueCanvas && controlCanvas && pointerCanvas && markerCanvas) {
			[gameCanvas, guiCanvas, valueCanvas, controlCanvas, pointerCanvas, markerCanvas].forEach((i) => {
				i.width = 1300;
				i.height = 700;
			});

			if (DEBUG) {
				markerCanvas.classList.remove("hide");
				pointerCanvas.classList.remove("hide");
			} else {
				markerCanvas.classList.add("hide");
				pointerCanvas.classList.add("hide");
			}

			const gameCtx = gameCanvas.getContext("2d");
			const guiCtx = guiCanvas.getContext("2d");
			const valueCtx = valueCanvas.getContext("2d");
			const controlCtx = controlCanvas.getContext("2d");
			const pointerCtx = pointerCanvas.getContext("2d");
			const markerCtx = markerCanvas.getContext("2d");

			if (gameCtx && guiCtx && valueCtx && controlCtx && pointerCtx && markerCtx) {
				const d = new game({
					canvas_mark: markerCanvas,

					ctx: gameCtx,
					static_ctx: guiCtx,
					control_ctx: controlCtx,
					pointer_ctx: pointerCtx,
					marker_ctx: markerCtx,
					value_ctx: valueCtx,

					canvas_width: gameCanvas.width,
					canvas_height: gameCanvas.height,

					debug: DEBUG,
				});

				setTimeout(() => {
					d.game_start();
				}, 1000);

				window.addEventListener("resize", () => {
					d.resize();
				});
			}
		} else console.error("gameCanvas not found");
	});
})();
