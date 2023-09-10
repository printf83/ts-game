import { BTN_COLOR } from "./control.js";
import { COLOR } from "./util.js";

export const ASSET = {
	bg1: {
		layer1: "./res/bg1/layer-1.png",
		layer2: "./res/bg1/layer-2.png",
		layer3: "./res/bg1/layer-3.png",
		layer4: "./res/bg1/layer-4.png",
		layer5: "./res/bg1/layer-5.png",
	},
	bg2: {
		layer1: "./res/bg2/layer-1.png",
		layer2: "./res/bg2/layer-2.png",
		layer3: "./res/bg2/layer-3.png",
		layer4: "./res/bg2/layer-4.png",
		layer5: "./res/bg2/layer-5.png",
	},
	ctl: {
		action: "./res/ctl/action.svg",
		down: "./res/ctl/down.svg",
		full_screen: "./res/ctl/full_screen.svg",
		icon: "./res/ctl/icon.svg",
		icon_png: "./res/ctl/icon.png",
		info: "./res/ctl/info.svg",
		left: "./res/ctl/left.svg",
		life_icon_inactive: "./res/ctl/life_icon_inactive.svg",
		life_icon: "./res/ctl/life_icon.svg",
		life_icon_inactive_png: "./res/ctl/life_icon_inactive.png",
		life_icon_png: "./res/ctl/life_icon.png",
		normal_screen: "./res/ctl/normal_screen.svg",
		pause: "./res/ctl/pause.svg",
		power_icon_inactive: "./res/ctl/power_icon_inactive.svg",
		power_icon: "./res/ctl/power_icon.svg",
		power_icon_inactive_png: "./res/ctl/power_icon_inactive.png",
		power_icon_png: "./res/ctl/power_icon.png",
		power1: "./res/ctl/power1.svg",
		power2: "./res/ctl/power2.svg",
		right: "./res/ctl/right.svg",
		shield_icon_inactive: "./res/ctl/shield_icon_inactive.svg",
		shield_icon: "./res/ctl/shield_icon.svg",
		shield_icon_inactive_png: "./res/ctl/shield_icon_inactive.png",
		shield_icon_png: "./res/ctl/shield_icon.png",
		start: "./res/ctl/start.svg",
		stopwatch_icon_inactive: "./res/ctl/stopwatch_icon_inactive.svg",
		stopwatch_icon: "./res/ctl/stopwatch_icon.svg",
		stopwatch_icon_inactive_png: "./res/ctl/stopwatch_icon_inactive.png",
		stopwatch_icon_png: "./res/ctl/stopwatch_icon.png",
		up: "./res/ctl/up.svg",
	},
	enemy: {
		enemy1: "./res/enemy/enemy1.png",
		enemy2: "./res/enemy/enemy2.png",
		enemy3: "./res/enemy/enemy3.png",
		enemy4: "./res/enemy/enemy4.png",
		enemy5: "./res/enemy/enemy5.png",
		enemy6: "./res/enemy/enemy6.png",
		enemy7: "./res/enemy/enemy7.png",
		enemy8: "./res/enemy/enemy8.png",
		enemy9: "./res/enemy/enemy9.png",
		enemy10: "./res/enemy/enemy10.png",
		enemy11: "./res/enemy/enemy11.png",
	},
	font: {
		Creepster_eot: "./res/font/Creepster.eot",
		Creepster_svg: "./res/font/Creepster.svg",
		Creepster_ttf: "./res/font/Creepster.ttf",
		Creepster_woff: "./res/font/Creepster.woff",
		Creepster_woff2: "./res/font/Creepster.woff2",
	},
	boom: "./res/boom.png",
	boom_wav: "./res/boom.wav",
	fire: "./res/fire.png",
	player: "./res/player.png",
	svg: {
		down: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg>`,
		full_screen: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
</svg>`,
		trophy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
</svg>`,
		info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>`,
		left: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>`,
		life: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9H1.475Z"/>
  <path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.88Z"/>
</svg>`,
		normal_screen: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
</svg>`,
		pause: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg>`,
		record: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
</svg>`,
		lightning: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
</svg>`,
		right: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>`,
		shield: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
</svg>`,
		start: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>`,
		stopwatch: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z"/>
</svg>`,
		up: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
</svg>`,
	},
};

//sound
const asset_sound_data: { [key: string]: HTMLAudioElement } = {};
const load_asset_sound = (url: string, callback: Function) => {
	const url_str = `url_${url.replace(/[\W_]+/g, "_")}`;
	if (url_str in asset_sound_data) {
		callback();
	} else {
		const sound = new Audio();

		sound.oncanplaythrough = (e) => {
			const elem = (e as Event).target as HTMLAudioElement;
			asset_sound_data[url_str] = elem;
			callback();
		};
		sound.src = url;
		// sound.load();

		// sound.oncanplay = (e) => {
		// 	const elem = (e as Event).target as HTMLAudioElement;
		// 	asset_sound_data[url_str] = elem;
		// 	callback();
		// };
		// sound.src = url;
	}
};
const do_load_sound = (
	sound_list: string[],
	index: number,
	onchange: Function,
	callback: Function
) => {
	if (index < sound_list.length) {
		load_asset_sound(sound_list[index]!, () => {
			onchange();
			do_load_sound(sound_list, index + 1, onchange, callback);
		});
	} else {
		callback();
	}
};
export const LOAD_ALL_SOUND_ASSET = (onchange: Function, callback: Function) => {
	do_load_sound([ASSET.boom_wav], 0, onchange, callback);
};

//image
const asset_img_data: { [key: string]: HTMLImageElement } = {};
const load_asset_img = (url: string, callback: Function) => {
	const url_str = `url_${url.replace(/[\W_]+/g, "_")}`;
	if (url_str in asset_img_data) {
		callback();
	} else {
		const img = new Image();
		img.onload = (e) => {
			const elem = (e as Event).target as HTMLImageElement;
			asset_img_data[url_str] = elem;
			callback();
		};
		img.src = url;
	}
};
const do_load_img = (img_list: string[], index: number, onchange: Function, callback: Function) => {
	if (index < img_list.length) {
		load_asset_img(img_list[index]!, () => {
			onchange();
			do_load_img(img_list, index + 1, onchange, callback);
		});
	} else {
		callback();
	}
};
export const LOAD_ALL_IMG_ASSET = (onchange: Function, callback: Function) => {
	do_load_img(
		[
			ASSET.bg1.layer1,
			ASSET.bg1.layer2,
			ASSET.bg1.layer3,
			ASSET.bg1.layer4,
			ASSET.bg1.layer5,
			ASSET.bg2.layer1,
			ASSET.bg2.layer2,
			ASSET.bg2.layer3,
			ASSET.bg2.layer4,
			ASSET.bg2.layer5,
			ASSET.ctl.icon_png,
			ASSET.ctl.life_icon_png,
			ASSET.ctl.power_icon_png,
			ASSET.ctl.shield_icon_png,
			ASSET.ctl.stopwatch_icon_png,
			ASSET.ctl.life_icon_inactive_png,
			ASSET.ctl.power_icon_inactive_png,
			ASSET.ctl.shield_icon_inactive_png,
			ASSET.ctl.stopwatch_icon_inactive_png,
			ASSET.enemy.enemy1,
			ASSET.enemy.enemy2,
			ASSET.enemy.enemy3,
			ASSET.enemy.enemy4,
			ASSET.enemy.enemy5,
			ASSET.enemy.enemy6,
			ASSET.enemy.enemy7,
			ASSET.enemy.enemy8,
			ASSET.enemy.enemy9,
			ASSET.enemy.enemy10,
			ASSET.enemy.enemy11,
			ASSET.boom,
			ASSET.fire,
			ASSET.player,
		],
		0,
		onchange,
		callback
	);
};

//svg
type svg_key = keyof typeof ASSET.svg;
const asset_svg_data: { [key: string]: HTMLImageElement } = {};
const load_asset_svg = (key: svg_key, color: string, callback: Function) => {
	const svg = ASSET.svg[key].replace(/fill\=\"currentColor\"/g, `fill="${color}"`);
	const data = `data:image/svg+xml,${encodeURIComponent(svg)}`;
	const data_str = data.replace(/[\W_]+/g, "_");

	if (data_str in asset_svg_data) {
		callback();
	} else {
		const img = new Image();
		img.onload = (e) => {
			const elem = (e as Event).target as HTMLImageElement;
			asset_svg_data[data_str] = elem;
			callback();
		};
		img.src = data;
	}
};
const do_load_svg = (
	svg_list: { key: svg_key; color: string }[],
	index: number,
	onchange: Function,
	callback: Function
) => {
	if (index < svg_list.length) {
		load_asset_svg(svg_list[index]!.key, svg_list[index]!.color, () => {
			onchange();
			do_load_svg(svg_list, index + 1, onchange, callback);
		});
	} else {
		callback();
	}
};

export const LOAD_ALL_SVG_ASSET = (onchange: Function, callback: Function) => {
	do_load_svg(
		[
			{ key: "right", color: BTN_COLOR.normal_icon },
			{ key: "down", color: BTN_COLOR.normal_icon },
			{ key: "left", color: BTN_COLOR.normal_icon },
			{ key: "up", color: BTN_COLOR.normal_icon },
			{ key: "full_screen", color: BTN_COLOR.normal_icon },
			{ key: "normal_screen", color: BTN_COLOR.normal_icon },
			{ key: "lightning", color: BTN_COLOR.normal_icon },
			{ key: "record", color: BTN_COLOR.normal_icon },
			{ key: "pause", color: BTN_COLOR.normal_icon },
			{ key: "start", color: BTN_COLOR.normal_icon },
			{ key: "right", color: BTN_COLOR.click_icon },
			{ key: "down", color: BTN_COLOR.click_icon },
			{ key: "left", color: BTN_COLOR.click_icon },
			{ key: "up", color: BTN_COLOR.click_icon },
			{ key: "full_screen", color: BTN_COLOR.click_icon },
			{ key: "normal_screen", color: BTN_COLOR.click_icon },
			{ key: "lightning", color: BTN_COLOR.click_icon },
			{ key: "record", color: BTN_COLOR.click_icon },
			{ key: "pause", color: BTN_COLOR.click_icon },
			{ key: "start", color: BTN_COLOR.click_icon },
			{ key: "life", color: `rgb(${COLOR.red})` },
			{ key: "lightning", color: `rgb(${COLOR.yellow})` },
			{ key: "stopwatch", color: `rgb(${COLOR.blue})` },
			{ key: "shield", color: `rgb(${COLOR.green})` },
			{ key: "life", color: `rgb(${COLOR.medium})` },
			{ key: "lightning", color: `rgb(${COLOR.medium})` },
			{ key: "stopwatch", color: `rgb(${COLOR.medium})` },
			{ key: "shield", color: `rgb(${COLOR.medium})` },
		],
		0,
		onchange,
		callback
	);
};

export const ASSETSVG = (key: svg_key, color: string) => {
	const svg = ASSET.svg[key].replace(/fill\=\"currentColor\"/g, `fill="${color}"`);
	const data = `data:image/svg+xml,${encodeURIComponent(svg)}`;
	const data_str = data.replace(/[\W_]+/g, "_");

	if (data_str in asset_svg_data) {
		return data;
	} else {
		console.warn("svg asset not loaded", svg);
		return data;
	}
};
