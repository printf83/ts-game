//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { game } from "./game.js";
const DEBUG = false;
const canvas_game = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvas_static = document.getElementById("guiCanvas") as HTMLCanvasElement;
const canvas_value = document.getElementById("valueCanvas") as HTMLCanvasElement;
const canvas_control = document.getElementById("controlCanvas") as HTMLCanvasElement;
const canvas_pointer = document.getElementById("pointerCanvas") as HTMLCanvasElement;
const canvas_mark = document.getElementById("markerCanvas") as HTMLCanvasElement;

(function () {
	window.addEventListener("load", () => {
		if (canvas_game && canvas_static && canvas_value && canvas_control && canvas_pointer && canvas_mark) {
			[canvas_game, canvas_static, canvas_value, canvas_control, canvas_pointer, canvas_mark].forEach((i) => {
				i.width = 1300;
				i.height = 700;
			});

			if (DEBUG) {
				canvas_mark.classList.remove("hide");
				canvas_pointer.classList.remove("hide");
			} else {
				canvas_mark.classList.add("hide");
				canvas_pointer.classList.add("hide");
			}

			const d = new game({
				canvas_game: canvas_game,
				canvas_static: canvas_static,
				canvas_value: canvas_value,
				canvas_control: canvas_control,
				canvas_pointer: canvas_pointer,
				canvas_mark: canvas_mark,

				debug: DEBUG,
			});

			setTimeout(() => {
				d.game_start();
			}, 1000);

			window.addEventListener("resize", () => {
				d.resize();
			});
		} else console.error("gameCanvas not found");
	});
})();
