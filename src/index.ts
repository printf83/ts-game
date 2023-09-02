//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { game } from "./game.js";

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const staticCanvas = document.getElementById("staticCanvas") as HTMLCanvasElement;
const valueCanvas = document.getElementById("valueCanvas") as HTMLCanvasElement;

(function () {
	document.addEventListener("DOMContentLoaded", () => {
		if (gameCanvas && staticCanvas && valueCanvas) {
			[gameCanvas, staticCanvas, valueCanvas].forEach((i) => {
				i.width = 1300;
				i.height = 700;
			});

			const gameCtx = gameCanvas.getContext("2d");
			const staticCtx = staticCanvas.getContext("2d");
			const valueCtx = valueCanvas.getContext("2d");

			if (gameCtx && staticCtx && valueCtx) {
				const d = new game({
					ctx: gameCtx,
					staticCtx: staticCtx,
					valueCtx: valueCtx,
					canvas_width: gameCanvas.width,
					canvas_height: gameCanvas.height,
				});
				d.game_start();
			}
		} else console.error("gameCanvas not found");
	});
})();
