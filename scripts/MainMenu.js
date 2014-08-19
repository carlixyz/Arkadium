
BasicGame.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;

	this.leftInputButton = null;
    this.leftInputCode = 1;         // 0, 1, 2, 3
    this.rightInputButton = null;
    this.rightInputCode = 0;         // 0, 1, 2, 3

	this.Title = null;
};

BasicGame.MainMenu.prototype = {
	create: function () {
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

        this.background = this.add.sprite(0, 0, 'Back2');

//        this.playButton = this.add.button(this.game.world.centerX - this.game.cache.getImage('playButton').width/2,
//            this.game.world.centerY + this.game.cache.getImage('playButton').height, 'playButton', this.startGame, this, 2, 1, 0);

        this.playButton = this.add.button( this.game.world.centerX, this.game.world.centerY *1.5, 'inputButtons', this.startGame, this, 11, 7, 3, 2);
        this.playButton.anchor.setTo(0.5,0.5);

        this.leftInputButton = this.add.button( this.game.world.centerX * 0.25, this.game.world.centerY *1.5, 'inputButtons', this.swapInputLeft, this, 6, 5, 4, 2);
        this.leftInputButton.anchor.setTo(0.5,0.5);

        this.rightInputButton = this.add.button( this.game.world.centerX * 1.75, this.game.world.centerY *1.5, 'inputButtons', this.swapInputRight, this, 2, 1, 0, 2);
        this.rightInputButton.anchor.setTo(0.5,0.5);


        var emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY *.85, 75);
        emitter.makeParticles('sparks', [0, 1, 2, 3]);
        emitter.minParticleSpeed.setTo(-300, -50);
        emitter.maxParticleSpeed.setTo(300, 50);
        emitter.gravity = 0;
        emitter.setAlpha(1, 0.1, 4000, Phaser.Easing.Elastic.In);
        emitter.setScale(1.5, 0.4, 1.5, 0.4, 5000, Phaser.Easing.Elastic.InOut);
        emitter.start(false, 2000, 10);

        this.Title = this.add.sprite(this.game.world.centerX, this.game.world.centerY *.85, 'titlepage');
        this.Title.anchor.setTo(0.5,0.5);
        this.Title.scale.setTo(1.5,1.5);
	},

	update: function () {
		//	Do some nice funky main menu effect here
	},

    swapInputLeft: function ( pointer) {

        this.leftInputCode++;
        this.leftInputCode %= 4;

        this.leftInputButton.setFrames(2 +(4 * this.leftInputCode) , 1+(4 * this.leftInputCode), 0+(4 * this.leftInputCode), 2 +(4 * this.leftInputCode));
//        this.inputButton = this.add.button( this.game.world.centerX * 0.25, this.game.world.centerY *1.5, 'inputButtons', this.swapInput, this, 2 +(4 * 1) , 1+(4 * 1), 0+(4 * 1), 2 +(4 * 1));

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
//        this.music.stop();
    },

    swapInputRight: function ( pointer) {

        this.rightInputCode++;
        this.rightInputCode %= 4;
        this.rightInputButton.setFrames(2 +(4 * this.rightInputCode) , 1+(4 * this.rightInputCode), 0+(4 * this.rightInputCode), 2 +(4 * this.rightInputCode));
    },

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
