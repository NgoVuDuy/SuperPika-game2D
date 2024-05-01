class Login extends Phaser.Scene
{
    preload ()
    {
        this.load.html('nameform', 'html/form.html');
        this.load.audio('music', 'audio/music-login.mp3');

        // //LOAD: Âm thanh
        // this.load.audioSprite('sfx', 'audio/fx_mixdown.json', [
        //     'audio/fx_mixdown.ogg',
        //     'audio/fx_mixdown.mp3'
        // ]);
    }

    create ()
    {
        this.cameras.main.setBackgroundColor('#1b004b');

        this.sound.add('music')
        this.sound.play('music')

        const text = this.add.text(290, 40, 'RUNMAN', { color: 'yellow', fontFamily: 'Arial', fontSize: '50px '});

        if(localStorage.getItem('name-player')) {

            const round_number = localStorage.getItem("round");

            console.log("đã tồn tại người chơi")

            const ctnGameBtn = this.add.text(400, 450, 'Chơi tiếp', {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
                align: 'center',
                fixedWidth: 260,
                backgroundColor: '#2d2d2d'
            }).setPadding(32).setOrigin(0.5);
    
    
            ctnGameBtn.setInteractive({ useHandCursor: true });
    
            ctnGameBtn.on('pointerover', () => {
                ctnGameBtn.setBackgroundColor('#8d8d8d');
            });
    
            ctnGameBtn.on('pointerout', () => {
                ctnGameBtn.setBackgroundColor('#2d2d2d');
            });

            ctnGameBtn.on('pointerdown', () => {
                if(round_number == 1) {
                    window.location.href = "rounds/round-1.html"
                }
                if(round_number == 2) {
                    window.location.href = "rounds/round-2.html"
                }
                
            });

        } else {
            console.log("Méo tồn tại người chơi")
        }

        const newGameBtn = this.add.text(400, 300, 'Chơi mới', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);


        newGameBtn.setInteractive({ useHandCursor: true });

        newGameBtn.on('pointerover', () => {
            newGameBtn.setBackgroundColor('#8d8d8d');
        });

        newGameBtn.on('pointerout', () => {
            newGameBtn.setBackgroundColor('#2d2d2d');
        });

        newGameBtn.on('pointerdown', () => {8

                    newGameBtn.destroy();
            
            
                    const element = this.add.dom(400, 300).createFromCache('nameform');
            
                    // element.setPerspective(200);
            
                    element.addListener('click');
            
                    element.on('click', function (event)
                    {
                        
                        // this.sound.playAudioSprite('sfx', 'numkey');
            
                        if (event.target.name === 'loginButton')
                        {
                            const inputUsername = this.getChildByName('username');
                            // const inputPassword = this.getChildByName('password');
            
                            //  Have they entered anything?
                            if (inputUsername.value !== '')
                            {
                                //  Turn off the click events
                                this.removeListener('click');
            
                                //  Tween the login form out
                                // this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
            
                                // this.scene.tweens.add({
                                //     targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                                //     onComplete: function ()
                                //     {
                                //         element.setVisible(false);
                                //     }
                                // });
            
                                //  Populate the text with whatever they typed in as the username!
                                // text.setText(`Welcome ${inputUsername.value}`);
                                localStorage.setItem('name-player', inputUsername.value)

                                window.location.href = "rounds/round-1.html"
            
                            }
                            else
                            {
                                //  Flash the prompt
                                // this.scene.tweens.add({ targets: element, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                                alert("Vui lòng nhập tên người chơi");
            
                            }
                        }
            
                    });
        })




        // this.tweens.add({
        //     targets: element,
        //     y: 300,
        //     duration: 3000,
        //     ease: 'Power3'
        // });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 550,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    scene: Login
};

const game = new Phaser.Game(config);