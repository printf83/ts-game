//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { bg, update_game_speed } from "./bg.js";
import { player, playerAct, actionDBType } from "./player.js";

const playerCanvas = document.getElementById("playerCanvas") as HTMLCanvasElement;
const cboPlayerAnimation = document.getElementById("playerAnimation") as HTMLSelectElement;

const playerAnimationChange = (event: Event) => {
	const target = event.currentTarget as HTMLSelectElement;
	const value = target.value;
	if (value) {
		player(playerAct(playerCanvas, value as actionDBType));
	}
};

const bgCanvas = document.getElementById("bgCanvas") as HTMLCanvasElement;
const inputBgSpeed = document.getElementById("bgSpeed") as HTMLInputElement;

const inputBgSpeedChange = (event: Event) => {
	const target = event.currentTarget as HTMLInputElement;
	const value = target.value;
	if (value) {
		update_game_speed(parseInt(value));
	}
};

(function () {
	cboPlayerAnimation.addEventListener("change", playerAnimationChange);
	cboPlayerAnimation.dispatchEvent(new Event("change"));

	bg({ canvas: bgCanvas, game_speed: 5 });
	inputBgSpeed.addEventListener("change", inputBgSpeedChange);
	inputBgSpeed.dispatchEvent(new Event("change"));
})();
