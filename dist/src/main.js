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

eval("\n(function () {\n    const canvas = document.getElementById(\"canvas1\");\n    const ctx = canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (canvas.width = 600);\n    const CANVAS_HEIGHT = (canvas.height = 600);\n    const sprite_width = 575;\n    const sprite_height = 523;\n    const sprite_length = 4;\n    let frame_x = 0;\n    let frame_y = 5;\n    let game_frame = 0;\n    let frame_stagger = 5;\n    const playerImage = new Image();\n    playerImage.src = \"./res/player.png\";\n    if (ctx) {\n        animate(ctx, playerImage, game_frame, frame_stagger, frame_x, frame_y, sprite_width, sprite_height, sprite_length, CANVAS_WIDTH, CANVAS_HEIGHT);\n    }\n})();\nfunction animate(ctx, img, game_frame, frame_stagger, frame_x, frame_y, sprite_width, sprite_height, sprite_length, canvas_width, canvas_height) {\n    ctx.clearRect(0, 0, canvas_width, canvas_height);\n    ctx.drawImage(img, sprite_width * frame_x, sprite_height * frame_y, sprite_width, sprite_height, 0, 0, canvas_width, canvas_height);\n    if (game_frame % frame_stagger === 0) {\n        if (frame_x < sprite_length)\n            frame_x++;\n        else\n            frame_x = 0;\n    }\n    game_frame++;\n    requestAnimationFrame(() => {\n        animate(ctx, img, game_frame, frame_stagger, frame_x, frame_y, sprite_width, sprite_height, sprite_length, canvas_width, canvas_height);\n    });\n}\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/index.ts?");

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