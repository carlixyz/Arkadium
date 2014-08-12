/**
 * Created by Carlixyz on 08/08/14.
 */

var Ball = (function () {
    function Ball(game) {
        this.flickering = false;
        this.released = false;
        this.sparx = null;
        this.speed = 300;

        return this;
    }

    Ball.prototype.resetIt = function () {
        this.flickering = false;
        this.released = false;
    };

    Ball.prototype.create = function (game) {

        this.sprite = game.add.sprite( game.world.centerX, game.world.centerY , 'Objs');

        this.sprite.scale.setTo(0.5, 0.5);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(60, 60);


        //  Here we add a new animation called 'walk'
        //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
        this.sprite.animations.add('ball', [2], 1, false);

        //  And this starts the animation playing by using its key ("walk")
        //  30 is the frame rate (30fps)
        //  true means it will loop when it finishes
        this.sprite.animations.play('ball', 1, false);

        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = false;
        this.sprite.body.bounce = new Phaser.Point(1, 1);
//        this.sprite.body.setCircle(10, 11, 11);
        this.sprite.body.linearDamping = 1;

        this.sparx = game.add.emitter(game.world.centerX, game.world.centerY , 100);
        this.sparx.makeParticles('sparks', [0, 1, 2, 3]);
        this.sparx.setScale(1, 0.1, 1, 0.1, 3000, Phaser.Easing.Quintic.In);
        this.sparx.gravity = 0;

    };

    Ball.prototype.hitSparks = function () {
        this.sparx.x = this.sprite.x;
        this.sparx.y = this.sprite.y;
        this.sparx.start(true, 2000, null, 5);
    };

    Ball.prototype.hitRelease = function () {
        if (!this.released) {
            this.sprite.body.velocity.x = this.speed;
            this.sprite.body.velocity.y = -this.speed;
            this.released = true;
        }

    };



    Ball.prototype.hitBounce = function ( ball, pad) {
        var diff = 0;
//        console.log("Bounced");
//        this.hitSparks.apply(this);
//        this.hitSparks();
//        ball.body.velocity.x *= -1;

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

    };


    Ball.prototype.update = function (game) {

    };

    Ball.prototype.render = function (game) {

        game.debug.rectangle(this.sprite.body);

    };

    return Ball;
})();
