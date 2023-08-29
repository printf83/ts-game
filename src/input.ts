export class input {
	key_filter = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Enter"];

	last_key: string;

	constructor() {
		this.last_key = "";

		window.addEventListener("keydown", (e) => {
			if (this.key_filter.indexOf(e.key) > -1) {
				e.preventDefault();
				e.stopPropagation();
				switch (e.key) {
					case "ArrowLeft":
						this.last_key = "PRESS left";
						break;
					case "ArrowRight":
						this.last_key = "PRESS right";
						break;
					case "ArrowUp":
						this.last_key = "PRESS up";
						break;
					case "ArrowDown":
						this.last_key = "PRESS down";
						break;
					case " ":
						this.last_key = "PRESS space";
						break;
					case "Enter":
						this.last_key = "PRESS enter";
						break;
				}
			}
		});

		window.addEventListener("keyup", (e) => {
			if (this.key_filter.indexOf(e.key) > -1) {
				e.preventDefault();
				e.stopPropagation();

				switch (e.key) {
					case "ArrowLeft":
						this.last_key = "RELEASE left";
						break;
					case "ArrowRight":
						this.last_key = "RELEASE right";
						break;
					case "ArrowUp":
						this.last_key = "RELEASE up";
						break;
					case "ArrowDown":
						this.last_key = "RELEASE down";
						break;
					case " ":
						this.last_key = "RELEASE space";
						break;
					case "Enter":
						this.last_key = "RELEASE enter";
						break;
				}
			}
		});
	}
}
