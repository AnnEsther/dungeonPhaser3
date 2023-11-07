
class testingScene extends Phaser.Scene {
    constructor(ind) {
        super('testing');
    }
    init (data)
    {
        this.index = data["i"];
    }
    preload() {
       
        //MapOutput.json moved into levelData
        this.levelData = this.cache.json.get('mapData');
        //Load all minimaps
        this.levels = Object.keys(this.levelData);
        for (let x in this.levels){
            this.load.image(this.levels[x],'assets/MiniMaps/' + this.levels[x] + '.jpg');
        }
        //Pre-load button
        this.load.spritesheet('button', 'assets/button_sprite_sheet.png',
         { frameWidth: 193, frameHeight: 71 }); //579x71

        
    }

    create() {
       
        //Setting the cursors up for keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        //Camera centering data
        this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;



         //creating the map
         this.dynamicMap = this.make.tilemap(
            {
                // data: this.levelData[this.levels[this.index]],
                tileWidth: 250,
                tileHeight: 250
            });

        const tiles = this.dynamicMap.addTilesetImage('graph');

        this.layer0 = this.dynamicMap.createBlankLayer('layer0', tiles, 0, 0, 18, 18);
        this.layer0.putTilesAt(this.levelData[this.levels[this.index]][0], 0, 0);

        this.layer1 = this.dynamicMap.createBlankLayer('layer1', tiles, 0, 0, 18, 18);
        this.layer1.putTilesAt(this.levelData[this.levels[this.index]][2], 0, 0);

        this.layer3 = this.dynamicMap.createBlankLayer('layer3', tiles, 0, 0, 18, 18);
        this.layer3.putTilesAt(this.levelData[this.levels[this.index]][3], 0, 0);

        this.layer4 = this.dynamicMap.createBlankLayer('layer4', tiles, 0, 0, 18, 18);
        this.layer4.putTilesAt(this.levelData[this.levels[this.index]][4], 0, 0);

        this.layer5 = this.dynamicMap.createBlankLayer('layer5', tiles, 0, 0, 18, 18);
        this.layer5.putTilesAt(this.levelData[this.levels[this.index]][5], 0, 0);

        this.layer6 = this.dynamicMap.createBlankLayer('layer6', tiles, 0, 0, 18, 18);
        this.layer6.putTilesAt(this.levelData[this.levels[this.index]][6], 0, 0);

        this.layer2 = this.dynamicMap.createBlankLayer('layer2', tiles, 0, 0, 18, 18);
        this.layer2.putTilesAt(this.levelData[this.levels[this.index]][1], 0, 0);

        this.dynamicMap.setCollision([1]);
        
        this.layer0.setCollisionByProperty({ collides: true })
        
        this.physics.world.setBounds(0, 0, this.layer0.width, this.layer0.height, true, true, true, true);
        this.cameras.main.setBounds(0, 0, this.layer0.width, this.layer0.height);
        
        this.zoomOut = 13/100;
        this.cameras.main.setZoom(this.zoomOut,this.zoomOut);

        // this.nextButton = this.add.button(this.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);

        // this.nextButton.onInputOver.add(over, this);
        // this.nextButton.onInputOut.add(out, this);
        // this.nextButton.onInputUp.add(up, this);

        var camWidth = this.cameras.main.width * (1/this.zoomOut); 
        var camHeight = this.cameras.main.height * (1/this.zoomOut); 

        this.nextButton = new BasicButton({
            'scene': this,
            'key': 'button',
            'up': 0,
            'over': 1,
            'down': 2,
            'x': 0,
            'y': 0
        });
        this.nextBouttonScale = 4;
        this.nextButton.setScale(this.nextBouttonScale);
        this.nextButton.on('pointerdown', this.actionOnClick, this);

        this.nextButton.x = camWidth - (this.nextButton.width * this.nextBouttonScale);
        this.nextButton.y = camHeight - (this.nextButton.height * this.nextBouttonScale);

        var name = this.add.text(4800, 1000, 'LEVEL : ' +  this.levels[this.index], { fill: '#0f0' });
        name.setScale(10);

        //console.log(this.levels[this.index]);
        var mapImage = this.add.image(5400, 2000, this.levels[this.index]);
        mapImage.setScale(2);

        // this.nextButton.setInteractive().on('pointerdown', () => this.updateClick(++this.index));

    }

    actionOnClick () {
        this.index += 1;
        this.scene.start('testing', { i : this.index});
    }

    // updateClickCountText(index) {
    //     // this.index
    //     this.nextButton.setText(`Button has been clicked ${clickCount} times.`);
        
    // }

}

//export default testingScene;