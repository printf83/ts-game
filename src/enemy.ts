const enemyDB = {
	enemy1: {
		img: "./res/enemy1.png",
		sprite_length: 5,
		sprite_width: 293,
		sprite_height: 155,
	},
	enemy2: {
		img: "./res/enemy2.png",
		sprite_length: 5,
		sprite_width: 266,
		sprite_height: 188,
	},
	enemy3: {
		img: "./res/enemy3.png",
		sprite_length: 5,
		sprite_width: 218,
		sprite_height: 177,
	},
	enemy4: {
		img: "./res/enemy4.png",
		sprite_length: 8,
		sprite_width: 213,
		sprite_height: 213,
	},
};

export type enemyDBType = keyof typeof enemyDB;

export const enemyType = (canvas: HTMLCanvasElement, canvas_width: number, canvas_height: number, action: enemyDBType, count: number) => {
	let item = enemyDB[action];

	const img = new Image();
	img.src = item.img;

	const sprite_width = item.sprite_width;
	const sprite_height = item.sprite_height;
	const sprite_length = item.sprite_length;

	switch (action) {
		case "enemy1":
			return {
				canvas,
				canvas_width,
				canvas_height,
				enemy: setupEnemy1(count, {
					img,
					sprite_width,
					sprite_height,
					sprite_length,
					canvas_height,
					canvas_width,
				}),
			};
		case "enemy2":
			return {
				canvas,
				canvas_width,
				canvas_height,
				enemy: setupEnemy2(count, {
					img,
					sprite_width,
					sprite_height,
					sprite_length,
					canvas_height,
					canvas_width,
				}),
			};

		case "enemy3":
			return {
				canvas,
				canvas_width,
				canvas_height,
				enemy: setupEnemy3(count, {
					img,
					sprite_width,
					sprite_height,
					sprite_length,
					canvas_height,
					canvas_width,
				}),
			};
		case "enemy4":
			return {
				canvas,
				canvas_width,
				canvas_height,
				enemy: setupEnemy4(count, {
					img,
					sprite_width,
					sprite_height,
					sprite_length,
					canvas_height,
					canvas_width,
				}),
			};

		default:
			return {
				canvas,
				canvas_width,
				canvas_height,
				enemy: setupEnemy1(count, {
					img,
					sprite_width,
					sprite_height,
					sprite_length,
					canvas_height,
					canvas_width,
				}),
			};
	}
};

class baseEnemy {
	frame: number;

	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;

	sprite_width: number;
	sprite_height: number;
	sprite_length: number;

	game_speed: number;
	animation_speed: number;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		game_speed: number;
		animation_speed: number;
	}) {
		this.frame = 0;

		this.img = opt.img;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;

		this.sprite_length = opt.sprite_length;
		this.sprite_width = opt.sprite_width;
		this.sprite_height = opt.sprite_height;

		this.game_speed = opt.game_speed;
		this.animation_speed = opt.animation_speed;
	}

	update(game_frame: number) {
		if (game_frame % this.animation_speed === 0) {
			this.frame >= this.sprite_length ? (this.frame = 0) : this.frame++;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.img,
			this.frame * this.sprite_width,
			0,
			this.sprite_width,
			this.sprite_height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}

//enemy 4
class enemy4 extends baseEnemy {
	canvas_width: number;
	canvas_height: number;

	newX: number;
	newY: number;
	interval: number;

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

		game_speed: number;
		animation_speed: number;

		newX: number;
		newY: number;
		interval: number;
	}) {
		super(opt);

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.newX = opt.newX;
		this.newY = opt.newY;
		this.interval = opt.interval;
	}

	update(game_frame: number) {
		if (game_frame % this.interval === 0) {
			this.newX = Math.random() * (this.canvas_width - this.width);
			this.newY = Math.random() * (this.canvas_height - this.height);
		}

		let dx = this.x - this.newX;
		let dy = this.y - this.newY;

		this.x -= dx / 20;
		this.y -= dy / 20;

		super.update(game_frame);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const setupEnemy4 = (
	count: number,
	opt: {
		img: HTMLImageElement;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;
	}
) => {
	const width = opt.sprite_width / 2.5;
	const height = opt.sprite_height / 2.5;

	return Array(count)
		.fill("")
		.map((_i) => {
			return new enemy4({
				img: opt.img,

				x: Math.random() * (opt.canvas_width - width),
				y: Math.random() * (opt.canvas_height - height),
				width,
				height,

				canvas_width: opt.canvas_width,
				canvas_height: opt.canvas_height,
				sprite_width: opt.sprite_width,
				sprite_height: opt.sprite_height,
				sprite_length: opt.sprite_length,

				game_speed: Math.random() * 4 + 1,
				animation_speed: Math.floor(Math.random() * 3 + 1),

				newX: Math.random() * (opt.canvas_width - width),
				newY: Math.random() * (opt.canvas_height - height),
				interval: Math.floor(Math.random() * 200 + 50),
			});
		});
};

//enemy 3
class enemy3 extends baseEnemy {
	canvas_width: number;
	canvas_height: number;

	angle: number;
	angle_speed: number;

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

		game_speed: number;
		animation_speed: number;

		angle: number;
		angle_speed: number;
	}) {
		super(opt);

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.angle = opt.angle;
		this.angle_speed = opt.angle_speed;
	}

	update(game_frame: number) {
		this.x = (this.canvas_width / 2) * Math.cos((this.angle * Math.PI) / 90) + (this.canvas_width / 2 - this.width / 2);
		if (this.x + this.width < 0) this.x = this.canvas_width;

		this.y = (this.canvas_height / 2) * Math.sin((this.angle * Math.PI) / 270) + (this.canvas_height / 2 - this.height / 2);
		if (this.y + this.height < 0) this.y = this.canvas_height;

		this.angle += this.angle_speed;

		super.update(game_frame);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const setupEnemy3 = (
	count: number,
	opt: {
		img: HTMLImageElement;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;
	}
) => {
	const width = opt.sprite_width / 2.5;
	const height = opt.sprite_height / 2.5;

	return Array(count)
		.fill("")
		.map((_i) => {
			return new enemy3({
				img: opt.img,

				x: Math.random() * (opt.canvas_width - width),
				y: Math.random() * (opt.canvas_height - height),
				width,
				height,

				canvas_width: opt.canvas_width,
				canvas_height: opt.canvas_height,
				sprite_width: opt.sprite_width,
				sprite_height: opt.sprite_height,
				sprite_length: opt.sprite_length,

				game_speed: Math.random() * 4 + 1,
				animation_speed: Math.floor(Math.random() * 3 + 1),

				angle: Math.random() * 2,
				angle_speed: Math.random() * 0.5 + 0.5,
			});
		});
};

//enemy 2
class enemy2 extends baseEnemy {
	canvas_width: number;
	canvas_height: number;

	angle: number;
	angle_speed: number;
	curve: number;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;

		game_speed: number;
		animation_speed: number;

		angle: number;
		angle_speed: number;
		curve: number;
	}) {
		super(opt);

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.angle = opt.angle;
		this.angle_speed = opt.angle_speed;
		this.curve = opt.curve;
	}

	update(game_frame: number) {
		this.x -= this.game_speed;
		if (this.x + this.width < 0) this.x = this.canvas_width;

		this.y += this.curve * Math.sin(this.angle);

		this.angle += this.angle_speed;

		super.update(game_frame);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const setupEnemy2 = (
	count: number,
	opt: {
		img: HTMLImageElement;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;
	}
) => {
	const width = opt.sprite_width / 2.5;
	const height = opt.sprite_height / 2.5;

	return Array(count)
		.fill("")
		.map((_i) => {
			return new enemy2({
				img: opt.img,

				x: Math.random() * (opt.canvas_width - width),
				y: Math.random() * (opt.canvas_height - height),
				width,
				height,

				canvas_width: opt.canvas_width,
				canvas_height: opt.canvas_height,
				sprite_width: opt.sprite_width,
				sprite_height: opt.sprite_height,
				sprite_length: opt.sprite_length,

				game_speed: Math.random() * 4 + 1,
				animation_speed: Math.floor(Math.random() * 3 + 1),

				angle: Math.random() * 2,
				angle_speed: Math.random() * 0.2,
				curve: Math.random() * 5,
			});
		});
};

//enemy 1
class enemy1 extends baseEnemy {
	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		game_speed: number;
		animation_speed: number;
	}) {
		super(opt);
	}

	update(game_frame: number) {
		this.x += Math.random() * 7 - 3.5;
		this.y += Math.random() * 7 - 3.5;

		super.update(game_frame);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const setupEnemy1 = (
	count: number,
	opt: {
		img: HTMLImageElement;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;
	}
) => {
	const width = opt.sprite_width / 2.5;
	const height = opt.sprite_height / 2.5;

	return Array(count)
		.fill("")
		.map((_i) => {
			return new enemy1({
				img: opt.img,

				x: Math.random() * (opt.canvas_width - width),
				y: Math.random() * (opt.canvas_height - height),
				width,
				height,

				sprite_width: opt.sprite_width,
				sprite_height: opt.sprite_height,
				sprite_length: opt.sprite_length,

				game_speed: Math.random() * 4 - 2,
				animation_speed: Math.floor(Math.random() * 3 + 1),
			});
		});
};

let enemAnimationId: string = "";
export const enemy = (opt: { canvas: HTMLCanvasElement; canvas_width: number; canvas_height: number; enemy: baseEnemy[] }) => {
	const ctx = opt.canvas.getContext("2d");

	if (ctx) {
		enemAnimationId = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "");

		animateEnemy({
			animateId: enemAnimationId,
			ctx,
			enemy: opt.enemy,
			game_frame: 0,
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
		});
	}
};

interface option {
	animateId: string;
	ctx: CanvasRenderingContext2D;
	enemy: baseEnemy[];
	game_frame: number;
	canvas_width: number;
	canvas_height: number;
}

const animateEnemy = (opt: option) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	opt.enemy.forEach((i) => {
		i.update(opt.game_frame);
		i.draw(opt.ctx);
	});

	opt.game_frame++;
	requestAnimationFrame(() => {
		if (enemAnimationId === opt.animateId) {
			animateEnemy(opt);
		}
	});
};
