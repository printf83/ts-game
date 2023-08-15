(function () {
	const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	const CANVAS_WIDTH = (canvas.width = 600);
	const CANVAS_HEIGHT = (canvas.height = 600);
	const sprite_width = 575;
	const sprite_height = 523;
	const sprite_length = 4;

	let frame_x = 0;
	let frame_y = 5;
	let game_frame = 0;
	let frame_stagger = 5;

	const playerImage = new Image();
	playerImage.src = "./res/player.png";

	if (ctx) {
		animate(ctx, playerImage, game_frame, frame_stagger, frame_x, frame_y, sprite_width, sprite_height, sprite_length, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
})();

function animate(ctx: CanvasRenderingContext2D, img: HTMLImageElement, game_frame: number, frame_stagger: number, frame_x: number, frame_y: number, sprite_width: number, sprite_height: number, sprite_length: number, canvas_width: number, canvas_height: number) {
	ctx.clearRect(0, 0, canvas_width, canvas_height);
	ctx.drawImage(img, sprite_width * frame_x, sprite_height * frame_y, sprite_width, sprite_height, 0, 0, canvas_width, canvas_height);

	if (game_frame % frame_stagger === 0) {
		if (frame_x < sprite_length) frame_x++;
		else frame_x = 0;
	}

	game_frame++;
	requestAnimationFrame(() => {
		animate(ctx, img, game_frame, frame_stagger, frame_x, frame_y, sprite_width, sprite_height, sprite_length, canvas_width, canvas_height);
	});
}
