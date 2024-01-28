var balls;
var score = 0;
var scoreText;
// var lavas;
// Tạo đối tượng viên đạn
class Bullet extends Phaser.Physics.Arcade.Image
{
    fire (x, y, vx, vy)
    {
        this.enableBody(true, x, y, true, true);
        this.setVelocity(vx, vy);

        setTimeout(() => {
            this.disableBody(true, true);
        }, 1000);

        this.setGravityY(-600);


    }


    onCreate ()
    {
        this.disableBody(true, true);
        // this.body.collideWorldBounds = true;
        // this.body.onWorldBounds = true;
    }

    onWorldBounds ()
    {
        // this.disableBody(true, true);
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (world, scene, config)
    {
        super(
            world,
            scene,
            { ...config, classType: Bullet, createCallback: Bullets.prototype.onCreate }
        );
    }

    fire (x, y, vx, vy)
    {
        const bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y, vx, vy);
        }

    }

    onCreate (bullet)
    {
        bullet.onCreate();
    }

    poolInfo ()
    {
        return `${this.name} total=${this.getLength()} active=${this.countActive(true)} inactive=${this.countActive(false)}`;
    }

}

class Example extends Phaser.Scene {
    showDebug = false;
    player;
    helpText;
    debugGraphics;
    cursors;
    map;
    bullets;
    bullet1s;
    monster;

    lavas = [];
    rocks = [];
    monsterBullets = [];

    canShoot = true;


    preload() {

        this.load.image('tiles', 'img/tile.png');
        this.load.tilemapCSV('map', 'img/map.csv');
        this.load.spritesheet('player', 'img/player.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('ball', 'img/ball.png');
        this.load.spritesheet('monster', 'img/monster2.png', {frameWidth: 50, frameHeight: 50});
        this.load.image('bullet', 'img/bullet.png');
        this.load.image('bullet1', 'img/bullet1.png');
        this.load.image('lava', 'img/lava.png');
        this.load.image('rock', 'img/rock.png');

    }

    create() {


        
        this.map = this.make.tilemap({ key: 'map', tileWidth: 50, tileHeight: 50 });
        const tileset = this.map.addTilesetImage('tiles');
        const layer = this.map.createLayer(0, tileset, 0, 0);

        this.map.setCollisionBetween(1, 2);

        this.player = this.physics.add.sprite(100, 200, 'player', 1);

        
        this.physics.add.collider(this.player, layer);
        
        const adb = this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('monster'),
            frameRate: 4,
            repeat: -1
        });
        // add monster
         this.monster = this.physics.add.sprite(1000, 70, 'monster',1);
        this.physics.add.collider(this.monster, layer);
        
        this.monster.play({ key: 'fire' });


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 0 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 2 } ],
        });

        this.player.anims.play('turn');
        

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: [ { key: 'player', frame: 5 } ],
        });

        this.anims.create({
            key: 'left-fly',
            frames: [ { key: 'player', frame: 7 } ],
        });
        this.anims.create({
            key: 'right-fly',
            frames: [ { key: 'player', frame: 6 } ],
        });


        // this.player.setCollideWorldBounds(true);


        // this.helpText.setScrollFactor(0);


        this.cursors = this.input.keyboard.createCursorKeys();

        balls = this.physics.add.group({
            key: 'ball',
            repeat: 11,
            setXY: { x: 225, y: 0, stepX: 100 }
        });

        balls.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));

        });

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);


        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        // scoreText.setX(this.cameras.main.width - scoreText.width - 22);
        scoreText.setScrollFactor(0);

        this.physics.add.collider(balls, layer);

        this.physics.add.overlap(this.player, balls, collectStar, null, this);

                // Thêm sự kiện theo dõi sự thay đổi vị trí của camera
        this.cameras.main.on('cameraupdate', function (camera, progress, dx, dy) {
            // Cập nhật vị trí của scoreText tương ứng với vị trí mới của camera
            scoreText.x += dx;
            scoreText.y += dy;
        
        });

        this.bullets = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'bullets' })
        );

        this.bullets.createMultiple({
            key: 'bullet',
            quantity: 1000
        });

        this.bullet1s = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'bullet1s' })
        );

        this.bullet1s.createMultiple({
            key: 'bullet1',
            quantity: 1000
        });
        // Tạo một biến thời gian để kiểm soát tốc độ bắn
        this.shootTimer = this.time.addEvent({
            delay: 3000, // Thời gian giữa mỗi lần bắn (500 milliseconds)
            loop: true,
            callback: () => {


                if(this.canShoot) {

                    const bullet = this.bullets.getFirstDead(false);
                    if(bullet) {
                        bullet.fire(this.monster.x, this.monster.y, -400 , 0);
    
                        this.monsterBullets.push(bullet);
                    }
                }

            }
        });

        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Tạo sự kiện khi nút Space được nhấn
        spaceKey.on('down', (event) => {
            this.bullet1s.fire(this.player.x, this.player.y, 200, 0);

        });

        this.input.on('pointerdown', () =>
        {
            this.bullet1s.fire(this.player.x, this.player.y, 200, 0);
        });

        this.physics.world.setBounds(0, 0, 3000, 550);

        for(let i = 0; i < 8; i++) {
            const lava = this.physics.add.image(1725 + i * 50, 200, 'lava', 1);
            
            lava.setCollideWorldBounds(true);

            this.lavas.push(lava);

        }

        // Thêm va chạm và xử lý overlap cho từng phần tử trong mảng
        this.lavas.forEach((lava, index) => {
            this.physics.add.overlap(this.player, lava, () => this.player.setPosition(100, 200));
        });

        this.physics.add.overlap(this.player, this.bullets, () => this.player.setPosition(100, 200));


        this.rock = this.physics.add.staticGroup();



        for(let i = 0; i < 2; i ++) {

            this.rock.create(1775 + i * 50, 200, 'rock');
            this.rock.create(1925 + i * 50, 300, 'rock');

            // this.rocks.push(rock);

        }

        this.rocks.forEach((rock, index) => {
            
            // rock.setGravityY(-600);
        })

        this.physics.add.collider(this.player, this.rock);


        this.physics.add.overlap(this.bullet1s, this.monster, hiddenMonster, null, this);



    }
    update(time, delta) {

        this.player.body.setVelocityX(0);

    
        // this.player.body.setVelocityY(0);

        // if (this.cursors.up.isDown)
        // {
        //     this.player.body.setVelocityY(-200);

        //     // this.player.anims.play('left', true);

        // } else

        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-200);

            if(this.player.body.onFloor()) {

                this.player.anims.play('left', true);

            } else {

                this.player.anims.play('left-fly', true);

            }


        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(200);

            if(this.player.body.onFloor()) {

            this.player.anims.play('right', true);
            } else {

            this.player.anims.play('right-fly', true);

        }
        
        } else

                // Jumping
        if (this.cursors.up.isDown){

            this.player.anims.play('up');

            if(this.player.body.onFloor()) {

                this.player.body.setVelocityY(-400);
            }
        
        }
        else
        {
            // this.player.setVelocityX(0);

            // this.player.anims.play('turn');
            if(this.player.body.onFloor()) {

                this.player.anims.play('turn');
                
            }
        }

    
    }
     
}

function collectStar (player, ball)
{
    ball.disableBody(true, true);

    score += 10;
    
    scoreText.setText('Score: ' + score);
}

function hiddenMonster (monster, monsterBullets) {
    monster.disableBody(true, true);

    this.monsterBullets.forEach(bullet => {
        bullet.disableBody(true, true);
    });

    this.monsterBullets = [];

    this.canShoot = false;
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 550,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 600}
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);