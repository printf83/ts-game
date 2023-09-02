import { MathFloor, MathPI2, genUID } from "./util.js";

const BTN_SIZE = 50;
const BTN_PADDING = 30;

class button {
	name: string;

	x: number;
	y: number;

	uid: number[];
	uid_text: string;
	uid_number: string;

	img: HTMLImageElement;
	color: string;
	width: number;
	height: number;
	constructor(opt: { name: string; img: string; x: number; y: number; width?: number; height?: number; color?: string }) {
		opt.width ??= BTN_SIZE;
		opt.height ??= BTN_SIZE;
		opt.color ??= "rgba(255,255,255,0.1)";

		this.uid = genUID();
		this.uid_number = `${this.uid[0]},${this.uid[1]},${this.uid[2]}`;
		this.uid_text = `rgb(${this.uid[0]},${this.uid[1]},${this.uid[2]})`;

		this.name = opt.name;

		this.img = new Image();
		this.img.src = opt.img;
		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
		this.color = opt.color;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.fillStyle = this.color;
		opt.ctx.beginPath();
		opt.ctx.arc(MathFloor(this.x + this.width * 0.5), MathFloor(this.y + this.width * 0.5), BTN_SIZE * 0.5, 0, MathPI2);
		opt.ctx.fill();

		opt.ctx.drawImage(this.img, 0, 0, 16, 16, MathFloor(this.x), MathFloor(this.y), this.width, this.height);
	}
	draw_mark(opt: { ctx: CanvasRenderingContext2D }) {
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
	left_action: button;
	left_down: button;
	left_up: button;

	right: button;
	right_action: button;
	right_down: button;
	right_up: button;

	btn_list: button[] = [];

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.info = new button({
			name: "Info",
			img: "./res/ctl/info.svg",
			x: this.canvas_width - BTN_SIZE - BTN_PADDING,
			y: 110,
		});
		this.pause = new button({
			name: "Enter",
			img: "./res/ctl/pause.svg",
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
			x: BTN_PADDING * 2 + BTN_SIZE,
			y: this.canvas_height - BTN_PADDING * 2 - BTN_SIZE * 2,
		});
		this.left_down = new button({
			name: "ArrowDown",
			img: "./res/ctl/down.svg",
			x: BTN_PADDING * 2 + BTN_SIZE,
			y: this.canvas_height - BTN_PADDING - BTN_SIZE,
		});
		this.left_action = new button({
			name: " ",
			img: "./res/ctl/action.svg",
			x: BTN_PADDING,
			y: this.canvas_height - BTN_PADDING * 2 - BTN_SIZE * 2,
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
			x: this.canvas_width - BTN_PADDING * 2 - BTN_SIZE * 2,
			y: this.canvas_height - BTN_PADDING * 2 - BTN_SIZE * 2,
		});
		this.right_down = new button({
			name: "ArrowDown",
			img: "./res/ctl/down.svg",
			x: this.canvas_width - BTN_PADDING * 2 - BTN_SIZE * 2,
			y: this.canvas_height - BTN_PADDING - BTN_SIZE,
		});
		this.right_action = new button({
			name: " ",
			img: "./res/ctl/action.svg",
			x: this.canvas_width - BTN_PADDING - BTN_SIZE,
			y: this.canvas_height - BTN_PADDING * 2 - BTN_SIZE * 2,
		});

		this.btn_list = [this.pause, this.info, this.left, this.left_up, this.left_down, this.left_action, this.right, this.right_up, this.right_down, this.right_action];
	}

	draw(opt: { ctx: CanvasRenderingContext2D; ctxMark: CanvasRenderingContext2D }) {
		this.btn_list.forEach((i) => {
			i.draw({ ctx: opt.ctx });
			i.draw_mark({ ctx: opt.ctxMark });
		});
	}

	last_touch_x: number = -1;
	last_touch_y: number = -1;
	private get_touch_location(e: TouchEvent) {
		if (e.touches && e.touches.length > 0 && e.touches[0]) {
			this.last_touch_x = e.touches[0].clientX;
			this.last_touch_y = e.touches[0].clientY;
		}

		return { x: this.last_touch_x, y: this.last_touch_y };
	}

	private touch_event(opt: { event_name: string; canvas_rect: DOMRect; ctx_canvas_mark: CanvasRenderingContext2D; e: TouchEvent }) {
		let { x: eX, y: eY } = this.get_touch_location(opt.e);

		if (eX > -1 && eY > -1) {
			const x = eX - opt.canvas_rect.left;
			const y = eY - opt.canvas_rect.top;
			const data = opt.ctx_canvas_mark.getImageData(x, y, 1, 1).data;

			if (data && data.length > 3 && data[0] && data[1] && data[2]) {
				if (data[0] > 0 && data[1] > 0 && data[2] > 0) {
					const btn = this.btn_list.filter((i) => {
						return i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2];
					});

					if (btn && btn.length > 0 && btn[0]) {
						const key = btn[0].name;
						if (key !== "Info") {
							console.log(`x: ${x}\ny: ${y}\ndata: ${data}\nkey:${key}`);
							window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: key }));
						}
					}
				}
			}
		}
	}
	// private click_event(opt: { event_name: string; canvas_rect: DOMRect; ctx_canvas_mark: CanvasRenderingContext2D; e: MouseEvent }) {
	// 	if (opt.e) {
	// 		console.log(opt.e);
	// 		const x = opt.e.x - opt.canvas_rect.left;
	// 		const y = opt.e.y - opt.canvas_rect.top;
	// 		const data = opt.ctx_canvas_mark.getImageData(x, y, 1, 1).data;
	// 		console.log(`x: ${x}\ny: ${y}\ndata: ${data}`);

	// 		if (data && data.length > 3 && data[0] && data[1] && data[2]) {
	// 			if (data[0] > 0 && data[1] > 0 && data[2] > 0) {
	// 				const btn = this.btn_list.filter((i) => {
	// 					return i.uid[0] === data[0] && i.uid[1] === data[1] && i.uid[2] === data[2];
	// 				});

	// 				if (btn && btn.length > 0 && btn[0]) {
	// 					const key = btn[0].name;
	// 					window.dispatchEvent(new KeyboardEvent(opt.event_name, { key: key }));
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	attach_click(opt: { canvas_mark: HTMLCanvasElement; ctx_canvas_mark: CanvasRenderingContext2D }) {
		const canvas_rect = opt.canvas_mark.getBoundingClientRect();
		//attach marker click event
		opt.canvas_mark.addEventListener("touchstart", (e: TouchEvent) => {
			console.log("touchstart");
			this.touch_event({
				event_name: "keydown",
				ctx_canvas_mark: opt.ctx_canvas_mark,
				canvas_rect,
				e,
			});
		});
		opt.canvas_mark.addEventListener("touchend", (e: TouchEvent) => {
			console.log("touchend");
			this.touch_event({ event_name: "keyup", ctx_canvas_mark: opt.ctx_canvas_mark, canvas_rect, e });
		});

		// // mouse
		// opt.canvas_mark.addEventListener("mousedown", (e: MouseEvent) => {
		// 	this.click_event({
		// 		event_name: "keydown",
		// 		ctx_canvas_mark: opt.ctx_canvas_mark,
		// 		canvas_rect,
		// 		e,
		// 	});
		// });
		// opt.canvas_mark.addEventListener("mouseup", (e: MouseEvent) => {
		// 	this.click_event({ event_name: "keyup", ctx_canvas_mark: opt.ctx_canvas_mark, canvas_rect, e });
		// });
	}
}
