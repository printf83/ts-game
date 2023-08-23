interface move_option {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
}

export class move {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;

	constructor(opt: move_option) {
		this.ctx = opt.ctx;
		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;
	}

	update(_timestamp: number) {}

	draw() {}

	//private addNewEnemy() {}
}

interface move_animate_option {
	move: move;
	timestamp: number;
}

let move_last_timestamp = 0;
export const animate_move = (opt: move_animate_option) => {
	opt.move.ctx.clearRect(0, 0, opt.move.canvas_width, opt.move.canvas_height);

	let delta_time = opt.timestamp - move_last_timestamp;
	move_last_timestamp = opt.timestamp;

	opt.move.update(delta_time);
	opt.move.draw();

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		animate_move(opt);
	});
};
