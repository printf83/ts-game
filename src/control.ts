import { MathFloor, MathPI2, genUID } from "./util.js";

const BTN_SIZE = 80;
const BTN_PADDING = 30;

const BTN_IMG = {
	full_screen: "./res/ctl/full_screen.svg",
	normal_screen: "./res/ctl/normal_screen.svg",
	pause: "./res/ctl/pause.svg",
	start: "./res/ctl/start.svg",
	left: "./res/ctl/left.svg",
	right: "./res/ctl/right.svg",
	up: "./res/ctl/up.svg",
	down: "./res/ctl/down.svg",
	action: "./res/ctl/action.svg",
	info: "./res/ctl/info.svg",
};

const BTN_COLOR = {
	normal: "rgba(155,155,155,0.5)",
	highlight: "rgba(225,225,225,0.5)",
	click: "rgba(225,225,255,0.5)",
	active: "rgba(225,225,255,0.5)",
};
class button {
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
	constructor(opt: { name: string; img: string; x: number; y: number; width?: number; height?: number; color?: string }) {
		opt.width ??= BTN_SIZE;
		opt.height ??= BTN_SIZE;
		opt.color ??= BTN_COLOR.normal;

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
	clear(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.clearRect(MathFloor(this.x), MathFloor(this.y), BTN_SIZE, BTN_SIZE);
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		this.clear(opt);

		opt.ctx.fillStyle = this.color;
		opt.ctx.beginPath();
		opt.ctx.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.5, 0, MathPI2);
		opt.ctx.fill();

		opt.ctx.drawImage(this.img, 0, 0, 16, 16, MathFloor(this.x), MathFloor(this.y), this.width, this.height);
	}
	clear_mark(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.clearRect(MathFloor(this.x), MathFloor(this.y), BTN_SIZE, BTN_SIZE);
	}
	draw_mark(opt: { ctx: CanvasRenderingContext2D }) {
		this.clear_mark(opt);

		opt.ctx.fillStyle = this.uid_text;
		opt.ctx.beginPath();
		opt.ctx.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.7, 0, MathPI2);
		opt.ctx.fill();
	}
}

export class control {
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
	}) {
		this.canvas_mark = opt.canvas_mark;
		this.canvas_control = opt.canvas_control;
		this.canvas_pointer = opt.canvas_pointer;

		this.ctx_mark = opt.ctx_mark;
		this.ctx_control = opt.ctx_control;
		this.ctx_pointer = opt.ctx_pointer;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.canvas_rect = this.canvas_mark.getBoundingClientRect();

		this.info = new button({
			name: "F11",
			img: BTN_IMG.full_screen,
			x: this.canvas_width - BTN_SIZE - BTN_PADDING,
			y: 110,
		});
		this.pause = new button({
			name: "Enter",
			img: BTN_IMG.pause,
			x: this.canvas_width - BTN_SIZE - BTN_PADDING,
			y: this.info.y + BTN_SIZE + BTN_PADDING,
		});

		this.left = new button({
			name: "ArrowLeft",
			img: "./res/ctl/left.svg",
			x: BTN_PADDING,
			y: this.canvas_height - BTN_PADDING - BTN_SIZE,
		});
		this.left_up = new button({
			name: "ArrowUp",
			img: "./res/ctl/up.svg",
			x: BTN_PADDING,
			y: this.canvas_height - BTN_PADDING * 2 - BTN_SIZE * 2,
		});
		this.left_down = new button({
			name: "ArrowDown",
			img: "./res/ctl/down.svg",
			x: BTN_PADDING * 2 + BTN_SIZE,
			y: this.canvas_height - BTN_PADDING - BTN_SIZE,
		});

		this.right = new button({
			name: "ArrowRight",
			img: "./res/ctl/right.svg",
			x: this.canvas_width - BTN_PADDING - BTN_SIZE,
			y: this.canvas_height - BTN_PADDING - BTN_SIZE,
		});
		this.right_up = new button({
			name: "ArrowUp",
			img: "./res/ctl/up.svg",
			x: this.canvas_width - BTN_PADDING - BTN_SIZE,
			y: this.canvas_height - BTN_PADDING * 2 - BTN_SIZE * 2,
		});
		this.right_down = new button({
			name: "ArrowDown",
			img: "./res/ctl/down.svg",
			x: this.canvas_width - BTN_PADDING * 2 - BTN_SIZE * 2,
			y: this.canvas_height - BTN_PADDING - BTN_SIZE,
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
			i.draw({ ctx: this.ctx_control });
			i.draw_mark({ ctx: this.ctx_mark });
		});
	}

	draw_fullscreen() {
		this.redraw_button({ btn: this.info, img: BTN_IMG.full_screen });
		this.info.draw_mark({ ctx: this.ctx_mark });
	}

	draw_normalscreen() {
		this.redraw_button({ btn: this.info, img: BTN_IMG.normal_screen });
		this.info.draw_mark({ ctx: this.ctx_mark });
	}

	draw_pause() {
		this.redraw_button({ btn: this.pause, img: BTN_IMG.pause });
		this.pause.draw_mark({ ctx: this.ctx_mark });
	}

	draw_start() {
		this.redraw_button({ btn: this.pause, img: BTN_IMG.start });
		this.pause.draw_mark({ ctx: this.ctx_mark });
	}

	draw_control() {
		this.btn_control_list.forEach((i) => {
			i.draw({ ctx: this.ctx_control });
			i.draw_mark({ ctx: this.ctx_mark });
		});
	}

	clear_gui() {
		this.btn_gui_list.forEach((i) => {
			i.clear({ ctx: this.ctx_control });
			i.clear_mark({ ctx: this.ctx_mark });
		});
	}

	clear_fullscreen() {
		this.info.clear({ ctx: this.ctx_control });
		this.info.clear_mark({ ctx: this.ctx_mark });
	}

	clear_pause() {
		this.pause.clear({ ctx: this.ctx_control });
		this.pause.clear_mark({ ctx: this.ctx_mark });
	}

	clear_control() {
		this.btn_control_list.forEach((i) => {
			i.clear({ ctx: this.ctx_control });
			i.clear_mark({ ctx: this.ctx_mark });
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

				opt.btn.draw({ ctx: this.ctx_control });
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
				this.ctx_pointer.clearRect(x - 50, y - 50, 100, 100);
				this.ctx_pointer.fillStyle = "red";
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

			// console.log({ x, y, scale });
			this.last_touch_location = { x: x, y: y };
		}

		return this.last_touch_location;
	}

	private touch_event(opt: { event_name: string; event: TouchEvent; debug?: boolean }) {
		let { x, y } = this.get_touch_location(this.canvas_mark, opt.event);

		if (x > -1 && y > -1) {
			if (opt.debug) {
				this.ctx_pointer.clearRect(x - 50, y - 50, 100, 100);
				this.ctx_pointer.fillStyle = "red";
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
