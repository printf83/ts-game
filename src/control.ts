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
	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		ctx_mark: CanvasRenderingContext2D;
		name: string;
		img: string;
		x: number;
		y: number;
		width?: number;
		height?: number;
		color?: string;
		debug?: boolean;
	}) {
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
		if (this.debug)
			this.ctx_mark.strokeRect(
				MathFloor(this.x - BTN_SIZE * 0.25),
				MathFloor(this.y - BTN_SIZE * 0.25),
				BTN_SIZE * 1.5,
				BTN_SIZE * 1.5
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

	color: string;
	width: number;
	height: number;
	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		ctx_mark: CanvasRenderingContext2D;
		name: string;
		img: string;
		x: number;
		y: number;
		width?: number;
		height?: number;
		color?: string;
		debug?: boolean;
	}) {
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
		if (this.debug)
			this.ctx_mark.strokeRect(
				MathFloor(this.x - BTN_SIZE * 0.25),
				MathFloor(this.y - BTN_SIZE * 0.25),
				BTN_SIZE * 1.5,
				BTN_SIZE * 1.5
			);
	}

	private calc(center_x: number, center_y: number, radius: number, angle_degree: number) {
		const angle_rad = (angle_degree * MathPI) / 180;
		const x = center_x + radius * Math.cos(angle_rad);
		const y = center_y + radius * Math.sin(angle_rad);
		return { x, y };
	}
	private angle(angle_degree: number) {
		return angle_degree * 360;
	}

	draw_mark() {
		this.clear_mark();

		this.ctx_mark.fillStyle = this.uid_text;
		this.ctx_mark.beginPath();

		this.ctx_mark.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.75, 0, MathPI2);
		this.ctx_mark.fill();

		// var calculateStart = function (data, index, total) {
		// 	if (index === 0) {
		// 		return 0;
		// 	}

		// 	return calculateEnd(data, index - 1, total);
		// };

		// var calculateEndAngle = function (data, index, total) {
		// 	var angle = (data[index].value / total) * 360;
		// 	var inc = index === 0 ? 0 : calculateEndAngle(data, index - 1, total);

		// 	return angle + inc;
		// };

		// var calculateEnd = function (data, index, total) {
		// 	return degreeToRadians(calculateEndAngle(data, index, total));
		// };

		// var degreeToRadians = function (angle) {
		// 	return (angle * Math.PI) / 180;
		// };

		//test
		// const a1 = 0.5;
		// this.ctx_mark.save();
		// this.ctx_mark.beginPath();
		// this.ctx_mark.fillStyle = `red`;

		// this.ctx_mark.arc(MathFloor(this.x), MathFloor(this.y), 50, MathPI * a1, MathPI);

		// this.ctx_mark.lineTo(MathFloor(this.x - 150), MathFloor(this.y));

		// this.ctx_mark.arc(MathFloor(this.x), MathFloor(this.y), 150, MathPI, MathPI * a1, true);

		// this.ctx_mark.lineTo(MathFloor(this.x), MathFloor(this.y + 50));

		// this.ctx_mark.fill();
		// this.ctx_mark.restore();

		const hole_radius = BTN_SIZE;
		const radius = BTN_SIZE * 2 + hole_radius;

		const center_x = MathFloor(this.x + BTN_SIZE * 0.5 + 5);
		const center_y = MathFloor(this.y + BTN_SIZE * 0.5 + 5);

		//right bottom
		this.ctx_mark.save();
		this.ctx_mark.beginPath();
		this.ctx_mark.fillStyle = `blue`;

		this.ctx_mark.arc(center_x, center_y, hole_radius, 0, MathPI * 0.5);

		let c1 = this.calc(center_x, center_y, radius, 90);
		this.ctx_mark.lineTo(c1.x, c1.y);

		this.ctx_mark.arc(center_x, center_y, radius, MathPI * 0.5, 0, true);

		let c2 = this.calc(center_x, center_y, hole_radius, 0);
		this.ctx_mark.lineTo(c2.x, c2.y);

		this.ctx_mark.fill();
		this.ctx_mark.restore();

		//left bottom
		this.ctx_mark.save();
		this.ctx_mark.beginPath();
		this.ctx_mark.fillStyle = `red`;

		this.ctx_mark.arc(center_x - 10, center_y, hole_radius, MathPI * 0.5, MathPI);

		let c3 = this.calc(center_x - 10, center_y, radius, 180);
		this.ctx_mark.lineTo(c3.x, c3.y);

		this.ctx_mark.arc(center_x - 10, center_y, radius, MathPI, MathPI * 0.5, true);

		let c4 = this.calc(center_x - 10, center_y, hole_radius, 90);
		this.ctx_mark.lineTo(c4.x, c4.y);

		this.ctx_mark.fill();
		this.ctx_mark.restore();

		//left top
		this.ctx_mark.save();
		this.ctx_mark.beginPath();
		this.ctx_mark.fillStyle = `green`;

		this.ctx_mark.arc(center_x - 10, center_y - 10, hole_radius, MathPI * 1, MathPI * 1.5);

		let c5 = this.calc(center_x - 10, center_y - 10, radius, 270);
		this.ctx_mark.lineTo(c5.x, c5.y);

		this.ctx_mark.arc(center_x - 10, center_y - 10, radius, MathPI * 1.5, MathPI * 1, true);

		let c6 = this.calc(center_x - 10, center_y - 10, hole_radius, 180);
		this.ctx_mark.lineTo(c6.x, c6.y);

		this.ctx_mark.fill();
		this.ctx_mark.restore();

		//right top
		this.ctx_mark.save();
		this.ctx_mark.beginPath();
		this.ctx_mark.fillStyle = `yellow`;

		this.ctx_mark.arc(center_x, center_y - 10, hole_radius, MathPI * 1.5, MathPI * 0);

		let c7 = this.calc(center_x, center_y - 10, radius, 0);
		this.ctx_mark.lineTo(c7.x, c7.y);

		this.ctx_mark.arc(center_x, center_y - 10, radius, MathPI * 0, MathPI * 1.5, true);

		let c8 = this.calc(center_x, center_y - 10, hole_radius, 270);
		this.ctx_mark.lineTo(c8.x, c8.y);

		this.ctx_mark.fill();
		this.ctx_mark.restore();
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
				x: this.canvas_width * 0.5,
				y: this.canvas_height * 0.5,
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
