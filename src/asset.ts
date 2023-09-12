const DPI = window.devicePixelRatio;

export const COLOR = {
	red: "255,36,0",
	yellow: "255,215,0",
	green: "42, 170, 138",
	blue: "0, 150, 255",
	light: "255, 255, 255",
	medium: "125, 125, 125",
	dark: "50, 50, 50",
};

export const BTN_COLOR = {
	normal: `rgba(${COLOR.dark}, 0.5)`,
	normal_icon: `rgba(${COLOR.dark}, 1)`,
	click: `rgba(${COLOR.blue}, 0.5)`,
	click_icon: `rgba(${COLOR.blue}, 1)`,
};

export const BTN_SIZE = 35 * DPI;
export const BTN_PADDING = 20 * DPI;
export const BTN_MARGIN = 30;

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
export const ASSET_SIZE = {
	bg1: {
		layer1: 88900,
		layer2: 89900,
		layer3: 112000,
		layer4: 102000,
		layer5: 18000,
	},
	bg2: {
		layer1: 19300,
		layer2: 42300,
		layer3: 63200,
		layer4: 55500,
		layer5: 95800,
	},
	ctl: {
		action: 246,
		down: 286,
		full_screen: 519,
		icon: 604,
		icon_png: 984,
		info: 451,
		left: 288,
		life_icon_inactive: 538,
		life_icon: 538,
		life_icon_inactive_png: 5060,
		life_icon_png: 791,
		normal_screen: 518,
		pause: 243,
		power_icon_inactive: 277,
		power_icon: 277,
		power_icon_inactive_png: 4950,
		power_icon_png: 753,
		power1: 182,
		power2: 277,
		right: 288,
		shield_icon_inactive: 521,
		shield_icon: 521,
		shield_icon_inactive_png: 5350,
		shield_icon_png: 1040,
		stopwatch_icon_inactive: 453,
		stopwatch_icon: 453,
		stopwatch_icon_inactive_png: 5590,
		stopwatch_icon_png: 978,
		up: 288,
	},
	enemy: {
		enemy1: 65500,
		enemy2: 67600,
		enemy3: 35100,
		enemy4: 61200,
		enemy5: 35600,
		enemy6: 65600,
		enemy7: 54400,
		enemy8: 77600,
		enemy9: 17300,
		enemy10: 29200,
		enemy11: 13500,
	},
	font: {
		Creepster_eot: 61400,
		Creepster_svg: 250000,
		Creepster_ttf: 59900,
		Creepster_woff: 33900,
		Creepster_woff2: 29100,
	},
	boom: 72200,
	boom_wav: 318000,
	fire: 38200,
	player: 1760000,
	svg: {
		down: 286,
		full_screen: 519,
		trophy: 604,
		info: 452,
		left: 288,
		life: 539,
		normal_screen: 518,
		pause: 243,
		record: 182,
		lightning: 277,
		right: 288,
		shield: 521,
		start: 251,
		stopwatch: 453,
		up: 288,
	},
};
//font
const asset_font_data: { [key: string]: FontFace } = {};
const load_asset_font = (name: string, url: string, callback: Function) => {
	const url_str = `url_${url.replace(/[\W_]+/g, "_")}`;
	if (url_str in asset_font_data) {
		callback();
	} else {
		const font = new FontFace(name, `url(${url})`);
		font.load().then((loaded_font_face) => {
			asset_font_data[url_str] = loaded_font_face;
			document.fonts.add(loaded_font_face);
			callback();
		});
	}
};
const do_load_font = (
	font_list: { name: string; url: string; size: number }[],
	index: number,
	onchange: Function,
	callback: Function
) => {
	if (index < font_list.length) {
		onchange(0, font_list[index]!.name, font_list[index]!.size);
		load_asset_font(font_list[index]!.name, font_list[index]!.url, () => {
			onchange(font_list[index]!.size);
			do_load_font(font_list, index + 1, onchange, callback);
		});
	} else {
		callback();
	}
};
const load_all_font_asset = (onchange: Function, callback: Function) => {
	do_load_font(
		[
			{
				name: "Creepster",
				url: ASSET.font.Creepster_woff2,
				size: ASSET_SIZE.font.Creepster_woff2,
			},
		],
		0,
		onchange,
		callback
	);
};

//sound
const asset_sound_data: { [key: string]: HTMLAudioElement } = {};
const load_asset_sound = (url: string, callback: Function) => {
	const url_str = `url_${url.replace(/[\W_]+/g, "_")}`;
	if (url_str in asset_sound_data) {
		callback();
	} else {
		const sound = new Audio();

		// sound.oncanplay = (e) => {
		// 	const elem = (e as Event).target as HTMLAudioElement;
		// 	asset_sound_data[url_str] = elem;
		// 	callback();
		// };
		sound.src = url;

		asset_sound_data[url_str] = sound;
		callback();
	}
};
const do_load_sound = (
	sound_list: { name: string; url: string; size: number }[],
	index: number,
	onchange: Function,
	callback: Function
) => {
	if (index < sound_list.length) {
		onchange(0, sound_list[index]!.name, sound_list[index]!.size);
		load_asset_sound(sound_list[index]!.url, () => {
			onchange(sound_list[index]!.size);
			do_load_sound(sound_list, index + 1, onchange, callback);
		});
	} else {
		callback();
	}
};
const load_all_sound_asset = (onchange: Function, callback: Function) => {
	do_load_sound(
		[{ name: "ASSET.boom_wav", url: ASSET.boom_wav, size: ASSET_SIZE.boom_wav }],
		0,
		onchange,
		callback
	);
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
const do_load_img = (
	img_list: { name: string; url: string; size: number }[],
	index: number,
	onchange: Function,
	callback: Function
) => {
	if (index < img_list.length) {
		onchange(0, img_list[index]!.name, img_list[index]!.size);
		load_asset_img(img_list[index]!.url, () => {
			onchange(img_list[index]!.size);
			do_load_img(img_list, index + 1, onchange, callback);
		});
	} else {
		callback();
	}
};
const load_all_img_asset = (onchange: Function, callback: Function) => {
	do_load_img(
		[
			{ name: "ASSET.player", url: ASSET.player, size: ASSET_SIZE.player },
			{ name: "ASSET.boom", url: ASSET.boom, size: ASSET_SIZE.boom },
			{ name: "ASSET.fire", url: ASSET.fire, size: ASSET_SIZE.fire },
			{ name: "ASSET.bg1.layer1", url: ASSET.bg1.layer1, size: ASSET_SIZE.bg1.layer1 },
			{ name: "ASSET.bg1.layer2", url: ASSET.bg1.layer2, size: ASSET_SIZE.bg1.layer2 },
			{ name: "ASSET.bg1.layer3", url: ASSET.bg1.layer3, size: ASSET_SIZE.bg1.layer3 },
			{ name: "ASSET.bg1.layer4", url: ASSET.bg1.layer4, size: ASSET_SIZE.bg1.layer4 },
			{ name: "ASSET.bg1.layer5", url: ASSET.bg1.layer5, size: ASSET_SIZE.bg1.layer5 },
			{ name: "ASSET.bg2.layer1", url: ASSET.bg2.layer1, size: ASSET_SIZE.bg2.layer1 },
			{ name: "ASSET.bg2.layer2", url: ASSET.bg2.layer2, size: ASSET_SIZE.bg2.layer2 },
			{ name: "ASSET.bg2.layer3", url: ASSET.bg2.layer3, size: ASSET_SIZE.bg2.layer3 },
			{ name: "ASSET.bg2.layer4", url: ASSET.bg2.layer4, size: ASSET_SIZE.bg2.layer4 },
			{ name: "ASSET.bg2.layer5", url: ASSET.bg2.layer5, size: ASSET_SIZE.bg2.layer5 },
			{ name: "ASSET.ctl.icon_png", url: ASSET.ctl.icon_png, size: ASSET_SIZE.ctl.icon_png },
			{
				name: "ASSET.ctl.life_icon_png",
				url: ASSET.ctl.life_icon_png,
				size: ASSET_SIZE.ctl.life_icon_png,
			},
			{
				name: "ASSET.ctl.power_icon_png",
				url: ASSET.ctl.power_icon_png,
				size: ASSET_SIZE.ctl.power_icon_png,
			},
			{
				name: "ASSET.ctl.shield_icon_png",
				url: ASSET.ctl.shield_icon_png,
				size: ASSET_SIZE.ctl.shield_icon_png,
			},
			{
				name: "ASSET.ctl.stopwatch_icon_png",
				url: ASSET.ctl.stopwatch_icon_png,
				size: ASSET_SIZE.ctl.stopwatch_icon_png,
			},
			{
				name: "ASSET.ctl.life_icon_inactive_png",
				url: ASSET.ctl.life_icon_inactive_png,
				size: ASSET_SIZE.ctl.life_icon_inactive_png,
			},
			{
				name: "ASSET.ctl.power_icon_inactive_png",
				url: ASSET.ctl.power_icon_inactive_png,
				size: ASSET_SIZE.ctl.power_icon_inactive_png,
			},
			{
				name: "ASSET.ctl.shield_icon_inactive_png",
				url: ASSET.ctl.shield_icon_inactive_png,
				size: ASSET_SIZE.ctl.shield_icon_inactive_png,
			},
			{
				name: "ASSET.ctl.stopwatch_icon_inactive_png",
				url: ASSET.ctl.stopwatch_icon_inactive_png,
				size: ASSET_SIZE.ctl.stopwatch_icon_inactive_png,
			},
			{ name: "ASSET.enemy.enemy1", url: ASSET.enemy.enemy1, size: ASSET_SIZE.enemy.enemy1 },
			{ name: "ASSET.enemy.enemy2", url: ASSET.enemy.enemy2, size: ASSET_SIZE.enemy.enemy2 },
			{ name: "ASSET.enemy.enemy3", url: ASSET.enemy.enemy3, size: ASSET_SIZE.enemy.enemy3 },
			{ name: "ASSET.enemy.enemy4", url: ASSET.enemy.enemy4, size: ASSET_SIZE.enemy.enemy4 },
			{ name: "ASSET.enemy.enemy5", url: ASSET.enemy.enemy5, size: ASSET_SIZE.enemy.enemy5 },
			{ name: "ASSET.enemy.enemy6", url: ASSET.enemy.enemy6, size: ASSET_SIZE.enemy.enemy6 },
			{ name: "ASSET.enemy.enemy7", url: ASSET.enemy.enemy7, size: ASSET_SIZE.enemy.enemy7 },
			{ name: "ASSET.enemy.enemy8", url: ASSET.enemy.enemy8, size: ASSET_SIZE.enemy.enemy8 },
			{ name: "ASSET.enemy.enemy9", url: ASSET.enemy.enemy9, size: ASSET_SIZE.enemy.enemy9 },
			{
				name: "ASSET.enemy.enemy10",
				url: ASSET.enemy.enemy10,
				size: ASSET_SIZE.enemy.enemy10,
			},
			{
				name: "ASSET.enemy.enemy11",
				url: ASSET.enemy.enemy11,
				size: ASSET_SIZE.enemy.enemy11,
			},
		],
		0,
		onchange,
		callback
	);
};

//svg

const asset_svg_data: { [key: string]: HTMLImageElement } = {};
const load_asset_svg = (url: string, color: string, callback: Function) => {
	const svg = url.replace(/fill\=\"currentColor\"/g, `fill="${color}"`);
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
	svg_list: { name: string; url: string; size: number; color: string }[],
	index: number,
	onchange: Function,
	callback: Function
) => {
	if (index < svg_list.length) {
		onchange(0, svg_list[index]!.name, svg_list[index]!.size);
		load_asset_svg(svg_list[index]!.url, svg_list[index]!.color, () => {
			onchange(svg_list[index]!.size);
			do_load_svg(svg_list, index + 1, onchange, callback);
		});
	} else {
		callback();
	}
};

const load_all_svg_asset = (onchange: Function, callback: Function) => {
	do_load_svg(
		[
			{
				name: "ASSET.svg.right (normal)",
				url: ASSET.svg.right,
				size: ASSET_SIZE.svg.right,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.down (normal)",
				url: ASSET.svg.down,
				size: ASSET_SIZE.svg.down,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.left (normal)",
				url: ASSET.svg.left,
				size: ASSET_SIZE.svg.left,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.up (normal)",
				url: ASSET.svg.up,
				size: ASSET_SIZE.svg.up,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.full_screen (normal)",
				url: ASSET.svg.full_screen,
				size: ASSET_SIZE.svg.full_screen,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.normal_screen (normal)",
				url: ASSET.svg.normal_screen,
				size: ASSET_SIZE.svg.normal_screen,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.lightning (normal)",
				url: ASSET.svg.lightning,
				size: ASSET_SIZE.svg.lightning,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.record (normal)",
				url: ASSET.svg.record,
				size: ASSET_SIZE.svg.record,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.pause (normal)",
				url: ASSET.svg.pause,
				size: ASSET_SIZE.svg.pause,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.start (normal)",
				url: ASSET.svg.start,
				size: ASSET_SIZE.svg.start,
				color: BTN_COLOR.normal_icon,
			},
			{
				name: "ASSET.svg.right (click)",
				url: ASSET.svg.right,
				size: ASSET_SIZE.svg.right,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.down (click)",
				url: ASSET.svg.down,
				size: ASSET_SIZE.svg.down,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.left (click)",
				url: ASSET.svg.left,
				size: ASSET_SIZE.svg.left,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.up (click)",
				url: ASSET.svg.up,
				size: ASSET_SIZE.svg.up,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.full_screen (click)",
				url: ASSET.svg.full_screen,
				size: ASSET_SIZE.svg.full_screen,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.normal_screen (click)",
				url: ASSET.svg.normal_screen,
				size: ASSET_SIZE.svg.normal_screen,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.lightning (click)",
				url: ASSET.svg.lightning,
				size: ASSET_SIZE.svg.lightning,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.record (click)",
				url: ASSET.svg.record,
				size: ASSET_SIZE.svg.record,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.pause (click)",
				url: ASSET.svg.pause,
				size: ASSET_SIZE.svg.pause,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.start (click)",
				url: ASSET.svg.start,
				size: ASSET_SIZE.svg.start,
				color: BTN_COLOR.click_icon,
			},
			{
				name: "ASSET.svg.life (color)",
				url: ASSET.svg.life,
				size: ASSET_SIZE.svg.life,
				color: `rgb(${COLOR.red})`,
			},
			{
				name: "ASSET.svg.lightning (color)",
				url: ASSET.svg.lightning,
				size: ASSET_SIZE.svg.lightning,
				color: `rgb(${COLOR.yellow})`,
			},
			{
				name: "ASSET.svg.stopwatch (color)",
				url: ASSET.svg.stopwatch,
				size: ASSET_SIZE.svg.stopwatch,
				color: `rgb(${COLOR.blue})`,
			},
			{
				name: "ASSET.svg.shield (color)",
				url: ASSET.svg.shield,
				size: ASSET_SIZE.svg.shield,
				color: `rgb(${COLOR.green})`,
			},
			{
				name: "ASSET.svg.life (medium)",
				url: ASSET.svg.life,
				size: ASSET_SIZE.svg.life,
				color: `rgb(${COLOR.medium})`,
			},
			{
				name: "ASSET.svg.lightning (medium)",
				url: ASSET.svg.lightning,
				size: ASSET_SIZE.svg.lightning,
				color: `rgb(${COLOR.medium})`,
			},
			{
				name: "ASSET.svg.stopwatch (medium)",
				url: ASSET.svg.stopwatch,
				size: ASSET_SIZE.svg.stopwatch,
				color: `rgb(${COLOR.medium})`,
			},
			{
				name: "ASSET.svg.shield (medium)",
				url: ASSET.svg.shield,
				size: ASSET_SIZE.svg.shield,
				color: `rgb(${COLOR.medium})`,
			},
		],
		0,
		onchange,
		callback
	);
};

type svg_key = keyof typeof ASSET.svg;
export const ASSETSVG = (key: svg_key, color: string) => {
	const svg = ASSET.svg[key].replace(/fill\=\"currentColor\"/g, `fill="${color}"`);
	const data = `data:image/svg+xml,${encodeURIComponent(svg)}`;
	const data_str = data.replace(/[\W_]+/g, "_");

	if (data_str in asset_svg_data) {
		const result = asset_svg_data[data_str];
		if (result) {
			return result;
		} else {
			console.warn("svg asset not loaded", svg);
			const result = new Image();
			result.src = data;
			asset_svg_data[data_str] = result;
			return result;
		}
	} else {
		console.warn("svg asset not loaded", svg);
		const result = new Image();
		result.src = data;
		asset_svg_data[data_str] = result;
		return result;
	}
};

export const ASSETIMG = (url: string) => {
	const url_str = `url_${url.replace(/[\W_]+/g, "_")}`;

	if (url_str in asset_img_data) {
		const result = asset_img_data[url_str];
		if (result) {
			return result;
		} else {
			console.warn("img asset not loaded", url);
			const result = new Image();
			result.src = url;
			asset_img_data[url_str] = result;
			return result;
		}
	} else {
		console.warn("img asset not loaded", url);
		const result = new Image();
		result.src = url;
		asset_img_data[url_str] = result;
		return result;
	}
};

export const ASSETSOUND = (url: string) => {
	const url_str = `url_${url.replace(/[\W_]+/g, "_")}`;

	if (url_str in asset_sound_data) {
		const result = asset_sound_data[url_str];
		if (result) {
			return result;
		} else {
			console.warn("sound asset not loaded", url);
			const result = new Audio();
			result.src = url;
			asset_sound_data[url_str] = result;
			return result;
		}
	} else {
		console.warn("sound asset not loaded", url);
		const result = new Audio();
		result.src = url;
		asset_sound_data[url_str] = result;
		return result;
	}
};

export const LOAD_ALL_ASSET = (onchange: Function, callback: Function) => {
	load_all_font_asset(onchange, () => {
		load_all_img_asset(onchange, () => {
			load_all_sound_asset(onchange, () => {
				load_all_svg_asset(onchange, () => {
					callback();
				});
			});
		});
	});
};
