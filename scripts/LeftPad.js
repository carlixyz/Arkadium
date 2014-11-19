/**
 * Created by Carlixyz on 07/08/14.
 */
var LeftPad = (function () {
    function LeftPad(game) {
        this.InputBehaviour = null;

        return this;
    }

    LeftPad.prototype.resetIt = function () {
        this.flickering = false;
        this.InputBehaviour = null;
    };

    LeftPad.prototype.create = function (game, inputBehaviour) {

        this.InputBehaviour = inputBehaviour;
        this.InputBehaviour.create(game);

        this.sprite = game.add.sprite(game.world.centerX * 0.1, game.world.centerY , 'Objs', 0);

        this.sprite.sticky = false;
        this.sprite.scale.setTo(0.5, 0.5);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(60, 160);


        //  Here we add a new animation called 'walk'
        //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
//        this.sprite.animations.add('idle', [0], 1, false);

        //  And this starts the animation playing by using its key ("walk")
        //  30 is the frame rate (30fps)
        //  true means it will loop when it finishes
//        this.sprite.animations.play('idle', 1, false);

        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce = new Phaser.Point(0, 0.3);
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = true;
    };

    LeftPad.prototype.setFuzzyControl = function (game)
    {
        var timeLapse = Phaser.Timer.SECOND * game.rnd.integerInRange(4, 20);

        this.InputBehaviour.tightControl = false;
        game.time.events.add(timeLapse, function(){this.InputBehaviour.tightControl = true;}, this);
        game.add.tween(this.sprite).to( { tint: 0x00FFFF }, timeLapse, Phaser.Easing.Linear.None, true, 0, 0, false).to({tint: 0xFFFFFF});

    };

    LeftPad.prototype.setSuperSize = function (game)
    {
        var timeLapse = Phaser.Timer.SECOND * game.rnd.integerInRange(5, 30);
        game.add.tween(this.sprite.scale).to( { y: 1 }, timeLapse * 0.25, Phaser.Easing.Linear.None, true);

        game.time.events.add(timeLapse , function(){
            game.add.tween(this.sprite.scale).to( { y: 0.5 }, 200, Phaser.Easing.Linear.None, true)
        }, this);

//        game.add.tween(this.sprite.scale).to( { y: 1 }, timeLapse, Phaser.Easing.Linear.None, true, 0, 0, false)
//            .to( { y: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 0, false)
//            .to( { y: 0.5 }, 20, Phaser.Easing.Linear.None, true, 0, 0, false);

    };

    LeftPad.prototype.setSticky = function (game)
    {
        var timeLapse = Phaser.Timer.SECOND * game.rnd.integerInRange(4, 20);

        this.sprite.sticky = true;
        game.time.events.add(timeLapse, function(){this.sprite.sticky = false; }, this);
//        game.add.tween(this.sprite).to( { tint: 0xFFDDFF }, timeLapse, Phaser.Easing.Linear.None, true, 0, 0, false).to({tint: 0xFFFFFF});
    };

    LeftPad.prototype.update = function (game) {

        this.InputBehaviour.updateInput(game);

    };

    LeftPad.prototype.render = function (game) {

        game.debug.rectangle(this.sprite.body);

    };

    return LeftPad;
})();
