const config = {
    type: Phaser.AUTO,
    width: 768,
    height: 550,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800}
        }
    },
    scene: Round2
};

const game = new Phaser.Game(config);