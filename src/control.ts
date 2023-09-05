import { ASSET } from "./asset.js";
import { MathFloor, MathPI2, DPI, genUID, COLOR, MathPI } from "./util.js";

const BTN_SIZE = 35 * DPI;
const BTN_PADDING = 20 * DPI;
const BTN_MARGIN = 30;

const BTN_COLOR = {
	normal: `rgba(${COLOR.medium}, 0.5)`,
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

	color: string;
	width: number;
	height: number;
	constructor(opt: { ctx: CanvasRenderingContext2D; ctx_mark: CanvasRenderingContext2D; name: string; img: string; x: number; y: number; width?: number; height?: number; color?: string; debug?: boolean }) {
		opt.width ??= BTN_SIZE;
		opt.height ??= BTN_SIZE;
		opt.color ??= BTN_COLOR.normal;
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
		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
		this.color = opt.color;
	}
	clear() {
		this.ctx.clearRect(MathFloor(this.x - 1), MathFloor(this.y - 1), BTN_SIZE + 2, BTN_SIZE + 2);
		if (this.debug) this.ctx.strokeRect(MathFloor(this.x - 1), MathFloor(this.y - 1), BTN_SIZE + 2, BTN_SIZE + 2);
	}
	draw() {
		this.clear();

		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.5, 0, MathPI2);
		this.ctx.fill();

		this.ctx.drawImage(this.img, 0, 0, 16, 16, MathFloor(this.x), MathFloor(this.y), this.width, this.height);
	}
	clear_mark() {
		this.ctx_mark.clearRect(MathFloor(this.x - BTN_SIZE * 0.25), MathFloor(this.y - BTN_SIZE * 0.25), BTN_SIZE * 1.5, BTN_SIZE * 1.5);
		if (this.debug) this.ctx_mark.strokeRect(MathFloor(this.x - BTN_SIZE * 0.25), MathFloor(this.y - BTN_SIZE * 0.25), BTN_SIZE * 1.5, BTN_SIZE * 1.5);
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

	color: string;
	line_width: number;

	btn_width: number;
	hole_width: number;
	start_degree: number;
	end_degree: number;

	constructor(opt: { ctx: CanvasRenderingContext2D; ctx_mark: CanvasRenderingContext2D; name: string; img: string; img_width: number; img_height: number; width: number; height: number; x: number; y: number; btn_width?: number; hole_width?: number; start_degree: number; end_degree: number; color?: string; line_width?: number; debug?: boolean }) {
		opt.hole_width ??= BTN_SIZE;
		opt.btn_width ??= BTN_SIZE + opt.hole_width;
		opt.color ??= BTN_COLOR.normal;
		opt.line_width ??= 3;
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

		// this.ctx_mark.fillStyle = this.uid_text;
		// this.ctx_mark.beginPath();

		// this.ctx_mark.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.75, 0, MathPI2);
		// this.ctx_mark.fill();

		// const hole_radius = BTN_SIZE;
		// const radius = BTN_SIZE * 2 + hole_radius;

		// const center_x = MathFloor(this.x + BTN_SIZE * 0.5 + 5);
		// const center_y = MathFloor(this.y + BTN_SIZE * 0.5 + 5);

		// //right bottom
		// this.fill(this.ctx_mark, center_x, center_y - 5, hole_radius, radius, 315, 45, "blue");
		// this.line(this.ctx, center_x, center_y - 5, hole_radius, radius, 315, 45, "blue", 3);

		// //left bottom
		// this.fill(this.ctx_mark, center_x - 5, center_y, hole_radius, radius, 45, 135, "red");
		// this.line(this.ctx, center_x - 5, center_y, hole_radius, radius, 45, 135, "red", 3);

		// //left top
		// this.fill(this.ctx_mark, center_x - 10, center_y - 5, hole_radius, radius, 135, 225, "green");
		// this.line(this.ctx, center_x - 10, center_y - 5, hole_radius, radius, 135, 225, "green", 3);

		// //right top
		// this.fill(this.ctx_mark, center_x - 5, center_y - 10, hole_radius, radius, 225, 315, "yellow");
		// this.line(this.ctx, center_x - 5, center_y - 10, hole_radius, radius, 225, 315, "yellow", 3);
	}

	private calc_middle_degree(start_degree: number, end_degree: number) {
		if (end_degree > start_degree) {
			return (end_degree - start_degree) * 0.5;
		} else {
			let a = 360 - start_degree;
			return (end_degree + a) * 0.5 - a;
		}
	}
	private calc_degree(value: number): number {
		if (value > 360) return this.calc_degree(360 - value);
		else if (value < 0) return this.calc_degree(360 + value);
		else return value;
	}
	private get_angle_position(center_x: number, center_y: number, radius: number, angle_degree: number) {
		const angle_rad = (angle_degree * MathPI) / 180;
		const x = center_x + radius * Math.cos(angle_rad);
		const y = center_y + radius * Math.sin(angle_rad);
		return { x, y };
	}
	private angle_degree_for_arc(angle_degree: number) {
		return MathPI * (angle_degree * (2 / 360));
	}

	private draw_fill(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; hole_width: number; btn_width: number; start_degree: number; end_degree: number; color: string }) {
		opt.ctx.save();
		opt.ctx.beginPath();
		opt.ctx.fillStyle = opt.color;

		opt.ctx.arc(opt.x, opt.y, opt.hole_width, this.angle_degree_for_arc(opt.start_degree), this.angle_degree_for_arc(opt.end_degree));

		let coord_1 = this.get_angle_position(opt.x, opt.y, opt.btn_width, opt.end_degree);
		opt.ctx.lineTo(coord_1.x, coord_1.y);

		opt.ctx.arc(opt.x, opt.y, opt.btn_width, this.angle_degree_for_arc(opt.end_degree), this.angle_degree_for_arc(opt.start_degree), true);

		let coord_2 = this.get_angle_position(opt.x, opt.y, opt.hole_width, opt.start_degree);
		opt.ctx.lineTo(coord_2.x, coord_2.y);

		opt.ctx.fill();
		opt.ctx.restore();
	}

	private draw_line(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; hole_width: number; btn_width: number; start_degree: number; end_degree: number; color: string; line_width: number }) {
		opt.ctx.save();
		opt.ctx.beginPath();
		opt.ctx.strokeStyle = opt.color;
		opt.ctx.lineWidth = opt.line_width;

		opt.ctx.arc(opt.x, opt.y, opt.hole_width, this.angle_degree_for_arc(opt.start_degree), this.angle_degree_for_arc(opt.end_degree));

		let c1 = this.get_angle_position(opt.x, opt.y, opt.btn_width, opt.end_degree);
		opt.ctx.lineTo(c1.x, c1.y);

		opt.ctx.arc(opt.x, opt.y, opt.btn_width, this.angle_degree_for_arc(opt.end_degree), this.angle_degree_for_arc(opt.start_degree), true);

		let c2 = this.get_angle_position(opt.x, opt.y, opt.hole_width, opt.start_degree);
		opt.ctx.lineTo(c2.x, c2.y);

		opt.ctx.stroke();
		opt.ctx.restore();
	}

	private draw_clear(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; hole_width: number; btn_width: number; start_degree: number; end_degree: number; line_width: number }) {
		opt.ctx.save();
		opt.ctx.globalCompositeOperation = "destination-out";
		opt.ctx.beginPath();
		opt.ctx.fillStyle = "black";
		opt.ctx.strokeStyle = "black";
		opt.ctx.lineWidth = opt.line_width;

		opt.ctx.arc(opt.x, opt.y, opt.hole_width - opt.line_width, this.angle_degree_for_arc(this.calc_degree(opt.start_degree - opt.line_width)), this.angle_degree_for_arc(this.calc_degree(opt.end_degree + opt.line_width * 2)));

		let c1 = this.get_angle_position(opt.x, opt.y, opt.btn_width + opt.line_width * 2, this.calc_degree(opt.end_degree + opt.line_width * 2));
		opt.ctx.lineTo(c1.x, c1.y);

		opt.ctx.arc(opt.x, opt.y, opt.btn_width + opt.line_width * 2, this.angle_degree_for_arc(this.calc_degree(opt.end_degree + opt.line_width * 2)), this.angle_degree_for_arc(this.calc_degree(opt.start_degree - opt.line_width)), true);

		let c2 = this.get_angle_position(opt.x, opt.y, opt.hole_width - opt.line_width, this.calc_degree(opt.start_degree - opt.line_width));
		opt.ctx.lineTo(c2.x, c2.y);

		opt.ctx.fill();
		opt.ctx.restore();
	}

	private draw_img(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; hole_width: number; btn_width: number; start_degree: number; end_degree: number }) {
		opt.ctx.save();

		const mid_degree = this.calc_middle_degree(opt.start_degree, opt.end_degree);
		const mid_coord = this.get_angle_position(this.x, this.y, this.btn_width - this.hole_width, mid_degree);

		const img_x = mid_coord.x - this.width * 0.5;
		const img_y = mid_coord.y - this.height * 0.5;

		opt.ctx.drawImage(this.img, 0, 0, this.img_width, this.img_height, img_x, img_y, this.width, this.height);

		opt.ctx.restore();
	}
}

export class control {
	debug: boolean;

	canvas_width: number;
	canvas_height: number;

	pause: button;
	info: button;

	left: button;
	left_down: button;
	left_up: button;

	right: button;
	right_down: button;
	right_up: button;

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

		this.arrow_list.push(
			new arrow({
				ctx: this.ctx_control,
				ctx_mark: this.ctx_mark,
				debug: this.debug,

				name: "ArrowUp",
				img: ASSET.ctl.up,
				img_width: 16,
				img_height: 16,
				width: BTN_SIZE,
				height: BTN_SIZE,

				x: this.canvas_width * 0.5,
				y: this.canvas_height * 0.5,

				start_degree: 315,
				end_degree: 45,

				color: "red",
			})
		);

		this.info = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "F11",
			img: ASSET.ctl.full_screen,
			x: this.canvas_width - BTN_SIZE - BTN_MARGIN,
			y: 110,
		});
		this.pause = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "Enter",
			img: ASSET.ctl.pause,
			x: this.canvas_width - BTN_SIZE - BTN_MARGIN,
			y: this.info.y + BTN_SIZE + BTN_PADDING,
		});

		this.left = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowLeft",
			img: ASSET.ctl.left,
			x: BTN_MARGIN,
			y: this.canvas_height - BTN_MARGIN - BTN_SIZE,
		});
		this.left_up = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowUp",
			img: ASSET.ctl.up,
			x: BTN_MARGIN,
			y: this.canvas_height - BTN_PADDING - BTN_MARGIN - BTN_SIZE * 2,
		});
		this.left_down = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowDown",
			img: ASSET.ctl.down,
			x: BTN_PADDING + BTN_MARGIN + BTN_SIZE,
			y: this.canvas_height - BTN_MARGIN - BTN_SIZE,
		});

		this.right = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowRight",
			img: ASSET.ctl.right,
			x: this.canvas_width - BTN_MARGIN - BTN_SIZE,
			y: this.canvas_height - BTN_MARGIN - BTN_SIZE,
		});
		this.right_up = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowUp",
			img: ASSET.ctl.up,
			x: this.canvas_width - BTN_MARGIN - BTN_SIZE,
			y: this.canvas_height - BTN_PADDING - BTN_MARGIN - BTN_SIZE * 2,
		});
		this.right_down = new button({
			ctx: this.ctx_control,
			ctx_mark: this.ctx_mark,
			debug: this.debug,

			name: "ArrowDown",
			img: ASSET.ctl.down,
			x: this.canvas_width - BTN_PADDING - BTN_MARGIN - BTN_SIZE * 2,
			y: this.canvas_height - BTN_MARGIN - BTN_SIZE,
		});

		this.btn_gui_list = [this.pause, this.info];
		this.btn_control_list = [this.left, this.left_up, this.left_down, this.right, this.right_up, this.right_down];
		this.btn_list = [...this.btn_gui_list, ...this.btn_control_list];
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
		this.redraw_button({ btn: this.info, img: ASSET.ctl.full_screen });
		this.info.draw_mark();
	}

	draw_normalscreen() {
		this.redraw_button({ btn: this.info, img: ASSET.ctl.normal_screen });
		this.info.draw_mark();
	}

	draw_pause() {
		this.redraw_button({ btn: this.pause, img: ASSET.ctl.pause });
		this.pause.draw_mark();
	}

	draw_start() {
		this.redraw_button({ btn: this.pause, img: ASSET.ctl.start });
		this.pause.draw_mark();
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
		this.info.clear();
		this.info.clear_mark();
	}

	clear_pause() {
		this.pause.clear();
		this.pause.clear_mark();
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
					}
				}
			} else if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
				window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: " " }));
			}
		}
	}
	attach_mouse(opt: { canvas_mark: HTMLCanvasElement; marker_ctx: CanvasRenderingContext2D; pointer_ctx: CanvasRenderingContext2D; control_ctx: CanvasRenderingContext2D; debug?: boolean }) {
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
					}
				}
			} else if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
				window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: " " }));
			}
		}
	}

	attach_touch(opt: { canvas_mark: HTMLCanvasElement; marker_ctx: CanvasRenderingContext2D; pointer_ctx: CanvasRenderingContext2D; control_ctx: CanvasRenderingContext2D; debug?: boolean }) {
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
