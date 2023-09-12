import { game } from "./game.js";
import { MathPI2 } from "./util.js";

export class ai {
	canvas: HTMLCanvasElement;
	canvas_width: number;
	canvas_height: number;

	ctx: CanvasRenderingContext2D;
	game: game;

	state_check: boolean = false;

	constructor(opt: { canvas: HTMLCanvasElement; game: game }) {
		this.canvas = opt.canvas;
		this.canvas_width = this.canvas.width;
		this.canvas_height = this.canvas.height;

		this.ctx = this.canvas.getContext("2d")!;
		this.game = opt.game;

		this.ctx.fillStyle = "red";
	}

	start() {
		this.state_check = true;
		requestIdleCallback(() => {
			this.check();
		});
	}
	pause() {
		this.state_check = false;
	}

	check() {
		this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);

		if (this.state_check) {
			this.ctx.arc(
				this.game.player.x + this.game.player.width * 0.5,
				this.game.player.y + this.game.player.height * 0.5,
				5,
				0,
				MathPI2
			);
			this.ctx.fill();

			requestIdleCallback(() => {
				this.check();
			});
		}
	}
}
