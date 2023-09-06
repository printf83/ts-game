import { ASSET } from "./asset.js";
import { MathFloor, MathPI2, DPI, genUID, COLOR, MathPI } from "./util.js";

const BTN_SIZE = 35 * DPI;
const BTN_PADDING = 20 * DPI;
const BTN_MARGIN = 30;

const BTN_COLOR = {
	normal: `rgba(${COLOR.dark}, 0.5)`,
	highlight: `rgba(${COLOR.blue}, 0.5)`,
	click: `rgba(${COLOR.blue}, 0.5)`,
	active: `rgba(${COLOR.blue}, 0.5)`,
};

class button {
	debug: boolean;

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
		img: string;
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
		opt.padding ??= BTN_SIZE * 0.4;
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

		this.img = new Image();
		this.img.src = opt.img;
		this.img_url = opt.img;
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
		this.ctx.clearRect(MathFloor(this.x - 2), MathFloor(this.y - 2), BTN_SIZE + 4, BTN_SIZE + 4);
		if (this.debug) this.ctx.strokeRect(MathFloor(this.x - 2), MathFloor(this.y - 2), BTN_SIZE + 4, BTN_SIZE + 4);
	}
	draw() {
		this.clear();

		this.ctx.save();
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = this.line_width;
		this.ctx.beginPath();
		this.ctx.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.5, 0, MathPI2);
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.restore();

		this.ctx.drawImage(
			this.img,
			0,
			0,
			this.img_width,
			this.img_height,
			MathFloor(this.x + (this.width - (this.width - this.padding)) * 0.5),
			MathFloor(this.y + (this.height - (this.height - this.padding)) * 0.5),
			this.width - this.padding,
			this.height - this.padding
		);
	}
	clear_mark() {
		this.ctx_mark.clearRect(
			MathFloor(this.x - BTN_SIZE * 0.25 - 2),
			MathFloor(this.y - BTN_SIZE * 0.25 - 2),
			BTN_SIZE * 1.5 + 4,
			BTN_SIZE * 1.5 + 4
		);
		if (this.debug)
			this.ctx_mark.strokeRect(
				MathFloor(this.x - BTN_SIZE * 0.25 - 2),
				MathFloor(this.y - BTN_SIZE * 0.25 - 2),
				BTN_SIZE * 1.5 + 4,
				BTN_SIZE * 1.5 + 4
			);
	}
	draw_mark() {
		this.clear_mark();

		this.ctx_mark.fillStyle = this.uid_text;
		this.ctx_mark.beginPath();
		this.ctx_mark.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.75, 0, MathPI2);
		this.ctx_mark.fill();
	}
}

class arrow {
	debug: boolean;

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
		img: string;
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

		this.img = new Image();
		this.img.src = opt.img;
		this.img_url = opt.img;
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
			x: this.x,
			y: this.y,
			hole_width: this.hole_width,
			btn_width: this.btn_width,
			start_degree: this.start_degree,
			end_degree: this.end_degree,
			line_width: this.line_width,
		});
	}
	draw() {
		this.clear();

		this.draw_fill({
			ctx: this.ctx,
			x: this.x,
			y: this.y,
			hole_width: this.hole_width,
			btn_width: this.btn_width,
			start_degree: this.start_degree,
			end_degree: this.end_degree,
			color: this.color,
		});

		this.draw_line({
			ctx: this.ctx,
			x: this.x,
			y: this.y,
			hole_width: this.hole_width,
			btn_width: this.btn_width,
			start_degree: this.start_degree,
			end_degree: this.end_degree,
			color: this.color,
			line_width: this.line_width,
		});
		this.draw_img({
			ctx: this.ctx,
			x: this.x,
			y: this.y,
			hole_width: this.hole_width,
			btn_width: this.btn_width,
			start_degree: this.start_degree,
			end_degree: this.end_degree,
		});
	}
	clear_mark() {
		this.draw_clear({
			ctx: this.ctx_mark,
			x: this.x,
			y: this.y,
			hole_width: this.hole_width,
			btn_width: this.btn_width,
			start_degree: this.start_degree,
			end_degree: this.end_degree,
			line_width: this.line_width,
		});
	}

	draw_mark() {
		this.clear_mark();
		this.draw_fill({
			ctx: this.ctx_mark,
			x: this.x,
			y: this.y,
			hole_width: this.hole_width,
			btn_width: this.btn_width,
			start_degree: this.start_degree,
			end_degree: this.end_degree,
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
	private get_angle_position(center_x: number, center_y: number, radius: number, angle_degree: number) {
		const angle_rad = (angle_degree * MathPI) / 180;
		const x = center_x + radius * Math.cos(angle_rad);
		const y = center_y + radius * Math.sin(angle_rad);
		return { x: x, y: y };
	}
	private angle_degree_for_arc(angle_degree: number) {
		return MathPI * (angle_degree * (2 / 360));
	}

	private draw_fill(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		hole_width: number;
		btn_width: number;
		start_degree: number;
		end_degree: number;
		color: string;
	}) {
		opt.ctx.save();
		opt.ctx.beginPath();
		opt.ctx.fillStyle = opt.color;

		opt.ctx.arc(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.hole_width,
			this.angle_degree_for_arc(opt.start_degree),
			this.angle_degree_for_arc(opt.end_degree)
		);

		let c1 = this.get_angle_position(MathFloor(opt.x), MathFloor(opt.y), opt.btn_width, opt.end_degree);
		opt.ctx.lineTo(MathFloor(c1.x), MathFloor(c1.y));

		opt.ctx.arc(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.btn_width,
			this.angle_degree_for_arc(opt.end_degree),
			this.angle_degree_for_arc(opt.start_degree),
			true
		);

		let c2 = this.get_angle_position(MathFloor(opt.x), MathFloor(opt.y), opt.hole_width, opt.start_degree);
		opt.ctx.lineTo(MathFloor(c2.x), MathFloor(c2.y));

		opt.ctx.fill();
		opt.ctx.restore();
	}

	private draw_line(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		hole_width: number;
		btn_width: number;
		start_degree: number;
		end_degree: number;
		color: string;
		line_width: number;
	}) {
		opt.ctx.save();
		opt.ctx.beginPath();
		opt.ctx.strokeStyle = opt.color;
		opt.ctx.lineWidth = opt.line_width;

		opt.ctx.arc(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.hole_width,
			this.angle_degree_for_arc(opt.start_degree),
			this.angle_degree_for_arc(opt.end_degree)
		);

		let c1 = this.get_angle_position(opt.x, opt.y, opt.btn_width, opt.end_degree);
		opt.ctx.lineTo(MathFloor(c1.x), MathFloor(c1.y));

		opt.ctx.arc(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.btn_width,
			this.angle_degree_for_arc(opt.end_degree),
			this.angle_degree_for_arc(opt.start_degree),
			true
		);

		let c2 = this.get_angle_position(opt.x, opt.y, opt.hole_width, opt.start_degree);
		opt.ctx.lineTo(MathFloor(c2.x), MathFloor(c2.y));

		opt.ctx.stroke();
		opt.ctx.restore();
	}

	private draw_clear(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		hole_width: number;
		btn_width: number;
		start_degree: number;
		end_degree: number;
		line_width: number;
	}) {
		opt.ctx.save();
		opt.ctx.globalCompositeOperation = "destination-out";
		opt.ctx.beginPath();
		opt.ctx.fillStyle = "black";
		opt.ctx.strokeStyle = "black";
		opt.ctx.lineWidth = opt.line_width;

		opt.ctx.arc(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.hole_width - opt.line_width,
			this.angle_degree_for_arc(this.calc_degree(opt.start_degree - opt.line_width)),
			this.angle_degree_for_arc(this.calc_degree(opt.end_degree + opt.line_width * 2))
		);

		let c1 = this.get_angle_position(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.btn_width + opt.line_width * 2,
			this.calc_degree(opt.end_degree + opt.line_width * 2)
		);
		opt.ctx.lineTo(MathFloor(c1.x), MathFloor(c1.y));

		opt.ctx.arc(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.btn_width + opt.line_width * 2,
			this.angle_degree_for_arc(this.calc_degree(opt.end_degree + opt.line_width * 2)),
			this.angle_degree_for_arc(this.calc_degree(opt.start_degree - opt.line_width)),
			true
		);

		let c2 = this.get_angle_position(
			MathFloor(opt.x),
			MathFloor(opt.y),
			opt.hole_width - opt.line_width,
			this.calc_degree(opt.start_degree - opt.line_width)
		);
		opt.ctx.lineTo(MathFloor(c2.x), MathFloor(c2.y));

		opt.ctx.fill();
		opt.ctx.restore();
	}

	private draw_img(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		hole_width: number;
		btn_width: number;
		start_degree: number;
		end_degree: number;
	}) {
		opt.ctx.save();

		const mid_degree = this.calc_middle_degree(opt.start_degree, opt.end_degree);
		const mid_coord = this.get_angle_position(this.x, this.y, this.btn_width - this.hole_width, mid_degree);

		let img_x = mid_coord.x - this.width * 0.5;
		let img_y = mid_coord.y - this.height * 0.5;

		opt.ctx.drawImage(
			this.img,
			0,
			0,
			this.img_width,
			this.img_height,
			MathFloor(img_x + (this.width - (this.width - this.padding)) * 0.5),
			MathFloor(img_y + (this.height - (this.height - this.padding)) * 0.5),
			this.width - this.padding,
			this.height - this.padding
		);

		opt.ctx.restore();
	}
}

export class control {
	debug: boolean;

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

		this.canvas_mark = opt.canvas_mark;
		this.canvas_control = opt.canvas_control;
		this.canvas_pointer = opt.canvas_pointer;

		this.ctx_mark = opt.ctx_mark;
		this.ctx_control = opt.ctx_control;
		this.ctx_pointer = opt.ctx_pointer;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.canvas_rect = this.canvas_mark.getBoundingClientRect();

		const arrow_x = 70 * DPI;
		const arrow_y = this.canvas_height - 70 * DPI;
		const arrow_padding = 3 * DPI;

		this.arrow_right = new arrow({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowRight",
			img: ASSET.ctl.right,

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
			img: ASSET.ctl.down,

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
			img: ASSET.ctl.left,

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
			img: ASSET.ctl.up,

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
			img: ASSET.ctl.full_screen,
			x: this.canvas_width - BTN_SIZE - BTN_MARGIN,
			y: 110,
		});

		this.button_pause = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "Enter",
			img: ASSET.ctl.pause,
			x: this.canvas_width - BTN_SIZE - BTN_MARGIN,
			y: this.button_fullscreen.y + BTN_SIZE + BTN_PADDING,
		});

		this.button_power = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "Control",
			img: ASSET.ctl.power2,
			x: this.canvas_width - BTN_MARGIN - BTN_SIZE,
			y: this.canvas_height - BTN_PADDING - BTN_MARGIN - BTN_SIZE * 2,
		});
		this.button_action = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: " ",
			img: ASSET.ctl.power1,
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
		this.redraw_button({ btn: this.button_fullscreen, img: ASSET.ctl.full_screen });
		this.button_fullscreen.draw_mark();
	}

	draw_normalscreen() {
		this.redraw_button({ btn: this.button_fullscreen, img: ASSET.ctl.normal_screen });
		this.button_fullscreen.draw_mark();
	}

	draw_pause() {
		this.redraw_button({ btn: this.button_pause, img: ASSET.ctl.pause });
		this.button_pause.draw_mark();
	}

	draw_start() {
		this.redraw_button({ btn: this.button_pause, img: ASSET.ctl.start });
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

	redraw_button(opt: { btn: button; img?: string; color?: string }) {
		if (opt.btn) {
			if (opt.img || opt.color) {
				if (opt.img) {
					opt.btn.img = new Image();
					opt.btn.img.src = opt.img;
				}

				if (opt.color) opt.btn.color = opt.color;

				opt.btn.draw();
			}
		}
	}

	redraw_arrow(opt: { arr: arrow; img?: string; color?: string }) {
		if (opt.arr) {
			if (opt.img || opt.color) {
				if (opt.img) {
					opt.arr.img = new Image();
					opt.arr.img.src = opt.img;
				}

				if (opt.color) opt.arr.color = opt.color;

				opt.arr.draw();
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
		} while ((currentElement = currentElement.offsetParent ? (currentElement.offsetParent as HTMLElement) : null));

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		const scale = this.canvas_width / this.canvas_rect.width;

		const x = canvasX * scale + this.canvas_width * 0.5;
		const y = canvasY * scale + this.canvas_height * 0.5;

		return { x: x, y: y };
	}

	private mouse_event(opt: { event_name: string; event: MouseEvent; debug?: boolean }) {
		let { x, y } = this.get_mouse_location(this.canvas_mark, opt.event);

		if (x > -1 && y > -1) {
			if (opt.debug) {
				this.ctx_pointer.clearRect(MathFloor(x - 50), MathFloor(y - 50), 100, 100);
				this.ctx_pointer.fillStyle = `rgba(${COLOR.red},0.5)`;
				this.ctx_pointer.fillRect(MathFloor(x - 5), MathFloor(y - 5), 10, 10);

				console.log({ x, y });
			}

			const data = this.ctx_mark.getImageData(x, y, 1, 1).data;

			if (data && data.length > 3 && data[0] && data[1] && data[2]) {
				if (data[0] > 0 && data[1] > 0 && data[2] > 0) {
					const btn = this.btn_list.filter((i) => {
						return i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2];
					});

					if (btn && btn.length > 0 && btn[0]) {
						const key = btn[0].name;

						if (opt.event_name === "keydown") this.redraw_button({ btn: btn[0], color: BTN_COLOR.click });
						else if (opt.event_name === "keyup") this.redraw_button({ btn: btn[0], color: BTN_COLOR.normal });

						window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: key }));
					} else {
						const arr = this.arrow_list.filter((i) => {
							return i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2];
						});

						if (arr && arr.length > 0 && arr[0]) {
							const key = arr[0].name;

							if (opt.event_name === "keydown") this.redraw_arrow({ arr: arr[0], color: BTN_COLOR.click });
							else if (opt.event_name === "keyup") this.redraw_arrow({ arr: arr[0], color: BTN_COLOR.normal });

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

	private last_touch_location: { x: number; y: number } = { x: -1, y: -1 };
	private get_touch_location(canvas: HTMLCanvasElement, event: TouchEvent) {
		if (event.touches && event.touches.length > 0 && event.touches[0]) {
			let totalOffsetX = 0;
			let totalOffsetY = 0;
			let canvasX = 0;
			let canvasY = 0;
			let currentElement: HTMLElement | null = canvas;

			do {
				totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
				totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
			} while ((currentElement = currentElement.offsetParent ? (currentElement.offsetParent as HTMLElement) : null));

			canvasX = event.touches[0].pageX - totalOffsetX;
			canvasY = event.touches[0].pageY - totalOffsetY;

			const scale = this.canvas_width / this.canvas_rect.width;
			const x = canvasX * scale + this.canvas_width * 0.5;
			const y = canvasY * scale + this.canvas_height * 0.5;

			this.last_touch_location = { x: x, y: y };
		}

		return this.last_touch_location;
	}

	private touch_event(opt: { event_name: string; event: TouchEvent; debug?: boolean }) {
		let { x, y } = this.get_touch_location(this.canvas_mark, opt.event);

		if (x > -1 && y > -1) {
			if (opt.debug) {
				this.ctx_pointer.clearRect(MathFloor(x - 50), MathFloor(y - 50), 100, 100);
				this.ctx_pointer.fillStyle = `rgba(${COLOR.red},0.5)`;
				this.ctx_pointer.fillRect(MathFloor(x - 5), MathFloor(y - 5), 10, 10);
			}

			const data = this.ctx_mark.getImageData(x, y, 1, 1).data;

			if (data && data.length > 3 && data[0] && data[1] && data[2]) {
				if (data[0] > 0 && data[1] > 0 && data[2] > 0) {
					const btn = this.btn_list.filter((i) => {
						return i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2];
					});

					if (btn && btn.length > 0 && btn[0]) {
						const key = btn[0].name;

						if (opt.event_name === "keydown") this.redraw_button({ btn: btn[0], color: BTN_COLOR.click });
						else if (opt.event_name === "keyup") this.redraw_button({ btn: btn[0], color: BTN_COLOR.normal });

						window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: key }));
					} else {
						const arr = this.arrow_list.filter((i) => {
							return i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2];
						});

						if (arr && arr.length > 0 && arr[0]) {
							const key = arr[0].name;

							if (opt.event_name === "keydown") this.redraw_arrow({ arr: arr[0], color: BTN_COLOR.click });
							else if (opt.event_name === "keyup") this.redraw_arrow({ arr: arr[0], color: BTN_COLOR.normal });

							window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: key }));
						}
					}
				}
			} else if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
				window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: " " }));
			}
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
