//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { control } from "./control.js";

const controlCanvas = document.getElementById("controlCanvas") as HTMLCanvasElement;

(function () {
	
	controlCanvas.width = 1300;
	controlCanvas.height = 700;
	const controlCtx = controlCanvas.getContext("2d");
	if (controlCtx) {
		control({
			ctx: controlCtx,
			canvas_width: controlCanvas.width,
			canvas_height: controlCanvas.height,
		});
	}
	
})();
