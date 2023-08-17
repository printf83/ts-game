//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { bg, bgDB, update_game_speed } from "./bg.js";
import { enemy, enemyDBType, enemyType } from "./enemy.js";
import { player, playerAct, actionDBType } from "./player.js";
import { trigger } from "./trigger.js";

//player
const playerCanvas = document.getElementById("playerCanvas") as HTMLCanvasElement;
const cboPlayerAnimation = document.getElementById("playerAnimation") as HTMLSelectElement;

const playerAnimationChange = (event: Event) => {
	const target = event.currentTarget as HTMLSelectElement;
	const value = target.value;
	if (value) {
		player(playerAct(playerCanvas, value as actionDBType));
	}
};

//bg
const bgCanvas = document.getElementById("bgCanvas") as HTMLCanvasElement;
const inputBgSpeed = document.getElementById("bgSpeed") as HTMLInputElement;
const bgSpeedValue = document.getElementById("bgSpeedValue") as HTMLSpanElement;

const inputBgSpeedChange = (event: Event) => {
	const target = event.currentTarget as HTMLInputElement;
	const value = target.value;
	if (value) {
		bgSpeedValue.innerText = `[${value}]`;
		update_game_speed(parseInt(value));
	}
};

//enemy
const enemyCanvas = document.getElementById("enemyCanvas") as HTMLCanvasElement;
const cboEnemyType = document.getElementById("enemyType") as HTMLSelectElement;

const enemyTypeChange = () => {
	const enemy_type = cboEnemyType.value;

	if (enemy_type) {
		enemy(enemyType(enemyCanvas, 400, 700, enemy_type as enemyDBType));
	}
};

//trigger
const triggerCanvas = document.getElementById("triggerCanvas") as HTMLCanvasElement;

//start
(function () {
	//trigger
	triggerCanvas.width = 400;
	triggerCanvas.height = 700;
	trigger({ canvas: triggerCanvas });

	//enemy
	enemyCanvas.width = 400;
	enemyCanvas.height = 700;
	cboEnemyType.addEventListener("change", enemyTypeChange);
	cboEnemyType.dispatchEvent(new Event("change"));

	//bg
	bg({ canvas: bgCanvas, game_speed: 4, bg: bgDB });
	inputBgSpeed.addEventListener("change", inputBgSpeedChange);
	inputBgSpeed.dispatchEvent(new Event("change"));

	//player
	cboPlayerAnimation.addEventListener("change", playerAnimationChange);
	cboPlayerAnimation.dispatchEvent(new Event("change"));
})();
