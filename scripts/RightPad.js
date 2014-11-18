/**
 * Created by Carlixyz on 07/08/14.
 */
var RightPad = (function () {
    function RightPad(game) {
        this.flickering = false;
        this.InputBehaviour = null;
//        this.InputBehaviour = new KeyboardInput(this);

        return this;
    }

    RightPad.prototype.resetIt = function () {
        this.flickering = false;
    };

    RightPad.prototype.create = function (game, inputBehaviour) {

        this.InputBehaviour = inputBehaviour;
        this.InputBehaviour.create(game);

        this.sprite = game.add.sprite(game.world.centerX * 1.9, game.world.centerY , 'Objs', 1);

        this.sprite.scale.setTo(0.5, 0.5);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(60, 160);


        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce = new Phaser.Point(0, 0.3);
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = true;
//        this.sprite.body.gravity.y = 300;

    };


    RightPad.prototype.setFuzzyControl = function (game)
    {
        this.InputBehaviour.tightControl = false;
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.integerInRange(4, 20), function(){this.InputBehaviour.tightControl = true;}, this);

    };

    RightPad.prototype.update = function (game) {

        this.InputBehaviour.updateInput(game);
//        this.sprite.body.velocity.y += ((game.input.activePointer.y - 32) - this.sprite.body.y) * .35 ;
//
//        if ( Phaser.Math.fuzzyEqual(game.input.activePointer.y, this.sprite.body.y + 32, 64  ))
//            this.sprite.body.velocity.y *=  .85 ;
//
//        if ( game.input.keyboard.isDown(Phaser.Keyboard.UP)  )
//        {
//            this.sprite.body.velocity.y -= 50;
//        }
//        else if ( game.input.keyboard.isDown(Phaser.Keyboard.DOWN) )
//        {
//            this.sprite.body.velocity.y += 50;
//        }

    };

    RightPad.prototype.render = function (game) {

        // Sprite debug info
//        game.debug.spriteInfo(this.sprite, 32, 32);
        game.debug.rectangle(this.sprite.body);
//
//        game.debug.renderPhysicsBody(this.sprite.body);

//        game.debug.body(this.sprite);

//      game.debug.renderLocalTransformInfo(this.sprite, 32, 160);
//      game.debug.renderWorldTransformInfo(this.sprite, 32, 290);
    };

    return RightPad;
})();
