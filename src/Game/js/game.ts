/// <reference path="../types/phaser.d.ts" />

(() => {

  let widthGame: number
  let heightGame: number
  let blocksVelocity: number
  
  let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  let keyboard: Phaser.Types.Input.Keyboard.CursorKeys
  
  let tabBlocks: Phaser.Physics.Arcade.Group[]
  let typesSpectators: string[]
  
  let typesBonus: string[]
  let typesMalus: string[]

  let biere: Phaser.Sound.BaseSound
  let bonus: Phaser.Sound.BaseSound
  let bonus2: Phaser.Sound.BaseSound
  let mainTheme: Phaser.Sound.BaseSound
  let nomNom: Phaser.Sound.BaseSound
  let sifflet: Phaser.Sound.BaseSound
  let supp1: Phaser.Sound.BaseSound
  let supp2: Phaser.Sound.BaseSound
  let tirFootball: Phaser.Sound.BaseSound

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
  }

  let game = new Phaser.Game(config)

  function preload (this: Phaser.Scene)
  {
    this.load.image('gradin', '/assets/gradin_bg.png')
    this.load.image('main', '/assets/main_bg.png')
    this.load.image('stair_debut', '/assets/stair_debut.png')
    this.load.image('stair_suite', '/assets/stair_suite.png')
    this.load.image('heineken', '/assets/heineken.png')
    this.load.image('hotdog', '/assets/hotdog.png')
    this.load.image('pizza', '/assets/pizza.png')
    this.load.image('red_card', '/assets/red_card.png')
    this.load.image('red_cup_broken', '/assets/red_cup_broken.png')
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


    this.load.audio('biere', '/assets/sounds/biere.wav');
    this.load.audio('bonus', '/assets/sounds/bonus.wav');
    this.load.audio('bonus2', '/assets/sounds/bonus2.wav');
    this.load.audio('main_theme', '/assets/sounds/main_theme.wav');
    this.load.audio('nomnom', '/assets/sounds/nomnom.wav');
    this.load.audio('sifflet', '/assets/sounds/sifflet.mp3');
    this.load.audio('supp1', '/assets/sounds/supp1.mp3');
    this.load.audio('supp2', '/assets/sounds/supp2.mp3');
    this.load.audio('tirfootball', '/assets/sounds/tirfootball.wav');

  }
  
  function create (this: Phaser.Scene)
  {
    initializeVariables()
    createAnims(this)
    loadSound(this)
  
    let startGradin = this.add.image(widthGame / 2, heightGame / 2, 'main')
    startGradin.displayWidth = widthGame
    startGradin.displayHeight = heightGame
  
    let stairs = this.add.image(widthGame / 2, 140, 'stair_debut')
    stairs.displayHeight = heightGame + 25
    stairs.displayWidth = 266
  
    let startBlock = this.physics.add.group([startGradin, stairs])
    startBlock.setVelocityY(blocksVelocity)
  
    tabBlocks = [startBlock]
  
    player = this.physics.add.sprite(400, 400, 'player')
    player.setDepth(2)
  
    keyboard = this.input.keyboard.createCursorKeys()

    spawnSpectators(this, startBlock, true)

    createNextBlock(this)

    supp1.play({loop: true, volume: 0.5})
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
    typesBonus = ['heineken', 'hotdog', 'pizza']
    typesMalus = ['red_card', 'red_cup_broken']
  }

  function loadSound(scene: Phaser.Scene) {
    biere = scene.sound.add('biere')
    bonus = scene.sound.add('bonus')
    bonus2 = scene.sound.add('bonus2')
    mainTheme = scene.sound.add('main_theme')
    nomNom = scene.sound.add('nomnom')
    sifflet = scene.sound.add('sifflet')
    supp1 = scene.sound.add('supp1')
    supp2 = scene.sound.add('supp2')
    tirFootball= scene.sound.add('tirfootball')
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
  
    tabBlocks.push(block)
  
    spawnSpectators(scene, block)
  }
  
  function spawnSpectators(scene: Phaser.Scene, block: Phaser.Physics.Arcade.Group, isStarting: boolean = false) {
    let height = isStarting ? 9 : 12
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < 6; j++) {
        let chanceSpawn = Math.floor(Math.random() * 10) + 1
        if (chanceSpawn < 8) {
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
        let chanceSpawn = Math.floor(Math.random() * 10) + 1
        if (chanceSpawn < 8) {
          let posX = 575 + 40 * j
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
    }
    block.setVelocityY(blocksVelocity)

    spawnBolus(scene, block, isStarting)
  }
  
  function spawnBolus(scene: Phaser.Scene, block: Phaser.Physics.Arcade.Group, isStarting: boolean) {
    let emplacement = [315, 400, 485]

    for (let i = 0; i < 2; i++) {
      if (Math.floor(Math.random() * 10) < 5) {
        let indexEmplacement = Math.floor(Math.random() * emplacement.length)
        // @ts-ignore
        let malusY = isStarting ? tabBlocks[tabBlocks.length - 1].children.entries[0].y + heightGame / 2 : tabBlocks[tabBlocks.length - 1].children.entries[0].y
        // @ts-ignore
        let malus = scene.physics.add.image(emplacement[indexEmplacement], malusY, typesMalus[Math.floor(Math.random() * 3)])
        emplacement.splice(indexEmplacement, 1)
        malus.scale = 0.2
        malus.setDepth(1)
        block.add(malus)
        scene.physics.add.collider(malus, player, collisionBolus)
      }
    }

    if (Math.floor(Math.random() * 10) < 3) {
      let indexEmplacement = Math.floor(Math.random() * emplacement.length)
      // @ts-ignore
      let bonusY = isStarting ? tabBlocks[tabBlocks.length - 1].children.entries[0].y + heightGame / 2 : tabBlocks[tabBlocks.length - 1].children.entries[0].y
      // @ts-ignore
      let bonus = scene.physics.add.image(emplacement[indexEmplacement], bonusY, typesBonus[Math.round(Math.random() * 2)])
      emplacement.splice(indexEmplacement, 1)
      bonus.scale = 0.1
      bonus.setDepth(1)
      block.add(bonus)
      scene.physics.add.collider(bonus, player, collisionBolus)
    }

    block.setVelocityY(blocksVelocity)
  }

  function collisionBolus(hit: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    // @ts-ignore
    switch (hit.frame.texture.key) {
      case 'heineken':
        biere.play()
        break;
      case 'hotdog':
        bonus.play()
        break;
      case 'pizza':
        bonus2.play()
        break;
      case 'red_card':
        sifflet.play()
        break;
      case 'red_cup_broken':
        sifflet.play()
        break;
    }
    player.y = 550
    hit.destroy(true)
    // console.log('bonus')
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
})()
