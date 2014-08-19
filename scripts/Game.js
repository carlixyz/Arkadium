
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.blocks = null;
    this.ball = null;
    this.padRight = null;
    this.padLeft = null;
    this.info = null;

};

BasicGame.Game.prototype = {

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.background = this.add.sprite(0, 0, 'Back1');

        this.blocks =  this.game.add.group();
        this.blocks.enableBody = true;
        this.blocks.physicsBodyType = Phaser.Physics.ARCADE;
        for (var row = 0; row < 6; row++)
        {
            for (var col = 0; col < 5; col++)
            {
                var c = this.blocks.create( (this.game.world.centerX - (this.game.world.centerX *.125)) + (row *  this.game.world.centerX *.05),
                                            (this.game.world.centerY - (this.game.world.centerY * 0.5)) + (col *  this.game.world.centerY *.30), 'Objs',  this.game.rnd.integerInRange(4, 7));
                c.name = 'Block' + i;
                c.scale.setTo(0.5, 0.5);
                c.body.setSize(50, 80);
                c.anchor.setTo(0.5, 0.5);
                c.body.immovable = true;
            }
        }

        this.ball = new Ball(this.game);
        this.ball.create(this.game);
        this.ball.hitSparks();
//        this.ball.hitRelease();

        this.padLeft = new LeftPad(this.game);
//        this.padLeft.create(this.game, new KeyboardInput(this.padLeft));
        this.padLeft.create(this.game, new CPUInput(this.padLeft));

        this.padRight = new RightPad(this.game);
        this.padRight.create(this.game, new MouseInput(this.padRight));


        this.info = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY *.1, this.info);
        i.tint = 0xFF00FF;
        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);

    },

	update: function () {
        this.info.text =  "Left Pad Score - Right Pad Score" ;

        this.game.physics.arcade.collide(this.ball.sprite, this.blocks, this.collisionHandler, null, this);

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.game.physics.arcade.collide(this.ball.sprite, this.padLeft.sprite, this.sparkies, null, this);
        this.game.physics.arcade.collide(this.ball.sprite, this.padRight.sprite, this.sparkies , null, this);

        this.ball.update(this.game);
        this.padLeft.update(this.game);
        this.padRight.update(this.game);


    },

    collisionHandler: function ( ball, block) {
//      Still hating JS;
//        this.ball.hitBounce( ball, block);
        block.kill();
        this.ball.hitSparks();
    },

    sparkies: function ( ball, pad) {
//      Still hating JS;
        this.ball.hitSparks();
        this.ball.hitBounce( ball, pad);
    },

    render: function () {
//       this.ball.render(this.game);

//        game.debug.spriteInfo(this.sprite, 32, 32);

        // call renderGroup on each of the alive members
//        this.blocks.forEach(this.renderGroup, this);
    },

    renderGroup : function(member) {
        this.game.debug.body(member);
    },

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
