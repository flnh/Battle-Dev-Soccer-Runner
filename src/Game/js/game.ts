/// <reference path="../types/phaser.d.ts" />

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
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: {
      preload: preload,
      create: create
  }
};

var game = new Phaser.Game(config);

function preload (this: Phaser.Scene)
{
  this.load.setBaseURL('https://labs.phaser.io');

  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
  this.load.image('florian', 'https://media-exp3.licdn.com/dms/image/C4E03AQHvWhq-8o5crw/profile-displayphoto-shrink_800_800/0/1584003262799?e=1628726400&v=beta&t=G4jGW_pnbiv7NhaQWa0jar8RJasm-EsvMIbeqeWc7A4')
  this.load
}

function create (this: Phaser.Scene)
{
  this.add.image(400, 300, 'sky');

  var particles = this.add.particles('red');

  // var logo = this.physics.add.image(400, 100, 'logo');

  // logo.setVelocity(100, 200);
  // logo.setBounce(1, 1);
  // logo.setCollideWorldBounds(true);

  for (let i = 0; i < 50; i++) {
    let emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    let florian = this.physics.add.image(Math.floor(Math.random() * 700) + 50, Math.floor(Math.random() * 500) + 50, 'florian')
    florian.scale = 0.1
    florian.setVelocity(100, 200)
    florian.setBounce(1, 1)
    florian.setCollideWorldBounds(true)
    emitter.startFollow(florian);
  }


  // emitter.startFollow(logo);
}