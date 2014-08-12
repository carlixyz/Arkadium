
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
    this.font = null;
	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {


        //	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'Back2');


        //	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
        this.preloadBar = this.add.sprite(this.game.world.centerX-128, this.game.world.centerY, 'Objs');
        this.preloadBar.animations.add('redBlock', [4,5,6,7]);
        this.preloadBar.animations.play('redBlock', 25, true);
		this.load.setPreloadSprite(this.preloadBar, 1);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlepage', 'images/title.png');
        this.load.spritesheet('playButton', 'images/button_texture_atlas.png', 193, 71);
		this.load.audio('titleMusic', ['audio/chiptune funky beat 2.ogg']);
		//	+ lots of other required assets here

        this.load.image('Back1', 'images/fondo1.png' );
        this.load.image('Back3', 'images/fondo3.png' );
        this.load.image('kof97', 'images/kof97.png');
        this.load.spritesheet('sparks', 'images/sparks.png', 64, 64);
        this.load.spritesheet('titleSparks', 'images/sparks2.png', 64, 64);
    },

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
//		this.preloadBar.cropEnabled = false;
        this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.preloadBar.width , this.game.cache.getImage('Objs').height *.5);

        this.font = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY * 1.8, this.font);
        i.tint = 0xFF00FF;
        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);
    },

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.


        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.
        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
            this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.preloadBar.width , this.game.cache.getImage('Objs').height );

            this.ready = true;
			this.state.start('MainMenu');
		}

//        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
//            this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.game.cache.getImage('preloaderBar').width , this.preloadBar.height  * .6);


//        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
//           this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.game.cache.getImage('preloaderBar').width  , this.preloadBar.height * .8);

        this.font.text = "loading wait x: " + this.game.input.x + " y: " + this.game.input.y;
        this.preloadBar.updateCrop();
	}
};
