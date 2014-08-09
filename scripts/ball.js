/**
 * Created by Carlixyz on 08/08/14.
 */

var Ball = (function () {
    function Ball(game) {
        this.flickering = false;
        return this;
    }

    Ball.prototype.resetIt = function () {
        this.flickering = false;
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
        this.sprite.body.bounce = new Phaser.Point(.5, 1);
//        this.sprite.body.setCircle(10, 11, 11);
        this.sprite.body.linearDamping = 1;
        this.force = 50;

    };


    Ball.prototype.update = function (game) {


        if ( game.input.keyboard.isDown(Phaser.Keyboard.W)  )
        {
            this.sprite.body.velocity.y -=  this.force;

        }

         if ( game.input.keyboard.isDown(Phaser.Keyboard.S) )
        {
            this.sprite.body.velocity.y +=  this.force;

        }

        if ( game.input.keyboard.isDown(Phaser.Keyboard.A)  )
        {
            this.sprite.body.velocity.x -=  this.force;

        }

         if ( game.input.keyboard.isDown(Phaser.Keyboard.D) )
        {
            this.sprite.body.velocity.x +=  this.force;

        }

    };

    Ball.prototype.render = function (game) {

        game.debug.rectangle(this.sprite.body);

    };

    return Ball;
})();
