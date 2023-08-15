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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\n//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s\nconst db = {\n    idle: {\n        frame_y: 0,\n        sprite_length: 7,\n    },\n    jump: {\n        frame_y: 1,\n        sprite_length: 7,\n    },\n    fall: {\n        frame_y: 2,\n        sprite_length: 7,\n    },\n    run: {\n        frame_y: 3,\n        sprite_length: 9,\n    },\n    dizzy: {\n        frame_y: 4,\n        sprite_length: 11,\n    },\n    sit: {\n        frame_y: 5,\n        sprite_length: 5,\n    },\n    roll: {\n        frame_y: 6,\n        sprite_length: 7,\n    },\n    bite: {\n        frame_y: 7,\n        sprite_length: 7,\n    },\n    ko: {\n        frame_y: 8,\n        sprite_length: 12,\n    },\n    gethit: {\n        frame_y: 9,\n        sprite_length: 4,\n    },\n};\nconst getInfo = (action) => {\n    switch (action) {\n        case \"idle\":\n            return db.idle;\n        case \"jump\":\n            return db.jump;\n        case \"fall\":\n            return db.fall;\n        case \"run\":\n            return db.run;\n        case \"dizzy\":\n            return db.dizzy;\n        case \"sit\":\n            return db.sit;\n        case \"roll\":\n            return db.roll;\n        case \"bite\":\n            return db.bite;\n        case \"ko\":\n            return db.ko;\n        case \"gethit\":\n            return db.gethit;\n        default:\n            return db.idle;\n    }\n};\nfunction main(opt) {\n    const canvas = document.getElementById(\"canvas1\");\n    const ctx = canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (canvas.width = 600);\n    const CANVAS_HEIGHT = (canvas.height = 600);\n    const playerImage = new Image();\n    playerImage.src = \"./res/player.png\";\n    if (ctx) {\n        animate({\n            ctx,\n            img: playerImage,\n            frame_stagger: 5,\n            frame_y: opt.frame_y,\n            sprite_width: 575,\n            sprite_height: 523,\n            sprite_length: opt.sprite_length,\n            canvas_width: CANVAS_WIDTH,\n            canvas_height: CANVAS_HEIGHT,\n        });\n    }\n}\nfunction animate(opt) {\n    opt.game_frame ??= 0;\n    opt.frame_x ??= 0;\n    let position = Math.floor(opt.game_frame / opt.frame_stagger) % opt.sprite_length;\n    opt.frame_x = opt.sprite_width * position;\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    opt.ctx.drawImage(opt.img, opt.frame_x, opt.sprite_height * opt.frame_y, opt.sprite_width, opt.sprite_height, 0, 0, opt.canvas_width, opt.canvas_height);\n    opt.game_frame++;\n    requestAnimationFrame(() => {\n        animate(opt);\n    });\n}\n(function () {\n    const dropdown = document.getElementById(\"animation\");\n    dropdown.addEventListener(\"change\", (event) => {\n        const target = event.currentTarget;\n        const value = target.value;\n        main(getInfo(value));\n    });\n    main(getInfo(\"idle\"));\n})();\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;