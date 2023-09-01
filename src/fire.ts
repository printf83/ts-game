import { particle } from "./particle.js";
import { MathFloor, MathRandom } from "./util.js";

const imgFire = new Image();
imgFire.src = "./res/fire.png";

export class fire extends particle {
	img: HTMLImageElement;
	img_size: number;
	constructor(opt: { x: number; y: number }) {
		super({
			x: opt.x,
			y: opt.y,
			size: MathRandom() * 100 + 50,
		});

		this.img = imgFire;
		this.img_size = -this.size * 0.5;
	}
	update() {
		super.update();
		this.img_size = -this.size * 0.5;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }): void {
		opt.ctx.drawImage(this.img, MathFloor(this.x), MathFloor(this.y), this.size, this.size);
	}
}
