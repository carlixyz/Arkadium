
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

    this.gameStart = true;
    this.items = null;
    this.blocks = null;
    this.blocksTotal = 30;
    this.balls = null;
    this.ballsAmount = 3;
    this.padRight = null;
    this.padLeft = null;
    this.healthRight = null;
    this.healthLeft = null;
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
        this.background = this.add.image(0, 0, 'Back1');

        this.C1 = this.add.audio('Cling1');
        this.C2 = this.add.audio('Cling2');
        this.C3 = this.add.audio('Cling3');
        this.C4 = this.add.audio('Cling4');


        this.items =  this.game.add.group();
        this.items.enableBody = true;
        this.items.physicsBodyType = Phaser.Physics.ARCADE;

        this.blocks =  this.game.add.group();
        this.blocks.enableBody = true;
        this.blocks.physicsBodyType = Phaser.Physics.ARCADE;
        this.blocksTotal = 6 * 5;

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

        BasicGame.leftHealth = 3;
        BasicGame.rightHealth = 3;

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

        this.gameStart = true;
        this.info = this.game.add.retroFont('kof97', 8, 8, Phaser.RetroFont.TEXT_SET1);
        var i = this.game.add.image(this.game.world.centerX, this.game.world.centerY *1.9, this.info);
        i.tint = 0xFF00FF;
        i.scale.setTo(2, 2);
        i.anchor.set(0.5, 1);
        this.info.text =  "ARE YOU READY? PUSH TRIGGER TO LAUNCH BALL" ;

        this.healthRight = [5];
        this.healthLeft = [5];
        for (var k = 1; k <= 5; k++)
        {
            this.healthRight[k] = this.add.image(this.game.world.centerX + (k * 32), 10, 'items', 7);
            this.healthRight[k].anchor.setTo(0.5, 0);
            this.healthRight[k].tint = 0x88FF88;
            this.healthLeft[k] = this.add.image(this.game.world.centerX - (k * 32), 10, 'items', 7);
            this.healthLeft[k].anchor.setTo(0.5, 0);
            this.healthLeft[k].tint = 0xFF8888;
        }
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
                this.game.physics.arcade.overlap(ballRef.sprite, this.padLeft.sprite, this.hitBouncePad, null, this);
                this.game.physics.arcade.overlap(ballRef.sprite, this.padRight.sprite, this.hitBouncePad , null, this);

                if (this.blocksTotal < 1 )
                {
                    ballRef.speed = 500;
                    ballRef.sprite.bounce = 20;
                }
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
                    if (ballRef.launchSide == 0)
                    {
                        ballRef.sprite.x = this.world.centerX;
                        ballRef.sprite.y = this.world.centerY;
                    }
                }else
                this.gameStart = false;
            }
        }

        this.game.physics.arcade.overlap(this.items, this.padRight.sprite, this.itemTake, null, this);
        this.game.physics.arcade.overlap(this.items, this.padLeft.sprite, this.itemTake, null, this);


        if ( this.input.keyboard.isDown(Phaser.Keyboard.ESC) )
        {
            BasicGame.music.stop();
            this.state.start('MainMenu');
        }

        if ( this.input.keyboard.isDown(Phaser.Keyboard.T) )
        {
          this.padLeft.setSuperSize(this);
        }

        if ( BasicGame.leftHealth < 0 || BasicGame.rightHealth < 0 )
            this.state.start('Congratulations');
    },

    collisionHandler: function ( ball, block) {
//      Now I understand but Still hating JS;
//        this.ball.hitBounce( ball, block);

        this.itemCreate(block.x, block.y);
        block.kill();
        this.blocksTotal--;
        this.hitSparks(ball.x, ball.y);
    },

    hitBouncePad : function ( ball, pad) {

        if ( pad.sticky )
        {
            for(var i= 0; i<3; i++)
            {
                if ( this.balls[i].sprite == ball)
                {
                    this.balls[i].launchSide = (pad.x <  this.world.centerX? -1 : +1);
                    if (this.balls[i].released)
                    {
                        ball.body.velocity.x = 0;
                        ball.body.velocity.y = 0;
                        this.balls[i].released = false;
                    }
                    return;
                }
            }
        }


        var diff = 0;
        this.hitSparks(ball.x, ball.y);

        if (ball.x < pad.x)
        {
            //If ball is in the left hand side on the racket
            diff = pad.x - ball.x;
            ball.body.velocity.x = (-ball.bounce * diff);
        }
        else if (ball.x > pad.x)
        {
            //If ball is in the right hand side on the racket
            diff = ball.x - pad.x;
            ball.body.velocity.x = (ball.bounce * diff);
        }

        if (ball.y < pad.y)
        {
            //If ball is in the left hand side on the racket
            diff = pad.y - ball.y;
            ball.body.velocity.y = (-ball.bounce * diff);
        }
        else if (ball.y > pad.y)
        {
            //If ball is in the right hand side on the racket
            diff = ball.y - pad.y;
            ball.body.velocity.y = (ball.bounce * diff);
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

        if (this.info && !this.gameStart )
        {
            this.info.text =  " " ;
//            this.info.destroy(true);
//            this.info = null;
        }

        for (var k = 1; k <= 5; k++)
        {
            ( k > BasicGame.rightHealth ? this.healthRight[k].kill() : this.healthRight[k].revive()) ;
            ( k > BasicGame.leftHealth ? this.healthLeft[k].kill() : this.healthLeft[k].revive()) ;
        }
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

    itemCreate: function(posX, posY)
    {
        var itemType =   this.game.rnd.integerInRange(0, 10);
        if ( itemType > 4 )
            return;

        var c = this.items.create( posX, posY, 'items', itemType);
        c.name = itemType;
        c.anchor.setTo(0.5, 0.5);
        c.scale.setTo(2, 2);
        c.body.velocity.x = this.game.rnd.integerInRange(50, 200) * this.math.randomSign();
        c.body.velocity.y = this.game.rnd.integerInRange(50, 200) * this.math.randomSign();
        c.body.collideWorldBounds = true;
        c.body.allowGravity = false;
        c.body.bounce = new Phaser.Point(1, 1);
        c.body.linearDamping = 1;
    },

    itemTake: function (pad, item) {
        switch (item.name)
        {
            case 0:
                this.itemMultiBall();
                break;
            case 1:
                this.itemControl(pad);
                break;
            case 2:
                this.itemHealth(pad);
                break;
            case 3:
                this.itemLonger(pad);
                break;
            case 4:
                this.itemSticky(pad);
                break;
        }
        this.items.remove(item, true, false);
//        item.kill();
    },

    itemMultiBall: function () {

        for( var i = 0, total = this.balls.length; i < total; i++ )
        {
            var ballRef =  this.balls[i];
            if (!ballRef.active )
            {
                ballRef.sprite.body.velocity.x = 0;
                ballRef.sprite.body.velocity.y = 0;
                ballRef.launchSide = 0;
                ballRef.sprite.x = this.world.centerX;
                ballRef.sprite.y = this.world.centerY;
                ballRef.setActive(true);
                ballRef.released = false;
                ballRef.hitRelease();
                this.ballsAmount++;
            }
        }
    },

    itemHealth: function (pad)    {
        if (this.padRight.sprite == pad && BasicGame.rightHealth < 5)
            BasicGame.rightHealth++;
        else if(this.padLeft.sprite == pad && BasicGame.leftHealth < 5)
            BasicGame.leftHealth++;
    },

    itemControl: function (pad)    {
        if (this.padRight.sprite == pad )
            this.padRight.setFuzzyControl(this.game);
        else if(this.padLeft.sprite == pad )
            this.padLeft.setFuzzyControl(this.game);


    },

    itemLonger: function (pad)    {
        if (this.padRight.sprite == pad )
            this.padRight.setSuperSize(this.game);
        else if(this.padLeft.sprite == pad )
            this.padLeft.setSuperSize(this.game);

    },

    itemSticky: function (pad)    {
        if (this.padRight.sprite == pad )
            this.padRight.setSticky(this.game)
        else if(this.padLeft.sprite == pad )
            this.padLeft.setSticky(this.game);

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
