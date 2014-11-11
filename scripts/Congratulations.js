
BasicGame.Congratulations = function (game) {

	this.music = null;
    this.logo = null;
	this.playButton = null;
    this.gameMessageText = null;
    this.gameMessageSecondLineText = null;
    this.gameMessageInfoText = null;

};

BasicGame.Congratulations.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some mu
		//
		//     game.load.image('bg', 'assets/images/bg_prerendered.png');    game.load.image('bg', 'assets/images/bg_prerendered.png');    game.load.image('bg', 'assets/images/bg_prerendered.png');sic and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
        this.background = this.add.sprite(0, 0, 'Back3');

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

        //Add logo
		this.logo = this.add.sprite(this.game.world.centerX, 140, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);


        //add text
        this.gameMessageText = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY *.75, this.gameMessageText);
        i.tint = 0xFF00FF;

        if ( BasicGame.leftScore > 10 )
            this.gameMessageText.text =  " " + 'CONGLATURATIONS !!!' +  " - " + 'A winner is Left Player!'  ;
        if ( BasicGame.rightScore > 10 )
            this.gameMessageText.text =  " " + 'CONGLATURATIONS !!!' +  " - " + 'A winner is Right Player!' ;

        BasicGame.leftScore = 0;
        BasicGame.rightScore = 0;

        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);


        //add a click handler
        this.game.input.onDown.add(this.click, this);

		//this.playButton = this.add.button(320, 416, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

    click: function(x, y, timedown) {
        //console.log("CLICK IS MADE");
        //	And start the actual game
        this.game.state.start('MainMenu');
    }

};
