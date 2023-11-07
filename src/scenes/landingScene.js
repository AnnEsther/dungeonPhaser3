
class landingScene extends Phaser.Scene {
    constructor() {
        super('landingScene');
    }
    preload() {
        this.load.image('logo', 'https://github.com/AnnEsther/dungeonPhaser3/blob/main/assets/logo.png?raw=true');

        //Pre-loading the map data
        this.load.json('mapData', '/assets/data/MapOutput18x18.json');

        //Pre-load the tiles
        this.load.image('graph','https://github.com/AnnEsther/dungeonPhaser3/blob/main/assets/dungeonTiles.png?raw=true');

       }
    create() {
        this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var logo = this.add.image(this.centerX, this.centerY, 'logo');

        var ratio = this.cameras.main.width / logo.width;

        logo.setScale(ratio);


        this.time.delayedCall(1000, () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        });

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('testing', { i : 0});
            // this.scene.start('demo', { id: 1, image: 'babar-phaleon-coco.png' });
        });
    }

}

// export default landingScene;