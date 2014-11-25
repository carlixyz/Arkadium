var BasicGame =
{
    /* Here we've just got some global level vars that persist regardless of State swaps */
    leftHealth: 3,
    leftScore: 0,
    leftInputCode: 1,       // 0, 1, 2, 3

    rightHealth: 3,
    rightScore: 0,
    rightInputCode: 0,      // 0, 1, 2, 3

//    topScore: 3,
    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,
    crush: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};



BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    preload: function () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('Back2', 'images/fondo2.png');
        this.load.image('kof97', 'images/kof97.png');
        this.load.spritesheet('items', 'images/Items.png', 32, 32 );
        this.load.image('loadBlocks', 'images/preloader_blocks.png' );

    },

    create: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.refresh();
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');
    }
};