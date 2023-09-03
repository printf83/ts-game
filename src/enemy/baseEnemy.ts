import { MathFloor, MathPI2, genUID } from "../util.js";
import { baseAnimation } from "../baseAnimation.js";
import { player } from "../player.js";

export class baseEnemy extends baseAnimation {
	debug: boolean = false;

	uid: number[];
	uid_text: string;
	uid_number: string;

	ctx_collision?: CanvasRenderingContext2D;

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
		ctx: CanvasRenderingContext2D;
		ctx_collision?: CanvasRenderingContext2D;

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

		debug?: boolean;
	}) {
		super(opt);

		opt.debug ??= false;

		opt.explode_in ??= false;
		opt.explode_out ??= false;
		opt.have_particle ??= false;
		opt.point ??= 1;
		opt.collision_scale ??= 0.5;
		opt.collision_x ??= 0;
		opt.collision_y ??= 0;

		this.debug = opt.debug;

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

	draw() {
		if (this.ctx_collision) {
			this.ctx_collision.fillStyle = this.uid_text;
			this.ctx_collision.fillRect(MathFloor(this.x), MathFloor(this.y), this.width, this.height);
		}

		//draw sprite
		super.draw();

		//draw collision area
		if (this.debug) {
			this.ctx.save();

			this.ctx.strokeStyle = "white";
			this.ctx.beginPath();
			this.ctx.arc(this.collision_x, this.collision_y, this.collision_scale * 100, 0, MathPI2);
			this.ctx.stroke();

			this.ctx.restore();
		}
	}
	set_position(opt: { game_speed: number }) {
		super.set_position(opt);
		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
	}
	is_collide(opt: { player: player }) {
		const dx = this.collision_x - opt.player.collision_x;
		const dy = this.collision_y - opt.player.collision_y;

		const distance = Math.sqrt(dx * dx + dy * dy);
		return distance < this.width * this.collision_scale + opt.player.width * opt.player.collision_scale;
	}
}
