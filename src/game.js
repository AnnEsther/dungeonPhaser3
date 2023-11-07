window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        parent: 'phaser',
        width: window.innerWidth-20,
        height: window.innerHeight-20,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0, },
                debug: false
            }
        },
        dom: {
            createContainer: true
        },
        scene: [landingScene, testingScene],
       
    };  
    var game = new Phaser.Game(config);    
}

