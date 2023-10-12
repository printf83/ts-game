import { COLOR } from "./asset.js";
import { MathFloor, draw_text } from "./util.js";

export class score {
	ctx: CanvasRenderingContext2D;
	img: ImageBitmap;

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
	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		text: string;
		value: number;
		x: number;
		y: number;
		destination_x: number;
		destination_y: number;
	}) {
		this.ctx = opt.ctx;
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

		//draw the text into offscreen canvas
		const canvas = new OffscreenCanvas(100, 50);
		const ctx = canvas.getContext("2d")!;

		draw_text({
			text_color: this.value <= 0 ? `rgba(${COLOR.red},1)` : `rgba(${COLOR.light},1)`,
			ctx: ctx,
			x: 50,
			y: 25,
			text: this.text,
			font_weight: 30,
		});

		this.img = canvas.transferToImageBitmap();
	}
	update() {
		this.x += this.speed_x;
		this.y += this.speed_y;

		this.timer--;
		if (this.timer <= 0) this.mark_delete = true;
	}
	draw() {
		this.ctx.drawImage(this.img, MathFloor(this.x), MathFloor(this.y));
	}
}
