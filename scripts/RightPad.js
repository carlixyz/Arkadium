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

        this.sprite.sticky = false;
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
        var timeLapse = Phaser.Timer.SECOND * game.rnd.integerInRange(4, 20);

        this.InputBehaviour.tightControl = false;
        game.time.events.add(timeLapse, function(){this.InputBehaviour.tightControl = true;}, this);
//        game.add.tween(this.sprite).to( { tint: 0xFFDDFF }, timeLapse, Phaser.Easing.Linear.None, true, 0, 0, false).to({tint: 0xFFFFFF});
        game.add.tween(this.sprite).to( { tint: 0x00FFFF }, timeLapse, Phaser.Easing.Linear.None, true, 0, 0, false).to({tint: 0xFFFFFF});

    };

    RightPad.prototype.setSuperSize = function (game)
    {
        var timeLapse = Phaser.Timer.SECOND * game.rnd.integerInRange(5, 30);
        game.add.tween(this.sprite.scale).to( { y: 1 }, timeLapse * 0.25, Phaser.Easing.Linear.None, true);

        game.time.events.add(timeLapse , function(){
            game.add.tween(this.sprite.scale).to( { y: 0.5 }, 200, Phaser.Easing.Linear.None, true)
        }, this);
    };

    RightPad.prototype.setSticky = function (game)
    {
        var timeLapse = Phaser.Timer.SECOND * game.rnd.integerInRange(4, 20);

        this.sprite.sticky = true;
        game.time.events.add(timeLapse, function(){this.sprite.sticky = false; }, this);
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
