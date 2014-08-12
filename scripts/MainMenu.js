
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
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

        this.playButton = this.add.button(this.game.world.centerX - this.game.cache.getImage('playButton').width/2,
            this.game.world.centerY + this.game.cache.getImage('playButton').height, 'playButton', this.startGame, this, 2, 1, 0);

        var emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY *.85, 75);
        emitter.makeParticles('titleSparks', [0, 1, 2, 3]);
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

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
