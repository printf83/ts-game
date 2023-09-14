//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { ai } from "./ai.js";
import { LOAD_ALL_ASSET } from "./asset.js";
import { cookie } from "./cookie.js";
import { game } from "./game.js";
import { MathFloor, getURLParam } from "./util.js";

const canvas_game = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvas_static = document.getElementById("guiCanvas") as HTMLCanvasElement;
const canvas_value = document.getElementById("valueCanvas") as HTMLCanvasElement;
const canvas_control = document.getElementById("controlCanvas") as HTMLCanvasElement;
const canvas_pointer = document.getElementById("pointerCanvas") as HTMLCanvasElement;
const canvas_mark = document.getElementById("markerCanvas") as HTMLCanvasElement;
const canvas_ai = document.getElementById("aiCanvas") as HTMLCanvasElement;

const loading_text = document.getElementById("loading_text") as HTMLElement;
const loading_counter = document.getElementById("loading_counter") as HTMLElement;

let total_size_downloaded = 0;
const LOAD_CHANGE = (size_downloaded: number, name?: string, file_size?: number) => {
	if (size_downloaded > 0) {
		total_size_downloaded += size_downloaded;
		// console.log(total_size_downloaded);
		loading_counter.innerText = `${MathFloor(
			(total_size_downloaded / 3470156) * 100
		)}% Complete`;
	} else if (name && file_size) {
		if (file_size > 1000000) {
			loading_text.innerText = `Download ${(file_size / 1000000).toFixed(2)}Mb : ${name}`;
		} else {
			loading_text.innerText = `Download ${(file_size / 1000).toFixed(2)}Kb : ${name}`;
		}
	}
};

(function () {
	window.addEventListener("load", () => {
		const { debug, useai } = getURLParam(document.URL);
		const DEBUG = debug === "true" ? true : false;
		const AI = useai === "true" ? true : false;

		LOAD_ALL_ASSET(LOAD_CHANGE, () => {
			if (
				canvas_game &&
				canvas_static &&
				canvas_value &&
				canvas_control &&
				canvas_pointer &&
				canvas_mark &&
				canvas_ai
			) {
				[
					canvas_game,
					canvas_static,
					canvas_value,
					canvas_control,
					canvas_pointer,
					canvas_mark,
					canvas_ai,
				].forEach((i) => {
					i.width = 1300;
					i.height = 700;
				});

				if (DEBUG) {
					canvas_mark.classList.remove("hide");
					canvas_pointer.classList.remove("hide");
					canvas_ai.classList.remove("hide");
				} else {
					canvas_mark.classList.add("hide");
					canvas_pointer.classList.add("hide");
					canvas_ai.classList.add("hide");
				}

				canvas_game.addEventListener("game_up", (e) => {
					const detail = (e as CustomEvent).detail;
					cookie.set("data", JSON.stringify(detail));
				});

				canvas_game.addEventListener("game_over", () => {
					cookie.delete("data");
				});

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
					const data = cookie.get("data");
					if (data) {
						d.game_start(JSON.parse(data));
					} else {
						if (DEBUG) {
							d.game_start({
								game_level: 10,
								game_score: 0,
								player_life: 100,
								player_power: 100,
							});
						} else {
							d.game_start();
						}
					}

					if (AI) {
						const a = new ai({ game: d, canvas: canvas_ai });
						a.start();
					}
				}, 1000);

				window.addEventListener("resize", () => {
					d.resize();
				});
			} else console.error("gameCanvas not found");
		});
	});
})();
