//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

const newId = () => `id-${Math.floor(Math.random() * 10000000000)}`;

let id: string = newId();

const db = {
	idle: {
		frame_y: 0,
		sprite_length: 7,
	},
	jump: {
		frame_y: 1,
		sprite_length: 7,
	},
	fall: {
		frame_y: 2,
		sprite_length: 7,
	},
	run: {
		frame_y: 3,
		sprite_length: 9,
	},
	dizzy: {
		frame_y: 4,
		sprite_length: 11,
	},
	sit: {
		frame_y: 5,
		sprite_length: 5,
	},
	roll: {
		frame_y: 6,
		sprite_length: 7,
	},
	bite: {
		frame_y: 7,
		sprite_length: 7,
	},
	ko: {
		frame_y: 8,
		sprite_length: 12,
	},
	gethit: {
		frame_y: 9,
		sprite_length: 4,
	},
};

const getInfo = (action: string) => {
	switch (action) {
		case "idle":
			return db.idle;
		case "jump":
			return db.jump;
		case "fall":
			return db.fall;
		case "run":
			return db.run;
		case "dizzy":
			return db.dizzy;
		case "sit":
			return db.sit;
		case "roll":
			return db.roll;
		case "bite":
			return db.bite;
		case "ko":
			return db.ko;
		case "gethit":
			return db.gethit;
		default:
			return db.idle;
	}
};

const main = (opt: { frame_y: number; sprite_length: number }) => {
	const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	const CANVAS_WIDTH = (canvas.width = 500);
	const CANVAS_HEIGHT = (canvas.height = 500);

	const playerImage = new Image();
	playerImage.src = "./res/player.png";

	if (ctx) {
		id = newId();

		animate({
			id,
			ctx,
			img: playerImage,
			frame_stagger: 5,
			frame_y: opt.frame_y,
			sprite_width: 575,
			sprite_height: 523,
			sprite_length: opt.sprite_length,
			canvas_width: CANVAS_WIDTH,
			canvas_height: CANVAS_HEIGHT,
		});
	}
};

interface option {
	id: string;
	ctx: CanvasRenderingContext2D;
	img: HTMLImageElement;
	game_frame?: number;
	frame_stagger: number;
	frame_x?: number;
	frame_y: number;
	sprite_width: number;
	sprite_height: number;
	sprite_length: number;
	canvas_width: number;
	canvas_height: number;
}

const animate = (opt: option) => {
	opt.game_frame ??= 0;
	opt.frame_x ??= 0;

	let position = Math.floor(opt.game_frame / opt.frame_stagger) % opt.sprite_length;
	opt.frame_x = opt.sprite_width * position;

	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);
	opt.ctx.drawImage(opt.img, opt.frame_x, opt.sprite_height * opt.frame_y, opt.sprite_width, opt.sprite_height, 0, 0, opt.canvas_width, opt.canvas_height);

	opt.game_frame++;

	if (id === opt.id) {
		requestAnimationFrame(() => {
			animate(opt);
		});
	}
};

(function () {
	const dropdown = document.getElementById("animation") as HTMLSelectElement;
	dropdown.addEventListener("change", (event: Event) => {
		const target = event.currentTarget as HTMLSelectElement;
		const value = target.value;
		main(getInfo(value));
	});

	main(getInfo("idle"));
})();
