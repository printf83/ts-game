import { draw_text } from "./util.js";

export class score {
	text: string;
	value: number;
	x: number;
	y: number;
	destination_x: number;
	destination_y: number;
	speed_x: number;
	speed_y: number;
	mark_delete: boolean;
	timer: number;
	constructor(opt: { text: string; value: number; x: number; y: number; destination_x: number; destination_y: number }) {
		this.text = opt.text;
		this.value = opt.value;
		this.x = opt.x;
		this.y = opt.y;
		this.destination_x = opt.destination_x;
		this.destination_y = opt.destination_y;
		this.speed_x = (this.destination_x - this.x) * 0.01;
		this.speed_y = (this.destination_y - this.y) * 0.01;
		this.mark_delete = false;
		this.timer = 100;
	}
	update() {
		this.x += this.speed_x;
		this.y += this.speed_y;

		this.timer--;
		if (this.timer <= 0) this.mark_delete = true;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		draw_text({
			text_color: this.value <= 0 ? "red" : "white",
			ctx: opt.ctx,
			x: this.x,
			y: this.y,
			text: this.text,
			font_weight: 30,
		});
	}
}
