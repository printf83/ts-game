import { ASSETSVG, BTN_COLOR, BTN_MARGIN, BTN_PADDING, BTN_SIZE, COLOR } from "./asset.js";
import { game } from "./game.js";
import { MathPI2, DPI, genUID, MathPI, isFullscreen } from "./util.js";

class button {
	debug: boolean;

	wm: { [key: string]: ImageBitmap } = {};

	ctx: CanvasRenderingContext2D;
	ctx_mark: CanvasRenderingContext2D;

	name: string;

	x: number;
	y: number;

	uid: number[];
	uid_text: string;
	uid_number: string;

	img: HTMLImageElement;
	img_url: string;
	img_width: number;
	img_height: number;

	color: string;
	width: number;
	height: number;
	padding: number;
	line_width: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		ctx_mark: CanvasRenderingContext2D;
		name: string;
		img: HTMLImageElement;
		x: number;
		y: number;
		img_width?: number;
		img_height?: number;
		width?: number;
		height?: number;
		padding?: number;
		color?: string;
		line_width?: number;
		debug?: boolean;
	}) {
		opt.width ??= BTN_SIZE;
		opt.height ??= BTN_SIZE;
		opt.img_width ??= 16;
		opt.img_height ??= 16;
		opt.padding ??= BTN_PADDING * 0.5; //BTN_SIZE * 0.4;
		opt.color ??= BTN_COLOR.normal;
		opt.line_width ??= 2;
		opt.debug ??= false;

		this.debug = opt.debug;

		this.ctx = opt.ctx;
		this.ctx_mark = opt.ctx_mark;

		this.uid = genUID();
		this.uid_number = `${this.uid[0]},${this.uid[1]},${this.uid[2]}`;
		this.uid_text = `rgb(${this.uid[0]},${this.uid[1]},${this.uid[2]})`;

		this.name = opt.name;

		this.img = opt.img;
		this.img_url = this.img.src;
		this.img_width = opt.img_width;
		this.img_height = opt.img_height;
		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
		this.padding = opt.padding;
		this.color = opt.color;
		this.line_width = opt.line_width;
	}
	clear() {
		this.draw_clear({ ctx: this.ctx });
	}
	draw() {
		this.clear();
		this.draw_fill({ ctx: this.ctx, color: this.color });
		this.draw_line({ ctx: this.ctx });
		this.draw_img({ ctx: this.ctx });
	}
	clear_mark() {
		this.draw_clear({ ctx: this.ctx_mark });
	}
	draw_mark() {
		this.clear_mark();

		this.draw_fill({ ctx: this.ctx_mark, color: this.uid_text });
	}

	scale_wm = 2;
	private draw_fill(opt: { ctx: CanvasRenderingContext2D; color: string }) {
		const wm_name = `fill_${this.width}_${this.height}_${this.line_width}_${opt.color}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = this.width + this.line_width * this.scale_wm;
			const h = this.height + this.line_width * this.scale_wm;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = opt.color;
				ctx.strokeStyle = opt.color;
				ctx.lineWidth = this.line_width;
				ctx.arc(
					this.line_width + this.width * 0.5,
					this.line_width + this.height * 0.5,
					this.width * 0.5,
					0,
					MathPI2
				);
				ctx.fill();
				ctx.stroke();
				ctx.restore();
				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
		}
	}

	private draw_line(opt: { ctx: CanvasRenderingContext2D }) {
		const wm_name = `line_${this.width}_${this.height}_${this.line_width}_${this.color}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = this.width + this.line_width * this.scale_wm;
			const h = this.height + this.line_width * this.scale_wm;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.line_width;
				ctx.arc(
					this.line_width + this.width * 0.5,
					this.line_width + this.height * 0.5,
					this.width * 0.5,
					0,
					MathPI2
				);
				ctx.stroke();
				ctx.restore();
				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
		}
	}

	private draw_clear(opt: { ctx: CanvasRenderingContext2D }) {
		const wm_name = `clear_${this.width}_${this.height}_${this.line_width}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = this.width + this.line_width * this.scale_wm;
			const h = this.height + this.line_width * this.scale_wm;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = "black";
				ctx.strokeStyle = "black";
				ctx.lineWidth = this.line_width * 2;
				ctx.arc(
					this.line_width + this.width * 0.5,
					this.line_width + this.height * 0.5,
					this.width * 0.5,
					0,
					MathPI2
				);
				ctx.fill();
				ctx.stroke();
				ctx.restore();
				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.save();
			opt.ctx.globalCompositeOperation = "destination-out";
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
			opt.ctx.restore();
		}
	}

	private draw_img(opt: { ctx: CanvasRenderingContext2D }) {
		const wm_name = `img_${this.width}_${this.height}_${this.padding}_${this.img_width}_${
			this.img_height
		}_${this.img.src.replace(/[\W_]+/g, "_")}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = this.width + this.padding * this.scale_wm;
			const h = this.height + this.padding * this.scale_wm;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(
					this.img,
					0,
					0,
					this.img_width,
					this.img_height,
					this.padding + this.line_width,
					this.padding + this.line_width,
					this.width - this.padding * 2,
					this.height - this.padding * 2
				);

				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
		}
	}
}

class arrow {
	debug: boolean;

	wm: { [key: string]: ImageBitmap } = {};

	ctx: CanvasRenderingContext2D;
	ctx_mark: CanvasRenderingContext2D;

	name: string;

	x: number;
	y: number;

	uid: number[];
	uid_text: string;
	uid_number: string;

	img: HTMLImageElement;
	img_url: string;
	img_width: number;
	img_height: number;
	width: number;
	height: number;
	padding: number;

	color: string;
	line_width: number;

	btn_width: number;
	hole_width: number;
	start_degree: number;
	end_degree: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		ctx_mark: CanvasRenderingContext2D;
		name: string;
		img: HTMLImageElement;
		img_width?: number;
		img_height?: number;
		width?: number;
		height?: number;
		padding?: number;
		x: number;
		y: number;
		btn_width?: number;
		hole_width?: number;
		start_degree: number;
		end_degree: number;
		color?: string;
		line_width?: number;
		debug?: boolean;
	}) {
		opt.hole_width ??= BTN_SIZE * 0.5;
		opt.btn_width ??= BTN_SIZE * 0.5 + opt.hole_width;
		opt.padding ??= opt.btn_width * 0.4;
		opt.color ??= BTN_COLOR.normal;
		opt.line_width ??= 2;

		opt.img_width ??= 16;
		opt.img_height ??= 16;
		opt.width ??= opt.btn_width;
		opt.height ??= opt.btn_width;

		opt.debug ??= false;

		this.debug = opt.debug;

		this.ctx = opt.ctx;
		this.ctx_mark = opt.ctx_mark;

		this.uid = genUID();
		this.uid_number = `${this.uid[0]},${this.uid[1]},${this.uid[2]}`;
		this.uid_text = `rgb(${this.uid[0]},${this.uid[1]},${this.uid[2]})`;

		this.name = opt.name;

		this.img = opt.img;
		this.img_url = this.img.src;
		this.img_width = opt.img_width;
		this.img_height = opt.img_height;
		this.width = opt.width;
		this.height = opt.height;

		this.x = opt.x;
		this.y = opt.y;
		this.hole_width = opt.hole_width;
		this.btn_width = opt.btn_width + this.hole_width;
		this.start_degree = opt.start_degree;
		this.end_degree = opt.end_degree;

		this.color = opt.color;
		this.padding = opt.padding;
		this.line_width = opt.line_width;
	}
	clear() {
		this.draw_clear({
			ctx: this.ctx,
		});
	}
	draw() {
		this.clear();
		this.draw_fill({
			ctx: this.ctx,
			color: this.color,
		});

		this.draw_line({
			ctx: this.ctx,
		});
		this.draw_img({
			ctx: this.ctx,
		});
	}
	clear_mark() {
		this.draw_clear({
			ctx: this.ctx_mark,
		});
	}

	draw_mark() {
		this.clear_mark();
		this.draw_fill({
			ctx: this.ctx_mark,
			color: this.uid_text,
		});
	}

	private calc_middle_degree(start_degree: number, end_degree: number): number {
		if (start_degree > end_degree) {
			let a = 360 - start_degree;
			return (end_degree + a) * 0.5 - a;
		} else {
			// Normalize angles to be between 0 and 360 degrees
			start_degree = ((start_degree % 360) + 360) % 360;
			end_degree = ((end_degree % 360) + 360) % 360;

			// Calculate the middle angle
			let middleAngle = (start_degree + end_degree) * 0.5;

			// Normalize the middle angle to be between 0 and 360 degrees
			middleAngle = ((middleAngle % 360) + 360) % 360;

			return middleAngle;
		}
	}

	private calc_degree(value: number): number {
		if (value > 360) return this.calc_degree(360 - value);
		else if (value < 0) return this.calc_degree(360 + value);
		else if (value === 360) return 0;
		else return value;
	}
	private get_angle_position(
		center_x: number,
		center_y: number,
		radius: number,
		angle_degree: number
	) {
		const angle_rad = (angle_degree * MathPI) / 180;
		const x = center_x + radius * Math.cos(angle_rad);
		const y = center_y + radius * Math.sin(angle_rad);
		return { x: x, y: y };
	}
	private angle_degree_for_arc(angle_degree: number) {
		const two_360 = 0.00555555555; //2/360
		return MathPI * (angle_degree * two_360);
	}

	scale_wm = 2;
	private draw_fill(opt: { ctx: CanvasRenderingContext2D; color: string }) {
		const wm_name = `fill_${this.hole_width}_${this.btn_width}_${this.start_degree}_${this.end_degree}_${opt.color}_${this.line_width}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = (this.hole_width + this.btn_width) * this.scale_wm;
			const h = (this.hole_width + this.btn_width) * this.scale_wm;
			const x = w * 0.5;
			const y = h * 0.5;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = opt.color;
				ctx.strokeStyle = opt.color;
				ctx.lineWidth = this.line_width;

				ctx.arc(
					x,
					y,
					this.hole_width,
					this.angle_degree_for_arc(this.start_degree),
					this.angle_degree_for_arc(this.end_degree)
				);

				let c1 = this.get_angle_position(x, y, this.btn_width, this.end_degree);
				ctx.lineTo(c1.x, c1.y);

				ctx.arc(
					x,
					y,
					this.btn_width,
					this.angle_degree_for_arc(this.end_degree),
					this.angle_degree_for_arc(this.start_degree),
					true
				);

				let c2 = this.get_angle_position(x, y, this.hole_width, this.start_degree);
				ctx.lineTo(c2.x, c2.y);

				ctx.fill();
				ctx.stroke();
				ctx.restore();
				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
		}
	}

	private draw_line(opt: { ctx: CanvasRenderingContext2D }) {
		const wm_name = `line_${this.hole_width}_${this.btn_width}_${this.start_degree}_${this.end_degree}_${this.color}_${this.line_width}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = (this.hole_width + this.btn_width) * this.scale_wm;
			const h = (this.hole_width + this.btn_width) * this.scale_wm;
			const x = w * 0.5;
			const y = h * 0.5;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.line_width;

				ctx.arc(
					x,
					y,
					this.hole_width,
					this.angle_degree_for_arc(this.start_degree),
					this.angle_degree_for_arc(this.end_degree)
				);

				let c1 = this.get_angle_position(x, y, this.btn_width, this.end_degree);
				ctx.lineTo(c1.x, c1.y);

				ctx.arc(
					x,
					y,
					this.btn_width,
					this.angle_degree_for_arc(this.end_degree),
					this.angle_degree_for_arc(this.start_degree),
					true
				);

				let c2 = this.get_angle_position(x, y, this.hole_width, this.start_degree);
				ctx.lineTo(c2.x, c2.y);

				ctx.stroke();
				ctx.restore();
				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
		}
	}

	private draw_clear(opt: { ctx: CanvasRenderingContext2D }) {
		const wm_name = `clear_${this.hole_width}_${this.btn_width}_${this.start_degree}_${this.end_degree}_${this.line_width}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = (this.hole_width + this.btn_width + this.line_width) * this.scale_wm;
			const h = (this.hole_width + this.btn_width + this.line_width) * this.scale_wm;
			const x = w * 0.5;
			const y = h * 0.5;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = "black";
				ctx.strokeStyle = "black";
				ctx.lineWidth = this.line_width * 4;

				ctx.arc(
					x,
					y,
					this.hole_width,
					this.angle_degree_for_arc(this.calc_degree(this.start_degree)),
					this.angle_degree_for_arc(this.calc_degree(this.end_degree))
				);

				let c1 = this.get_angle_position(
					x,
					y,
					this.btn_width,
					this.calc_degree(this.end_degree)
				);
				ctx.lineTo(c1.x, c1.y);

				ctx.arc(
					x,
					y,
					this.btn_width,
					this.angle_degree_for_arc(this.calc_degree(this.end_degree)),
					this.angle_degree_for_arc(this.calc_degree(this.start_degree)),
					true
				);

				let c2 = this.get_angle_position(
					x,
					y,
					this.hole_width,
					this.calc_degree(this.start_degree)
				);
				ctx.lineTo(c2.x, c2.y);

				ctx.fill();
				ctx.stroke();
				ctx.restore();
				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.save();
			opt.ctx.globalCompositeOperation = "destination-out";
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
			opt.ctx.restore();
		}
	}

	private draw_img(opt: { ctx: CanvasRenderingContext2D }) {
		const wm_name = `img_${this.img_width}_${this.img_height}_${this.hole_width}_${
			this.btn_width
		}_${this.start_degree}_${this.end_degree}_${this.padding}_${this.img.src.replace(
			/[\W_]+/g,
			"_"
		)}`;

		if (typeof this.wm[wm_name] === "undefined") {
			const w = (this.hole_width + this.btn_width) * this.scale_wm;
			const h = (this.hole_width + this.btn_width) * this.scale_wm;
			const x = w * 0.5;
			const y = h * 0.5;
			const canvas = new OffscreenCanvas(w, h);
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.save();

				const mid_degree = this.calc_middle_degree(this.start_degree, this.end_degree);
				const mid_coord = this.get_angle_position(
					x,
					y,
					this.btn_width - this.hole_width,
					mid_degree
				);

				let img_x = mid_coord.x - this.width * 0.5;
				let img_y = mid_coord.y - this.height * 0.5;

				ctx.drawImage(
					this.img,
					0,
					0,
					this.img_width,
					this.img_height,
					img_x + (this.width - (this.width - this.padding)) * 0.5,
					img_y + (this.height - (this.height - this.padding)) * 0.5,
					this.width - this.padding,
					this.height - this.padding
				);

				ctx.restore();
				this.wm[wm_name] = canvas.transferToImageBitmap();
			}
		}

		if (typeof this.wm[wm_name] !== "undefined") {
			opt.ctx.drawImage(this.wm[wm_name]!, this.x, this.y);
		}
	}
}

export class control {
	debug: boolean;

	game: game;

	canvas_width: number;
	canvas_height: number;

	button_pause: button;
	button_fullscreen: button;

	button_power: button;
	button_action: button;

	arrow_right: arrow;
	arrow_down: arrow;
	arrow_left: arrow;
	arrow_up: arrow;

	btn_list: button[] = [];
	btn_gui_list: button[] = [];
	btn_control_list: button[] = [];
	arrow_list: arrow[] = [];

	canvas_rect: DOMRect;

	canvas_mark: HTMLCanvasElement;
	canvas_control: HTMLCanvasElement;
	canvas_pointer: HTMLCanvasElement;

	ctx_mark: CanvasRenderingContext2D;
	ctx_control: CanvasRenderingContext2D;
	ctx_pointer: CanvasRenderingContext2D;

	constructor(opt: {
		game: game;

		canvas_mark: HTMLCanvasElement;
		canvas_control: HTMLCanvasElement;
		canvas_pointer: HTMLCanvasElement;

		ctx_mark: CanvasRenderingContext2D;
		ctx_control: CanvasRenderingContext2D;
		ctx_pointer: CanvasRenderingContext2D;

		canvas_width: number;
		canvas_height: number;

		debug?: boolean;
	}) {
		opt.debug ??= false;

		this.debug = opt.debug;

		this.game = opt.game;

		this.canvas_mark = opt.canvas_mark;
		this.canvas_control = opt.canvas_control;
		this.canvas_pointer = opt.canvas_pointer;

		this.ctx_mark = opt.ctx_mark;
		this.ctx_control = opt.ctx_control;
		this.ctx_pointer = opt.ctx_pointer;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.canvas_rect = this.canvas_mark.getBoundingClientRect();

		const arrow_x = 1 * DPI;
		const arrow_y = this.canvas_height - 135 * DPI;
		const arrow_padding = 3 * DPI;

		this.arrow_right = new arrow({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowRight",
			img: ASSETSVG("right", BTN_COLOR.normal_icon),

			x: arrow_x + arrow_padding,
			y: arrow_y - arrow_padding,

			start_degree: 315,
			end_degree: 45,
		});

		this.arrow_down = new arrow({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowDown",
			img: ASSETSVG("down", BTN_COLOR.normal_icon),

			x: arrow_x,
			y: arrow_y,

			start_degree: 45,
			end_degree: 135,
		});
		this.arrow_left = new arrow({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowLeft",
			img: ASSETSVG("left", BTN_COLOR.normal_icon),

			x: arrow_x - arrow_padding,
			y: arrow_y - arrow_padding,

			start_degree: 135,
			end_degree: 225,
		});
		this.arrow_up = new arrow({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowUp",
			img: ASSETSVG("up", BTN_COLOR.normal_icon),

			x: arrow_x,
			y: arrow_y - arrow_padding * 2,

			start_degree: 225,
			end_degree: 315,
		});

		this.button_fullscreen = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "F11",
			img: ASSETSVG("full_screen", BTN_COLOR.normal_icon),
			x: this.canvas_width - BTN_SIZE - BTN_MARGIN,
			y: 110,
		});

		this.button_pause = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "Enter",
			img: ASSETSVG("pause", BTN_COLOR.normal_icon),
			x: this.canvas_width - BTN_SIZE - BTN_MARGIN,
			y: this.button_fullscreen.y + BTN_SIZE + BTN_PADDING,
		});

		this.button_power = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "Control",
			img: ASSETSVG("lightning", BTN_COLOR.normal_icon),
			x: this.canvas_width - BTN_MARGIN - BTN_SIZE,
			y: this.canvas_height - BTN_PADDING - BTN_MARGIN - BTN_SIZE * 2,
		});
		this.button_action = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: " ",
			img: ASSETSVG("record", BTN_COLOR.normal_icon),
			x: this.canvas_width - BTN_PADDING - BTN_MARGIN - BTN_SIZE * 2,
			y: this.canvas_height - BTN_MARGIN - BTN_SIZE,
		});

		this.btn_gui_list = [this.button_pause, this.button_fullscreen];
		this.btn_control_list = [this.button_power, this.button_action];
		this.btn_list = [...this.btn_gui_list, ...this.btn_control_list];
		this.arrow_list = [this.arrow_right, this.arrow_down, this.arrow_left, this.arrow_up];
	}

	resize() {
		this.canvas_rect = this.canvas_mark.getBoundingClientRect();
	}

	draw_gui() {
		this.btn_gui_list.forEach((i) => {
			i.draw();
			i.draw_mark();
		});
	}

	draw_fullscreen() {
		this.redraw_button({
			btn: this.button_fullscreen,
			img: ASSETSVG("full_screen", BTN_COLOR.normal_icon),
		});
		this.button_fullscreen.draw_mark();
	}

	draw_normalscreen() {
		this.redraw_button({
			btn: this.button_fullscreen,
			img: ASSETSVG("normal_screen", BTN_COLOR.normal_icon),
		});
		this.button_fullscreen.draw_mark();
	}

	draw_pause() {
		this.redraw_button({
			btn: this.button_pause,
			img: ASSETSVG("pause", BTN_COLOR.normal_icon),
		});
		this.button_pause.draw_mark();
	}

	draw_start() {
		this.redraw_button({
			btn: this.button_pause,
			img: ASSETSVG("start", BTN_COLOR.normal_icon),
		});
		this.button_pause.draw_mark();
	}

	draw_control() {
		this.btn_control_list.forEach((i) => {
			i.draw();
			i.draw_mark();
		});
	}

	draw_arrow() {
		this.arrow_list.forEach((i) => {
			i.draw();
			i.draw_mark();
		});
	}

	clear_gui() {
		this.btn_gui_list.forEach((i) => {
			i.clear();
			i.clear_mark();
		});
	}

	clear_fullscreen() {
		this.button_fullscreen.clear();
		this.button_fullscreen.clear_mark();
	}

	clear_pause() {
		this.button_pause.clear();
		this.button_pause.clear_mark();
	}

	clear_control() {
		this.btn_control_list.forEach((i) => {
			i.clear();
			i.clear_mark();
		});
	}

	clear_arrow() {
		this.arrow_list.forEach((i) => {
			i.clear();
			i.clear_mark();
		});
	}

	redraw_button(opt: { btn: button; img?: HTMLImageElement; color?: string }) {
		if (opt.btn) {
			if (opt.img || opt.color) {
				if (opt.img) {
					if (opt.color) opt.btn.color = opt.color;
					opt.btn.img = opt.img;
					opt.btn.draw();
				} else {
					if (opt.color) opt.btn.color = opt.color;
					opt.btn.draw();
				}
			}
		}
	}

	redraw_arrow(opt: { arr: arrow; img?: HTMLImageElement; color?: string }) {
		if (opt.arr) {
			if (opt.img || opt.color) {
				if (opt.img) {
					if (opt.color) opt.arr.color = opt.color;
					opt.arr.img = opt.img;
					opt.arr.draw();
				} else {
					if (opt.color) opt.arr.color = opt.color;
					opt.arr.draw();
				}
			}
		}
	}

	private get_mouse_location(canvas: HTMLCanvasElement, event: MouseEvent) {
		let totalOffsetX = 0;
		let totalOffsetY = 0;
		let canvasX = 0;
		let canvasY = 0;
		let currentElement: HTMLElement | null = canvas;

		do {
			totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
			totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
		} while (
			(currentElement = currentElement.offsetParent
				? (currentElement.offsetParent as HTMLElement)
				: null)
		);

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		const scale = this.canvas_width / this.canvas_rect.width;

		const x = canvasX * scale + this.canvas_width * 0.5;
		const y = canvasY * scale + this.canvas_height * 0.5;

		return { x: x, y: y };
	}

	private redraw_button_by_event(event: string, key: string, btn: button) {
		if (event === "keydown") {
			if (key === "Control") {
				this.redraw_button({
					btn: btn,
					img: ASSETSVG("lightning", BTN_COLOR.click_icon),
					color: BTN_COLOR.click,
				});
			} else if (key === " ") {
				this.redraw_button({
					btn: btn,
					img: ASSETSVG("record", BTN_COLOR.click_icon),
					color: BTN_COLOR.click,
				});
			} else if (key === "Enter") {
				if (this.game.game_pause || this.game.game_ready) {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("start", BTN_COLOR.click_icon),
						color: BTN_COLOR.click,
					});
				} else {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("pause", BTN_COLOR.click_icon),
						color: BTN_COLOR.click,
					});
				}
			} else if (key === "F11") {
				if (isFullscreen()) {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("normal_screen", BTN_COLOR.click_icon),
						color: BTN_COLOR.click,
					});
				} else {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("full_screen", BTN_COLOR.click_icon),
						color: BTN_COLOR.click,
					});
				}
			}
		} else {
			if (key === "Control") {
				{
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("lightning", BTN_COLOR.normal_icon),
						color: BTN_COLOR.normal,
					});
				}
			} else if (key === " ") {
				this.redraw_button({
					btn: btn,
					img: ASSETSVG("record", BTN_COLOR.normal_icon),
					color: BTN_COLOR.normal,
				});
			} else if (key === "Enter") {
				if (this.game.game_pause || this.game.game_ready) {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("start", BTN_COLOR.normal_icon),
						color: BTN_COLOR.normal,
					});
				} else {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("pause", BTN_COLOR.normal_icon),
						color: BTN_COLOR.normal,
					});
				}
			} else if (key === "F11") {
				if (isFullscreen()) {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("normal_screen", BTN_COLOR.normal_icon),
						color: BTN_COLOR.normal,
					});
				} else {
					this.redraw_button({
						btn: btn,
						img: ASSETSVG("full_screen", BTN_COLOR.normal_icon),
						color: BTN_COLOR.normal,
					});
				}
			}
		}
	}

	private redraw_arrow_by_event(event: string, key: string, arr: arrow) {
		if (event === "keydown") {
			if (key === "ArrowUp")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("up", BTN_COLOR.click_icon),
					color: BTN_COLOR.click,
				});
			else if (key === "ArrowDown")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("down", BTN_COLOR.click_icon),
					color: BTN_COLOR.click,
				});
			else if (key === "ArrowLeft")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("left", BTN_COLOR.click_icon),
					color: BTN_COLOR.click,
				});
			else if (key === "ArrowRight")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("right", BTN_COLOR.click_icon),
					color: BTN_COLOR.click,
				});
		} else if (event === "keyup") {
			if (key === "ArrowUp")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("up", BTN_COLOR.normal_icon),
					color: BTN_COLOR.normal,
				});
			else if (key === "ArrowDown")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("down", BTN_COLOR.normal_icon),
					color: BTN_COLOR.normal,
				});
			else if (key === "ArrowLeft")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("left", BTN_COLOR.normal_icon),
					color: BTN_COLOR.normal,
				});
			else if (key === "ArrowRight")
				this.redraw_arrow({
					arr: arr,
					img: ASSETSVG("right", BTN_COLOR.normal_icon),
					color: BTN_COLOR.normal,
				});
		}
	}

	private mouse_event(opt: { event_name: string; event: MouseEvent; debug?: boolean }) {
		let { x, y } = this.get_mouse_location(this.canvas_mark, opt.event);

		if (x > -1 && y > -1) {
			if (opt.debug) {
				this.ctx_pointer.clearRect(x - 50, y - 50, 100, 100);
				this.ctx_pointer.fillStyle = `rgba(${COLOR.red},0.5)`;
				this.ctx_pointer.fillRect(x - 5, y - 5, 10, 10);
			}

			const data = this.ctx_mark.getImageData(x, y, 1, 1).data;

			if (data && data.length > 3 && data[0] && data[1] && data[2]) {
				if (data[0] > 0 && data[1] > 0 && data[2] > 0) {
					const btn = this.btn_list.filter((i) => {
						return i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2];
					});

					if (btn && btn.length > 0 && btn[0]) {
						const key = btn[0].name;

						this.redraw_button_by_event(opt.event_name, key, btn[0]);

						window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: key }));
					} else {
						const arr = this.arrow_list.filter((i) => {
							return (
								i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2]
							);
						});

						if (arr && arr.length > 0 && arr[0]) {
							const key = arr[0].name;

							this.redraw_arrow_by_event(opt.event_name, key, arr[0]);

							window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: key }));
						}
					}
				}
			} else if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
				window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: " " }));
			}
		}
	}
	attach_mouse(opt: {
		canvas_mark: HTMLCanvasElement;
		marker_ctx: CanvasRenderingContext2D;
		pointer_ctx: CanvasRenderingContext2D;
		control_ctx: CanvasRenderingContext2D;
		debug?: boolean;
	}) {
		opt.canvas_mark.addEventListener("mousedown", (event: MouseEvent) => {
			this.mouse_event({
				event_name: "keydown",
				event: event,
				debug: opt.debug,
			});
		});
		opt.canvas_mark.addEventListener("mouseup", (e: MouseEvent) => {
			this.mouse_event({
				event_name: "keyup",
				event: e,
				debug: opt.debug,
			});
		});
	}

	private last_touch_location: { x: number; y: number }[] = [];

	private get_touch_location(canvas: HTMLCanvasElement, event: TouchEvent) {
		if (event.touches && event.touches.length > 0) {
			const scale = this.canvas_width / this.canvas_rect.width;

			this.last_touch_location = Array.from(event.touches).map((i) => {
				if (i) {
					let totalOffsetX = 0;
					let totalOffsetY = 0;
					let canvasX = 0;
					let canvasY = 0;
					let currentElement: HTMLElement | null = canvas;

					do {
						totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
						totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
					} while (
						(currentElement = currentElement.offsetParent
							? (currentElement.offsetParent as HTMLElement)
							: null)
					);

					canvasX = i.pageX - totalOffsetX;
					canvasY = i.pageY - totalOffsetY;

					return {
						x: canvasX * scale + this.canvas_width * 0.5,
						y: canvasY * scale + this.canvas_height * 0.5,
					};
				} else {
					return {
						x: -1,
						y: -1,
					};
				}
			});
		}

		return this.last_touch_location;
	}

	private touch_event(opt: { event_name: string; event: TouchEvent; debug?: boolean }) {
		let touch_list = this.get_touch_location(this.canvas_mark, opt.event);
		if (touch_list && touch_list.length > 0) {
			touch_list.forEach(({ x, y }) => {
				{
					if (x > -1 && y > -1) {
						if (opt.debug) {
							this.ctx_pointer.clearRect(x - 50, y - 50, 100, 100);
							this.ctx_pointer.fillStyle = `rgba(${COLOR.red},0.5)`;
							this.ctx_pointer.fillRect(x - 5, y - 5, 10, 10);
						}

						const data = this.ctx_mark.getImageData(x, y, 1, 1).data;

						if (data && data.length > 3 && data[0] && data[1] && data[2]) {
							if (data[0] > 0 && data[1] > 0 && data[2] > 0) {
								const btn = this.btn_list.filter((i) => {
									return (
										i.uid[0] === data[0] &&
										i.uid[1] === data[1] &&
										i.uid[2] === data[2]
									);
								});

								if (btn && btn.length > 0 && btn[0]) {
									const key = btn[0].name;

									this.redraw_button_by_event(opt.event_name, key, btn[0]);

									window.dispatchEvent(
										new KeyboardEvent(opt.event_name, { key: key })
									);
								} else {
									const arr = this.arrow_list.filter((i) => {
										return (
											i.uid[0] === data[0] &&
											i.uid[1] === data[1] &&
											i.uid[2] === data[2]
										);
									});

									if (arr && arr.length > 0 && arr[0]) {
										const key = arr[0].name;

										this.redraw_arrow_by_event(opt.event_name, key, arr[0]);

										window.dispatchEvent(
											new KeyboardEvent(opt.event_name, { key: key })
										);
									}
								}
							}
						} else if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
							window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: " " }));
						}
					}
				}
			});
		}
	}

	attach_touch(opt: {
		canvas_mark: HTMLCanvasElement;
		marker_ctx: CanvasRenderingContext2D;
		pointer_ctx: CanvasRenderingContext2D;
		control_ctx: CanvasRenderingContext2D;
		debug?: boolean;
	}) {
		opt.canvas_mark.addEventListener("touchstart", (event: TouchEvent) => {
			this.touch_event({
				event_name: "keydown",
				event: event,
				debug: opt.debug,
			});
		});
		opt.canvas_mark.addEventListener("touchend", (e: TouchEvent) => {
			this.touch_event({
				event_name: "keyup",
				event: e,
				debug: opt.debug,
			});
		});
	}
}
