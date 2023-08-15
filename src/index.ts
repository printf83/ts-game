//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s

(function () {
	const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	const CANVAS_WIDTH = (canvas.width = 600);
	const CANVAS_HEIGHT = (canvas.height = 600);

	const playerImage = new Image();
	playerImage.src = "./res/player.png";

	if (ctx) {
		animate({
			ctx,
			img: playerImage,
			frame_stagger: 5,
			frame_y: 4,
			sprite_width: 575,
			sprite_height: 523,
			sprite_length: 11,
			canvas_width: CANVAS_WIDTH,
			canvas_height: CANVAS_HEIGHT,
		});
	}
})();

interface option {
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

function animate(opt: option) {
	opt.game_frame ??= 0;
	opt.frame_x ??= 0;

	let position = Math.floor(opt.game_frame / opt.frame_stagger) % opt.sprite_length;
	opt.frame_x = opt.sprite_width * position;

	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);
	opt.ctx.drawImage(opt.img, opt.frame_x, opt.sprite_height * opt.frame_y, opt.sprite_width, opt.sprite_height, 0, 0, opt.canvas_width, opt.canvas_height);

	// if (opt.game_frame % opt.frame_stagger === 0) {
	// 	if (opt.frame_x < opt.sprite_length) opt.frame_x++;
	// 	else opt.frame_x = 0;
	// }

	opt.game_frame++;
	requestAnimationFrame(() => {
		animate(opt);
	});
}
