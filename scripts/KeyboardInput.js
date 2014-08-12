/**
 * Created by Carlixyz on 07/08/14.
 */
var KeyboardInput = (function () {
    function KeyboardInput(client) {
        // Using Strategy design Pattern to adjust dinamically User & CPU Input
        this.Client = client;                                                                                           // Client is the Object we want to move cached in this class for faster access
        return this;
    }

    KeyboardInput.prototype.create = function (game) {
//        this.BallRef = game.state.getCurrentState().ball;
    };

    KeyboardInput.prototype.updateInput = function (game) {
        if ( game.input.keyboard.isDown(Phaser.Keyboard.UP)  || game.input.keyboard.isDown(Phaser.Keyboard.W) )
        {
            this.Client.sprite.body.velocity.y -= 50;
        }

        if ( game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)  )
        {
            this.Client.sprite.body.velocity.y += 50;
        }
    };

    return KeyboardInput;
})();