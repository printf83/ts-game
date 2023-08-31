import { draw_text } from "./util.js";

export class score {
	text: string;
	x: number;
	y: number;
	destination_x: number;
	destination_y: number;
	speed_x: number;
	speed_y: number;
	mark_delete: boolean;
	timer: number;
	constructor(opt: { text: string; x: number; y: number; destination_x: number; destination_y: number }) {
		this.text = opt.text;
		this.x = opt.x;
		this.y = opt.y;
		this.destination_x = opt.destination_x;
		this.destination_y = opt.destination_y;
		this.speed_x = (this.destination_x - this.x) * 0.01;
		this.speed_y = (this.destination_y - this.y) * 0.01;
		this.mark_delete = false;
		this.timer = 1000;
	}
	update() {
		// if (this.x > this.destination_x) this.x -= this.speed_x;
		// if (this.x < this.destination_x) this.x += this.speed_x;
		// if (this.y > this.destination_y) this.y -= this.speed_y;
		// if (this.y < this.destination_y) this.y += this.speed_y;

		this.x += this.speed_x;
		this.y += this.speed_y;

		this.timer--;
		if (this.timer <= 0) this.mark_delete = true;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		draw_text({
			ctx: opt.ctx,
			x: this.x,
			y: this.y,
			text: this.text,
			font_weight: 30,
		});
	}
}
