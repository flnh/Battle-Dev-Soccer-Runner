"use strict";
/// <reference path="../types/phaser.d.ts" />
var widthGame;
var heightGame;
var blocksVelocity;
var player;
var keyboard;
var tabBlocks;
var nbBlocks;
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'container',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        // arcade: {
        //     gravity: { y: 200 }
        // }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
function preload() {
    this.load.image('gradin', '/assets/gradin_bg.png');
    this.load.image('main', '/assets/main_bg.png');
    this.load.image('stairs', '/assets/stairs_bg.png');
    this.load.spritesheet('player', '/assets/player.png', {
        frameWidth: 45,
        frameHeight: 55
    });
}
function create() {
    initializeVariables();
    var startGradin = this.add.image(widthGame / 2, heightGame / 2 * nbBlocks, 'main');
    startGradin.displayWidth = widthGame;
    startGradin.displayHeight = heightGame;
    var stairs = this.add.image(widthGame / 2, 225 * nbBlocks, 'stairs');
    stairs.displayHeight = 450;
    var startBlock = this.physics.add.group([startGradin, stairs]);
    startBlock.setVelocityY(blocksVelocity);
    tabBlocks = [startBlock];
    createNextBlock(this);
    player = this.physics.add.sprite(400, 400, 'player');
    player.setDepth(1);
    keyboard = this.input.keyboard.createCursorKeys();
}
function update() {
    if (keyboard.left.isDown) {
        player.setVelocityX(-160);
    }
    else if (keyboard.right.isDown) {
        player.setVelocityX(160);
    }
    else {
        player.setVelocityX(0);
    }
    verifyBlocks(this);
}
function initializeVariables() {
    nbBlocks = 1;
    widthGame = 800;
    heightGame = 600;
    blocksVelocity = 80;
}
function verifyBlocks(scene) {
    // @ts-ignore
    if (tabBlocks[0].children.entries[0].y > 1000) {
        // SUPPRESSION
        tabBlocks[0].clear(true, true);
        tabBlocks.splice(0, 1);
    }
    // @ts-ignore
    if (tabBlocks[0].children.entries[0].y > 300 && tabBlocks.length < 5) {
        createNextBlock(scene);
    }
}
function createNextBlock(scene) {
    // @ts-ignore
    var gradin = scene.add.image(widthGame / 2, tabBlocks[0].children.entries[0].y + heightGame * -tabBlocks.length, 'gradin');
    gradin.displayWidth = widthGame;
    gradin.displayHeight = heightGame;
    // @ts-ignore
    var stairs = scene.add.image(widthGame / 2, tabBlocks[0].children.entries[0].y + heightGame * -tabBlocks.length, 'stairs');
    stairs.displayHeight = heightGame;
    var block = scene.physics.add.group([gradin, stairs]);
    block.setVelocityY(blocksVelocity);
    tabBlocks.push(block);
    nbBlocks++;
}
