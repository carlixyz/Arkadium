
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();


        this.background = this.add.sprite(0, 0, 'Back1');
        this.add.sprite(this.game.world.centerX - this.game.cache.getImage('titlepage').width/2,
            this.game.world.centerY - this.game.cache.getImage('titlepage').height, 'titlepage');


		this.playButton = this.add.button(this.game.world.centerX - this.game.cache.getImage('playButton').width/2,
            this.game.world.centerY + this.game.cache.getImage('playButton').height, 'playButton', this.startGame, this, 2, 1, 0);

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
