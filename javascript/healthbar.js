class HealthBar {
    constructor(scene, x, y, width, height) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = 100;
        this.draw();
        scene.add.existing(this.bar);
    }

    updateViTri(x, y) {
        this.x = x;
        this.y = y;
    }

    decrease(amount) {
        this.value -= amount;
        if (this.value < 0) {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    }

    draw() {
        this.bar.clear();
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, this.width, this.height);
        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);
        } else {
            this.bar.fillStyle(0x00ff00);
        }
        let d = Math.floor((this.value / 100) * (this.width - 2));
        this.bar.fillRect(this.x + 1, this.y + 1, d, this.height - 2);
    }
}