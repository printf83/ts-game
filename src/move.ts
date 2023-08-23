interface game1_option {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
}

export const game1 = (opt: game1_option) => {
	class input_handler {
		keys: string[];
		constructor() {
			this.keys = [];
			window.addEventListener("keydown", (e) => {
				if ((e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") && this.keys.indexOf(e.key) === -1) {
					this.keys.push(e.key);
				}
			});

			window.addEventListener("keyup", (e) => {
				if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
					this.keys.splice(this.keys.indexOf(e.key), 1);
				}
			});
		}
	}

	class player {
		canvas_width: number;
		canvas_height: number;

		width: number;
		height: number;
		x: number;
		y: number;

		img: HTMLImageElement;
		frame_x: number;
		frame_y: number;

		speed: number;
		velocity_y: number;
		weight: number;

		sprite_width = 575;
		sprite_height = 523;

		constructor(canvas_width: number, canvas_height: number) {
			this.canvas_width = canvas_width;
			this.canvas_height = canvas_height;

			this.width = this.sprite_width * 0.25;
			this.height = this.sprite_height * 0.25;
			this.x = 10;
			this.y = this.canvas_height - this.height;

			this.img = new Image();
			this.img.src = "./res/player.png";

			this.frame_x = 0;
			this.frame_y = 0;

			this.speed = 0;
			this.velocity_y = 0;
			this.weight = 1;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.drawImage(this.img, this.frame_x * this.sprite_width, this.frame_y * this.sprite_height, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);
		}
		update(input: input_handler) {
			if (input.keys.indexOf("ArrowRight") > -1) {
				this.speed = 5;
			} else if (input.keys.indexOf("ArrowLeft") > -1) {
				this.speed = -5;
			} else if (input.keys.indexOf("ArrowUp") > -1 && this.on_ground()) {
				this.velocity_y -= 32;
			} else {
				this.speed = 0;
			}

			//horizontal movement
			this.x += this.speed;
			if (this.x < 0) this.x = 0;
			else if (this.x > this.canvas_width - this.width) this.x = this.canvas_width - this.width;

			//vertical movement
			this.y += this.velocity_y;
			if (!this.on_ground()) {
				this.velocity_y += this.weight;
				this.frame_y = 1;
			} else {
				this.velocity_y = 0;
				this.frame_y = 0;
			}

			if (this.y > this.canvas_height - this.height) this.y = this.canvas_height - this.height;
		}
		on_ground() {
			return this.y >= this.canvas_height - this.height;
		}
	}

	class bg {
		canvas_width: number;
		canvas_height: number;

		x: number;
		y: number;
		width: number;
		height: number;

		img: HTMLImageElement;

		sprite_width = 2400;
		sprite_height = 720;

		speed: number;

		constructor(canvas_width: number, canvas_height: number) {
			this.canvas_width = canvas_width;
			this.canvas_height = canvas_height;

			this.img = new Image();
			this.img.src = "./res/bg-single.png";

			this.x = 0;
			this.y = 0;

			this.width = this.sprite_width;
			this.height = this.sprite_height;

			this.speed = 7;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
			ctx.drawImage(this.img, this.x + this.width - this.speed, this.y, this.width, this.height);
		}
		update() {
			this.x -= this.speed;
			if (this.x < 0 - this.width) this.x = 0;
		}
	}

	const imgEnemy = new Image();
	imgEnemy.src = "./res/enemy7.png";
	class enemy {
		canvas_width: number;
		canvas_height: number;

		x: number;
		y: number;
		width: number;
		height: number;

		img: HTMLImageElement;

		sprite_width = 229;
		sprite_height = 171;

		frame_x: number;

		speed: number;

		constructor(canvas_width: number, canvas_height: number) {
			this.canvas_width = canvas_width;
			this.canvas_height = canvas_height;

			this.img = imgEnemy;

			this.width = this.sprite_width * 0.5;
			this.height = this.sprite_height * 0.5;

			this.x = this.canvas_width;
			this.y = this.canvas_height - this.height;

			this.frame_x = 0;
			this.speed = 7;
		}
		draw(ctx: CanvasRenderingContext2D) {
			ctx.drawImage(this.img, this.frame_x * this.sprite_width, 0, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);
		}
		update() {
			this.x -= this.speed;
		}
	}

	let enemy_list: enemy[] = [];

	const handle_enemy = (delta_time: number) => {
		if (enemy_timer > enemy_interval + enemy_random_interval) {
			enemy_list.push(new enemy(opt.canvas_width, opt.canvas_height));

			enemy_timer = 0;
		} else {
			enemy_timer += delta_time;
		}

		enemy_list.forEach((i) => {
			i.update();
			i.draw(opt.ctx);
		});
	};

	const display_status = () => {};

	const obj_input = new input_handler();
	const obj_player = new player(opt.canvas_width, opt.canvas_height);
	const obj_bg = new bg(opt.canvas_width, opt.canvas_height);

	let lastTime = 0;
	let enemy_timer = 0;
	let enemy_interval = 1000;
	let enemy_random_interval = Math.random() * 1000 + 500;

	const animate = (timestamp: number) => {
		const delta_time = timestamp - lastTime;
		lastTime = timestamp;

		opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);
		obj_bg.update();
		obj_bg.draw(opt.ctx);
		obj_player.update(obj_input);
		obj_player.draw(opt.ctx);

		handle_enemy(delta_time);

		requestAnimationFrame(animate);
	};

	animate(0);
};

// interface move_option {
// 	ctx: CanvasRenderingContext2D;
// 	canvas_width: number;
// 	canvas_height: number;
// }

// export class move {
// 	ctx: CanvasRenderingContext2D;
// 	canvas_width: number;
// 	canvas_height: number;

// 	constructor(opt: move_option) {
// 		this.ctx = opt.ctx;
// 		this.canvas_width = opt.canvas_width;
// 		this.canvas_height = opt.canvas_height;
// 	}

// 	update(_timestamp: number) {}

// 	draw() {}

// 	//private addNewEnemy() {}
// }

// interface move_animate_option {
// 	move: move;
// 	timestamp: number;
// }

// let move_last_timestamp = 0;
// export const animate_move = (opt: move_animate_option) => {
// 	opt.move.ctx.clearRect(0, 0, opt.move.canvas_width, opt.move.canvas_height);

// 	let delta_time = opt.timestamp - move_last_timestamp;
// 	move_last_timestamp = opt.timestamp;

// 	opt.move.update(delta_time);
// 	opt.move.draw();

// 	requestAnimationFrame((timestamp) => {
// 		opt.timestamp = timestamp;
// 		animate_move(opt);
// 	});
// };
