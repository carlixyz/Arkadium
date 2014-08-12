/**
 * Created by Carlixyz on 07/08/14.
 */
var MouseInput = (function () {
    function MouseInput(client) {
        // Using Strategy design Pattern to adjust dinamically User & CPU Input
        this.Client = client;                                                                                            // Client is the Object we want to move cached in this class for faster access
//        this.BallRef = null;

        return this;
    }

    MouseInput.prototype.create = function (game) {
//        this.BallRef = game.state.getCurrentState().ball;
    };

    MouseInput.prototype.updateInput = function (game) {

//        console.log("Ball is " + this.BallRef.sprite.x );


        this.Client.sprite.body.velocity.y += ((game.input.activePointer.y - 32) - this.Client.sprite.body.y) * .35 ;

        if ( Phaser.Math.fuzzyEqual(game.input.activePointer.y, this.Client.sprite.body.y + 32, 64  ))
            this.Client.sprite.body.velocity.y *=  .85 ;
    };

    return MouseInput;
})();
