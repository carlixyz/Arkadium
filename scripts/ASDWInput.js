/**
 * Created by Carlixyz on 07/08/14.
 */
var ASDWInput = (function () {
    function ASDWInput(client) {
        // Using Strategy design Pattern to adjust dinamically User & CPU Input
        this.Client = client;                                                                                           // Client is the Object we want to move cached in this class for faster access
        return this;
    }

    ASDWInput.prototype.create = function (game) {
//        this.BallRef = game.state.getCurrentState().ball;
    };

    ASDWInput.prototype.updateInput = function (game) {
        if (  game.input.keyboard.isDown(Phaser.Keyboard.W) )
        {
            this.Client.sprite.body.velocity.y -= 50;
        }

        if ( game.input.keyboard.isDown(Phaser.Keyboard.S)  )
        {
            this.Client.sprite.body.velocity.y += 50;
        }
    };

    return ASDWInput;
})();
