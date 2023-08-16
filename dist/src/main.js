/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bg.ts":
/*!*******************!*\
  !*** ./src/bg.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bg: () => (/* binding */ bg),\n/* harmony export */   bgDB: () => (/* binding */ bgDB),\n/* harmony export */   update_game_speed: () => (/* binding */ update_game_speed)\n/* harmony export */ });\nlet bg_game_speed = 5;\nconst update_game_speed = (value) => {\n    bg_game_speed = value;\n};\nclass layer {\n    x;\n    y;\n    width;\n    height;\n    img;\n    game_speed;\n    speed_modifier;\n    constructor(img, width, height, speed_modifier) {\n        this.x = 0;\n        this.y = 0;\n        this.width = width;\n        this.height = height;\n        this.img = new Image();\n        this.img.src = img;\n        this.speed_modifier = speed_modifier;\n        this.game_speed = bg_game_speed * this.speed_modifier;\n    }\n    update(game_frame, game_speed) {\n        this.game_speed = game_speed * this.speed_modifier;\n        this.x = (game_frame * this.game_speed) % this.width;\n    }\n    draw(ctx) {\n        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);\n        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);\n    }\n}\nconst bgDB = [new layer(\"./res/layer-1.png\", 2400, 700, 0.2), new layer(\"./res/layer-2.png\", 2400, 700, 0.4), new layer(\"./res/layer-3.png\", 2400, 700, 0.6), new layer(\"./res/layer-4.png\", 2400, 700, 0.8), new layer(\"./res/layer-5.png\", 2400, 700, 1)];\nlet bgAnimatedId = \"\";\nconst bg = (opt) => {\n    bg_game_speed = bg_game_speed;\n    const ctx = opt.canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (opt.canvas.width = 800);\n    const CANVAS_HEIGHT = (opt.canvas.height = 700);\n    if (ctx) {\n        bgAnimatedId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animateBg({\n            animateId: bgAnimatedId,\n            ctx,\n            bg: opt.bg,\n            game_frame: 0,\n            canvas_width: CANVAS_WIDTH,\n            canvas_height: CANVAS_HEIGHT,\n        });\n    }\n};\nconst animateBg = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    opt.bg.forEach((i) => {\n        i.update(opt.game_frame, bg_game_speed);\n        i.draw(opt.ctx);\n    });\n    opt.game_frame--;\n    requestAnimationFrame(() => {\n        if (bgAnimatedId === opt.animateId) {\n            animateBg(opt);\n        }\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/bg.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bg.js */ \"./src/bg.ts\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.ts\");\n//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s\n\n\nconst playerCanvas = document.getElementById(\"playerCanvas\");\nconst cboPlayerAnimation = document.getElementById(\"playerAnimation\");\nconst playerAnimationChange = (event) => {\n    const target = event.currentTarget;\n    const value = target.value;\n    if (value) {\n        (0,_player_js__WEBPACK_IMPORTED_MODULE_1__.player)((0,_player_js__WEBPACK_IMPORTED_MODULE_1__.playerAct)(playerCanvas, value));\n    }\n};\nconst bgCanvas = document.getElementById(\"bgCanvas\");\nconst inputBgSpeed = document.getElementById(\"bgSpeed\");\nconst inputBgSpeedChange = (event) => {\n    const target = event.currentTarget;\n    const value = target.value;\n    if (value) {\n        (0,_bg_js__WEBPACK_IMPORTED_MODULE_0__.update_game_speed)(parseInt(value));\n    }\n};\n(function () {\n    cboPlayerAnimation.addEventListener(\"change\", playerAnimationChange);\n    cboPlayerAnimation.dispatchEvent(new Event(\"change\"));\n    (0,_bg_js__WEBPACK_IMPORTED_MODULE_0__.bg)({ canvas: bgCanvas, game_speed: 4, bg: _bg_js__WEBPACK_IMPORTED_MODULE_0__.bgDB });\n    inputBgSpeed.addEventListener(\"change\", inputBgSpeedChange);\n    inputBgSpeed.dispatchEvent(new Event(\"change\"));\n})();\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/index.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   player: () => (/* binding */ player),\n/* harmony export */   playerAct: () => (/* binding */ playerAct)\n/* harmony export */ });\nconst actionDB = {\n    idle: {\n        frame_y: 0,\n        sprite_length: 7,\n    },\n    jump: {\n        frame_y: 1,\n        sprite_length: 7,\n    },\n    fall: {\n        frame_y: 2,\n        sprite_length: 7,\n    },\n    run: {\n        frame_y: 3,\n        sprite_length: 9,\n    },\n    dizzy: {\n        frame_y: 4,\n        sprite_length: 11,\n    },\n    sit: {\n        frame_y: 5,\n        sprite_length: 5,\n    },\n    roll: {\n        frame_y: 6,\n        sprite_length: 7,\n    },\n    bite: {\n        frame_y: 7,\n        sprite_length: 7,\n    },\n    ko: {\n        frame_y: 8,\n        sprite_length: 12,\n    },\n    gethit: {\n        frame_y: 9,\n        sprite_length: 4,\n    },\n};\nconst playerAct = (canvas, action) => {\n    let item = actionDB[action];\n    const sprite_width = 575;\n    const sprite_height = 523;\n    const frame_y = sprite_height * item.frame_y;\n    const img = new Image();\n    img.src = \"./res/player.png\";\n    return {\n        canvas,\n        img,\n        sprite_width,\n        sprite_height,\n        location: Array(item.sprite_length)\n            .fill(\"\")\n            .map((_i, ix) => {\n            return {\n                y: frame_y,\n                x: ix * sprite_width,\n            };\n        }),\n    };\n};\nlet playerAnimatedId = \"\";\nconst player = (opt) => {\n    const ctx = opt.canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (opt.canvas.width = 500);\n    const CANVAS_HEIGHT = (opt.canvas.height = 500);\n    if (ctx) {\n        playerAnimatedId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animatePlayer({\n            animateId: playerAnimatedId,\n            ctx,\n            img: opt.img,\n            location: opt.location,\n            frame_stagger: 0.2,\n            game_frame: 0,\n            frame_x: 0,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            canvas_width: CANVAS_WIDTH,\n            canvas_height: CANVAS_HEIGHT,\n        });\n    }\n};\nconst animatePlayer = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    let position = Math.floor(opt.game_frame * opt.frame_stagger) % opt.location.length;\n    const frame_x = opt.location[position]?.x;\n    const frame_y = opt.location[position]?.y;\n    if (frame_x !== undefined && frame_y !== undefined) {\n        opt.ctx.drawImage(opt.img, frame_x, frame_y, opt.sprite_width, opt.sprite_height, 0, 0, opt.canvas_width, opt.canvas_height);\n        opt.game_frame++;\n        requestAnimationFrame(() => {\n            if (playerAnimatedId === opt.animateId) {\n                animatePlayer(opt);\n            }\n        });\n    }\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/player.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;