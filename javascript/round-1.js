var balls;
var score = 0;
var text;
var live = 10

let tpArray = [];

const namePlayer = localStorage.getItem('name-player')



class Round1 extends Phaser.Scene {

    // //INIT: Bản đồ
    // map;
    // tileset;
    // layer;

    // //INIT: Âm thanh
    // sounds;

    // //INIT: Người chơi
    // player;

    // //INIT: Con trở bàn phím
    // cursors;

    // //INIT: Xác ướp
    // mummy;

    // //INIT: Rồng 
    // dragon;

    // //INIT: Đạn 
    // bullets;
    // bullet1s;

    // //INIT: Phần thưởng
    // balls;

    // //INIT: Văn bản trò chơi
    // // text;

    // //INIT: Điểm phần thưởng người chơi
    // score = 0;

    // //INIT: Tạo ra chướng ngại vật
    // rocks = [];

    // monster;
    lavas = [];
    monsterBullets = [];
    canShoot = true;


    preload() {

        //LOAD: Các ô bản đồ
        this.load.image('tiles', '../img/tiles1.png');

        //LOAD: Bản đồ trò chơi
        this.load.tilemapCSV('map', '../img/map.csv');

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

        //CALL: Khởi tạo đạn bắn
        this.createBullets();

        //CALL: Tạo người chơi
        this.createPlayer();

        //CALL: Tạo hiệu ứng
        this.createAnimation();

        //CALL: Tạo rồng
        this.createDragon();

        //CALL: Tạo phần thưởng
        this.createStars();

        //CALL: Tạo văn bản trò chơi
        this.createText();

        //CALL: Tạo chướng ngại vật
        this.createRocks();

        //CALL: Tạo chướng ngại vật biến mất
        this.createClounds();

        //CALL: Tạo cameras
        this.createCameras();

        //CALL: Tạo tương tác bàn phím
        this.createCursorKeys();

        //CALL: Tạo xác ướp
        this.createMummy();

        //CALL: Tạo dung nham
        // this.createLavas();
        
        // > Cấu hình thế giới
        this.physics.world.setBounds(0, 0, 20000, 1000);

        // > Tạo con trỏ
        this.cursors = this.input.keyboard.createCursorKeys();

        // > Xử lí va chạm
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this); // > Người chơi là các ngôi sao

        // // // > In tên âm thanh
        const spritemap = this.cache.json.get('sfx').spritemap;
        for (let spriteName in spritemap)
        {
            console.log(spriteName)
        }

        // > Đưa thông tin màn chơi lên localstorage

        localStorage.setItem("round", 1);




    }
    update(time, delta) {

        // console.log(this.player.x)

        if(this.player.y == 975) {

            if(this.player.x > 2400) {
                this.player.setPosition(2450, 100)

                live -= 1

                text.setText([
                    'Tên ' + namePlayer,
                    'Mạng ' + live,
                    'Score ' + score
                ])

                if(live == 0) {
                    let result = confirm("Bạn đã thua! Bạn có muốn chơi lại")
        
                    if(result) {
                        this.player.setPosition(100, 100)
                        window.location.reload()
                    }
                }

                tpArray.forEach(tp => {
                    tp.destroy();
                });
                // Sau khi hủy tất cả các đối tượng, bạn có thể muốn làm sạch mảng
                tpArray = [];

                this.createClounds()

            } else

            if(this.player.x > 1600) {
                this.player.setPosition(1600, 100)

                live -= 1

                text.setText([
                    'Tên ' + namePlayer,
                    'Mạng ' + live,
                    'Score ' + score
                ])

                if(live == 0) {
                    let result = confirm("Bạn đã thua! Bạn có muốn chơi lại")
        
                    if(result) {
                        this.player.setPosition(100, 100)
                        window.location.reload()
                    }
                }
            } else

            if(this.player.x > 1000) {

                this.player.setPosition(1000, 100)
                
                live -= 1

                text.setText([
                    'Tên ' + namePlayer,
                    'Mạng ' + live,
                    'Score ' + score
                ])

                if(live == 0) {
                    let result = confirm("Bạn đã thua! Bạn có muốn chơi lại")
        
                    if(result) {
                        this.player.setPosition(100, 100)
                        window.location.reload()
                    } else {

                    }
                }
            }

        }
        // > Xét máu người chơi về không
        // if(live == 0) {
        //     let result = confirm("Bạn đã thua! Bạn có muốn chơi lại")

        //     if(result) {
        //         this.player.setPosition(100, 100)
        //         window.location.reload()
        //     }
        // }

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

    //FUNC: Hàm tạo bản đồ trò chơi
    createMap() {

        this.map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
        this.tileset = this.map.addTilesetImage('tiles');
        this.layer = this.map.createLayer(0, this.tileset, 0, 0);
        this.map.setCollisionBetween(0, 6);
        this.map.setCollisionBetween(9, 11);

    
    }

    //FUNC: Hàm tạo người chơi
    createPlayer() {

        this.player = this.physics.add.sprite(100, 100, 'player').setCollideWorldBounds(true);

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

    //FUNC: Hàm tạo xác ướp
    createMummy() {

        this.anims.create({
            key: 'mummy-walk',
            frames: this.anims.generateFrameNumbers('mummy'),
            frameRate: 12,
            repeat: -1
        });

        this.mummies = this.physics.add.group({
            allowGravity: true,
            bounceX: 0.2,
            bounceY: 0.2,
            collideWorldBounds: true,
            // velocityY: -100
        });

        this.mummies.createMultiple([
            { key: 'mummy', quantity: 3, setXY: { x: 630, y: 100, stepX:  150} },
            { key: 'mummy', quantity: 3, setXY: { x: 1170, y: 100, stepX:  150} },

        ]);


        this.mummies.children.iterate((mummy) => {
            // Lấy vị trí hiện tại của mummy
            const mummyX = mummy.x;

            // Tạo tweens cho mỗi mummy
            this.tweens.add({
                targets: mummy,
                x: mummyX + 100, //Ví dụ: Di chuyển mummy sang phải 100px
                flipX: true,
                delay: 2000,
                // y: mummyY,       // Giữ nguyên vị trí y
                duration: 4000,  // Thời gian di chuyển
                yoyo: true,      // Phát ngược lại tween
                repeat: -1       // Lặp lại vô hạn
            });

            // Chơi animation cho mỗi mummy
            mummy.play({ key: 'mummy-walk', randomFrame: true, delay: 2000, showBeforeDelay: true });

        });
        

        this.physics.add.collider(this.mummies, this.layer);

        this.physics.add.overlap(this.bullet1s, this.mummies, (bullet, mummy) => {
            if (mummy) {
                // Chạy animation 'explode'
                mummy.anims.play('explode');
                bullet.destroy();
                // Lắng nghe sự kiện animationcomplete
                mummy.on('animationcomplete', function () {
                    // Sau khi animation 'explode' hoàn thành, hủy bỏ sprite
                    mummy.destroy();
                    // console.log(bullet)
        
                });
            }
        }); // > Đạn người chơi và xác ướp

        this.physics.add.overlap(this.player, this.mummies, (player, mummy) => {

            this.player.setTintFill(0xff0000);

            this.player.x -= 100;
            this.player.y -= 100;

            this.time.delayedCall(500, () => {
                this.player.clearTint();
            })

            live -= 1;

            text.setText([
                'Tên ' + namePlayer,
                'Mạng ' + live,
                'Score ' + score
            ])

            if(live == 0) {
                let result = confirm("Bạn đã thua! Bạn có muốn chơi lại")
    
                if(result) {
                    // this.player.setPosition(100, 100)
                    window.location.reload()
                }
            }

        }, null, this); // > Người chơi và xác ướp
        
    }
    

    //FUNC: Hàm tạo rồng
    createDragon() {

        this.anims.create({
            key: 'dragon-fly',
            frames: this.anims.generateFrameNumbers('dragon', { start: 6, end: 11}),
            frameRate: 14,
            repeat: -1
        });

        this.dragon = this.physics.add.sprite(2500, 300, 'dragon').play('dragon-fly')

        this.dragon.body.immovable = true;
        this.dragon.body.allowGravity = false;

        this.tweens.chain({
            targets: this.dragon.body.velocity,
            loop: -1,
            tweens: [
                { x:    0, y: 50, duration: 1000, ease: 'Stepped' },
                { x:    0, y:    -50, duration: 1000, ease: 'Stepped' },

            ]
        });

        this.shootTimer = this.time.addEvent({
            delay: 2000, // Thời gian giữa mỗi lần bắn (500 milliseconds)
            loop: true,
            callback: () => {
                if(this.canShoot) {

                    const bullet = this.bulletsDragon.getFirstDead(false);

                    if(bullet) {

                        bullet.fire(this.dragon.x, this.dragon.y, -600, 120);
    
                        this.monsterBullets.push(bullet);
                    }
                }

            }
        });

        // > Đạn người chơi và rồng
        this.physics.add.overlap(this.bullet1s, this.dragon, (bullet, dragon) => {
            this.dragon.anims.play('explode');

            if (this.dragon) {
                // Chạy animation 'explode'

                bullet.destroy()
                // Lắng nghe sự kiện animationcomplete
                this.dragon.on('animationcomplete', function () {
                    // Sau khi animation 'explode' hoàn thành, hủy bỏ sprite
                    this.dragon.destroy();

                });
                this.monsterBullets.forEach(bulletdragon => {
                    bulletdragon.disableBody(true, true);
                });

                this.monsterBullets = [];

                this.canShoot = false
            }
        });

        // > Người chơi và rồng
        this.physics.add.overlap(this.player, this.dragon, (player, dragon) => {

            this.player.setTintFill(0xff0000);

            this.player.x -= 100;
            this.player.y -= 100;

            this.time.delayedCall(500, () => {
                this.player.clearTint();
            })

            live -= 1;

            text.setText([
                'Tên ' + namePlayer,
                'Mạng ' + live,
                'Score ' + score
            ])

            if(live == 0) {
                let result = confirm("Bạn đã thua! Bạn có muốn chơi lại")
    
                if(result) {
                    // this.player.setPosition(100, 100)
                    window.location.reload()
                }
            }

        }, null, this); 

        // > Người chơi và đạn rồng
        this.physics.add.overlap(this.player, this.bulletsDragon, (player, dragon) => {

            this.player.setTintFill(0xff0000);

            this.player.x -= 100;
            this.player.y -= 100;

            this.time.delayedCall(500, () => {
                this.player.clearTint();
            })

            live -= 1;

            text.setText([
                'Tên ' + namePlayer,
                'Mạng ' + live,
                'Score ' + score
            ])

            if(live == 0) {
                let result = confirm("Bạn đã thua! Bạn có muốn chơi lại")
    
                if(result) {
                    // this.player.setPosition(100, 100)
                    window.location.reload()
                }
            }

        }, null, this); 
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
        
        // this.input.on('pointerdown', () =>
        // {
        //     this.player.anims.play('kick')

        //     // this.bullet1s.fire(this.player.x, this.player.y, 200, 0);
        //     this.sound.playAudioSprite('sfx', "shot");

        // });
    }
    
    //FUNC: Hàm khởi tạo đạn bắn
    createBullets() {

        // > Khởi tạo đạn cho quái
        this.bulletsDragon = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'bullets' })
        );

        // > khởi tạo nhiều viên đạn cho quái
        this.bulletsDragon.createMultiple({
            key: 'bullet',
            quantity: 1000
        });

        // > khởi tạo đạn cho người chơi
        this.bullet1s = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'bullet1s' })
        );

        // > khởi tạo nhiều viên đạn cho người chơi
        this.bullet1s.createMultiple({
            key: 'bullet1',
            quantity: 1000
        });

    }

    //FUNC: Hàm tạo dung nham
    createLavas() {

        for(let i = 0; i < 3; i++) {
            const lava = this.physics.add.image(625 + i * 50, 525, 'lava', 1);

            
            lava.setCollideWorldBounds(true);

            this.lavas.push(lava);

        }

        // tạo dung nham
        for(let i = 0; i < 23; i++) {

            const lava = this.physics.add.image(1725 + i * 50, 525, 'lava', 1);
            
            lava.setCollideWorldBounds(true);

            this.lavas.push(lava);

        }

        this.lavas.forEach((lava, index) => {
            this.physics.add.overlap(this.player, lava, () => {
                
                location.reload();
            });
        });

    }
    
    //FUNC: Hàm tạo animation
    createAnimation() {

        // > Anis boom
        const boom = {
            key: 'explode',
            frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23 }),
            frameRate: 100,
        };
        this.anims.create(boom);

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

