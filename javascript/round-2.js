var balls;
var score = 0;
var text;
var live = 10

let tpArray = [];

const namePlayer = localStorage.getItem('name-player')



class Round2 extends Phaser.Scene {

    // monster;
    lavas = [];
    monsterBullets = [];
    canShoot = true;


    preload() {

        //LOAD: Các ô bản đồ
        this.load.image('tiles', '../img/tiles2.png');

        //LOAD: Bản đồ trò chơi
        this.load.tilemapCSV('map', '../img/map-round2.csv');

        //LOAD: Người chơi
        this.load.spritesheet('player', '../img/player.png', { frameWidth: 50, frameHeight: 50 });

        //LOAD: Phần thưởng
        this.load.image('star', '../img/star.png');

        //LOAD: Đạn quái vật
        this.load.image('bullet', '../img/bullet.png');

        //LOAD: Đạn người chơi
        this.load.image('bullet1', '../img/bullet.png');

        //LOAD: Dung nham
        this.load.image('lava', '../img/lava1.png');

        //LOAD: Chướng ngại vật
        this.load.image('rock', '../img/rock.png');

        //LOAD: Hiệu ứng chết
        this.load.spritesheet('boom', '../img/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });

        //LOAD: Rồng
        this.load.spritesheet('dragon', '../img/dragon.png', { frameWidth: 96, frameHeight: 64 });

        //LOAD: Xác ướp
        this.load.spritesheet('mummy', '../img/mummy.png', { frameWidth: 37, frameHeight: 45 });

        //LOAD: Khủng long
        this.load.spritesheet('monster', '../img/monster2.png', {frameWidth: 50, frameHeight: 50});

        //LOAD: Âm thanh
        this.load.audioSprite('sfx', '../audio/fx_mixdown.json', [
            '../audio/fx_mixdown.ogg',
            '../audio/fx_mixdown.mp3'
        ]);

        //LOAD: Chướng ngại vật có thể ẩn
        this.load.image('tp', '../img/tp.png');

    }

    create() {

        //CALL: Tạo bản đồ trò chơi
        this.createMap();

        //CALL: Tạo người chơi
        this.createPlayer();

        //CALL: Tạo văn bản trò chơi
        this.createText();

        //CALL: Tạo cameras
        this.createCameras();

        //CALL: Tạo tương tác bàn phím
        this.createCursorKeys();
        
        // > Cấu hình thế giới
        this.physics.world.setBounds(0, 0, 768, 1664);

        // > Tạo con trỏ
        this.cursors = this.input.keyboard.createCursorKeys();

        // > Xử lí va chạm
        // this.physics.add.overlap(this.player, this.stars, collectStar, null, this); // > Người chơi là các ngôi sao

        // // // > In tên âm thanh
        const spritemap = this.cache.json.get('sfx').spritemap;
        
        for (let spriteName in spritemap)
        {
            console.log(spriteName)
        }

        // > Đưa thông tin màn chơi lên localstorage

        localStorage.setItem("round", 2);

        // this.physics.add.existing(this.player);
        


    }
    update(time, delta) {

        // console.log(this.player.x)
        // console.log(this.player.y)

        //  Custom tile overlap check
        this.physics.world.overlapTiles(this.player, this.traps, this.die, null, this);

        this.physics.world.overlapTiles(this.player, this.switch, this.move, null, this);
        


        // > Xử lý di chuyển nhân vật
        this.player.body.setVelocityX(0);
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

            if(this.player.body.onFloor()) {

                this.player.anims.play('turn');
                
            }
        }

    }
    // ! Đây là nơi khởi tạo hàm
    die(player, tile) {
        
        this.player.anims.play('up');

        

        this.time.delayedCall(100, () => {

            this.player.body.setVelocityY(-400);


        })

        
        this.time.delayedCall(100, () => {

            window.location.reload()

        })
    }

    move(player, tile) {
        
        // alert("he")
    }

    //FUNC: Hàm tạo bản đồ trò chơi
    createMap() {

        this.map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
        this.tileset = this.map.addTilesetImage('tiles');
        this.layer = this.map.createLayer(0, this.tileset, 0, 0);
        this.map.setCollision(9);

        this.traps = this.map.filterTiles( tile => tile.index === 76);
        this.woods = this.map.filterTiles( tile => tile.index === 4);
        this.switch = this.map.filterTiles( tile => tile.index === 77);


        // this.map.setCollisionBetween(9, 11);
    }

    //FUNC: Hàm tạo người chơi
    createPlayer() {

        this.player = this.physics.add.sprite(100, 1575, 'player').setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.layer);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 0 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 2 } ],
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

        if(this.player.body.onFloor()) {
            this.player.anims.play('turn');
        } else {
            this.player.anims.play('right-fly');
        }


    }


    //FUNC: Hàm tạo phần thưởng
    createStars() {

        this.stars = this.physics.add.group({
            // allowGravity: false,
            bounceX: 0.5,
            bounceY: 0.5,
            collideWorldBounds: true,
            // velocityY: -100
        });

        this.stars.createMultiple([
            { key: 'star', quantity: 3, setXY: { x: 608, y: 300, stepX: 64 } },
            { key: 'star', quantity: 8, setXY: { x: 1184, y: 300, stepX: 64 } }
        ]);

        this.stars.children.iterate(function(star) {
            star.setScale(0.5);
        });

        this.physics.add.collider(this.stars, this.layer);

    }

    //FUNC: Hàm tạo văn bản trò chơi
    createText() {


        text = this.add.text(20, 20, '', { fontSize: '28px', fill: 'white' });
        
        text.setText([
            'Tên  ' + namePlayer,
            'Mạng ' + live,
            'Score ' + '0'
        ])
        text.setScrollFactor(0);

    }

    //FUNC: Hàm tạo chướng ngại vật
    createRocks() {

        // this.rock = this.physics.add.group();

        const rock1 = this.physics.add.image(1856, 300, 'rock');
        const rock2 = this.physics.add.image(2070, 400, 'rock');
        const rock3 = this.physics.add.image(3392, 200, 'rock');

        rock1.body.immovable = true;
        rock1.body.allowGravity = false;

        rock2.body.immovable = true;
        rock2.body.allowGravity = false;

        rock3.body.immovable = true;
        rock3.body.allowGravity = false;

        this.tweens.chain({
            targets: rock1.body.velocity,
            loop: -1,
            tweens: [
                { x:    0, y: 60, duration: 4000, ease: 'Stepped' },
                { x:    0, y:    -60, duration: 4000, ease: 'Stepped' },
            ]
        });

        this.tweens.chain({
            targets: rock2.body.velocity,
            loop: -1,
            tweens: [
                { x:    60, y:0, duration: 4000, ease: 'Stepped' },
                { x:    -60, y:0, duration: 4000, ease: 'Stepped' },
            ]
        });

        this.physics.add.collider(this.player, rock1);

        this.physics.add.collider(this.player, rock2);

        this.physics.add.collider(this.player, rock3, () =>  {
            window.location.href = "round-2.html"
        });

    }
    //FUNC: Hàm tạo chướng ngại vật biến mật
    createClounds() {

        for(var i = 1; i <= 4; i ++) {

            const tp = this.physics.add.image(2422 + i* 128, 600 - i*90, 'tp').setScale(2.5)

            tp.body.immovable = true;
            tp.body.allowGravity = false;

            // Thêm tp vào mảng
            tpArray.push(tp);

            this.physics.add.collider(this.player, tp, () => {

                this.time.delayedCall(600, function() {
                    tp.setScale(2.2);;
                })

                this.time.delayedCall(1000, function() {
                    tp.setScale(1.8);;
                })

                this.time.delayedCall(1400, function() {
                    tp.destroy();
                })
            });

        }
    }

    //FUNC: Hàm tạo cameras
    createCameras() {

        this.cameras.main.setBackgroundColor('#1b004b');

        // this.cameras.main.setFullScreen();

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.on('cameraupdate', function (camera, progress, dx, dy) {

            scoreText.x += dx;
            scoreText.y += dy;
        });
    }

    //FUNC: Hàm tạo tương tác bàn phím
    createCursorKeys() {
        
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //> Nút space
        const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        upKey.on('down', (event) => {
            this.sound.playAudioSprite('sfx', 'numkey');
        })
        leftKey.on('down', (event) => {
            this.sound.playAudioSprite('sfx', 'numkey');
        })
        rightKey.on('down', (event) => {
            this.sound.playAudioSprite('sfx', 'numkey');
        })
        spaceKey.on('down', (event) => {

            this.bullet1s.fire(this.player.x, this.player.y, 500, 0);
            
            this.sound.playAudioSprite('sfx', "shot");

        });
        
    }
    

}

// > Hàm nhặt phần thưởng
function collectStar (player, star) {

    star.disableBody(true, true);
    this.sound.playAudioSprite('sfx', "ping");

    score += 10;
    
    text.setText([
        'Tên  ' + namePlayer,
        'Mạng ' + live,
        'Score ' + score
    ])
}


