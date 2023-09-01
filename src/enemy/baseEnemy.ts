import { baseAnimation } from "../baseAnimation.js";
import { player } from "../player.js";

const genUID = () => {
	return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
};

export class baseEnemy extends baseAnimation {
	MathPI2 = Math.PI * 2;

	uid: number[];
	uid_text: string;
	uid_number: string;

	canvas_width: number;
	canvas_height: number;

	point: number;

	explode_in: boolean;
	explode_out: boolean;
	have_particle: boolean;

	collision_x: number;
	collision_y: number;
	collision_adjust_x: number;
	collision_adjust_y: number;
	collision_scale: number;

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
		fps?: number;

		point?: number;

		collision_scale?: number;
		collision_x?: number;
		collision_y?: number;
	}) {
		super(opt);

		opt.explode_in ??= false;
		opt.explode_out ??= false;
		opt.have_particle ??= false;
		opt.point ??= 1;
		opt.collision_scale ??= 0.5;
		opt.collision_x ??= 0;
		opt.collision_y ??= 0;

		this.uid = genUID();
		this.uid_number = `${this.uid[0]},${this.uid[1]},${this.uid[2]}`;
		this.uid_text = `rgb(${this.uid[0]},${this.uid[1]},${this.uid[2]})`;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.explode_in = opt.explode_in;
		this.explode_out = opt.explode_out;

		this.have_particle = opt.have_particle;

		this.point = opt.point;

		this.collision_scale = opt.collision_scale;
		this.collision_adjust_x = opt.collision_x;
		this.collision_adjust_y = opt.collision_y;
		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
		this.collision_y = this.y + this.collision_adjust_y + this.height * this.collision_scale;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		super.update(opt);

		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
		this.collision_y = this.y + this.collision_adjust_y + this.height * this.collision_scale;
	}

	draw(opt: { ctx: CanvasRenderingContext2D; ctx_collision?: CanvasRenderingContext2D }) {
		if (opt.ctx_collision) {
			opt.ctx_collision.fillStyle = this.uid_text;
			opt.ctx_collision.fillRect(this.x, this.y, this.width, this.height);
		}

		//draw sprite
		super.draw(opt);

		// //draw collision area
		// ctx.save();

		// ctx.strokeStyle = "white";
		// ctx.beginPath();
		// ctx.arc(this.collision_x, this.collision_y, this.collision_scale * 100, 0, this.MathPI2);
		// ctx.stroke();

		// ctx.restore();
	}

	is_collide(opt: { player: player }) {
		const dx = this.collision_x - opt.player.collision_x;
		const dy = this.collision_y - opt.player.collision_y;

		const distance = Math.sqrt(dx * dx + dy * dy);
		return distance < this.width * this.collision_scale + opt.player.width * opt.player.collision_scale;
	}
}
