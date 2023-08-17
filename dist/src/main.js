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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bg: () => (/* binding */ bg),\n/* harmony export */   bgDB: () => (/* binding */ bgDB),\n/* harmony export */   update_game_speed: () => (/* binding */ update_game_speed)\n/* harmony export */ });\nlet BG_GAME_SPEED = 5;\nconst update_game_speed = (value) => {\n    BG_GAME_SPEED = value;\n};\nclass layer {\n    img;\n    x;\n    y;\n    width;\n    height;\n    game_speed;\n    speed_modifier;\n    constructor(opt) {\n        this.img = opt.img;\n        this.x = 0;\n        this.y = 0;\n        this.width = opt.width;\n        this.height = opt.height;\n        this.speed_modifier = opt.speed_modifier;\n        this.game_speed = BG_GAME_SPEED * this.speed_modifier;\n    }\n    update(game_frame, game_speed) {\n        this.game_speed = game_speed * this.speed_modifier;\n        this.x = (game_frame * this.game_speed) % this.width;\n    }\n    draw(ctx) {\n        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);\n        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);\n    }\n}\nconst img_width = 2400;\nconst img_height = 700;\nconst img = (src) => {\n    const result = new Image();\n    result.src = src;\n    return result;\n};\nconst bgDB = [\n    new layer({ img: img(\"./res/layer-1.png\"), width: img_width, height: img_height, speed_modifier: 0.2 }),\n    new layer({ img: img(\"./res/layer-2.png\"), width: img_width, height: img_height, speed_modifier: 0.4 }),\n    new layer({ img: img(\"./res/layer-3.png\"), width: img_width, height: img_height, speed_modifier: 0.6 }),\n    new layer({ img: img(\"./res/layer-4.png\"), width: img_width, height: img_height, speed_modifier: 0.8 }),\n    new layer({ img: img(\"./res/layer-5.png\"), width: img_width, height: img_height, speed_modifier: 1 }),\n];\nlet bgAnimatedId = \"\";\nconst bg = (opt) => {\n    BG_GAME_SPEED = BG_GAME_SPEED;\n    const ctx = opt.canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (opt.canvas.width = 800);\n    const CANVAS_HEIGHT = (opt.canvas.height = 700);\n    if (ctx) {\n        bgAnimatedId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animateBg({\n            animateId: bgAnimatedId,\n            ctx,\n            bg: opt.bg,\n            game_frame: 0,\n            canvas_width: CANVAS_WIDTH,\n            canvas_height: CANVAS_HEIGHT,\n        });\n    }\n};\nconst animateBg = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    opt.bg.forEach((i) => {\n        i.update(opt.game_frame, BG_GAME_SPEED);\n        i.draw(opt.ctx);\n    });\n    opt.game_frame--;\n    requestAnimationFrame(() => {\n        if (bgAnimatedId === opt.animateId) {\n            animateBg(opt);\n        }\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/bg.ts?");

/***/ }),

/***/ "./src/enemy.ts":
/*!**********************!*\
  !*** ./src/enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enemy: () => (/* binding */ enemy),\n/* harmony export */   enemyType: () => (/* binding */ enemyType)\n/* harmony export */ });\n/* harmony import */ var _enemy_enemy1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy/enemy1.js */ \"./src/enemy/enemy1.ts\");\n/* harmony import */ var _enemy_enemy2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy/enemy2.js */ \"./src/enemy/enemy2.ts\");\n/* harmony import */ var _enemy_enemy3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemy/enemy3.js */ \"./src/enemy/enemy3.ts\");\n/* harmony import */ var _enemy_enemy4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy/enemy4.js */ \"./src/enemy/enemy4.ts\");\n/* harmony import */ var _enemy_enemy5_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enemy/enemy5.js */ \"./src/enemy/enemy5.ts\");\n/* harmony import */ var _enemy_enemy6_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enemy/enemy6.js */ \"./src/enemy/enemy6.ts\");\n/* harmony import */ var _enemy_enemy7_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enemy/enemy7.js */ \"./src/enemy/enemy7.ts\");\n/* harmony import */ var _enemy_enemy8_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enemy/enemy8.js */ \"./src/enemy/enemy8.ts\");\n\n\n\n\n\n\n\n\nconst enemyDB = {\n    enemy1: _enemy_enemy1_js__WEBPACK_IMPORTED_MODULE_0__.createEnemy1,\n    enemy2: _enemy_enemy2_js__WEBPACK_IMPORTED_MODULE_1__.createEnemy2,\n    enemy3: _enemy_enemy3_js__WEBPACK_IMPORTED_MODULE_2__.createEnemy3,\n    enemy4: _enemy_enemy4_js__WEBPACK_IMPORTED_MODULE_3__.createEnemy4,\n    enemy5: _enemy_enemy5_js__WEBPACK_IMPORTED_MODULE_4__.createEnemy5,\n    enemy6: _enemy_enemy6_js__WEBPACK_IMPORTED_MODULE_5__.createEnemy6,\n    enemy7: _enemy_enemy7_js__WEBPACK_IMPORTED_MODULE_6__.createEnemy7,\n    enemy8: _enemy_enemy8_js__WEBPACK_IMPORTED_MODULE_7__.createEnemy8,\n};\nconst enemyType = (canvas, canvas_width, canvas_height, action) => {\n    let actionFn = enemyDB[action];\n    return {\n        canvas,\n        canvas_width,\n        canvas_height,\n        enemy: actionFn({\n            canvas_width,\n            canvas_height,\n        }),\n    };\n};\nlet enemAnimationId = \"\";\nconst enemy = (opt) => {\n    const ctx = opt.canvas.getContext(\"2d\");\n    if (ctx) {\n        enemAnimationId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animateEnemy({\n            animateId: enemAnimationId,\n            ctx,\n            enemy: opt.enemy,\n            game_frame: 0,\n            canvas_width: opt.canvas_width,\n            canvas_height: opt.canvas_height,\n        });\n    }\n};\nconst animateEnemy = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    opt.enemy.update(opt.game_frame);\n    opt.enemy.draw(opt.ctx);\n    opt.game_frame++;\n    requestAnimationFrame(() => {\n        if (enemAnimationId === opt.animateId) {\n            animateEnemy(opt);\n        }\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy.ts?");

/***/ }),

/***/ "./src/enemy/base.ts":
/*!***************************!*\
  !*** ./src/enemy/base.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   baseEnemy: () => (/* binding */ baseEnemy)\n/* harmony export */ });\nclass baseEnemy {\n    frame;\n    img;\n    x;\n    y;\n    width;\n    height;\n    sprite_width;\n    sprite_height;\n    sprite_length;\n    game_speed;\n    animation_speed;\n    constructor(opt) {\n        this.frame = 0;\n        this.img = opt.img;\n        this.x = opt.x;\n        this.y = opt.y;\n        this.width = opt.width;\n        this.height = opt.height;\n        this.sprite_length = opt.sprite_length;\n        this.sprite_width = opt.sprite_width;\n        this.sprite_height = opt.sprite_height;\n        this.game_speed = opt.game_speed;\n        this.animation_speed = opt.animation_speed;\n    }\n    update(game_frame) {\n        if (game_frame % this.animation_speed === 0) {\n            this.frame >= this.sprite_length ? (this.frame = 0) : this.frame++;\n        }\n    }\n    draw(ctx) {\n        ctx.drawImage(this.img, this.frame * this.sprite_width, 0, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);\n    }\n}\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/base.ts?");

/***/ }),

/***/ "./src/enemy/enemy1.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy1.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy1: () => (/* binding */ createEnemy1)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy1 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    constructor(opt) {\n        super(opt);\n    }\n    update(game_frame) {\n        this.x += Math.random() * 7 - 3.5;\n        this.y += Math.random() * 7 - 3.5;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy1 = new Image();\nimgEnemy1.src = \"./res/enemy1.png\";\nconst createEnemy1 = (opt) => {\n    const sprite_length = 5;\n    const sprite_width = 293;\n    const sprite_height = 155;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy1({\n        img: imgEnemy1,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 - 2,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy1.ts?");

/***/ }),

/***/ "./src/enemy/enemy2.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy2.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy2: () => (/* binding */ createEnemy2)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy2 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    canvas_width;\n    canvas_height;\n    angle;\n    angle_speed;\n    curve;\n    constructor(opt) {\n        super(opt);\n        this.canvas_width = opt.canvas_width;\n        this.canvas_height = opt.canvas_height;\n        this.angle = opt.angle;\n        this.angle_speed = opt.angle_speed;\n        this.curve = opt.curve;\n    }\n    update(game_frame) {\n        this.x -= this.game_speed;\n        if (this.x + this.width < 0)\n            this.x = this.canvas_width;\n        this.y += this.curve * Math.sin(this.angle);\n        this.angle += this.angle_speed;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy2 = new Image();\nimgEnemy2.src = \"./res/enemy2.png\";\nconst createEnemy2 = (opt) => {\n    const sprite_length = 5;\n    const sprite_width = 266;\n    const sprite_height = 188;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy2({\n        img: imgEnemy2,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        canvas_width: opt.canvas_width,\n        canvas_height: opt.canvas_height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 + 1,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n        angle: Math.random() * 2,\n        angle_speed: Math.random() * 0.2,\n        curve: Math.random() * 5,\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy2.ts?");

/***/ }),

/***/ "./src/enemy/enemy3.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy3.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy3: () => (/* binding */ createEnemy3)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy3 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    canvas_width;\n    canvas_height;\n    angle;\n    angle_speed;\n    constructor(opt) {\n        super(opt);\n        this.canvas_width = opt.canvas_width;\n        this.canvas_height = opt.canvas_height;\n        this.angle = opt.angle;\n        this.angle_speed = opt.angle_speed;\n    }\n    update(game_frame) {\n        this.x = (this.canvas_width / 2) * Math.cos((this.angle * Math.PI) / 90) + (this.canvas_width / 2 - this.width / 2);\n        if (this.x + this.width < 0)\n            this.x = this.canvas_width;\n        this.y = (this.canvas_height / 2) * Math.sin((this.angle * Math.PI) / 270) + (this.canvas_height / 2 - this.height / 2);\n        if (this.y + this.height < 0)\n            this.y = this.canvas_height;\n        this.angle += this.angle_speed;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy3 = new Image();\nimgEnemy3.src = \"./res/enemy3.png\";\nconst createEnemy3 = (opt) => {\n    const sprite_length = 5;\n    const sprite_width = 218;\n    const sprite_height = 177;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy3({\n        img: imgEnemy3,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        canvas_width: opt.canvas_width,\n        canvas_height: opt.canvas_height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 + 1,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n        angle: Math.random() * 2,\n        angle_speed: Math.random() * 0.5 + 0.5,\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy3.ts?");

/***/ }),

/***/ "./src/enemy/enemy4.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy4.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy4: () => (/* binding */ createEnemy4)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy4 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    canvas_width;\n    canvas_height;\n    newX;\n    newY;\n    interval;\n    constructor(opt) {\n        super(opt);\n        this.canvas_width = opt.canvas_width;\n        this.canvas_height = opt.canvas_height;\n        this.newX = opt.newX;\n        this.newY = opt.newY;\n        this.interval = opt.interval;\n    }\n    update(game_frame) {\n        if (game_frame % this.interval === 0) {\n            this.newX = Math.random() * (this.canvas_width - this.width);\n            this.newY = Math.random() * (this.canvas_height - this.height);\n        }\n        let dx = this.x - this.newX;\n        let dy = this.y - this.newY;\n        this.x -= dx / 20;\n        this.y -= dy / 20;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy4 = new Image();\nimgEnemy4.src = \"./res/enemy4.png\";\nconst createEnemy4 = (opt) => {\n    const sprite_length = 8;\n    const sprite_width = 213;\n    const sprite_height = 213;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy4({\n        img: imgEnemy4,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        canvas_width: opt.canvas_width,\n        canvas_height: opt.canvas_height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 + 1,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n        newX: Math.random() * (opt.canvas_width - width),\n        newY: Math.random() * (opt.canvas_height - height),\n        interval: Math.floor(Math.random() * 200 + 50),\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy4.ts?");

/***/ }),

/***/ "./src/enemy/enemy5.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy5.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy5: () => (/* binding */ createEnemy5)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy5 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    constructor(opt) {\n        super(opt);\n    }\n    update(game_frame) {\n        this.x += Math.random() * 7 - 3.5;\n        this.y += Math.random() * 7 - 3.5;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy5 = new Image();\nimgEnemy5.src = \"./res/enemy5.png\";\nconst createEnemy5 = (opt) => {\n    const sprite_length = 5;\n    const sprite_width = 271;\n    const sprite_height = 194;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy5({\n        img: imgEnemy5,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 - 2,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy5.ts?");

/***/ }),

/***/ "./src/enemy/enemy6.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy6.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy6: () => (/* binding */ createEnemy6)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy6 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    constructor(opt) {\n        super(opt);\n    }\n    update(game_frame) {\n        this.x += Math.random() * 7 - 3.5;\n        this.y += Math.random() * 7 - 3.5;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy6 = new Image();\nimgEnemy6.src = \"./res/enemy6.png\";\nconst createEnemy6 = (opt) => {\n    const sprite_length = 5;\n    const sprite_width = 261;\n    const sprite_height = 209;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy6({\n        img: imgEnemy6,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 - 2,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy6.ts?");

/***/ }),

/***/ "./src/enemy/enemy7.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy7.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy7: () => (/* binding */ createEnemy7)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy7 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    constructor(opt) {\n        super(opt);\n    }\n    update(game_frame) {\n        this.x += Math.random() * 7 - 3.5;\n        this.y += Math.random() * 7 - 3.5;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy7 = new Image();\nimgEnemy7.src = \"./res/enemy7.png\";\nconst createEnemy7 = (opt) => {\n    const sprite_length = 5;\n    const sprite_width = 229;\n    const sprite_height = 171;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy7({\n        img: imgEnemy7,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 - 2,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy7.ts?");

/***/ }),

/***/ "./src/enemy/enemy8.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy8.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnemy8: () => (/* binding */ createEnemy8)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy8 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    constructor(opt) {\n        super(opt);\n    }\n    update(game_frame) {\n        this.x += Math.random() * 7 - 3.5;\n        this.y += Math.random() * 7 - 3.5;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst imgEnemy8 = new Image();\nimgEnemy8.src = \"./res/enemy8.png\";\nconst createEnemy8 = (opt) => {\n    const sprite_length = 5;\n    const sprite_width = 310;\n    const sprite_height = 175;\n    const width = sprite_width / 2.5;\n    const height = sprite_height / 2.5;\n    return new enemy8({\n        img: imgEnemy8,\n        x: Math.random() * (opt.canvas_width - width),\n        y: Math.random() * (opt.canvas_height - height),\n        width,\n        height,\n        sprite_width,\n        sprite_height,\n        sprite_length,\n        game_speed: Math.random() * 4 - 2,\n        animation_speed: Math.floor(Math.random() * 3 + 1),\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy8.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bg.js */ \"./src/bg.ts\");\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy.js */ \"./src/enemy.ts\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ \"./src/player.ts\");\n/* harmony import */ var _trigger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trigger.js */ \"./src/trigger.ts\");\n//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s\n\n\n\n\n//player\nconst playerCanvas = document.getElementById(\"playerCanvas\");\nconst cboPlayerAnimation = document.getElementById(\"playerAnimation\");\nconst playerAnimationChange = (event) => {\n    const target = event.currentTarget;\n    const value = target.value;\n    if (value) {\n        (0,_player_js__WEBPACK_IMPORTED_MODULE_2__.player)((0,_player_js__WEBPACK_IMPORTED_MODULE_2__.playerAct)(playerCanvas, value));\n    }\n};\n//bg\nconst bgCanvas = document.getElementById(\"bgCanvas\");\nconst inputBgSpeed = document.getElementById(\"bgSpeed\");\nconst bgSpeedValue = document.getElementById(\"bgSpeedValue\");\nconst inputBgSpeedChange = (event) => {\n    const target = event.currentTarget;\n    const value = target.value;\n    if (value) {\n        bgSpeedValue.innerText = `[${value}]`;\n        (0,_bg_js__WEBPACK_IMPORTED_MODULE_0__.update_game_speed)(parseInt(value));\n    }\n};\n//enemy\nconst enemyCanvas = document.getElementById(\"enemyCanvas\");\nconst cboEnemyType = document.getElementById(\"enemyType\");\nconst enemyTypeChange = () => {\n    const enemy_type = cboEnemyType.value;\n    if (enemy_type) {\n        (0,_enemy_js__WEBPACK_IMPORTED_MODULE_1__.enemy)((0,_enemy_js__WEBPACK_IMPORTED_MODULE_1__.enemyType)(enemyCanvas, 400, 750, enemy_type));\n    }\n};\n//trigger\nconst triggerCanvas = document.getElementById(\"triggerCanvas\");\n//start\n(function () {\n    //trigger\n    triggerCanvas.width = 500;\n    triggerCanvas.height = 700;\n    (0,_trigger_js__WEBPACK_IMPORTED_MODULE_3__.trigger)({ canvas: triggerCanvas });\n    //enemy\n    enemyCanvas.width = 400;\n    enemyCanvas.height = 750;\n    cboEnemyType.addEventListener(\"change\", enemyTypeChange);\n    cboEnemyType.dispatchEvent(new Event(\"change\"));\n    //bg\n    (0,_bg_js__WEBPACK_IMPORTED_MODULE_0__.bg)({ canvas: bgCanvas, game_speed: 4, bg: _bg_js__WEBPACK_IMPORTED_MODULE_0__.bgDB });\n    inputBgSpeed.addEventListener(\"change\", inputBgSpeedChange);\n    inputBgSpeed.dispatchEvent(new Event(\"change\"));\n    //player\n    cboPlayerAnimation.addEventListener(\"change\", playerAnimationChange);\n    cboPlayerAnimation.dispatchEvent(new Event(\"change\"));\n})();\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/index.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   player: () => (/* binding */ player),\n/* harmony export */   playerAct: () => (/* binding */ playerAct)\n/* harmony export */ });\nconst actionDB = {\n    idle: {\n        frame_y: 0,\n        sprite_length: 7,\n    },\n    jump: {\n        frame_y: 1,\n        sprite_length: 7,\n    },\n    fall: {\n        frame_y: 2,\n        sprite_length: 7,\n    },\n    run: {\n        frame_y: 3,\n        sprite_length: 8,\n    },\n    dizzy: {\n        frame_y: 4,\n        sprite_length: 11,\n    },\n    sit: {\n        frame_y: 5,\n        sprite_length: 5,\n    },\n    roll: {\n        frame_y: 6,\n        sprite_length: 7,\n    },\n    bite: {\n        frame_y: 7,\n        sprite_length: 7,\n    },\n    ko: {\n        frame_y: 8,\n        sprite_length: 12,\n    },\n    gethit: {\n        frame_y: 9,\n        sprite_length: 4,\n    },\n};\nconst playerAct = (canvas, action) => {\n    let item = actionDB[action];\n    const sprite_width = 575;\n    const sprite_height = 523;\n    const frame_y = sprite_height * item.frame_y;\n    const img = new Image();\n    img.src = \"./res/player.png\";\n    return {\n        canvas,\n        img,\n        sprite_width,\n        sprite_height,\n        location: Array(item.sprite_length)\n            .fill(\"\")\n            .map((_i, ix) => {\n            return {\n                y: frame_y,\n                x: ix * sprite_width,\n            };\n        }),\n    };\n};\nlet playerAnimatedId = \"\";\nconst player = (opt) => {\n    const ctx = opt.canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (opt.canvas.width = 500);\n    const CANVAS_HEIGHT = (opt.canvas.height = 500);\n    if (ctx) {\n        playerAnimatedId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animatePlayer({\n            animateId: playerAnimatedId,\n            ctx,\n            img: opt.img,\n            location: opt.location,\n            frame_stagger: 0.2,\n            game_frame: 0,\n            frame_x: 0,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            canvas_width: CANVAS_WIDTH,\n            canvas_height: CANVAS_HEIGHT,\n        });\n    }\n};\nconst animatePlayer = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    let position = Math.floor(opt.game_frame * opt.frame_stagger) % opt.location.length;\n    const frame_x = opt.location[position]?.x;\n    const frame_y = opt.location[position]?.y;\n    if (frame_x !== undefined && frame_y !== undefined) {\n        opt.ctx.drawImage(opt.img, frame_x, frame_y, opt.sprite_width, opt.sprite_height, 0, 0, opt.canvas_width, opt.canvas_height);\n        opt.game_frame++;\n        requestAnimationFrame(() => {\n            if (playerAnimatedId === opt.animateId) {\n                animatePlayer(opt);\n            }\n        });\n    }\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/player.ts?");

/***/ }),

/***/ "./src/trigger.ts":
/*!************************!*\
  !*** ./src/trigger.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   trigger: () => (/* binding */ trigger)\n/* harmony export */ });\nconst imgExplosion = new Image();\nimgExplosion.src = \"./res/boom.png\";\nconst soundExplosion = new Audio();\nsoundExplosion.src = \"./res/boom.wav\";\nclass explosion {\n    frame;\n    timer;\n    mark_delete;\n    sound_play;\n    img;\n    sound;\n    x;\n    y;\n    width;\n    height;\n    sprite_width;\n    sprite_height;\n    sprite_length;\n    angle;\n    constructor(opt) {\n        this.frame = 0;\n        this.timer = 0;\n        this.mark_delete = false;\n        this.sound_play = false;\n        this.img = opt.img;\n        this.sound = opt.sound;\n        this.sprite_width = opt.sprite_width;\n        this.sprite_height = opt.sprite_height;\n        this.sprite_length = opt.sprite_length;\n        this.width = this.sprite_width * 0.5;\n        this.height = this.sprite_height * 0.5;\n        this.x = opt.x;\n        this.y = opt.y;\n        this.angle = opt.angle;\n    }\n    update() {\n        if (!this.sound_play) {\n            this.sound_play = true;\n            this.sound.play();\n        }\n        this.timer++;\n        if (this.timer % 5 === 0) {\n            this.frame++;\n            this.timer = 0;\n        }\n        if (this.frame > this.sprite_length) {\n            this.mark_delete = true;\n        }\n    }\n    draw(ctx) {\n        ctx.save();\n        ctx.translate(this.x, this.y);\n        ctx.rotate(this.angle);\n        ctx.drawImage(this.img, this.sprite_width * this.frame, 0, this.sprite_width, this.sprite_width, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height);\n        ctx.restore();\n    }\n}\nconst explosions = [];\nconst createExplosion = (x, y) => {\n    return new explosion({\n        x,\n        y,\n        img: imgExplosion,\n        sound: soundExplosion,\n        sprite_width: 200,\n        sprite_height: 179,\n        sprite_length: 5,\n        angle: Math.random() * 6.2,\n    });\n};\nconst trigger = (opt) => {\n    const ctx = opt.canvas.getContext(\"2d\");\n    const canvas_position = opt.canvas.getBoundingClientRect();\n    const container = opt.canvas.closest(\".container\");\n    if (container) {\n        const container_position = container.getBoundingClientRect();\n        if (ctx) {\n            window.addEventListener(\"click\", (event) => {\n                const position_x = event.x - canvas_position.left + container_position.left + window.scrollX;\n                const position_y = event.y - canvas_position.top + container_position.top + window.scrollY;\n                explosions.push(createExplosion(position_x, position_y));\n            });\n        }\n    }\n    const canvas_width = opt.canvas.width;\n    const canvas_height = opt.canvas.height;\n    if (ctx) {\n        animateTrigger({ ctx, canvas_width, canvas_height });\n    }\n};\nconst animateTrigger = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    for (let i = 0; i < explosions.length; i++) {\n        explosions[i]?.update();\n        explosions[i]?.draw(opt.ctx);\n        if (explosions[i]?.mark_delete) {\n            explosions.splice(i, 1);\n            i--;\n        }\n    }\n    requestAnimationFrame(() => {\n        animateTrigger(opt);\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/trigger.ts?");

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