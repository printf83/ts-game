export class input {
	key_filter = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Enter"];

	last_key: string;

	constructor() {
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
				if (e.key === "Enter") this.last_key = "PRESS enter";

				console.log(this.last_key);
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
				if (e.key === "Enter") this.last_key = "RELEASE enter";

				console.log(this.last_key);
			}
		});
	}
}
