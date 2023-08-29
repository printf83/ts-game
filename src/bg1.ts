import { layer } from "./layer.js";

export class bg1 {
	width = 2400;
	height = 700;
	ground = 118;
	canvas_width: number;
	canvas_height: number;

	img_setup = (src: string) => {
		const result = new Image();
		result.src = src;
		return result;
	};

	bg_list: layer[] = [];

	game_speed: number;

	constructor(opt: { game_speed: number; canvas_width: number; canvas_height: number }) {
		this.game_speed = opt.game_speed;
		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.bg_list.push(new layer({ img: this.img_setup("./res/bg1/layer-1.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.2 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/bg1/layer-2.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.4 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/bg1/layer-3.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.6 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/bg1/layer-4.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.8 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/bg1/layer-5.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 1 }));
	}

	update = (game_speed: number) => {
		this.bg_list.forEach((i) => {
			i.update(game_speed);
		});
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		this.bg_list.forEach((i) => {
			i.draw(ctx);
		});
	};
}
