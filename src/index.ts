//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

import { bg, bgDB, update_game_speed } from "./bg.js";
import { enemy, enemyDBType, enemyType } from "./enemy.js";
import { player, playerAct, actionDBType } from "./player.js";
import { bindExplosion } from "./explosion.js";
import { raven } from "./raven.js";

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

//explosion
const explosionCanvas = document.getElementById("explosionCanvas") as HTMLCanvasElement;

//enemyRaven
const enemyCollisionCanvas = document.getElementById("enemyCollisionCanvas") as HTMLCanvasElement;
const enemyRavenCanvas = document.getElementById("enemyRavenCanvas") as HTMLCanvasElement;

//start
(function () {
	//enemyRaven
	enemyRavenCanvas.width = 800;
	enemyRavenCanvas.height = 700;
	enemyCollisionCanvas.width = 800;
	enemyCollisionCanvas.height = 700;
	raven({
		collision_canvas: enemyCollisionCanvas,
		canvas: enemyRavenCanvas,
		canvas_width: 800,
		canvas_height: 700,
	});

	//explosion
	explosionCanvas.width = 400;
	explosionCanvas.height = 700;
	bindExplosion({ canvas: explosionCanvas });

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
