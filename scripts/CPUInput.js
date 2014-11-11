/**
 * Created by Carlixyz on 07/08/14.
 */
var CPUInput = (function () {
    function CPUInput(client) {
        // Using Strategy design Pattern to adjust dinamically User & CPU Input
        this.Client = client;                                                                                           // Client is the Object we want to move cached in this class for faster access
        this.BallRef = null;
        this.PadCPU = null;
        this.Speed = 190;

        return this;
    }

    CPUInput.prototype.create = function (game) {
//        this.BallRef = game.state.getCurrentState().ball;
        this.BallRef = game.state.getCurrentState().balls[0];

//        this.BallRef = BasicGame.balls[0];
        this.PadCPU = this.Client;

    };


    CPUInput.prototype.updateInput = function (game) {
//        console.log("This is " + this.PadCPU.sprite.y );
//        console.log("Ball is " + this.BallRef.sprite.Y );

        if ( !this.BallRef.active )
            for (var i = 0, total = game.state.getCurrentState().balls.length ; i < total; i++ )
                if (game.state.getCurrentState().balls[i].active )
                    this.BallRef = game.state.getCurrentState().balls[i];


        //Control the computer's pad
        if((this.PadCPU.sprite.y - this.BallRef.sprite.y) < -15)
        {
            this.PadCPU.sprite.body.velocity.y =this.Speed ;
        }
        else if(this.PadCPU.sprite.y - this.BallRef.sprite.y > 15)
        {
            this.PadCPU.sprite.body.velocity.y = -this.Speed ;
        }
        else
        {
            this.PadCPU.sprite.body.velocity.y = 0;
        }

    };

    return CPUInput;
})();
