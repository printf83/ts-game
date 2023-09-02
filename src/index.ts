//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { game } from "./game.js";

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const staticCanvas = document.getElementById("staticCanvas") as HTMLCanvasElement;
const valueCanvas = document.getElementById("valueCanvas") as HTMLCanvasElement;

(function () {
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
})();
// const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
// const statusCanvas = document.getElementById("statusCanvas") as HTMLCanvasElement;
// const enemyCanvas = document.getElementById("enemyCanvas") as HTMLCanvasElement;
// const playerCanvas = document.getElementById("playerCanvas") as HTMLCanvasElement;
// const particleCanvas = document.getElementById("particleCanvas") as HTMLCanvasElement;

// (function () {
// 	if (gameCanvas && statusCanvas && enemyCanvas && playerCanvas && particleCanvas) {

// 		[gameCanvas, statusCanvas, enemyCanvas, playerCanvas, particleCanvas].forEach(i => {
// 			i.width = 1300;
// 			i.height = 700;
// 		});

// 		const gameCtx = gameCanvas.getContext("2d");
// 		const statusCtx = statusCanvas.getContext("2d");
// 		const enemyCtx = enemyCanvas.getContext("2d");
// 		const playerCtx = playerCanvas.getContext("2d");
// 		const particleCtx = particleCanvas.getContext("2d");
// 		if (gameCtx && statusCtx && enemyCtx && playerCtx && particleCtx) {
// 			const d = new game({
// 				ctx: gameCtx,
// 				statusCtx: statusCtx,
// 				enemyCtx: enemyCtx,
// 				playerCtx: playerCtx,
// 				particleCtx: particleCtx,
// 				canvas_width: gameCanvas.width,
// 				canvas_height: gameCanvas.height,
// 			});
// 			d.game_start();
// 		}
// 	} else console.error("gameCanvas not found");
// })();
