import { baseAnimation } from "../base.js";

const genUID = () => {
	return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
};

export class baseEnemy extends baseAnimation {
	uid: number[];
	uid_text: string;

	canvas_width: number;
	canvas_height: number;

	point: number;

	explode_in: boolean;
	explode_out: boolean;
	have_particle: boolean;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		canvas_width: number;
		canvas_height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		explode_in?: boolean;
		explode_out?: boolean;

		have_particle?: boolean;

		point?: number;
	}) {
		super(opt);

		this.uid = genUID();
		this.uid_text = `rgba(${this.uid[0]},${this.uid[1]},${this.uid[2]})`;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.explode_in = opt.explode_in ?? false;
		this.explode_out = opt.explode_out ?? false;

		this.have_particle = opt.have_particle ?? false;

		this.point = opt.point ?? 1;
	}

	update(delta_time: number, onframechange?: () => void) {
		super.update(delta_time, onframechange);
	}

	draw(ctx: CanvasRenderingContext2D, ctx_collision?: CanvasRenderingContext2D) {
		if (ctx_collision) {
			ctx_collision.fillStyle = this.uid_text;
			ctx_collision.fillRect(this.x, this.y, this.width, this.height);
		}

		super.draw(ctx);
	}
}
