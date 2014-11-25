
BasicGame.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;

	this.leftInputButton = null;
    this.rightInputButton = null;
//    this.leftInputCode = 1;         // 0, 1, 2, 3
//    this.rightInputCode = 0;         // 0, 1, 2, 3

	this.Title = null;
	this.infoText = null;
};

BasicGame.MainMenu.prototype = {
	create: function () {
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        this.background = this.add.image(0, 0, 'Back2');

        BasicGame.music = this.add.audio('titleMusic');
        BasicGame.music.play();

        this.playButton = this.add.button( this.game.world.centerX, this.game.world.centerY *1.5, 'inputButtons', this.startGame, this, 11, 7, 3, 2);
        this.playButton.anchor.setTo(0.5,0.5);

        this.leftInputButton = this.add.button( this.game.world.centerX * 0.25, this.game.world.centerY *1.5, 'inputButtons', this.swapInputLeft, this, 6, 5, 4, 2);
        this.leftInputButton.setFrames(2 +(4 * BasicGame.leftInputCode) , 1+(4 * BasicGame.leftInputCode), 0+(4 * BasicGame.leftInputCode), 2 +(4 * BasicGame.leftInputCode));
        this.leftInputButton.anchor.setTo(0.5,0.5);

        this.rightInputButton = this.add.button( this.game.world.centerX * 1.75, this.game.world.centerY *1.5, 'inputButtons', this.swapInputRight, this, 2, 1, 0, 2);
        this.rightInputButton.setFrames(2 +(4 * BasicGame.rightInputCode) , 1+(4 * BasicGame.rightInputCode), 0+(4 * BasicGame.rightInputCode), 2 +(4 * BasicGame.rightInputCode));
        this.rightInputButton.anchor.setTo(0.5,0.5);


        var emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY *.85, 75);
        emitter.makeParticles('sparks', [0, 1, 2, 3]);
        emitter.minParticleSpeed.setTo(-300, -50);
        emitter.maxParticleSpeed.setTo(300, 50);
        emitter.gravity = 0;
        emitter.setAlpha(1, 0.1, 4000, Phaser.Easing.Elastic.In);
        emitter.setScale(1.5, 0.4, 1.5, 0.4, 5000, Phaser.Easing.Elastic.InOut);
        emitter.start(false, 2000, 10);

        this.Title = this.add.image(this.game.world.centerX, this.game.world.centerY *.85, 'titlepage');
        this.Title.anchor.setTo(0.5,0.5);
        this.Title.scale.setTo(1.5,1.5);

        this.infoText = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);

        if (BasicGame.rightScore || BasicGame.leftScore)
            this.infoText.text =  BasicGame.leftScore + " - " + BasicGame.rightScore ;
        else
            this.infoText.text =  "CHOOSE CPU OR PLAYER INPUT & PUSH PLAY" ;
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY *1.9, this.infoText);
        i.tint = 0xFF00FF;
        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);
	},

	update: function () {
		//	Do some nice funky main menu effect here
        if ( this.input.keyboard.isDown(Phaser.Keyboard.ENTER) || this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) )
            this.startGame();

        if ( this.input.keyboard.isDown(Phaser.Keyboard.S) || this.input.keyboard.isDown(Phaser.Keyboard.W) || this.input.keyboard.isDown(Phaser.Keyboard.A)|| this.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            BasicGame.leftInputCode = 3;
            this.leftInputButton.setFrames(2 +(4 * BasicGame.leftInputCode) , 1+(4 * BasicGame.leftInputCode), 0+(4 * BasicGame.leftInputCode), 2 +(4 * BasicGame.leftInputCode));
        }

        if ( this.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.input.keyboard.isDown(Phaser.Keyboard.UP) || this.input.keyboard.isDown(Phaser.Keyboard.LEFT)|| this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            BasicGame.rightInputCode = 2;
            this.rightInputButton.setFrames(2 +(4 * BasicGame.rightInputCode) , 1+(4 * BasicGame.rightInputCode), 0+(4 * BasicGame.rightInputCode), 2 +(4 * BasicGame.rightInputCode));
        }
    },

    swapInputLeft: function ( pointer) {

        BasicGame.leftInputCode++;
        BasicGame.leftInputCode %= 4;
        this.leftInputButton.setFrames(2 +(4 * BasicGame.leftInputCode) , 1+(4 * BasicGame.leftInputCode), 0+(4 * BasicGame.leftInputCode), 2 +(4 * BasicGame.leftInputCode));
    },

    swapInputRight: function ( pointer) {

        BasicGame.rightInputCode++;
        BasicGame.rightInputCode %= 4;
        this.rightInputButton.setFrames(2 +(4 * BasicGame.rightInputCode) , 1+(4 * BasicGame.rightInputCode), 0+(4 * BasicGame.rightInputCode), 2 +(4 * BasicGame.rightInputCode));
    },

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
//		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
