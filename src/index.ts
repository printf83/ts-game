//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { game } from "./game.js";

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

(function () {
	gameCanvas.width = 1300;
	gameCanvas.height = 700;
	const gameCtx = gameCanvas.getContext("2d");
	if (gameCtx) {
		const d = new game({
			ctx: gameCtx,
			canvas_width: gameCanvas.width,
			canvas_height: gameCanvas.height,
		});
		d.game_start();
	}
})();
