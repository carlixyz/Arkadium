
BasicGame.Congratulations = function (game) {

//	this.music = null;
    this.logo = null;
	this.playButton = null;
    this.WinnerText = null;
    this.gameMessageText = null;
    this.scoreText = null;

};

BasicGame.Congratulations.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some mu
		//
		//	Naturally I expect you to do something significantly better :)
        this.background = this.add.image(0, 0, 'Back3');

		this.music = this.add.audio('Congratulations');
		this.music.play();

        BasicGame.music.stop();


        //Add logo
		this.logo = this.add.image(this.game.world.centerX, this.game.world.centerY * 0.75,  'Objs', 3);
        this.logo.scale.set(0.75);
        this.logo.anchor.set(0.5);

        //add Brief text
        this.gameMessageText = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        this.gameMessageText.text =  'CONGLATURATIONS !!!' +  " - " + 'A great winner is You!'  ;
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY * 1.5, this.gameMessageText);
        i.tint = 0xFF00FF;
        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);

        // Tell Who's the winner
        ////////////////////////////////////////////////////////////////////////////
        this.WinnerText = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        if ( BasicGame.leftHealth < 0 )
        {
            this.WinnerText.text = 'RIGHT PLAYER'  ;
            BasicGame.rightScore++;
        }
        if ( BasicGame.rightHealth < 0 )
        {
            this.WinnerText.text = 'LEFT PLAYER'  ;
            BasicGame.leftScore++;
        }
        var j = this.game.add.image(this.game.world.centerX, this.game.world.centerY * 0.75, this.WinnerText);
        j.tint = 0xFF00FF;
        j.anchor.set(0.5, 0.5);


        this.game.add.tween(this.background).to( { tint: 0x00ffff }, 20, Phaser.Easing.Linear.None, true, 0, 0, false).to({tint: 0xffffff});
        this.game.add.tween(this.logo).to( { tint: 0xFFFF00 }, 300, Phaser.Easing.Linear.None, true, 0, 10, false).to({tint: 0xFFFFFF});
        this.game.add.tween(this.logo.scale).to( { y: 0.05, x: 0.1 }, 100, Phaser.Easing.Elastic.Out, true, 0, 1, false).to({y: 1.5, x: 1.5});
        this.game.add.tween(j.scale).to( { y: 0.05, x: 0.1 }, 100, Phaser.Easing.Elastic.Out, true, 0, 1, false).to({y: 4, x: 4});


        this.scoreText = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        this.scoreText.text =  BasicGame.leftScore + " - " + BasicGame.rightScore ;
        var k = this.game.add.image(this.game.world.centerX, this.game.world.centerY, this.scoreText);
        k.tint = 0xFF00FF;
        k.scale.setTo(2, 2);
        k.anchor.set(0.5, 1);


        BasicGame.leftHealth = 3;
        BasicGame.rightHealth = 3;

        //add a click handler
        this.game.input.onDown.add(this.click, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here
//        this.logo.tint = Math.random() * 0xffffff;
//        this.background.tint = Math.random() * 0xffffff;

	},

    click: function(x, y, timedown) {
        //console.log("CLICK IS MADE");
        //	And start the actual game
        this.game.state.start('MainMenu');
    }

};
