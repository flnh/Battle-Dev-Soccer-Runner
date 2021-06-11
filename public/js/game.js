"use strict";
/// <reference path="../types/phaser.d.ts" />
var _a;
(_a = document.querySelector('.btn-play')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var widthGame;
    var heightGame;
    var blocksVelocity;
    var stepVelocity;
    var stepIsAugmented;
    var player;
    var keyboard;
    var tabBlocks;
    var typesSpectators;
    var typesBonus;
    var typesMalus;
    var biere;
    var bonus;
    var bonus2;
    var sifflet;
    var supp1;
    var messageBlock;
    var score;
    var scoreText;
    var gameIsFinnished;
    var intervalId;
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
            default: 'arcade'
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
        this.load.image('stair_debut', '/assets/stair_debut.png');
        this.load.image('stair_suite', '/assets/stair_suite.png');
        this.load.image('heineken', '/assets/heineken.png');
        this.load.image('hotdog', '/assets/hotdog.png');
        this.load.image('pizza', '/assets/pizza.png');
        this.load.image('red_card', '/assets/red_card.png');
        this.load.image('red_cup_broken', '/assets/red_cup_broken.png');
        this.load.spritesheet('player', '/assets/player.png', {
            frameWidth: 46,
            frameHeight: 57
        });
        this.load.spritesheet('supp_blanc', '/assets/supp_blanc.png', {
            frameWidth: 72,
            frameHeight: 92
        });
        this.load.spritesheet('supp_jaune', '/assets/supp_jaune.png', {
            frameWidth: 72,
            frameHeight: 92
        });
        this.load.spritesheet('supp_rouge', '/assets/supp_rouge.png', {
            frameWidth: 72,
            frameHeight: 92
        });
        // this.load.image('left_button', '/assets/left_button.png')
        // this.load.image('right_button', '/assets/right_button.png')
        this.load.audio('biere', '/assets/sounds/biere.wav');
        this.load.audio('bonus', '/assets/sounds/bonus.wav');
        this.load.audio('bonus2', '/assets/sounds/bonus2.wav');
        this.load.audio('sifflet', '/assets/sounds/sifflet.mp3');
        this.load.audio('supp1', '/assets/sounds/supp1.mp3');
    }
    function create() {
        initializeVariables();
        createAnims(this);
        loadSound(this);
        var backgroundMessage = this.add.rectangle(400, 0, 800, 50, 0x000000);
        backgroundMessage.setDepth(5);
        scoreText = this.add.text(25, 0, 'Score: 0', { fontSize: '28px' });
        scoreText.setDepth(6);
        messageBlock = this.add.group(backgroundMessage, scoreText);
        var startGradin = this.add.image(widthGame / 2, heightGame / 2, 'main');
        startGradin.displayWidth = widthGame;
        startGradin.displayHeight = heightGame;
        var stairs = this.add.image(widthGame / 2, 140, 'stair_debut');
        stairs.displayHeight = heightGame + 25;
        stairs.displayWidth = 266;
        var startBlock = this.physics.add.group([startGradin, stairs]);
        startBlock.setVelocityY(blocksVelocity);
        tabBlocks = [startBlock];
        player = this.physics.add.sprite(400, 400, 'player');
        player.setDepth(2);
        keyboard = this.input.keyboard.createCursorKeys();
        spawnSpectators(this, startBlock, true);
        createNextBlock(this);
        supp1.play({ loop: true, volume: 0.3 });
        intervalId = setInterval(function () {
            incrementScore();
            incrementVelocity();
        }, 500);
    }
    function update() {
        if (!gameIsFinnished) {
            if (keyboard.left.isDown && player.x >= widthGame / 2 - 110) {
                player.setVelocityX(-160);
                player.anims.play('left', true);
            }
            else if (keyboard.right.isDown && player.x <= widthGame / 2 + 110) {
                player.setVelocityX(160);
                player.anims.play('right', true);
            }
            else {
                player.setVelocityX(0);
                player.anims.play('run', true);
            }
            if (player.y < 550) {
                player.setVelocityY(blocksVelocity / 2);
            }
            else {
                player.setVelocityY(0);
            }
            verifyBlocks(this);
        }
    }
    function initializeVariables() {
        widthGame = config.scale.width;
        heightGame = config.scale.height;
        blocksVelocity = 80;
        typesSpectators = ['supp_blanc', 'supp_jaune', 'supp_rouge'];
        typesBonus = ['heineken', 'hotdog', 'pizza'];
        typesMalus = ['red_card', 'red_cup_broken'];
        score = 0;
        gameIsFinnished = false;
        stepIsAugmented = false;
        stepVelocity = 2;
    }
    function loadSound(scene) {
        biere = scene.sound.add('biere');
        bonus = scene.sound.add('bonus');
        bonus2 = scene.sound.add('bonus2');
        sifflet = scene.sound.add('sifflet');
        supp1 = scene.sound.add('supp1');
    }
    function verifyBlocks(scene) {
        // @ts-ignore
        if (tabBlocks[0].children.entries[0].y > 900) { // 600 (hauteur) + 300 (hauteur / 2)
            // SUPPRESSION
            tabBlocks[0].destroy(true, true);
            tabBlocks.splice(0, 1);
        }
        if (tabBlocks.length < 5) {
            // AJOUT
            createNextBlock(scene);
        }
    }
    function createNextBlock(scene) {
        // @ts-ignore
        var gradin = scene.add.image(widthGame / 2, tabBlocks[0].children.entries[0].y + heightGame * -tabBlocks.length, 'gradin');
        gradin.displayWidth = widthGame;
        gradin.displayHeight = heightGame;
        // @ts-ignore
        var stairs = scene.add.image(widthGame / 2, tabBlocks[0].children.entries[0].y + heightGame * -tabBlocks.length, 'stair_suite');
        stairs.displayHeight = heightGame + 25;
        stairs.displayWidth = 266;
        var block = scene.physics.add.group([gradin, stairs]);
        tabBlocks.push(block);
        spawnSpectators(scene, block);
    }
    function spawnSpectators(scene, block, isStarting) {
        if (isStarting === void 0) { isStarting = false; }
        var height = isStarting ? 9 : 12;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < 6; j++) {
                var chanceSpawn = Math.floor(Math.random() * 10) + 1;
                if (chanceSpawn < 8) {
                    var posX = 25 + 40 * j;
                    // @ts-ignore
                    var posY = isStarting ? 25 + 50 * i : 25 + 50 * i + tabBlocks[tabBlocks.length - 1].children.entries[0].y;
                    var specType = typesSpectators[Math.floor(Math.random() * 3)];
                    var spectator = scene.physics.add.sprite(posX, posY, specType);
                    spectator.setDepth(1);
                    spectator.scale = 0.5;
                    spectator.anims.play(specType + "-move", true);
                    spectator.anims.msPerFrame = Math.floor(Math.random() * 250) + 250;
                    block.add(spectator);
                }
            }
            for (var j = 0; j < 6; j++) {
                var chanceSpawn = Math.floor(Math.random() * 10) + 1;
                if (chanceSpawn < 8) {
                    var posX = 575 + 40 * j;
                    // @ts-ignore
                    var posY = isStarting ? 25 + 50 * i : 25 + 50 * i + tabBlocks[tabBlocks.length - 1].children.entries[0].y;
                    var specType = typesSpectators[Math.floor(Math.random() * 3)];
                    var spectator = scene.physics.add.sprite(posX, posY, specType);
                    spectator.setDepth(1);
                    spectator.scale = 0.5;
                    spectator.anims.play(specType + "-move", true);
                    spectator.anims.msPerFrame = Math.floor(Math.random() * 250) + 250;
                    block.add(spectator);
                }
            }
        }
        block.setVelocityY(blocksVelocity);
        spawnBolus(scene, block, isStarting);
    }
    function spawnBolus(scene, block, isStarting) {
        var emplacement = [315, 400, 485];
        for (var i = 0; i < 2; i++) {
            if (Math.floor(Math.random() * 10) < 7) {
                var indexEmplacement = Math.floor(Math.random() * emplacement.length);
                // @ts-ignore
                var malusY = isStarting ? tabBlocks[tabBlocks.length - 1].children.entries[0].y + heightGame / 2 : tabBlocks[tabBlocks.length - 1].children.entries[0].y;
                // @ts-ignore
                var malus = scene.physics.add.image(emplacement[indexEmplacement], malusY, typesMalus[Math.floor(Math.random() * 3)]);
                emplacement.splice(indexEmplacement, 1);
                malus.scale = 0.2;
                malus.setDepth(1);
                block.add(malus);
                scene.physics.add.collider(malus, player, collisionBolus);
            }
        }
        if (Math.floor(Math.random() * 10) < 5) {
            var indexEmplacement = Math.floor(Math.random() * emplacement.length);
            // @ts-ignore
            var bonusY = isStarting ? tabBlocks[tabBlocks.length - 1].children.entries[0].y + heightGame / 2 : tabBlocks[tabBlocks.length - 1].children.entries[0].y;
            // @ts-ignore
            var bonus_1 = scene.physics.add.image(emplacement[indexEmplacement], bonusY, typesBonus[Math.round(Math.random() * 2)]);
            emplacement.splice(indexEmplacement, 1);
            bonus_1.scale = 0.1;
            bonus_1.setDepth(1);
            block.add(bonus_1);
            scene.physics.add.collider(bonus_1, player, collisionBolus);
        }
        block.setVelocityY(blocksVelocity);
    }
    function collisionBolus(hit) {
        // @ts-ignore
        switch (hit.frame.texture.key) {
            case 'heineken':
                biere.play();
                score += 20;
                scoreText.setText('Score: ' + score);
                break;
            case 'hotdog':
                bonus.play();
                score += 10;
                scoreText.setText('Score: ' + score);
                break;
            case 'pizza':
                bonus2.play();
                score += 10;
                scoreText.setText('Score: ' + score);
                break;
            case 'red_card':
                sifflet.play();
                endGame();
                break;
            case 'red_cup_broken':
                sifflet.play();
                endGame();
                break;
        }
        player.y = 550;
        hit.destroy(true);
    }
    function endGame() {
        gameIsFinnished = true;
        clearInterval(intervalId);
        player.anims.play('died');
        player.setVelocityY(0);
        var getDown = setInterval(function () {
            if (player.rotation < 1.5708) {
                player.setRotation(player.rotation + 0.6);
            }
            else {
                clearInterval(getDown);
            }
        }, 100);
        // @ts-ignore
        var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        // @ts-ignore
        tabBlocks.forEach(function (block) {
            block.setVelocityY(0);
        });
        setInterval(function () {
            modal.show();
            game.destroy(true, true);
        }, 1000);
    }
    function incrementScore() {
        if (!gameIsFinnished) {
            scoreText.setText('Score: ' + ++score);
            if (!stepIsAugmented && score >= 75) {
                stepVelocity = 6;
                stepIsAugmented = true;
            }
        }
    }
    function incrementVelocity() {
        blocksVelocity += stepVelocity;
        tabBlocks.forEach(function (block) {
            block.setVelocityY(blocksVelocity);
        });
    }
    function createAnims(scene) {
        scene.anims.create({
            key: 'died',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'left',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'right',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'supp_blanc-idle',
            frames: [{ key: 'supp_blanc', frame: 0 }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'supp_jaune-idle',
            frames: [{ key: 'supp_jaune', frame: 0 }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'supp_rouge-idle',
            frames: [{ key: 'supp_rouge', frame: 0 }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'supp_blanc-move',
            frames: scene.anims.generateFrameNumbers('supp_blanc', {
                start: 0,
                end: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'supp_jaune-move',
            frames: scene.anims.generateFrameNumbers('supp_jaune', {
                start: 0,
                end: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'supp_rouge-move',
            frames: scene.anims.generateFrameNumbers('supp_rouge', {
                start: 0,
                end: 1
            }),
            frameRate: 4,
            repeat: -1
        });
    }
});
