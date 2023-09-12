export class input {
	key_filter = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Control", "Enter"];

	debug: boolean;
	last_key: string;

	constructor(opt: { debug?: boolean }) {
		opt.debug ??= false;

		this.debug = opt.debug;
		this.last_key = "";

		window.addEventListener("keydown", (e) => {
			if (this.key_filter.indexOf(e.key) > -1) {
				e.preventDefault();
				e.stopPropagation();

				if (e.key === "ArrowLeft") this.last_key = "PRESS left";
				if (e.key === "ArrowRight") this.last_key = "PRESS right";
				if (e.key === "ArrowUp") this.last_key = "PRESS up";
				if (e.key === "ArrowDown") this.last_key = "PRESS down";
				if (e.key === " ") this.last_key = "PRESS space";
				if (e.key === "Control") this.last_key = "PRESS control";
				if (e.key === "Enter") this.last_key = "PRESS enter";

				if (this.debug) console.log(this.last_key);
			} else {
				if (this.debug) console.warn(e.key);
			}
		});

		window.addEventListener("keyup", (e) => {
			if (this.key_filter.indexOf(e.key) > -1) {
				e.preventDefault();
				e.stopPropagation();

				if (e.key === "ArrowLeft") this.last_key = "RELEASE left";
				if (e.key === "ArrowRight") this.last_key = "RELEASE right";
				if (e.key === "ArrowUp") this.last_key = "RELEASE up";
				if (e.key === "ArrowDown") this.last_key = "RELEASE down";
				if (e.key === " ") this.last_key = "RELEASE space";
				if (e.key === "Control") this.last_key = "RELEASE control";
				if (e.key === "Enter") this.last_key = "RELEASE enter";

				if (this.debug) console.log(this.last_key);
			}
		});
	}
}
