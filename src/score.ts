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

	constructor(opt: { text: string; x: number; y: number; destination_x: number; destination_y: number }) {
		this.text = opt.text;
		this.x = opt.x;
		this.y = opt.y;
		this.destination_x = opt.destination_x;
		this.destination_y = opt.destination_y;
		this.speed_x = 1;
		this.speed_y = 1;

		// this.speed_x = Math.sqrt(this.x + this.y);
		// this.speed_y = Math.sqrt(this.destination_x + this.destination_y);
		this.mark_delete = false;
	}
	update() {
		if (this.x > this.destination_x) this.x -= this.speed_x;
		if (this.x < this.destination_x) this.x += this.speed_x;
		if (this.y > this.destination_y) this.y -= this.speed_y;
		if (this.y < this.destination_y) this.y += this.speed_y;

		if (this.x <= this.destination_x + 5 && this.y <= this.destination_y + 5) this.mark_delete = true;
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
