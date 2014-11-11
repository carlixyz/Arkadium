
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

//    this.ballGroup = null;
//    this.ball = null;
    this.blocks = null;
    this.balls = null;
    this.ballsAmount = 3;
    this.padRight = null;
    this.padLeft = null;
    this.info = null;
    this.C1 = null;
    this.C2 = null;
    this.C3 = null;
    this.C4 = null;
    this.sparx = null;

};

BasicGame.Game.prototype = {

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.background = this.add.sprite(0, 0, 'Back1');

        this.C1 = this.add.audio('Cling1');
        this.C2 = this.add.audio('Cling2');
        this.C3 = this.add.audio('Cling3');
        this.C4 = this.add.audio('Cling4');

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

        BasicGame.leftScore = 0;
        BasicGame.rightScore = 0;

        this.sparx = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY , 100);
        this.sparx.makeParticles('sparks', [0, 1, 2, 3]);
        this.sparx.setScale(1, 0.1, 1, 0.1, 3000, Phaser.Easing.Quintic.In);
        this.sparx.gravity = 0;



        this.balls = [3];
        for (var j = 0; j < 3; j++)
        {
            this.balls[j] = new Ball(this.game);
            this.balls[j].create(this.game);
        }

        this.hitSparks(this.balls[0].sprite.x, this.balls[0].sprite.y);
        this.balls[0].setActive(true);
        this.balls[1].setActive(true);
        this.balls[2].setActive(true);
        this.ballsAmount = 3;



//        this.ball = new Ball(this.game);
//        this.ball.create(this.game);
//        this.hitSparks(this.ball.sprite.x, this.ball.sprite.y);
////        this.ball.hitRelease();

        this.padLeft = new LeftPad(this.game);
        switch (BasicGame.leftInputCode)
        {
            case 0:
                this.padLeft.create(this.game, new MouseInput(this.padLeft));
                break;
            case 1:
                this.padLeft.create(this.game, new CPUInput(this.padLeft));
                break;
            case 2:
                this.padLeft.create(this.game, new KeyboardInput(this.padLeft));
                break;
            case 3:
                this.padLeft.create(this.game, new ASDWInput(this.padLeft));
                break;
        }

        this.padRight = new RightPad(this.game);
        switch (BasicGame.rightInputCode)
        {
            case 0:
                this.padRight.create(this.game, new MouseInput(this.padRight));
                break;
            case 1:
                this.padRight.create(this.game, new CPUInput(this.padRight));
                break;
            case 2:
                this.padRight.create(this.game, new KeyboardInput(this.padRight));
                break;
            case 3:
                this.padRight.create(this.game, new ASDWInput(this.padRight));
                break;
        }

        this.info = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY *.1, this.info);
        i.tint = 0xFF00FF;
        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);

    },

	update: function () {

        this.padLeft.update(this.game);
        this.padRight.update(this.game);

        for ( var j = 0; j < 3 ; j++)
        {
            ballRef = this.balls[j];

            if (ballRef.active)
            {
                ballRef.update(this.game);

                this.game.physics.arcade.collide(ballRef.sprite, this.blocks, this.collisionHandler, null, this);
                this.game.physics.arcade.collide(ballRef.sprite, this.padLeft.sprite, this.hitBouncePad, null, this);
                this.game.physics.arcade.collide(ballRef.sprite, this.padRight.sprite, this.hitBouncePad , null, this);

                if (ballRef.released !== true )
                {
                    if (ballRef.launchSide == 1)
                    {
                        ballRef.sprite.x = this.game.width -70;
                        ballRef.sprite.y = this.padRight.sprite.y;
                    }
                    if (ballRef.launchSide == -1)
                    {
                        ballRef.sprite.x =  70;
                        ballRef.sprite.y = this.padLeft.sprite.y;
                    }
                }
            }
        }


//        this.info.text =  " " + BasicGame.leftScore +  " - " + BasicGame.rightScore +  " " + this.ballsAmount;
        this.info.text =  " " + BasicGame.leftScore +  " - " + BasicGame.rightScore ;

        if ( this.input.keyboard.isDown(Phaser.Keyboard.ESC) )
            this.state.start('MainMenu');

        if ( BasicGame.leftScore > 10 || BasicGame.rightScore > 10 )
            this.state.start('Congratulations');
    },

    collisionHandler: function ( ball, block) {
//      Now I understand but Still hating JS;
//        this.ball.hitBounce( ball, block);
        block.kill();
        this.hitSparks(ball.x, ball.y);
    },

    hitBouncePad : function ( ball, pad) {
        var diff = 0;
//        console.log("Bounced");
//        this.hitSparks.apply(this);
//        this.hitSparks();
//        ball.body.velocity.x *= -1;

        this.hitSparks(ball.x, ball.y);

        if (ball.x < pad.x)
        {
            //If ball is in the left hand side on the racket
            diff = pad.x - ball.x;
            ball.body.velocity.x = (-10 * diff);
        }
        else if (ball.x > pad.x)
        {
            //If ball is in the right hand side on the racket
            diff = ball.x - pad.x;
            ball.body.velocity.x = (10 * diff);
        }

        if (ball.y < pad.y)
        {
            //If ball is in the left hand side on the racket
            diff = pad.y - ball.y;
            ball.body.velocity.y = (-10 * diff);
        }
        else if (ball.y > pad.y)
        {
            //If ball is in the right hand side on the racket
            diff = ball.y - pad.y;
            ball.body.velocity.y = (10 * diff);
        }
        else
        {
            //The ball hit the center of the racket, let's add a little bit of a tragic accident(random) of his movement
            ball.body.velocity.y = 2 + Math.random() * 8;
        }

},

    hitSparks: function ( posX, posY) {
        this.sparx.x = posX;
        this.sparx.y = posY;
        this.sparx.start(true, 2000, null, 5);
        this.ballSound();
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

	},

    ballSound: function() {
        switch( this.game.rnd.between(1,4) )
        {
            case 1:
                this.C1.play();
                break;
            case 2:
                this.C2.play();
                break;
            case 3:
                this.C3.play();
                break;
            case 4:
                this.C4.play();
                break;
        }
    }

};
