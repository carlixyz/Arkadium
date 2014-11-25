
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
    this.font = null;
	this.ready = 4;
    this.ItemText = null;
    this.ItemSprites = null;


};

BasicGame.Preloader.prototype = {

	preload: function () {

        //	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'Back2');

        //	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
        this.preloadBar = this.add.sprite(this.game.world.centerX-320, this.game.world.centerY, 'loadBlocks');
//        this.preloadBar.animations.add('redBlock', [4,5,6,7]);
//        this.preloadBar.animations.play('redBlock', 25, true);
		this.load.setPreloadSprite(this.preloadBar, 0);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
//        this.load.image('kof97', 'images/kof97.png');

        //add Brief text
        this.ItemText = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        this.ItemText.setText("  STICKY PAD\n  LONGER PHALUM\n  HEALTH\n  F##K UP CONTROL\n  MULTIBALL ", true, 0, 8, Phaser.RetroFont.ALIGN_LEFT);
        var j = this.game.add.image(this.game.world.centerX * 0.75, this.game.world.centerY * 0.75, this.ItemText);
        j.tint = 0xFF00FF;
        j.scale.setTo(2, 2);
        j.anchor.set(0.5, 1);

        this.ItemSprites = [3];

        for (var k = 0; k < 5; k++)
        {
            this.ItemSprites[k] = this.game.add.image( this.game.world.centerX * 0.25, this.game.world.centerY * 0.725 - (32 * k), 'items', k);
            this.ItemSprites[k].anchor.setTo(0.5, 0.5);
            this.ItemSprites[k].scale.setTo(1.5, 1.5);
        }

        this.font = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        this.font.text = "loading game please wait  ";
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY * 1.9, this.font);
        i.tint = 0xFF00FF;
        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);

        this.load.image('titlepage', 'images/title.png');
        this.load.spritesheet('Objs', 'images/Objetos.png',256, 256 );

        this.load.audio('Crush', ['audio/can-crush-1.mp3']);
        this.load.audio('Cling1', ['audio/glass-clink-1.mp3']);
        this.load.audio('Cling2', ['audio/glass-clink-2.mp3']);
        this.load.audio('Cling3', ['audio/glass-clink-3.mp3']);
        this.load.audio('Cling4', ['audio/glass-clink-4.mp3']);
        this.load.audio('Congratulations', ['audio/Congratulations.ogg']);
        this.load.audio('titleMusic', ['audio/midnight-ride-01a.mp3']);

		//	+ lots of other required assets here
        this.load.image('Back1', 'images/fondo1.png' );
        this.load.image('Back3', 'images/fondo3.png' );
        this.load.spritesheet('sparks', 'images/sparks.png', 64, 64);
        this.load.spritesheet('titleSparks', 'images/sparks2.png', 64, 64);
        this.load.spritesheet('inputButtons', 'images/ArkInputs.png', 128, 128);
    },

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
        this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.preloadBar.width * 0.5, this.game.cache.getImage('Objs').height);
    },

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.


        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.


        if (this.cache.isSoundDecoded('Cling1') && this.ready == 4)
        {
            this.ready--;
            this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.preloadBar.width * 0.625 , this.game.cache.getImage('Objs').height );
        }
        if (this.cache.isSoundDecoded('Cling2') && this.ready == 3)
        {
            this.ready--;
            this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.preloadBar.width * 0.75 , this.game.cache.getImage('Objs').height );
        }

        if (this.cache.isSoundDecoded('Congratulations') && this.ready == 2)
        {
           this.ready--;
           this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.preloadBar.width * 0.875, this.game.cache.getImage('Objs').height );
        }

        if (this.cache.isSoundDecoded('titleMusic') && this.ready == 1)
        {
            this.preloadBar.cropRect = new Phaser.Rectangle(0, 0, this.preloadBar.width , this.game.cache.getImage('Objs').height );

            BasicGame.crush = this.add.audio('Crush');
            this.ready = 0;
            this.state.start('MainMenu');
        }

        this.font.text = "loading game please wait - mouse x: " + this.game.input.x + " y: " + this.game.input.y;
        this.preloadBar.updateCrop();
	}
};
