/// <reference path="../types/phaser.d.ts" />

let widthGame: number
let heightGame: number
let blocksVelocity: number

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
let keyboard: Phaser.Types.Input.Keyboard.CursorKeys

let tabBlocks: Phaser.Physics.Arcade.Group[]
let typesSpectators: string[]

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

function preload (this: Phaser.Scene)
{
  this.load.image('gradin', '/assets/gradin_bg.png')
  this.load.image('main', '/assets/main_bg.png')
  this.load.image('stair_debut', '/assets/stair_debut.png')
  this.load.image('stair_suite', '/assets/stair_suite.png')
  this.load.spritesheet('player', '/assets/player.png', {
    frameWidth: 46,
    frameHeight: 57
  })
  this.load.spritesheet('supp_blanc', '/assets/supp_blanc.png', {
    frameWidth: 72,
    frameHeight: 92
  })
  this.load.spritesheet('supp_jaune', '/assets/supp_jaune.png', {
    frameWidth: 72,
    frameHeight: 92
  })
  this.load.spritesheet('supp_rouge', '/assets/supp_rouge.png', {
    frameWidth: 72,
    frameHeight: 92
  })
}

function create (this: Phaser.Scene)
{
  initializeVariables()
  createAnims(this)

  let startGradin = this.add.image(widthGame / 2, heightGame / 2, 'main')
  startGradin.displayWidth = widthGame
  startGradin.displayHeight = heightGame

  let stairs = this.add.image(widthGame / 2, 140, 'stair_debut')
  stairs.displayHeight = heightGame + 25
  stairs.displayWidth = 266

  let startBlock = this.physics.add.group([startGradin, stairs])
  startBlock.setVelocityY(blocksVelocity)

  tabBlocks = [startBlock]

  createNextBlock(this)

  player = this.physics.add.sprite(400, 400, 'player')
  player.setDepth(1)

  keyboard = this.input.keyboard.createCursorKeys()

  spawnSpectators(this, startBlock, true)
}

function update(this: Phaser.Scene) {
  if (keyboard.left.isDown && player.x >= widthGame / 2 - 110) {
    player.setVelocityX(-160)
    player.anims.play('left', true)
  } else if (keyboard.right.isDown && player.x <= widthGame / 2 + 110) {
    player.setVelocityX(160)
    player.anims.play('right', true)
  } else {
    player.setVelocityX(0)
    player.anims.play('run', true)
  }

  if (player.y < 550) {
    player.setVelocityY(blocksVelocity / 2 )
  } else {
    player.setVelocityY(0)
  }

  verifyBlocks(this)
}

function initializeVariables() {
  widthGame = config.scale.width
  heightGame = config.scale.height
  blocksVelocity = 80
  typesSpectators = ['supp_blanc', 'supp_jaune', 'supp_rouge']
}

function verifyBlocks(scene: Phaser.Scene) {
  // @ts-ignore
  if (tabBlocks[0].children.entries[0].y > 900) { // 600 (hauteur) + 300 (hauteur / 2)
    // SUPPRESSION
    tabBlocks[0].destroy(true, true)
    tabBlocks.splice(0, 1)
  }

  if (tabBlocks.length < 5) {
    // AJOUT
    createNextBlock(scene)
  }
}

function createNextBlock(scene: Phaser.Scene) {
  // @ts-ignore
  let gradin = scene.add.image(widthGame / 2, tabBlocks[0].children.entries[0].y + heightGame * -tabBlocks.length, 'gradin')
  gradin.displayWidth = widthGame
  gradin.displayHeight = heightGame

  // @ts-ignore
  let stairs = scene.add.image(widthGame / 2, tabBlocks[0].children.entries[0].y + heightGame * -tabBlocks.length, 'stair_suite')
  stairs.displayHeight = heightGame + 25
  stairs.displayWidth = 266

  let block = scene.physics.add.group([gradin, stairs])
  // block.setVelocityY(blocksVelocity)

  tabBlocks.push(block)

  spawnSpectators(scene, block)
}

function spawnSpectators(scene: Phaser.Scene, block: Phaser.Physics.Arcade.Group, isStarting: boolean = false) {
  let height = isStarting ? 9 : 12
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < 6; j++) {
      let chanceSpawn = Math.floor(Math.random() * 10)
      if (Math.floor(Math.random() * 10) < 8) {
        let posX = 25 + 40 * j
        // @ts-ignore
        let posY = isStarting ? 25 + 50 * i : 25 + 50 * i + tabBlocks[tabBlocks.length - 1].children.entries[0].y
        let specType = typesSpectators[Math.floor(Math.random() * 3)]
        let spectator = scene.physics.add.sprite(posX, posY, specType)
        spectator.setDepth(1)
        spectator.scale = 0.5
        spectator.anims.play(`${specType}-move`, true)
        spectator.anims.msPerFrame = Math.floor(Math.random() * 250) + 250
        block.add(spectator)
      }
    }

    for (let j = 0; j < 6; j++) {
      if (Math.floor(Math.random() * 10) < 8) {
        let posX = 575 + 40 * j
        // @ts-ignore
        let posY = isStarting ? 25 + 50 * i : 25 + 50 * i + tabBlocks[tabBlocks.length - 1].children.entries[0].y
        let specType = typesSpectators[Math.floor(Math.random() * 3)]
        let spectator = scene.physics.add.sprite(posX, posY, specType)
        spectator.setDepth(1)
        spectator.scale = 0.5
        spectator.anims.play(`${specType}-move`, true)
        block.add(spectator)
      }
    }
  }
  block.setVelocityY(blocksVelocity)
}

function createAnims(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'died',
    frames: [{key: 'player', frame: 0}],
    frameRate: 20
  })

  scene.anims.create({
    key: 'left',
    frames: [{key: 'player', frame: 3}],
    frameRate: 20
  })

  scene.anims.create({
    key: 'right',
    frames: [{key: 'player', frame: 2}],
    frameRate: 20
  })

  scene.anims.create({
    key: 'run',
    frames: scene.anims.generateFrameNumbers('player', {
      start: 0,
      end: 1
    }),
    frameRate: 4,
    repeat: -1
  })

  scene.anims.create({
    key: 'supp_blanc-idle',
    frames: [{key: 'supp_blanc', frame: 0}],
    frameRate: 20
  })

  scene.anims.create({
    key: 'supp_jaune-idle',
    frames: [{key: 'supp_jaune', frame: 0}],
    frameRate: 20
  })

  scene.anims.create({
    key: 'supp_rouge-idle',
    frames: [{key: 'supp_rouge', frame: 0}],
    frameRate: 20
  })

  scene.anims.create({
    key: 'supp_blanc-move',
    frames: scene.anims.generateFrameNumbers('supp_blanc', {
      start: 0,
      end: 1
    }),
    frameRate: 4,
    repeat: -1
  })

  scene.anims.create({
    key: 'supp_jaune-move',
    frames: scene.anims.generateFrameNumbers('supp_jaune', {
      start: 0,
      end: 1
    }),
    frameRate: 4,
    repeat: -1
  })

  scene.anims.create({
    key: 'supp_rouge-move',
    frames: scene.anims.generateFrameNumbers('supp_rouge', {
      start: 0,
      end: 1
    }),
    frameRate: 4,
    repeat: -1
  })
}