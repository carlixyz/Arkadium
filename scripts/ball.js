/**
 * Created by Carlixyz on 08/08/14.
 */

var Ball = (function () {
    function Ball(game) {
        this.flickering = false;
        this.released = false;
        this.active = false;
        this.speed = 300;
        this.launchSide = 0; // -1 left / +1 Right

        return this;
    }

    Ball.prototype.resetIt = function () {
        this.flickering = false;
        this.released = false;
    };

    Ball.prototype.create = function (game) {

        this.sprite = game.add.sprite( game.world.centerX, game.world.centerY , 'Objs', 2);
        this.sprite.scale.setTo(0.5, 0.5);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(60, 60);
        this.sprite.bounce = 10;

        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = false;
        this.sprite.body.bounce = new Phaser.Point(1, 1);
        this.sprite.body.linearDamping = 1;

    };


    Ball.prototype.hitRelease = function () {
        if (!this.released)
        {
            if (this.launchSide == 0)
                this.launchSide = (Math.random() > 0.5 ? -1 : +1 );

            this.sprite.body.velocity.x = this.speed  * -(this.launchSide + (this.launchSide == 0));
            this.sprite.body.velocity.y = this.speed * (-1 + Math.random() * 2 );
            this.released = true;
            this.launchSide = 0;
        }
    };

    Ball.prototype.setActive = function (value) {
        this.active = value;
        this.sprite.alive = value;
        this.sprite.visible = value;
    };

    Ball.prototype.setBall = function (game) {

        if (game.state.getCurrentState().ballsAmount > 1)
        {
            this.setActive(false);
            game.state.getCurrentState().ballsAmount -= 1;
            this.launchSide = 0;
            return;
        }

        if (this.released)
        {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.released = false;
        }

    };

    Ball.prototype.update = function (game)
    {

        game.input.onDown.add(this.hitRelease, this);

        if ( game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
            || ( this.launchSide == -1 && BasicGame.leftInputCode == 1 ) || ( this.launchSide == 1 && BasicGame.rightInputCode == 1 ) )
            this.hitRelease();

        if (this.sprite.x < 25)                     // If Ball escapes from left
        {
            this.launchSide = -1;
            this.setBall(game);                     // Point for Right player
            BasicGame.leftHealth -= 1;
            BasicGame.crush.play();
        }
        else if (this.sprite.x > game.width - 25)   // if Ball escapes from right
        {
            this.launchSide = +1;
            this.setBall(game);
            BasicGame.rightHealth -= 1;             // Point for Left Player
            BasicGame.crush.play();
        }

    };

    Ball.prototype.render = function (game)
    {

        game.debug.rectangle(this.sprite.body);

    };

    return Ball;
})();
