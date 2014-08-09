/**
 * Created by Carlixyz on 07/08/14.
 */
var PlayerPad = (function () {
    function PlayerPad(game) {
//        game.load.spritesheet('kid', 'images/sunKid.png', 32, 32, 4);
        this.flickering = false;

        return this;
    }

    PlayerPad.prototype.resetIt = function () {
        this.flickering = false;
    };

    PlayerPad.prototype.create = function (game, rightSide) {

        if (rightSide === 1 )
            this.sprite = game.add.sprite(game.world.centerX * 1.9, game.world.centerY , 'Objs');
        else
            this.sprite = game.add.sprite(game.world.centerX * 0.1, game.world.centerY , 'Objs');

        this.sprite.scale.setTo(0.5, 0.5);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(60, 160);


        //  Here we add a new animation called 'walk'
        //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
        this.sprite.animations.add('idle', [rightSide], 1, false);

        //  And this starts the animation playing by using its key ("walk")
        //  30 is the frame rate (30fps)
        //  true means it will loop when it finishes
        this.sprite.animations.play('idle', 1, false);
//

        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce = new Phaser.Point(0, 0.3);
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = true;
//        this.sprite.body.gravity.y = 300;

    };


    PlayerPad.prototype.update = function (game) {
        this.sprite.body.velocity.y += ((game.input.activePointer.y - 32) - this.sprite.body.y) * .35 ;
//            this.sprite.body.velocity.y = ((game.input.activePointer.y - 32) - this.sprite.body.y) * 6 ;

        if ( Phaser.Math.fuzzyEqual(game.input.activePointer.y, this.sprite.body.y + 32, 64  ))
            this.sprite.body.velocity.y *=  .85 ;
//            this.sprite.body.velocity.y =  Phaser.Math.clamp(this.sprite.body.velocity.y  * .95, 30, -30) ;
//            this.sprite.body.velocity.y =  Phaser.Math.clamp(this.sprite.body.velocity.y, -30, 30) ;


//        if ( Phaser.Math.fuzzyEqual(game.input.activePointer.y, this.sprite.body.y + 32, 64  ))
//            this.sprite.body.velocity.y =  Phaser.Math.clamp(this.sprite.body.velocity.y, -30, 30) ;
//        else
//            this.sprite.body.velocity.y += ((game.input.activePointer.y - 32) - this.sprite.body.y) * .35 ;
////            this.sprite.body.velocity.y = ((game.input.activePointer.y - 32) - this.sprite.body.y) * 6 ;


//        if ( Math.abs( this.sprite.body.velocity.y ) < 1 )
//            this.sprite.body.velocity.y += Phaser.Math.sign(game.input.activePointer.y - this.sprite.body.y)   ;
//        else
//            this.sprite.body.velocity.y = ((game.input.activePointer.y - 32) - this.sprite.body.y) * 6  ;




//            this.sprite.body.velocity.y += Phaser.Math.clamp(((game.input.activePointer.y - 32) - this.sprite.body.y) * .15, -300, 300) ;

//            this.sprite.body.velocity.y += ((game.input.activePointer.y - 32) - this.sprite.body.y) * .05 ;



        if ( game.input.keyboard.isDown(Phaser.Keyboard.UP)  )
        {
//            this.sprite.body.y -= 10;
            this.sprite.body.velocity.y -= 50;

        }
        else if ( game.input.keyboard.isDown(Phaser.Keyboard.DOWN) )
        {
//            this.sprite.body.y += 10;
            this.sprite.body.velocity.y += 50;

        }

    };

    PlayerPad.prototype.render = function (game) {

        // Sprite debug info
//        game.debug.spriteInfo(this.sprite, 32, 32);
        game.debug.rectangle(this.sprite.body);
//
//        game.debug.renderPhysicsBody(this.sprite.body);

//        game.debug.body(this.sprite);

//      game.debug.renderLocalTransformInfo(this.sprite, 32, 160);
//      game.debug.renderWorldTransformInfo(this.sprite, 32, 290);
    };

    return PlayerPad;
})();
